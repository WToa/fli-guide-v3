import { useRef, useState, useMemo } from "react";
import { Box, Tabs, Tab, Typography, Paper, Chip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { plannedProjects } from "../../../data/plannedProjectsData";
import { useScrollIndicator } from "../../../shared-logic/scrollIndicator";

const statuses = ["In Development", "Planned", "Completed"];

export const PlannedProjects = () => {
   const [tabIndex, setTabIndex] = useState(0);
   const containerRef = useRef(null);
   const showArrow = useScrollIndicator(containerRef, tabIndex); 

   const filteredProjects = useMemo(() => {
      const currentStatus = statuses[tabIndex];
      return plannedProjects.filter(
         (project) => project.status === currentStatus
      );
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
            <Tabs
               value={tabIndex}
               onChange={(_, newIndex) => setTabIndex(newIndex)}
               centered
            >
               {statuses.map((s) => (
                  <Tab key={s} label={s} />
               ))}
            </Tabs>

            <Box sx={{ p: 2, "& > :not(:last-child)": { mb: 2 } }}>
               {" "}
               {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                     <Paper
                        key={project.title}
                        elevation={3}
                        sx={{ p: 2, backgroundColor: "#fbd688" }}
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

         {showArrow && <KeyboardArrowDownIcon sx={arrowStyles} />}
      </Box>
   );
};

const arrowStyles = {
   fontSize: 40,
   position: "absolute",
   bottom: 8,
   left: "50%",
   color: "text.secondary",
   opacity: 0.5,
   pointerEvents: "none",
   animation: "bounce 1.5s infinite",
   "@keyframes bounce": {
      "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
      "50%": { transform: "translateX(-50%) translateY(6px)" },
   },
};

export default PlannedProjects;
