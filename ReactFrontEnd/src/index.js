import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleAPI, GoogleLogin, GoogleLogout } from 'react-google-oauth'

const responseGoogle = (response) => {
  console.log("adfhashdfashdf");
  console.log(response);
}

ReactDOM.render(
  <React.StrictMode>

    <App />
    {/* <GoogleAPI clientId="498272007291-d3r37sr7ucqge4362loc9sjf77de8n6d.apps.googleusercontent.com" 
     buttonText="Login"
     
     onSuccess={responseGoogle}
     onFailure={responseGoogle}
     cookiePolicy={'single_host_origin'}
     >
      <div>
        <div><GoogleLogin /></div>
        <div><GoogleLogout /></div>
      </div>
    </GoogleAPI> */}
  </React.StrictMode>,
  document.getElementById('root')




  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
);
