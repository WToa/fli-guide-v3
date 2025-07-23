import { useState, useEffect, useCallback } from "react";
import { Container, Grid, Box, Button } from "@mui/material";
import api from "../api/axios";

// Data and component imports
import lifeRanksData from "../data/lifeRanks";
import BaseLayout from "../components/layout/templates/BaseLayout";
import WingWrapper from "../components/ui/WingWrapper";
import Presets from "../components/layout/recipe_calculator/Presets";
import RecipeForm from "../components/layout/recipe_calculator/RecipeForm";
import Results from "../components/layout/recipe_calculator/Results";
import MaterialSources from "../components/layout/recipe_calculator/MaterialSources";
import headerImage from "../assets/images/banners/world_crafting_icons.jpg";

const RecipeCalculator = () => {
   const [results, setResults] = useState({
      craftedMaterials: new Map(),
      baseMaterials: new Map(),
   });

   const [recipeRows, setRecipeRows] = useState([]);
   const [selectedMaterial, setSelectedMaterial] = useState(null);

   // State for presets
   const [selectedRanks, setSelectedRanks] = useState([]);
   const [selectedLife, setSelectedLife] = useState([]);
   const [selectedBis, setSelectedBis] = useState([]);
   const [selectedMarco, setSelectedMarco] = useState([]);
   const [tabIndex, setTabIndex] = useState(0);

   const onRankChange = useCallback((newRanks) => {
      setSelectedRanks(newRanks);
   }, []);

   // State for the material search autocomplete
   const [selectedSearchMaterial, setSelectedSearchMaterial] = useState(null);

   const handleResetAll = () => {
      setRecipeRows([]);
      setSelectedLife([]);
      setSelectedRanks([]);
      setSelectedBis([]);
      setSelectedMarco([]);
      setSelectedSearchMaterial(null);
      setTabIndex(0);
   };

   // EFFECT 1: Handles the preset tabs (Quests, BiS, Marco's)
   useEffect(() => {
      const fetchPresetRecipes = async () => {
         const params = new URLSearchParams();
         let hasActiveFilter = false;

         if (
            tabIndex === 0 &&
            selectedLife.length > 0 &&
            selectedRanks.length > 0
         ) {
            const matchingLifeRankIds = lifeRanksData
               .filter(
                  (lr) =>
                     selectedLife.includes(lr.profession) &&
                     selectedRanks.includes(lr.rank)
               )
               .map((lr) => lr.id);
            if (matchingLifeRankIds.length > 0) {
               params.append("lifeRankIds", matchingLifeRankIds.join(","));
               hasActiveFilter = true;
            }
         } else if (tabIndex === 1 && selectedBis.length > 0) {
            params.append("bisCategoryIds", selectedBis.join(","));
            hasActiveFilter = true;
         } else if (tabIndex === 2 && selectedMarco.length > 0) {
            params.append("marcoRankIds", selectedMarco.join(","));
            hasActiveFilter = true;
         }

         if (!hasActiveFilter) {
            setRecipeRows([]);
            return;
         }

         try {
            const res = await api.get(`/recipes?${params.toString()}`);
            const newRows = res.data.map((recipe) => {
               let presetQuantity = 1;
               if (tabIndex === 2 && recipe.marcoRequirements?.length > 0) {
                  presetQuantity = recipe.marcoRequirements[0].quantity;
               }
               return {
                  key: crypto.randomUUID(),
                  id: recipe.id,
                  name: recipe.rank
                     ? `${recipe.name} (${recipe.rank})`
                     : recipe.name,
                  quantity: presetQuantity,
               };
            });
            setRecipeRows(newRows);
         } catch (err) {
            console.error("Failed to fetch preset recipes:", err);
         }
      };

      fetchPresetRecipes();
   }, [selectedLife, selectedRanks, selectedBis, selectedMarco, tabIndex]);

   // EFFECT 2: Handles the material search
   // This will ADD to the current list of recipes.
   useEffect(() => {
      if (!selectedSearchMaterial) return;

      const fetchMaterialRecipes = async () => {
         try {
            const res = await api.get(
               `/recipes?materialId=${selectedSearchMaterial.id}`
            );
            const newRows = res.data.map((recipe) => ({
               key: crypto.randomUUID(),
               id: recipe.id,
               name: recipe.rank
                  ? `${recipe.name} (${recipe.rank})`
                  : recipe.name,
               quantity: 1,
            }));

            // Add new recipes, preventing duplicates
            setRecipeRows((prevRows) => {
               const existingIds = new Set(prevRows.map((r) => r.id));
               const uniqueNewRows = newRows.filter(
                  (r) => !existingIds.has(r.id)
               );
               return [...prevRows, ...uniqueNewRows];
            });

            // Clear the search box after adding the recipes
            setSelectedSearchMaterial(null);
         } catch (err) {
            console.error("Failed to fetch material recipes:", err);
         }
      };

      fetchMaterialRecipes();
   }, [selectedSearchMaterial]);

   return (
      <BaseLayout headerImage={headerImage}>
         <Container sx={{ py: 2.5 }}>
            <WingWrapper>Recipe Calculator</WingWrapper>
            <Grid container spacing={2}>
               <Grid size={{ xs: 12, md: 6 }}>
                  <Grid container spacing={2} direction="column">
                     <Grid>
                        <Presets
                           selectedRanks={selectedRanks}
                           onRankChange={onRankChange}
                           selectedQuestLives={selectedLife}
                           onQuestLivesChange={setSelectedLife}
                           selectedBiSCategories={selectedBis}
                           onBiSCategoriesChange={setSelectedBis}
                           selectedMarcoRanks={selectedMarco}
                           onMarcoRanksChange={setSelectedMarco}
                           tabIndex={tabIndex}
                           onTabChange={setTabIndex}
                           selectedMaterial={selectedSearchMaterial}
                           onMaterialSelect={setSelectedSearchMaterial}
                        />
                     </Grid>
                     <Grid size={{ xs: 12, md: 6 }}>
                        <Box display="flex" justifyContent="flex-start">
                           <Button
                              variant="outlined"
                              onClick={handleResetAll}
                              sx={{
                                 backgroundColor: "#2196f3",
                                 color: "#fff",
                                 "&:hover": {
                                    backgroundColor: "#1976d2",
                                 },
                              }}
                           >
                              Reset All
                           </Button>
                        </Box>
                     </Grid>
                     <Grid>
                        <RecipeForm
                           setResults={setResults}
                           presetRows={recipeRows}
                           setSelectedMaterial={setSelectedMaterial}
                        />
                     </Grid>
                  </Grid>
               </Grid>
               <Grid size={{ xs: 12, md: 6 }}>
                  <Results
                     results={results}
                     onSelectMaterial={setSelectedMaterial}
                  />
               </Grid>
            </Grid>
            {selectedMaterial && (
               <MaterialSources
                  material={selectedMaterial}
                  onClose={() => setSelectedMaterial(null)}
               />
            )}
         </Container>
      </BaseLayout>
   );
};

export default RecipeCalculator;
