import { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import RecipeRow from "./RecipeRow";
import api from "../../../api/axios";

const generateEmptyRow = () => ({
   key: crypto.randomUUID(),
   id: "",
   name: "",
   quantity: 1,
});

const RecipeForm = ({ setResults, presetRows }) => {
   const [rows, setRows] = useState([generateEmptyRow()]);

   useEffect(() => {
      if (presetRows && presetRows.length > 0) {
         setRows(presetRows);
      } else {
         setRows([generateEmptyRow()]);
      }
   }, [presetRows]);

   const addRow = (afterIndex) => {
      const newRow = generateEmptyRow();
      const updated = [...rows];
      updated.splice(afterIndex + 1, 0, newRow);
      setRows(updated);
   };

   const removeRow = (indexToRemove) => {
      const updated = rows.filter((_, i) => i !== indexToRemove);
      setRows(updated.length ? updated : [generateEmptyRow()]);
   };

   const updateRow = (index, updatedValues) => {
      const updated = [...rows];
      updated[index] = { ...updated[index], ...updatedValues };
      setRows(updated);
   };

   useEffect(() => {
      const fetchBreakdownsForEachRecipe = async () => {
         const validRows = rows.filter((row) => row.id);

         if (validRows.length === 0) {
            setResults({
               craftedMaterials: new Map(),
               baseMaterials: new Map(),
            });
            return;
         }

         const combined = {
            craftedMaterials: new Map(),
            baseMaterials: new Map(),
         };

         for (const row of validRows) {
            try {
               const res = await api.get(`/recipe-breakdown/${row.id}`);
               const data = res.data;
               const quantity = row.quantity || 1;

               for (const mat of data.craftedMaterials || []) {
                  const existing = combined.craftedMaterials.get(mat.name);
                  const totalAmt = mat.amount * quantity;
                  if (existing) {
                     existing.amount += totalAmt;
                  } else {
                     combined.craftedMaterials.set(mat.name, {
                        amount: totalAmt,
                        sources: mat.sources,
                     });
                  }
               }

               for (const mat of data.baseMaterials || []) {
                  const existing = combined.baseMaterials.get(mat.name);
                  const totalAmt = mat.amount * quantity;
                  if (existing) {
                     existing.amount += totalAmt;
                  } else {
                     combined.baseMaterials.set(mat.name, {
                        amount: totalAmt,
                        sources: mat.sources,
                     });
                  }
               }
            } catch (err) {
               console.error(
                  `Failed to fetch breakdown for recipe ${row.id}:`,
                  err
               );
            }
         }
         setResults(combined);
      };

      fetchBreakdownsForEachRecipe();
   }, [rows, setResults]);

   return (
      <Box>
         {rows.map((row, idx) => (
            <Paper
               key={row.key}
               elevation={3}
               sx={{
                  p: 1.5,
                  mb: 2.5,
                  borderRadius: 2,
                  backgroundColor: "#fff1b5",
               }}
            >
               <RecipeRow
                  index={idx}
                  row={row}
                  updateRow={updateRow}
                  onAddRow={() => addRow(idx)}
                  onRemoveRow={() => removeRow(idx)}
                  showRemove={rows.length > 1}
               />
            </Paper>
         ))}
      </Box>
   );
};

export default RecipeForm;
