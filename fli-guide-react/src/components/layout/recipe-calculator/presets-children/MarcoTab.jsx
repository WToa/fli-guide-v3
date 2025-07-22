import {
   Typography,
   Box,
   ToggleButton,
   ToggleButtonGroup,
} from "@mui/material";

// Data import
import marcoRanks from "../../../../data/marcoRanks";

// Import shared styles
import { toggleStyles, tabPanelBoxStyles } from "../../../ui/presetStyles";

const MarcoTab = ({ selectedMarcoRanks, onMarcoRanksChange }) => {
   return (
      <Box sx={tabPanelBoxStyles}>
         <Typography variant="h6" mb={1}>
            Upgrade Marco's Shop
         </Typography>
         <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            {[marcoRanks.slice(0, 2), marcoRanks.slice(2)].map((group, i) => (
               <ToggleButtonGroup
                  key={i}
                  value={selectedMarcoRanks}
                  onChange={(_, newRanks) => onMarcoRanksChange(newRanks)}
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
            ))}
         </Box>
      </Box>
   );
};

export default MarcoTab;
