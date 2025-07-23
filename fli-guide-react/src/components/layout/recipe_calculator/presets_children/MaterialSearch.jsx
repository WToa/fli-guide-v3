import { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import api from "../../../../api/axios";

const MaterialSearch = ({ onMaterialSelect }) => {
   const [materialQuery, setMaterialQuery] = useState("");
   const [materialSuggestions, setMaterialSuggestions] = useState([]);
   const [materialSelected, setMaterialSelected] = useState(false);

   useEffect(() => {
      if (materialSelected) return;

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
      onMaterialSelect(material);
      setMaterialQuery(material.name);
      setMaterialSelected(true);
      setMaterialSuggestions([]);
   };

   return (
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
         <Box position="relative" sx={{ backgroundColor: "white", borderRadius: 2 }}>
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
   );
};

export default MaterialSearch;