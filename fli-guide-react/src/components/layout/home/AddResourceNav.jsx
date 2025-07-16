import { useState } from "react";
import {
   Paper,
   Tabs,
   Tab,
   List,
   ListItem,
   ListItemText,
   Link
} from "@mui/material";

import { sidebarLinks } from "../../../data/navigationConfig";

const AddResourceNav = () => {
   const [activeTab, setActiveTab] = useState(0);

   const handleChange = (_, newValue) => setActiveTab(newValue);
   const currentLinks = sidebarLinks[activeTab]?.links || [];

   return (
      <Paper
         elevation={3}
         sx={{
            px: 2,
            pb: 1,
            backgroundColor: "#fff1b5",
            borderRadius: 2,
         }}
      >
         {/* Tabs Header */}
         <Tabs
            value={activeTab}
            onChange={handleChange}
            variant="standard"
            textColor="primary"
            indicatorColor="primary"
            centered
            sx={{ mb: 0.75 }}
         >
            {sidebarLinks.map(({ heading }, index) => (
               <Tab key={index} label={heading} />
            ))}
         </Tabs>

         {/* List of links */}
         <List dense disablePadding>
            {currentLinks.map(({ name, url }, index) => {
               const isExternal = /^https?:\/\//.test(url);
               return (
                  <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                     <Link
                        href={url}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        underline="hover"
                        color="inherit"
                     >
                        <ListItemText primary={name} />
                     </Link>
                  </ListItem>
               );
            })}
         </List>
      </Paper>
   );
};

export default AddResourceNav;