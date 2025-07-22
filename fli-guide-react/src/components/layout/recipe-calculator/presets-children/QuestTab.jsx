import {
   Typography,
   Box,
   Tooltip,
   IconButton,
   ToggleButton,
   ToggleButtonGroup,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Data imports
import lives from "../../../../data/livesConfig";
import ranks from "../../../../data/ranksConfig";

// Import shared styles
import { toggleStyles, tabPanelBoxStyles } from "../../../ui/presetStyles";

// Helper function
const toggleItem = (list, item) =>
   list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

const QuestTab = ({
   selectedRanks,
   onRankChange,
   selectedQuestLives,
   onQuestLivesChange,
}) => {
   const isAllSelected = selectedRanks.length === ranks.length;

   const renderRankGroup = (ids) => (
      <ToggleButtonGroup
         value={selectedRanks}
         onChange={(_, newRanks) => onRankChange(newRanks)}
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
                  onClick={() => onToggle(item.id)}
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

   return (
      <Box sx={tabPanelBoxStyles}>
         <Typography variant="h6" mb={1}>
            Life:
         </Typography>
         {renderIconGrid(
            lives.filter((l) => l.quests),
            selectedQuestLives,
            (id) => onQuestLivesChange(toggleItem(selectedQuestLives, id))
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
                     onRankChange(isAllSelected ? [] : ranks.map((r) => r.id))
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
   );
};

export default QuestTab;
