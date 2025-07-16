import { useRef, useEffect, useState } from "react";
import {
   Box,
   Tabs,
   Tab,
   Typography,
   Paper,
   Chip
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { plannedProjects } from "../../../data/plannedProjectsData";

const statuses = ["In Development", "Planned", "Completed"];

const PlannedProjects = () => {
   const [tabIndex, setTabIndex] = useState(0);
   const [showArrow, setShowArrow] = useState(false);
   const containerRef = useRef(null);

   const status = statuses[tabIndex];
   const filteredProjects = plannedProjects.filter(
      (project) => project.status === status
   );

   const handleTabChange = (_, newIndex) => {
      setTabIndex(newIndex);
   };

   useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const checkScroll = () => {
         const shouldShow =
            el.scrollHeight > el.clientHeight &&
            el.scrollTop + el.clientHeight < el.scrollHeight - 1;
         setShowArrow(shouldShow);
      };

      checkScroll();
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
         el.removeEventListener("scroll", checkScroll);
         window.removeEventListener("resize", checkScroll);
      };
   }, [tabIndex]);

   return (
      <Box
         sx={{
            backgroundColor: "#fff1b5",
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
         }}
      >
         <Box
            ref={containerRef}
            sx={{
               maxHeight: 500,
               overflowY: "auto",
               scrollbarWidth: "none",
               "&::-webkit-scrollbar": { display: "none" },
            }}
         >
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
               {statuses.map((status) => (
                  <Tab key={status} label={status} />
               ))}
            </Tabs>

            <Box sx={{ p: 2 }}>
               {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                     <Paper
                        key={project.title}
                        elevation={3}
                        sx={{
                           p: 2,
                           mb: index !== filteredProjects.length - 1 ? 2 : 0,
                           backgroundColor: "#fbd688",
                        }}
                     >
                        <Box
                           display="flex"
                           justifyContent="space-between"
                           alignItems="center"
                        >
                           <Typography variant="h6">{project.title}</Typography>
                           <Chip
                              label={project.updateSize}
                              size="small"
                              sx={{
                                 backgroundColor:
                                    project.updateSize === "Major Update"
                                       ? "#4caf50"
                                       : "#2196f3",
                                 color: "#fff",
                                 fontWeight: 500,
                                 pointerEvents: "none",
                                 cursor: "default",
                              }}
                           />
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                           {project.description}
                        </Typography>
                     </Paper>
                  ))
               ) : (
                  <Typography variant="body2" color="text.secondary">
                     No projects currently listed.
                  </Typography>
               )}
            </Box>
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

export default PlannedProjects;
