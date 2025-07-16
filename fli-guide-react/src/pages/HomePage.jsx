import BaseLayout from "../components/layout/templates/BaseLayout";

import AddResourceNav from "../components/layout/home/AddResourceNav";
import SteamFeed from "../components/layout/home/SteamFeed";
import Announcements from "../components/layout/home/Announcements";
import PlannedProjects from "../components/layout/home/PlannedProjects";

import WingWrapper from "../components/ui/WingWrapper";
import SectionHeader from "../components/ui/SectionHeader";

import { Typography, Grid, Container, Paper } from "@mui/material";

import headerImage from "../assets/images/banners/logo_banner.jpg";

const Home = () => {
   return (
      <BaseLayout headerImage={headerImage}>
         <Container sx={{ my: 2.5 }}>
            <Grid container spacing={3}>
               {/* Intro Section */}
               <Grid size={12}>
                  <WingWrapper>Welcome to FLi-Guide!</WingWrapper>

                  <Paper
                     elevation={3}
                     sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#fff1b5",
                     }}
                  >
                     <Typography gutterBottom>
                        I’m so glad you’re here, and I hope this online resource
                        helps you get the most out of your adventure. Curious
                        about how the site is being developed, what’s coming
                        next, or interested in contributing?
                     </Typography>
                     <Typography>
                        I’d love to hear your feedback and ideas! Whether you’d
                        like to help by writing guides, submitting item data,
                        testing features, or just sharing suggestions — every
                        bit helps. Feel free to join the community on Discord —
                        just follow the link in the Dev Corner section below.
                     </Typography>
                  </Paper>
               </Grid>

               {/* Steam + Resources Section */}
               <Grid size={12}>
                  <SectionHeader>
                     Additional Content & LEVEL5 Steam Posts
                  </SectionHeader>
                  <Grid container spacing={2}>
                     <Grid size={{ xs: 12, md: 6 }}>
                        <AddResourceNav />
                     </Grid>
                     <Grid size={{ xs: 12, md: 6 }}>
                        <SteamFeed />
                     </Grid>
                  </Grid>
               </Grid>

               {/* Announcements + Projects Section */}
               <Grid size={12}>
                  <SectionHeader>Announcements & Developments</SectionHeader>
                  <Grid container spacing={2}>
                     <Grid size={{ xs: 12, md: 6 }}>
                        <Announcements />
                     </Grid>
                     <Grid size={{ xs: 12, md: 6 }}>
                        <PlannedProjects />
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Container>
      </BaseLayout>
   );
};

export default Home;