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
                        I'm so glad you're here, and I hope this online resource
                        helps you get the most out of your adventure through the
                        world of Fantasy Life. My goal is for FLi-Guide to
                        become the one-stop shop for everything related to
                        Fantasy Life i: The Girl Who Steals Time.
                     </Typography>
                     <Typography gutterBottom>
                        We’ve got a growing community of players, fans, and site
                        contributors on Discord —whether you're looking to share
                        tips, ask questions, or just chat about the game, you’re
                        more than welcome to join us using the link below in Dev
                        Corner. Feedback and ideas are always appreciated, and
                        it's a great place to connect with others who love the
                        game as much as you do.
                     </Typography>
                     <Typography>
                        Also, if you're curious about how the site is built or
                        interested in contributing directly, the GitHub
                        repository is linked in the Dev Corner tab. Feel free to
                        take a look or get involved!
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
