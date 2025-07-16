import { useState } from "react";
import { AppBar, Toolbar, Button, Menu, MenuItem, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { navbarURLs } from "../../data/navigationConfig";

const NavBar = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openMenuId, setOpenMenuId] = useState(null);
   const location = useLocation();

   const handleMenuOpen = (event, id) => {
      setAnchorEl(event.currentTarget);
      setOpenMenuId(id);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      setOpenMenuId(null);
   };

   const isActive = (url) => location.pathname === url;

   const baseButtonStyles = (active = false) => ({
      textTransform: "none",
      color: "#692d11",
      borderBottom: active ? "2px solid #692d11" : "none",
      "&:hover": {
         backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
   });

   return (
      <AppBar
         position="static"
         elevation={0}
         sx={{
            height: 70,
            pt: 0.5,
            backgroundImage: 'url("/images/designs/winged_wooden_border.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundColor: "transparent",
            boxShadow: 3,
            borderRadius: 4,
         }}
      >
         <Toolbar
            sx={{
               display: "flex",
               justifyContent: "space-evenly",
               gap: 2.5,
            }}
         >
            {navbarURLs.map((linkItem, index) => {
               const isMenuOpen = openMenuId === index;

               if (linkItem.type === "item") {
                  return (
                     <Button
                        key={index}
                        component={Link}
                        to={linkItem.url}
                        sx={baseButtonStyles(isActive(linkItem.url))}
                     >
                        {linkItem.title}
                     </Button>
                  );
               }

               if (linkItem.type === "dropdown") {
                  return (
                     <Box key={index}>
                        <Button
                           onClick={(e) => handleMenuOpen(e, index)}
                           aria-controls={
                              isMenuOpen ? `menu-${index}` : undefined
                           }
                           aria-haspopup="true"
                           aria-expanded={isMenuOpen ? "true" : undefined}
                           sx={baseButtonStyles()}
                        >
                           {linkItem.title}
                        </Button>

                        <Menu
                           id={`menu-${index}`}
                           anchorEl={anchorEl}
                           open={isMenuOpen}
                           onClose={handleMenuClose}
                           slotProps={{
                              paper: {
                                 sx: {
                                    backgroundImage:
                                       'url("/images/designs/bg_wood.jpg")',
                                    backgroundSize: "cover",
                                    borderRadius: 2,
                                 },
                              },
                              menuList: {
                                 onMouseLeave: handleMenuClose,
                              },
                           }}
                        >
                           {linkItem.dropdownLinks.map(
                              (dropdownLink, subIndex) => (
                                 <MenuItem
                                    key={subIndex}
                                    component={Link}
                                    to={dropdownLink.url}
                                    onClick={handleMenuClose}
                                    sx={{
                                       color: "text.primary",
                                       "&:hover": {
                                          backgroundColor:
                                             "rgba(255, 255, 255, 0.2)",
                                       },
                                    }}
                                 >
                                    {dropdownLink.name}
                                 </MenuItem>
                              )
                           )}
                        </Menu>
                     </Box>
                  );
               }

               return null;
            })}
         </Toolbar>
      </AppBar>
   );
};

export default NavBar;