import {
   Box,
   Typography,
   List,
   ListItem,
   Paper,
   Grid,
   Checkbox,
   FormControlLabel,
} from "@mui/material";

import { useState, useEffect } from "react";

const UncheckedIcon = () => (
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
         x="1"
         y="1"
         width="22"
         height="22"
         rx="4"
         fill="white"
         stroke="rgba(0, 0, 0, 0.23)"
         strokeWidth="2"
      />
   </svg>
);

const CheckedIcon = () => (
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#1976d2" />
      <path
         d="M9.55 18.2l-5.7-5.7 1.41-1.41 4.29 4.29 9-9-1.41-1.42-7.59 7.59z"
         fill="white"
      />
   </svg>
);

const Results = ({ results, onSelectMaterial }) => {
   const [checkedMaterials, setCheckedMaterials] = useState({});

   useEffect(() => {
      setCheckedMaterials({});
   }, [results]);

   const toggleChecked = (name) => {
      setCheckedMaterials((prev) => {
         const isNowChecked = !prev[name];
         const updated = { ...prev, [name]: isNowChecked };

         return updated;
      });
   };

const renderList = (materials, label, showCheckboxes = true) => {
   if (!materials || materials.size === 0) return null;

   const entries = [...materials.entries()];
   const CHUNK_SIZE = 10;

   const chunks = [];
   for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      chunks.push(entries.slice(i, i + CHUNK_SIZE));
   }

   const rows = [];
   for (let i = 0; i < chunks.length; i += 2) {
      rows.push([chunks[i], chunks[i + 1] || []]);
   }

return (
      <Box>
         <Typography variant="h6" gutterBottom>
            {label}
         </Typography>
         <Grid container spacing={2} direction="column">
            {rows.map((cols, rowIdx) => (
               <Grid container spacing={2} key={rowIdx}>
                  {cols.map((col, colIdx) => (
                     <Grid
                        size={{ xs: 12}}
                        key={colIdx}
                        sx={{
                           flex: 1,
                        }}
                     >
                        <List dense disablePadding>
                           {col.map(([name, data]) => (
                              <ListItem
                                 key={name}
                                 disableGutters
                                 sx={{
                                    cursor: "pointer",
                                    "&:hover .material-name": {
                                       textDecoration: "underline",
                                       color: "primary.dark",
                                    },
                                 }}
                              >
                                 {showCheckboxes && (
                                    <FormControlLabel
                                       control={
                                          <Checkbox
                                             checked={!!checkedMaterials[name]}
                                             onChange={() =>
                                                toggleChecked(name)
                                             }
                                             icon={<UncheckedIcon />}
                                             checkedIcon={<CheckedIcon />}
                                          />
                                       }
                                       label={
                                          <Box
                                             onClick={() =>
                                                onSelectMaterial({ name, data })
                                             }
                                             component="span"
                                             fontSize={13}
                                             fontWeight={400}
                                             color={
                                                checkedMaterials[name]
                                                   ? "text.disabled"
                                                   : "primary.main"
                                             }
                                             sx={{
                                                textDecoration:
                                                   checkedMaterials[name]
                                                      ? "line-through"
                                                      : "none",
                                                position: "relative",
                                                top: "-2px",
                                             }}
                                             className="material-name"
                                          >
                                             {name} (x{data.amount})
                                          </Box>
                                       }
                                    />
                                 )}
                              </ListItem>
                           ))}
                        </List>
                     </Grid>
                  ))}
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

   return (
      <Paper
         elevation={3}
         sx={{
            p: 2.5,
            backgroundColor: "#fff1b5",
            borderRadius: 2,
         }}
      >
         {renderList(results.craftedMaterials, "Crafted Materials", true, true)}
         {renderList(results.baseMaterials, "Base Materials", true)}
      </Paper>
   );
};

export default Results;
