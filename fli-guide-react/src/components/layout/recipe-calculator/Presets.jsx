import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Typography,
   Box,
   Tabs,
   Tab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import QuestTab from "./presets-children/QuestTab";
import BiSTab from "./presets-children/BiSTab";
import MarcoTab from "./presets-children/MarcoTab";
import MaterialSearch from "./presets-children/MaterialSearch";

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
}) => {
   const renderTabContent = () => {
      switch (tabIndex) {
         case 0:
            return (
               <QuestTab
                  selectedRanks={selectedRanks}
                  onRankChange={onRankChange}
                  selectedQuestLives={selectedQuestLives}
                  onQuestLivesChange={onQuestLivesChange}
               />
            );
         case 1:
            return (
               <BiSTab
                  selectedBiSCategories={selectedBiSCategories}
                  onBiSCategoriesChange={onBiSCategoriesChange}
               />
            );
         case 2:
            return (
               <MarcoTab
                  selectedMarcoRanks={selectedMarcoRanks}
                  onMarcoRanksChange={onMarcoRanksChange}
               />
            );
         default:
            return null;
      }
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
                  Please be aware that selecting multiple options can impact performance. Give the
                  calculator a few seconds to update after making changes.
               </Typography>
            </Box>

            <Tabs
               value={tabIndex}
               onChange={(_, newIndex) => onTabChange(newIndex)}
               centered
               sx={{ mb: 2 }}
            >
               <Tab label="Quests" />
               <Tab label="BiS Gear" />
               <Tab label="Marco's Shop" />
            </Tabs>

            {renderTabContent()}

            <MaterialSearch onMaterialSelect={onMaterialSelect} />
         </AccordionDetails>
      </Accordion>
   );
};

export default Presets;
