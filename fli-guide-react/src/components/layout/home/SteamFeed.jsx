import { useEffect, useState, useRef } from "react";
import { Typography, Paper, Box, CircularProgress, Link } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useScrollIndicator } from "../../../shared-logic/scrollIndicator"; // Adjust path to your hook

const SteamFeed = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const containerRef = useRef(null);
   const showArrow = useScrollIndicator(containerRef, [items]); // Use the hook

   useEffect(() => {
      fetch("/api/steam-feed")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok");
            }
            return res.json();
         })
         .then((data) => {
            setItems(data.items || []);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Failed to load Steam feed:", err);
            setError("Failed to load news.");
            setLoading(false);
         });
   }, []);

   if (loading) {
      return (
         <Box display="flex" justifyContent="center" aria-busy="true">
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return (
         <Typography variant="body2" color="error">
            {error}
         </Typography>
      );
   }

   if (items.length === 0) {
      return (
         <Typography variant="body2" color="text.secondary">
            No news found.
         </Typography>
      );
   }

   return (
      <Box sx={{ position: "relative", borderRadius: 2 }}>
         <Box
            ref={containerRef}
            sx={{
               maxHeight: 206,
               overflowY: "auto",
               scrollbarWidth: "none",
               "&::-webkit-scrollbar": { display: "none" },
               borderRadius: 2,
               backgroundColor: "#fff1b5",
               p: 2,
               boxShadow: 3,
            }}
         >
            {items.map((item) => (
               <Paper
                  key={item.guid || item.link}
                  elevation={3}
                  sx={{
                     p: 2,
                     mb: 2,
                     backgroundColor: "#fbd688",
                     borderRadius: 2,
                  }}
               >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                     {new Date(item.pubDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                     variant="body2"
                     dangerouslySetInnerHTML={{
                        __html: item.contentSnippet || item.content,
                     }}
                  />
                  <Box mt={1}>
                     <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="primary"
                     >
                        Read more
                     </Link>
                  </Box>
               </Paper>
            ))}
         </Box>

         {showArrow && (
            <KeyboardArrowDownIcon
               sx={{
                  fontSize: 40,
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "text.secondary",
                  opacity: 0.5,
                  pointerEvents: "none",
                  animation: "bounce 1.5s infinite",
                  "@keyframes bounce": {
                     "0%, 100%": {
                        transform: "translateX(-50%) translateY(0)",
                     },
                     "50%": {
                        transform: "translateX(-50%) translateY(6px)",
                     },
                  },
               }}
            />
         )}
      </Box>
   );
};

export default SteamFeed;