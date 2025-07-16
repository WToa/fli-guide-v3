import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Typography,
   Box,
   Tooltip,
   IconButton,
   ToggleButton,
   ToggleButtonGroup,
   Tabs,
   Tab,
   TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useEffect } from "react";
import lives from "../../../data/livesConfig";
import ranks from "../../../data/ranksConfig";
import bisCategories from "../../../data/bisConfig";
import marcoRanks from "../../../data/marcoRanks";
import api from "../../../api/axios";

const toggleItem = (list, item) =>
   list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

const toggleStyles = {
   borderRadius: 2,
   textTransform: "none",
   backgroundColor: "#fff1b5",
   color: "#6e4b2a",
   transition: "all 0.2s ease-in-out",
   minWidth: 100,
   px: 2,
   py: 1,
   m: 0.5,
   boxShadow: 3,
   "&:hover": { backgroundColor: "#fffbe6" },
   "&.Mui-selected": {
      backgroundColor: "#1976d2",
      color: "#fff",
      "&:hover": { backgroundColor: "#1565c0" },
   },
   "&.MuiToggleButtonGroup-grouped": { borderRadius: 2, margin: 0.5 },
};

const tabPanelBoxStyles = {
   backgroundColor: "#fbd688",
   borderRadius: 2,
   p: 2,
   mb: 2,
   boxShadow: 3,
   textAlign: "center",
   border: "1px solid #e0c177",
};

const Presets = ({
   // Props received from RecipeCalculator
   selectedRanks,
   onRankChange,
   selectedQuestLives,
   onQuestLivesChange,
   selectedBiSCategories,
   onBiSCategoriesChange,
   selectedMarcoRanks,
   onMarcoRanksChange,
   tabIndex,
   onTabChange,
   onMaterialSelect,
   // 'selectedMaterial' prop is no longer needed by this component
}) => {
   const isAllSelected = selectedRanks.length === ranks.length;

   // State for the new material search input
   const [materialQuery, setMaterialQuery] = useState("");
   const [materialSuggestions, setMaterialSuggestions] = useState([]);
   const [materialSelected, setMaterialSelected] = useState(false);

   const renderRankGroup = (ids) => (
      <ToggleButtonGroup
         value={selectedRanks}
         onChange={(_, newRanks) => onRankChange(newRanks)} // Use prop
         exclusive={false}
      >
         {ids.map((id) => {
            const rank = ranks.find((r) => r.id === id);
            return (
               <ToggleButton
                  key={id}
                  value={id}
                  sx={toggleStyles}
                  disableRipple
               >
                  {rank?.label}
               </ToggleButton>
            );
         })}
      </ToggleButtonGroup>
   );

   const renderIconGrid = (data, selectedList, onToggle) => (
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
         {data.map((item) => (
            <Tooltip title={item.label} key={item.id}>
               <Box
                  component="img"
                  src={item.icon}
                  alt={item.label}
                  onClick={() => onToggle(item.id)} // Use generic toggle handler prop
                  sx={{
                     width: 55,
                     height: 55,
                     cursor: "pointer",
                     borderRadius: 1,
                     border: selectedList.includes(item.id)
                        ? "2px solid #1976d2"
                        : "none",
                     backgroundColor: "transparent",
                     transition: "transform 0.2s ease",
                     "&:hover": {
                        transform: "scale(1.35)",
                     },
                  }}
               />
            </Tooltip>
         ))}
      </Box>
   );

   useEffect(() => {
      if (materialSelected) return; // Stop fetching if an item is selected

      if (materialQuery.length < 2) {
         setMaterialSuggestions([]);
         return;
      }

      const fetchOptions = setTimeout(() => {
         api.get(`/search-materials?name=${materialQuery}`).then((res) =>
            setMaterialSuggestions(res.data || [])
         );
      }, 300);

      return () => clearTimeout(fetchOptions);
   }, [materialQuery, materialSelected]);

   const handleMaterialSelect = (material) => {
      onMaterialSelect(material); // Send the selected material to the parent
      setMaterialQuery(material.name); // Set the text field to the selected name
      setMaterialSelected(true); // Flag that an item has been selected
      setMaterialSuggestions([]); // Hide the suggestion box
   };

   return (
      <Accordion
         disableGutters
         elevation={3}
         sx={{ borderRadius: 2, backgroundColor: "#fff1b5", boxShadow: 3 }}
      >
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
               background: "linear-gradient(to right, #fbd688, #ffe9a7)",
               borderBottom: "1px solid #e0c177",
            }}
         >
            <Typography variant="h5" fontWeight="bold">
               Presets
            </Typography>
         </AccordionSummary>

         <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: "#fdf7e3" }}>
            <Box sx={tabPanelBoxStyles}>
               <Typography>
                  The following presets are designed to help you quickly fill
                  your recipe calculator with commonly used configurations.
                  Please be aware that the more you select, the more recipes
                  will be generated, which may impact performance. Give the
                  calculator a moment to load after making multiple selections.
               </Typography>
            </Box>

            <Tabs
               value={tabIndex} // Use prop
               onChange={(_, newIndex) => onTabChange(newIndex)} // Use prop setter
               centered
               sx={{ mb: 2 }}
            >
               <Tab label="Quests" />
               <Tab label="BiS Gear" />
               <Tab label="Marco's Shop" />
            </Tabs>

            {/* Quests Tab */}
            {tabIndex === 0 && (
               <Box sx={tabPanelBoxStyles}>
                  <Typography variant="h6" mb={1}>
                     Life:
                  </Typography>
                  {renderIconGrid(
                     lives.filter((l) => l.quests),
                     selectedQuestLives,
                     (id) =>
                        onQuestLivesChange(toggleItem(selectedQuestLives, id)) // Use prop
                  )}

                  <Box textAlign="center" mt={3}>
                     <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.5}
                        mb={0.5}
                     >
                        <Tooltip
                           title="Presets do not support quests of 'Craft using X material'. Please use the 'Search by Material' feature for these."
                           arrow
                        >
                           <IconButton
                              size="small"
                              sx={{
                                 p: 0,
                                 color: "text.secondary",
                                 backgroundColor: "#fff",
                              }}
                           >
                              <InfoOutlinedIcon fontSize="small" />
                           </IconButton>
                        </Tooltip>
                        <Typography variant="h6">Rank:</Typography>
                     </Box>

                     <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={0.5}
                     >
                        <ToggleButton
                           value="all"
                           selected={isAllSelected}
                           onChange={() =>
                              onRankChange(
                                 isAllSelected ? [] : ranks.map((r) => r.id)
                              )
                           }
                           sx={{ ...toggleStyles, width: 150 }}
                        >
                           All Ranks
                        </ToggleButton>
                        {renderRankGroup(["fledgling", "apprentice", "adept"])}
                        {renderRankGroup(["expert", "master"])}
                     </Box>
                  </Box>
               </Box>
            )}

            {/* BiS Gear Tab */}
            {tabIndex === 1 && (
               <Box sx={tabPanelBoxStyles}>
                  <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                     gap={0.5}
                     mb={0.5}
                  >
                     <Tooltip
                        title="The recipes generated by this preset are based on community feedback and subject to change. Please provide feedback in the dev discord if the information is incorrect or outdated."
                        arrow
                     >
                        <IconButton
                           size="small"
                           sx={{
                              p: 0,
                              color: "text.secondary",
                              backgroundColor: "#fff",
                           }}
                        >
                           <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                     </Tooltip>
                     <Typography variant="h6">
                        Best in Slot Categories:
                     </Typography>
                  </Box>

                  {/* This renders the new, grouped buttons */}
                  <ToggleButtonGroup
                     orientation="vertical"
                     value={selectedBiSCategories}
                     onChange={(_, newSelection) =>
                        onBiSCategoriesChange(newSelection)
                     }
                     sx={{
                        width: "100%",
                        "& .MuiToggleButtonGroup-grouped": {
                           border: "none",
                           borderRadius: 2,
                        },
                     }}
                  >
                     {/* Create sections for each group: General, Tools, Armor, etc. */}
                     {["General", "Tools", "Armor", "Weapons"].map(
                        (groupName) => (
                           <Box key={groupName} mt={1.5}>
                              <Typography variant="subtitle1" gutterBottom>
                                 {groupName}
                              </Typography>
                              <Box
                                 display="flex"
                                 justifyContent="center"
                                 flexWrap="wrap"
                              >
                                 {bisCategories
                                    .filter((cat) => cat.group === groupName)
                                    .map((cat) => (
                                       <ToggleButton
                                          key={cat.id}
                                          value={cat.id}
                                          sx={toggleStyles}
                                       >
                                          {cat.label}
                                       </ToggleButton>
                                    ))}
                              </Box>
                           </Box>
                        )
                     )}
                  </ToggleButtonGroup>
               </Box>
            )}

            {/* Marco's Shop Tab */}
            {tabIndex === 2 && (
               <Box sx={tabPanelBoxStyles}>
                  <Typography variant="h6" mb={1}>
                     Ranks to Upgrade Marco's Shop
                  </Typography>
                  <Box
                     display="flex"
                     flexDirection="column"
                     alignItems="center"
                     gap={1}
                  >
                     {[marcoRanks.slice(0, 2), marcoRanks.slice(2)].map(
                        (group, i) => (
                           <ToggleButtonGroup
                              key={i}
                              value={selectedMarcoRanks}
                              onChange={
                                 (_, newRanks) => onMarcoRanksChange(newRanks) // Use prop
                              }
                              exclusive={false}
                              sx={{
                                 flexWrap: "wrap",
                                 justifyContent: "center",
                                 "& .MuiToggleButton-root": {
                                    borderRadius: 2,
                                    margin: 0.5,
                                 },
                              }}
                           >
                              {group.map((rank) => (
                                 <ToggleButton
                                    key={rank.id}
                                    value={rank.id}
                                    sx={toggleStyles}
                                 >
                                    {rank.label}
                                 </ToggleButton>
                              ))}
                           </ToggleButtonGroup>
                        )
                     )}
                  </Box>
               </Box>
            )}

            <Box
               sx={{
                  backgroundColor: "#fbd688",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
               }}
            >
               <Typography variant="h6" mb={1} textAlign={"center"}>
                  Search by Material
               </Typography>

               <Box
                  position="relative"
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
               >
                  <TextField
                     size="small"
                     label="Material Name"
                     value={materialQuery}
                     onChange={(e) => {
                        setMaterialQuery(e.target.value);
                        setMaterialSelected(false);
                     }}
                     autoComplete="off"
                     fullWidth
                  />
                  {materialSuggestions.length > 0 && (
                     <Box
                        role="listbox"
                        sx={{
                           position: "absolute",
                           zIndex: 2,
                           width: "100%",
                           backgroundColor: "white",
                           boxShadow: 2,
                           mt: 0.5,
                           overflow: "hidden",
                        }}
                     >
                        {materialSuggestions.map((material) => (
                           <Box
                              key={material.id}
                              role="option"
                              onClick={() => handleMaterialSelect(material)}
                              sx={{
                                 p: 1,
                                 cursor: "pointer",
                                 "&:hover": { backgroundColor: "#f0f0f0" },
                              }}
                           >
                              {material.name}
                           </Box>
                        ))}
                     </Box>
                  )}
               </Box>
            </Box>
         </AccordionDetails>
      </Accordion>
   );
};

export default Presets;
