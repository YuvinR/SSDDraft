import React, { useEffect, useState } from "react";
import logo from './logo.svg';
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
  CardContent
} from '@material-ui/core';
import { ImageUploadComponent } from "./Components/ImageUploader/ImageUploadComponent";
import { FileUploaderComponent } from "./Components/FidleUploader/FileUploaderComponent";
import { UserDetailsComponent } from "./Components/UserDetailsComponent/UserDetailsComponent";

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
            News
          </Typography>
          {
            isAuthenticated ?
              <Button onClick={() => Logout()} color="inherit">Logout</Button> :
              <Button onClick={() => Login()} color="inherit">Login</Button>
          }
          <Button onClick={() => Check()} color="inherit">Check</Button>
          <Button onClick={callSecureApi} color="inherit">Call API</Button>
        </Toolbar>
      </AppBar>

      <div className={classes.mainDiv}>
        <Grid container md={12} xs={12} >
          <Grid item md={4} xs={12} spacing={2} >
            {
              isAuthenticated ?
                <UserDetailsComponent userDetails={user} /> : null
            }
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
      </div>

      {/* <div>
        <Grid container md={12} xs={12} >
          <Grid item md={12} xs={12} className={classes.userCard}>
            <Card className={classes.cardShadow}>
              <CardContent>
                <UserDetailsComponent />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container md={12} xs={12}>
          <Grid item md={6} xs={12} >
            <Card className={classes.imageUploadCard}>
              <CardContent>
                <ImageUploadComponent test={12} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6} xs={12} >
            <Card className={classes.fileUploadCard}>
              <CardContent>
                <FileUploaderComponent test={123} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div> */}



    </div>
  );
}

export default App;
