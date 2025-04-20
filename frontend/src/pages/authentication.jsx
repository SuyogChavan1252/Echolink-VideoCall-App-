import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
        if (formState === 0) {
            await handleLogin(username, password);
        } else {
            let result = await handleRegister(name, username, password);
            setMessage(result);
            setOpen(true);
            setError("");  
            setFormState(0);
        }
    } catch (err) {
        setError(err.message);  // Display error message in UI
    }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container columns={12} sx={{ height: "100vh" }}>
        <CssBaseline />

        {/* Background Image Grid */}
        {/* Background Image Grid */}
<Grid
  item
  xs={12}
  md={6}
  sx={{
    height: "100vh",
    width:"1000px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>
  <img
    src="zoom.jpg"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
    alt="Background"
  />
</Grid>


        {/* Form Section */}
        <Grid
          md={5} 
          component={Paper}
          elevation={6}
          square
          sx={{
            gridColumn: { xs: "12", md: "5" }, // Updated for MUI Grid v2
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
 <Box
  sx={{
    my: 8,
    mx: 4,
    width: "100%",
    maxWidth: "450px",  // Fixed width
    minHeight: "420px", // Prevents height fluctuations
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>



            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button
                variant={formState === 0 ? "contained" : "text"}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : "text"}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </div>

            {/* Form Fields */}
            <Box component="form" noValidate sx={{ mt: 1, minWidth: "100%" }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />

              <Typography sx={{ color: "red" }}>{error}</Typography>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} message={message} onClose={() => setOpen(false)} />
    </ThemeProvider>
  );
}
