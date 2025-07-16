import { useState, useCallback } from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Link,
   Typography,
   Box,
   Container,
} from "@mui/material";

const Footer = () => {
   const [openModal, setOpenModal] = useState(null);

   const handleOpen = useCallback((modal) => {
      setOpenModal(modal);
   }, []);

   const handleClose = useCallback(() => {
      setOpenModal(null);
   }, []);

   const renderModal = (type) => {
      const isDisclaimer = type === "disclaimer";
      return (
         <Dialog
            open={openModal === type}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
         >
            <DialogTitle>
               {isDisclaimer ? "Disclaimer" : "FLi-Guide Privacy Policy"}
            </DialogTitle>
            <DialogContent dividers>
               {isDisclaimer ? (
                  <>
                     <Typography gutterBottom>
                        FLi-Guide is not affiliated, associated, authorized, or
                        endorsed by{" "}
                        <strong>
                           Fantasy Life i: The Girl Who Steals Time
                        </strong>
                        , LEVEL5, or any of its subsidiaries.
                     </Typography>
                     <Typography>
                        The name Fantasy Life, the Fantasy Life logo, and
                        related marks and images are registered trademarks of
                        their respective owners.
                     </Typography>
                  </>
               ) : (
                  <>
                     <Typography gutterBottom>
                        <strong>Effective Date:</strong> May 13, 2025
                     </Typography>
                     <Typography gutterBottom>
                        We do not collect or store any personal information.
                        However, this site uses cookies to remember your
                        preferences — such as settings for the interactive map
                        and other tools — to enhance your experience. These
                        cookies are not used for tracking and are never shared
                        with third parties.
                     </Typography>
                     <Typography>
                        For any questions, contact:{" "}
                        <strong>MittoaGaming@gmail.com</strong>
                     </Typography>
                  </>
               )}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Close</Button>
            </DialogActions>
         </Dialog>
      );
   };

   return (
      <Box
         component="footer"
         sx={{
            height: 70,
            py: 2,
            backgroundImage: 'url("/images/designs/winged_wooden_border.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            color: "#692d11",
         }}
      >
         <Container maxWidth="md">
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 3,
                  mt: 0.75,
                  flexWrap: "wrap",
               }}
            >
               <Typography variant="body2">
                  &copy; 2025 www.fli-guide.com
               </Typography>

               <Box
                  component="img"
                  src="/images/designs/icon_wing.svg"
                  alt="Wing Icon"
                  sx={{ height: 24, width: "auto", mx: 1 }}
               />

               <Box>
                  <Link
                     href="#"
                     variant="body2"
                     onClick={(e) => {
                        e.preventDefault();
                        handleOpen("disclaimer");
                     }}
                     sx={{
                        mr: 2,
                        color: "#692d11",
                        fontWeight: 500,
                        textDecoration: "none",
                     }}
                  >
                     Disclaimer
                  </Link>
                  <Link
                     href="#"
                     variant="body2"
                     onClick={(e) => {
                        e.preventDefault();
                        handleOpen("privacy");
                     }}
                     sx={{
                        color: "#692d11",
                        fontWeight: 500,
                        textDecoration: "none",
                     }}
                  >
                     Privacy Policy
                  </Link>
               </Box>
            </Box>
         </Container>

         {renderModal("disclaimer")}
         {renderModal("privacy")}
      </Box>
   );
};

export default Footer;