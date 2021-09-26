import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Grid,
  Card,
  CardContent,
  Box
} from '@material-ui/core';
import { ImageUploadComponent } from "./Components/ImageUploader/ImageUploadComponent";
import { FileUploaderComponent } from "./Components/FidleUploader/FileUploaderComponent";
import { UserDetailsComponent } from "./Components/UserDetailsComponent/UserDetailsComponent";
import logo from './Images/aboutus.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainDiv: {
    border: '0px red solid',
    marginTop: '2rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  },
  userCard: {
    marginTop: '5rem',
    marginLeft: '10rem',
    marginRight: '10rem',
    marginBottom: '2rem'
  },
  imageUploadCard: {
    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.33)",
    marginLeft: '10rem',
    marginRight: '1rem'
  },
  fileUploadCard: {
    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.33)",
    marginRight: '10rem',
    marginLeft: '1rem'
  },
  cardShadow: {
    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.33)"
  },
  welcomeCard: {
    height: "20rem",
    width: "20rem",
    marginTop: "10rem",
    margin: "0 auto",
  }

}));


function App() {
  const classes = useStyles();
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, getIdTokenClaims, logout } = useAuth0();

  async function Login() {
    loginWithRedirect();
    console.log("isAuthenticated", isAuthenticated);
  }

  async function Logout() {
    logout()
  }

  async function Check() {
    console.log("isAuthenticated", isAuthenticated);

    const domain = "dev-upkur7si.us.auth0.com";
    const accessToken = await getAccessTokenSilently();
    //  const accessToken = await getAccessTokenSilently({
    //   audience: `http://localhost:5020`,
    //   scope: "read:current_user",
    // });
    console.log("accessToken", accessToken);
    console.log("getIdTokenClaims", await (await getIdTokenClaims()).__raw);
    console.log("user ", user)
  }


  const callSecureApi = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch(
      `http://localhost:5020/WeatherForecast/GetStringTest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json',
          Accept: 'application/json'
        },
      }
    );

    const responseData = await response.json();
    console.log("data", responseData)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Creatives
          </Typography>
          {
            isAuthenticated ?
              <>
                <Button onClick={() => Logout()} color="inherit">Logout</Button>
                <Button onClick={() => Check()} color="inherit">Check</Button>
                <Button onClick={callSecureApi} color="inherit">Call API</Button>
              </> : null
          }
        </Toolbar>
      </AppBar>
      {
        isAuthenticated ?
          <div className={classes.mainDiv}>
            <Grid container md={12} xs={12} >
              <Grid item md={4} xs={12} spacing={2} >
                <UserDetailsComponent userDetails={user} />
              </Grid>
              <Grid item md={8} xs={12} >
                <Grid container md={12} xs={12} >
                  <Grid item md={12} xs={12} >
                    <ImageUploadComponent test={12} />
                  </Grid>
                </Grid>
                <Grid container md={12} xs={12} >
                  <Grid item md={12} xs={12} >
                    <FileUploaderComponent test={123} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div> :
          <div>
            <Grid container md={12} xs={12} >
              <Grid item md={4} xs={12} spacing={2} >
                <div className={classes.welcomeCard}>
                  <Typography variant="h4">
                    We Are Creatives.....
                  </Typography> <br />
                  <Typography variant="caption">
                    Explore more in your life, moreover good feelings....
                  </Typography> <br />
                  <div>
                    <br />
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="outlined" size="large" style={{ marginRight: '0.5rem' }} >Explore</Button>
                      <Button variant="contained" color="primary" size="large" onClick={() => Login()}>LOGIN</Button>
                    </Box>
                  </div>
                </div>
              </Grid>
              <Grid item md={8} xs={12} spacing={2} >
                <img src={logo} alt="Logo" width={"60%"} height={"80%"} style={{ marginTop: '4rem', marginRight: '15rem', float: "right" }} />
              </Grid>
            </Grid>
          </div>
      }
    </div>
  );
}

export default App;
