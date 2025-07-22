import { useRef, useMemo } from "react";
import { Typography, Paper, Box, Chip, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { siteAnnouncements } from "../../../data/siteAnnouncements";
import { useScrollIndicator } from "../../../shared-logic/scrollIndicator"; 

const typeColors = {
   maintenance: "#ffcccb",
   project: "#d4f1c5",
   general: "#fbd688",
};

const Announcements = () => {
   const containerRef = useRef(null);
   const showArrow = useScrollIndicator(containerRef);

   const formattedAnnouncements = useMemo(() => {
      return [...siteAnnouncements].reverse().map((announcement) => ({
         ...announcement,
         formattedDate: new Date(
            `${announcement.date}T00:00:00Z`
         ).toLocaleDateString("en-US", {
            timeZone: "UTC",
         }),
      }));
   }, []); 

   return (
      <Box sx={{ position: "relative", borderRadius: 2 }}>
         <Box
            ref={containerRef}
            sx={{
               maxHeight: 500,
               overflowY: "auto",
               scrollbarWidth: "none",
               "&::-webkit-scrollbar": { display: "none" },
               borderRadius: 2,
               backgroundColor: "#fff1b5",
               p: 2,
               boxShadow: 3,
            }}
         >
            {formattedAnnouncements.map((announcement, idx, arr) => {
               const isLast = idx === arr.length - 1;
               const { id, title, message, type, formattedDate } = announcement;

               return (
                  <Paper
                     key={id}
                     elevation={3}
                     sx={{
                        p: 2,
                        mb: isLast ? 0 : 2,
                        backgroundColor: typeColors[type] || "#fff",
                     }}
                  >
                     <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                     >
                        <Typography variant="h6">{title}</Typography>
                        <Chip
                           label={type[0].toUpperCase() + type.slice(1)}
                           size="small"
                           sx={{
                              backgroundColor: typeColors[type],
                              fontWeight: 500,
                              pointerEvents: "none",
                              cursor: "default",
                           }}
                        />
                     </Stack>

                     <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                     >
                        {formattedDate}
                     </Typography>

                     <Typography variant="body2">{message}</Typography>
                  </Paper>
               );
            })}
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

export default Announcements;
