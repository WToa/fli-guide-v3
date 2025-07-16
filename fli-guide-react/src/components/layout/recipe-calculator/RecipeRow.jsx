import { useState, useEffect } from "react";
import { Box, TextField, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import api from "../../../api/axios";

const RecipeRow = ({
   index,
   row,
   updateRow,
   onAddRow,
   onRemoveRow,
   showRemove,
}) => {
   const [query, setQuery] = useState(
      row.name && row.rank ? `${row.name} (${row.rank})` : row.name || ""
   );
   const [suggestions, setSuggestions] = useState([]);
   const [selected, setSelected] = useState(!!row.id); // <- NEW

   useEffect(() => {
      if (selected) return;

      if (!query || query.length < 2) {
         setSuggestions([]);
         return;
      }

      const timeoutId = setTimeout(() => {
         api.get("/search-recipes", {
            params: { name: query },
         })
            .then((res) => {
               console.log("Axios response:", res.data);
               setSuggestions(res.data || []);
            })
            .catch((err) => {
               console.error("Error fetching suggestions:", err);
               setSuggestions([]);
            });
      }, 300);

      return () => clearTimeout(timeoutId);
   }, [query, selected]);

   const handleSelect = (recipe) => {
      const displayName = recipe.rank
         ? `${recipe.name} (${recipe.rank})`
         : recipe.name;

      updateRow(index, {
         id: recipe.id,
         name: recipe.name,
         rank: recipe.rank || null,
      });

      setQuery(displayName);
      setSelected(true);
      setSuggestions([]);
   };

   return (
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
         {/* Recipe Name Input with Suggestions */}
         <Box position="relative" sx={{ flexGrow: 1, backgroundColor: "white" }}>
            <TextField
               size="small"
               label="Recipe Name"
               value={query}
               onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(false); // <- NEW
               }}
               autoComplete="off"
               fullWidth
            />

            {suggestions.length > 0 && (
               <Box
                  role="listbox"
                  sx={{
                     position: "absolute",
                     zIndex: 2,
                     width: "100%",
                     backgroundColor: "white",
                     boxShadow: 2,
                     borderRadius: 1,
                     mt: 0.5,
                     overflow: "hidden",
                  }}
               >
                  {suggestions.map((recipe) => (
                     <Box
                        key={recipe.id}
                        role="option"
                        onClick={() => handleSelect(recipe)}
                        sx={{
                           p: 1,
                           cursor: "pointer",
                           "&:hover": { backgroundColor: "#f0f0f0" },
                        }}
                     >
                        <strong>
                           {recipe.name}
                           {recipe.rank ? ` (${recipe.rank})` : ""}
                        </strong>
                        <br />
                        <small>{recipe.profession}</small>
                     </Box>
                  ))}
               </Box>
            )}
         </Box>

         {/* Quantity Field */}
         <TextField
            size="small"
            type="number"
            label="Qty"
            value={row.quantity}
            onChange={(e) =>
               updateRow(index, {
                  quantity: Math.max(1, parseInt(e.target.value || "1", 10)),
               })
            }
            inputProps={{ min: 1 }}
            sx={{ width: 80, backgroundColor: "white" }}
         />

         {/* Add Button */}
         <Tooltip title="Add Row">
            <IconButton
               onClick={() => onAddRow(index)}
               sx={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  "&:hover": {
                     backgroundColor: "success.dark",
                  },
               }}
            >
               <AddIcon />
            </IconButton>
         </Tooltip>

         {/* Remove Button */}
         {showRemove && (
            <Tooltip title="Remove Row">
               <IconButton
                  onClick={() => onRemoveRow(index)}
                  sx={{
                     backgroundColor: "error.main",
                     color: "white",
                     "&:hover": {
                        backgroundColor: "error.dark",
                     },
                  }}
               >
                  <CloseIcon />
               </IconButton>
            </Tooltip>
         )}
      </Box>
   );
};

export default RecipeRow;
