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
   const [selected, setSelected] = useState(!!row.id);

   const [activeIndex, setActiveIndex] = useState(-1);

   useEffect(() => {
      const controller = new AbortController();
      if (selected || query.length < 2) {
         setSuggestions([]);
         return;
      }
      const timeoutId = setTimeout(() => {
         api.get("/search-recipes", {
            params: { name: query },
            signal: controller.signal,
         })
            .then((res) => {
               setSuggestions(res.data || []);
            })
            .catch((err) => {
               if (err.name !== "CanceledError") {
                  console.error("Error fetching suggestions:", err);
               }
            });
      }, 300);
      return () => {
         clearTimeout(timeoutId);
         controller.abort();
      };
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
      setActiveIndex(-1);
   };

   const handleKeyDown = (e) => {
      if (suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
         e.preventDefault();
         setActiveIndex((prevIndex) =>
            prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
         );
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
         setActiveIndex((prevIndex) =>
            prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
         );
      } else if (e.key === "Enter" && activeIndex > -1) {
         e.preventDefault();
         handleSelect(suggestions[activeIndex]);
      } else if (e.key === "Escape") {
         e.preventDefault();
         setSuggestions([]);
      }
   };

   const listboxId = `recipe-suggestions-listbox-${index}`;
   const getOptionId = (idx) => `recipe-suggestion-option-${index}-${idx}`;

   return (
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
         {/* Recipe Name Input with Suggestions */}
         <Box
            position="relative"
            sx={{ flexGrow: 1, backgroundColor: "white" }}
         >
            <TextField
               size="small"
               label="Recipe Name"
               value={query}
               onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(false);
                  setActiveIndex(-1);
               }}
               autoComplete="off"
               fullWidth
               role="combobox"
               aria-autocomplete="list"
               aria-expanded={suggestions.length > 0}
               aria-controls={listboxId}
               aria-activedescendant={
                  activeIndex > -1 ? getOptionId(activeIndex) : undefined
               }
               onKeyDown={handleKeyDown}
            />

            {suggestions.length > 0 && (
               <Box
                  id={listboxId}
                  role="listbox"
                  sx={{
                     position: "absolute",
                     zIndex: 2,
                     width: "100%",
                     backgroundColor: "white",
                     boxShadow: 2,
                     borderRadius: 1,
                     mt: 0.5,
                     overflow: "auto",
                     maxHeight: 240,
                  }}
               >
                  {suggestions.map((recipe, idx) => (
                     <Box
                        key={recipe.id}
                        id={getOptionId(idx)}
                        role="option"
                        aria-selected={activeIndex === idx}
                        onClick={() => handleSelect(recipe)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        sx={{
                           p: 1,
                           cursor: "pointer",
                           backgroundColor:
                              activeIndex === idx ? "#f0f0f0" : "transparent",
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
                  "&:hover": { backgroundColor: "success.dark" },
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
                     "&:hover": { backgroundColor: "error.dark" },
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
