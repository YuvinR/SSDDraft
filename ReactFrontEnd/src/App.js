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
  Avatar,
  CardContent,
  Box
} from '@material-ui/core';
import { ImageUploadComponent } from "./Components/ImageUploader/ImageUploadComponent";
import { FileUploaderComponent } from "./Components/FidleUploader/FileUploaderComponent";
import { UserDetailsComponent } from "./Components/UserDetailsComponent/UserDetailsComponent";
import logo from './Images/aboutus.png';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-oauth';

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
    marginLeft: "13rem",
  }
}));


function App() {
  const classes = useStyles();
  const [UserDetails, setUserDetails] = useState(null)

  useEffect(() => {
    Logout()
  }, [])

  async function Logout() {
    setUserDetails(null);
    sessionStorage.clear();
    localStorage.clear();
  }

  const googleResponse = (response) => {
    console.log("tokenObj", response);

    setUserDetails(response.profileObj)
    sessionStorage.setItem("accessToken", response.tokenObj.access_token)
    sessionStorage.setItem("email", response.profileObj.email)
    sessionStorage.setItem("userName", response.profileObj.givenName)

    if (!response.tokenId) {
      console.error("Unable to get tokenId from Google", response)
      return;
    }
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
            UserDetails !== null ?
              <>
                <Avatar
                  alt={UserDetails.name}
                  src={UserDetails.imageUrl}
                />
                <Button onClick={() => Logout()} color="inherit">Logout</Button>
              </> : null
          }
        </Toolbar>
      </AppBar>
      {
        UserDetails !== null ?
          <div className={classes.mainDiv}>
            <Grid container md={12} xs={12} >
              <Grid item md={4} xs={12} spacing={2} >
                <UserDetailsComponent userDetails={UserDetails} />
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
                    Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.
                  </Typography> <br />
                  <div>
                    <br />
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="outlined" size="large" style={{ marginRight: '0.5rem' }} >Explore</Button>
                      <GoogleLogin
                        clientId="885024372915-qrhrciub8l3ev12ac6esqs7vfc88l8gr.apps.googleusercontent.com"
                        buttonText="Google Login"
                        scope="https://www.googleapis.com/auth/drive"
                        onSuccess={googleResponse}
                        onFailure={googleResponse}
                      />
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
