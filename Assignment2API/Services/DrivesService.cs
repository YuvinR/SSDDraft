using Assignment2API.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using static Google.Apis.Drive.v3.DriveService;

namespace Assignment2API.Services
{
    public class DrivesService
    {
       
        public DriveService GetService(string test)
        {
            var tokenResponse = new TokenResponse
            {
                AccessToken = test,
                RefreshToken = "1//04q1DOu87Mh7-CgYIARAAGAQSNwF-L9IrDwXy_xi2O8sfQk0SHsPcWoeV5pRTmBMLJ85vlISi2ETlM1mIREE9_eGQiNPrIMX-acE"
            };


            var applicationName = "SSD Assignment 2";// Use the name of the project in Google Cloud
            var username = "yuvinransika1998@gmail.com";//"it18146516@my.sliit.lk"; // Use your email


            var apiCodeFlow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = "885024372915-qrhrciub8l3ev12ac6esqs7vfc88l8gr.apps.googleusercontent.com",
                    ClientSecret = "OCkyLyTBv2Ercqdu5s7kLevu"
                },
                Scopes = new[] { Scope.Drive},
                DataStore = new FileDataStore(applicationName)
                
            });


            var credential = new UserCredential(apiCodeFlow, username, tokenResponse);


            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = applicationName,
            });

            return service;
        }



    }
}
