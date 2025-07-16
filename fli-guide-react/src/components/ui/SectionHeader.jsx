import { Box, Typography } from "@mui/material";
import headerLine from "../../assets/images/decorations/header_line.png";

const SectionHeader = ({ children }) => (
   <Box textAlign="center" mb={1.5}>
      <Typography
         variant="h5"
         fontWeight="bold"
         sx={{
            mb: "-20px",
            zIndex: 1,
            position: "relative",
         }}
      >
         {children}
      </Typography>
      <Box
         component="img"
         src={headerLine}
         alt="Decorative underline"
         sx={{
            width: "100%",
            objectFit: "contain",
            mx: "auto",
         }}
      />
   </Box>
);

export default SectionHeader;
