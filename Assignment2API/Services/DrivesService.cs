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
       
        public DriveService GetService(TestModel test)
        {
            var tokenResponse = new TokenResponse
            {
                AccessToken = "ya29.a0ARrdaM8iXDHkMufHUaSsSdUwrlP9cBkSkXH4DkWQTjZ8Lu28oT4JpGA2Y-lNk6D-lCTKlL1TsnJEecEsPDiWgGV3by4hP-ebYQroDY3tlBfpOJfTGkrY3xRnzPW-z0j2gdn0KczdC7prvL6ET8NtBWYephGq",
                RefreshToken = "1//04Ip3oOPcV1T1CgYIARAAGAQSNwF-L9IrTKvgIyCPQPSsAslA_rV4WP5T-2jGAEH6cZCYV5k5H-9ApifhaV4kF0BJOQzry4GJNik"
            };


            var applicationName = "SSD Assignment 2";// Use the name of the project in Google Cloud
            var username = "it18146516@my.sliit.lk"; // Use your email


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
