export const toggleStyles = {
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

export const tabPanelBoxStyles = {
   backgroundColor: "#fbd688",
   borderRadius: 2,
   p: 2,
   mb: 2,
   boxShadow: 3,
   textAlign: "center",
   border: "1px solid #e0c177",
};