import { Box, Typography, Paper } from "@mui/material";
import wingLeft from "../../assets/images/decorations/icon_wing_l.png";
import wingRight from "../../assets/images/decorations/icon_wing_r.png";

const WingWrapper = ({ children, className, id }) => {
   return (
      <Paper
         className={className}
         id={id}
         elevation={3}
         sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
            px: 2.5,
            py: 2.5,
            borderRadius: 2,
            backgroundColor: "#fff1b5"
         }}
      >
         <Box
            component="img"
            src={wingLeft}
            alt="Left wing Design"
            sx={{ height: 60 }}
         />

         <Typography
            component="h1"
            sx={{
               fontSize: 40,
               textAlign: "center",
               mx: 2,
               flexGrow: 1,
            }}
         >
            {children}
         </Typography>

         <Box
            component="img"
            src={wingRight}
            alt="Right wing Design"
            sx={{ height: 60 }}
         />
      </Paper>
   );
};

export default WingWrapper;
