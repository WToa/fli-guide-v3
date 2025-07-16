import { useEffect, useState } from "react";
import { Typography, Paper, Box, CircularProgress, Link } from "@mui/material";

const SteamFeed = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetch("/api/steam-feed")
         .then((res) => res.json())
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
      <Box>
         {items.map((item, index) => (
            <Paper
               key={index}
               elevation={3}
               sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: "#fff1b5",
                  borderRadius: 2,
               }}
            >
               <Typography variant="h6">{item.title}</Typography>
               <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(item.pubDate).toLocaleDateString()}
               </Typography>
               <Typography
                  variant="body1"
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
   );
};

export default SteamFeed;