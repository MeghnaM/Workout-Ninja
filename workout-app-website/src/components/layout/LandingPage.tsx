import * as React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Stack,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Card,
  CardContent,
  Link,
  CssBaseline,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dashboard from "../../assets/workout-ninja-dashboard.png";
import { useNavigate } from "react-router-dom";
import { colors } from "../styles/colors";

/** ---- Config ---- */
const ICON_SRC = "/favicon.ico"; // swap with your icon path; wrapped in pink badge style below
// replace with your MP4 or YouTube/Vimeo embed below
const GITHUB_URL = "https://github.com/MeghnaM/Workout-Ninja";
const WEBSITE_URL = "https://meghnamalhotra.com/";

/** ---- Theme: headings pink, buttons orange ---- */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: colors["pink-vivid-500"] }, // headings
    secondary: { main: colors["orange-vivid-500"] }, // buttons
    background: { default: colors["warm-grey-050"], paper: "#fff" },
    text: {
      primary: colors["warm-grey-900"],
      secondary: colors["warm-grey-600"],
    },
    divider: colors["warm-grey-200"],
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
    h1: { fontWeight: 900, letterSpacing: "-0.03em" },
    h2: { fontWeight: 900, letterSpacing: "-0.02em" },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
  },
  components: {
    MuiButton: {
      defaultProps: { color: "secondary" }, // all buttons orange by default
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700, borderRadius: 12 },
        containedSecondary: {
          backgroundColor: colors["orange-vivid-500"],
          "&:hover": { backgroundColor: colors["orange-vivid-600"] },
        },
        outlinedSecondary: {
          borderColor: colors["orange-vivid-300"],
          color: colors["orange-vivid-700"],
          "&:hover": {
            borderColor: colors["orange-vivid-500"],
            backgroundColor: colors["orange-vivid-050"],
          },
        },
      },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
  },
});

export default function WorkoutNinjaLanding() {
  const [demoOpen, setDemoOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <TopBar onOpenDemo={() => setDemoOpen(true)} />
        <Hero onOpenDemo={() => setDemoOpen(true)} />
        <Benefits />
        {/* <Previews /> */}
        <Contact />
        <CTA />
        <Footer />
      </Box>

      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </ThemeProvider>
  );
}

/** ====== NAVBAR ====== */
function TopBar({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          {/* Pink badge around icon */}
          <Box
            sx={{
              width: 30,
              height: 30,
              p: 0.5,
              borderRadius: 1.25,
              bgcolor: colors["pink-vivid-100"],
              border: `1px solid ${colors["pink-vivid-300"]}`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              component="img"
              src={ICON_SRC}
              alt="Workout Ninja"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 0.75,
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={800}
            sx={{ color: "primary.main" }}
          >
            Workout Ninja
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
        >
          <Link href="#benefits" underline="none" color="text.secondary">
            Features
          </Link>
          {/* <Link href="#previews" underline="none" color="text.secondary">Previews</Link> */}
          {/* <Link href="#contact" underline="none" color="text.secondary">
            Contact
          </Link> */}
          {/* <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            underline="none"
            color="text.secondary"
            sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
          >
            <GitHubIcon fontSize="small" /> GitHub
          </Link> */}
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Button
            variant="outlined"
            onClick={onOpenDemo}
            startIcon={<PlayArrowRoundedIcon />}
          >
            Watch demo
          </Button>
          <Button variant="contained" href="/login">
            Log in
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

/** ====== HERO ====== */
function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 10 },
      }}
    >
      {/* soft pink glow + orange orb */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `radial-gradient(60% 40% at 50% 0%, ${colors["pink-vivid-050"]}, transparent 60%)`,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: 560,
            height: 560,
            right: "8%",
            top: -80,
            filter: "blur(70px)",
            opacity: 0.35,
            borderRadius: "50%",
            background: colors["orange-vivid-100"],
          },
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography
                variant="h1"
                sx={{ lineHeight: 1.05, color: "primary.main" }}
              >
                Serious training.
                <br />
                Simple tracking.
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Workout Ninja lets you define your own <b>exercises</b>,
                assemble <b>workouts</b> from them, and <b>log</b> every set -
                weight x reps.
                <br />
                Then choose your exercises and time window to visualize
                <b> progressive overload </b> and watch your lifts trend up!
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button size="large" variant="contained" href="/login">
                  Log in
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={onOpenDemo}
                  startIcon={<PlayArrowRoundedIcon />}
                >
                  Watch demo
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 3 }}>
              {/* Replace with your screenshot */}
              <Box
                component="img"
                src={dashboard}
                alt="Workout Ninja app screenshot"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: (t) => `1px solid ${t.palette.divider}`,
                  display: "block",
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/** ====== FEATURES ====== */
function Benefits() {
  const items = [
    {
      title: "Custom Exercises",
      desc: "Add the movements you actually do. Your library, your language.",
    },
    {
      title: "Workout Builder",
      desc: "Mix and match your exercises into full workouts in seconds.",
    },
    {
      title: "Progressive Overload",
      desc: "One chart, multiple exercises, zero noise. Progress you can act on.",
    },
    {
      title: "No Fluff, Just Tracking",
      desc: "Plan, log, review. The shortest path from training to insight.",
    },
  ];
  return (
    <Box id="benefits" sx={{ scrollMarginTop: 96, py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="overline" color="text.secondary">
            What you get
          </Typography>
          <Typography variant="h3" sx={{ color: "primary.main" }}>
            Everything you need to train with confidence
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {items.map((f) => (
            <Grid key={f.title} item xs={12} sm={6} md={3}>
              <Card
                variant="outlined"
                sx={{ height: "100%", borderColor: colors["warm-grey-200"] }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      border: (t) => `1px solid ${t.palette.divider}`,
                      display: "grid",
                      placeItems: "center",
                      mb: 1,
                      bgcolor: colors["orange-vivid-050"],
                      color: colors["orange-vivid-700"],
                    }}
                  >
                    <CheckRoundedIcon />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ color: "primary.main" }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1.5 }}
                  >
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/** ====== PREVIEWS (commented out) ====== */
// function Previews() {
//   return (
//     <Box id="previews" sx={{ py: { xs: 8, md: 10 } }}>
//       <Container maxWidth="lg">
//         <Stack spacing={1} sx={{ mb: 4 }}>
//           <Typography variant="overline" color="text.secondary">App previews</Typography>
//           <Typography variant="h4" sx={{ color: 'primary.main' }}>Build, train, track</Typography>
//         </Stack>
//         <Grid container spacing={2}>
//           {Array.from({ length: 9 }).map((_, i) => (
//             <Grid key={i} item xs={12} sm={6} md={4}>
//               <Paper variant="outlined" sx={{ p: 0.75, borderRadius: 3, borderColor: colors["warm-grey-200"] }}>
//                 <Box sx={{ aspectRatio: { xs: "4/3", sm: "16/10" }, border: `1px solid ${colors["warm-grey-200"]}`, borderRadius: 2, display: "grid", placeItems: "center", color: "text.secondary" }}>
//                   Screenshot {i + 1}
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

/** ====== CONTACT ====== */
function Contact() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:m_malhotra@pm.me?subject=Workout Ninja — Contact&body=${encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nWebsite: ${WEBSITE_URL}\n\n${values.message}`
    )}`;
  };

  return (
    <Box
      id="contact"
      sx={{ py: { xs: 8, md: 10 }, bgcolor: colors["warm-grey-100"] }}
    >
      <Container maxWidth="md">
        <Stack spacing={1} sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="overline" color="text.secondary">
            Contact
          </Typography>
          <Typography variant="h3" sx={{ color: "primary.main" }}>
            Say hello 👋
          </Typography>
          <Typography color="text.secondary">
            Questions or feedback? Use the form or visit{" "}
            <Link href={WEBSITE_URL} target="_blank" rel="noreferrer">
              meghnamalhotra.com
            </Link>
            .
          </Typography>
        </Stack>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Name"
                value={values.name}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message"
                value={values.message}
                onChange={onChange}
                fullWidth
                multiline
                minRows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  href={GITHUB_URL}
                  startIcon={<GitHubIcon />}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </Button>
                <Button variant="contained" type="submit">
                  Send message
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

/** ====== CTA (pink+orange gradient) ====== */
function CTA() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${colors["pink-vivid-500"]}11, ${colors["orange-vivid-500"]}11)`,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md>
              <Typography variant="h4" sx={{ color: "primary.main" }}>
                Ready to train?
              </Typography>
              <Typography color="text.secondary">
                Log your first workout today. It only takes a minute.
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto">
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button variant="contained" size="large" href="/login">
                  Log in
                </Button>
                {/* <Button
                  variant="outlined"
                  size="large"
                  href={GITHUB_URL}
                  startIcon={<GitHubIcon />}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button> */}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

/** ====== FOOTER ====== */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: (t) => `1px solid ${t.palette.divider}`,
        py: 4,
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            {/* Pink badge icon in footer too */}
            <Box
              sx={{
                width: 22,
                height: 22,
                p: 0.5,
                borderRadius: 1,
                bgcolor: colors["pink-vivid-100"],
                border: `1px solid ${colors["pink-vivid-300"]}`,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                component="img"
                src={ICON_SRC}
                alt="Workout Ninja"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 0.75,
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Workout Ninja
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              underline="hover"
              color="text.secondary"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
            >
              <GitHubIcon fontSize="small" /> GitHub
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link href="#contact" color="text.secondary" underline="hover">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

/** ====== DEMO DIALOG ====== */
function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        aria-label="Close demo"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      >
        <CloseRoundedIcon />
      </IconButton>
      <DialogContent sx={{ p: 0 }}>
        {/* Responsive 16:9 video */}
        <Box sx={{ position: "relative", width: "100%", pt: "56.25%" }}>
          <Box
            component="video"
            // src={DEMO_VIDEO_URL}
            controls
            playsInline
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: 1,
            }}
          />
          {/**
           * Prefer YouTube/Vimeo? Replace the <video> above with:
           * <Box component="iframe" src="https://www.youtube.com/embed/XXXXXXXX?rel=0" allow="autoplay; encrypted-media"
           *  sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, borderRadius: 1 }} />
           */}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
