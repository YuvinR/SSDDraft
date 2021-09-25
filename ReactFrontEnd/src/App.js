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
  userCard: {
    border: '2px red solid',
    marginTop: '5rem',
    marginLeft: '10rem',
    marginRight: '10rem'
  }
}));


function App() {
  const classes = useStyles();
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, getIdTokenClaims } = useAuth0();

  async function Login() {
    loginWithRedirect();
    console.log("isAuthenticated", isAuthenticated);

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
          <Button onClick={() => Login()} color="inherit">Login</Button>
          <Button onClick={() => Check()} color="inherit">Check</Button>
          <Button onClick={callSecureApi} color="inherit">Call API</Button>
        </Toolbar>
      </AppBar>

      <div>
        <Grid container md={12} xs={12}>
          <Grid item md={12} xs={12} className={classes.userCard}>
            <Card>
              <CardContent>sdsd</CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container md={12} xs={12}>
          <Grid item md={6} xs={12} >
            <Card>
              <CardContent>
                <ImageUploadComponent test={12} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6} xs={12} >
            <Card>
              <CardContent>
                <FileUploaderComponent test={123} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>



    </div>
  );
}

export default App;
