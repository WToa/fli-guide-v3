import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Typography,
   Box
} from "@mui/material";

const MaterialSources = ({ material, onClose }) => {
   const { name, data } = material;

   const shouldShow = (field, source) => {
      const type = source.collection_type;

      const hiddenFields = {
         profession: ["Material Shop", "Combat", "Marco's Shop", "Tool Shop"],
         map: ["Crafting"],
         target: ["Material Shop", "Marco's Shop", "Crafting", "Tool Shop"],
      };

      return !hiddenFields[field]?.includes(type);
   };

   return (
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
         <DialogTitle>{name} - Sources</DialogTitle>
         <DialogContent>
            <Typography variant="body1" gutterBottom>
               Required Amount: {data.amount}
            </Typography>
            {data.sources?.length > 0 ? (
               data.sources.map((source, idx) => (
                  <Box key={idx} mt={2}>
                     <Box
                        component="span"
                        sx={{
                           display: "inline-block",
                           px: 1.2,
                           py: 0.4,
                           backgroundColor: "#eee",
                           borderRadius: "12px",
                           fontSize: "0.75rem",
                           fontWeight: 500,
                           mb: 1,
                        }}
                     >
                        {source.collection_type}
                     </Box>

                     {shouldShow("profession", source) && source.profession_name && (
                        <Typography>
                           Profession: {source.profession_name}
                        </Typography>
                     )}

                     {shouldShow("map", source) && source.map_name && (
                        <Typography>Map: {source.map_name}</Typography>
                     )}

                     {shouldShow("target", source) && source.target_name && (
                        <Typography>Target: {source.target_name}</Typography>
                     )}
                  </Box>
               ))
            ) : (
               <Typography>No sources available for this material.</Typography>
            )}
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose}>Close</Button>
         </DialogActions>
      </Dialog>
   );
};

export default MaterialSources;
