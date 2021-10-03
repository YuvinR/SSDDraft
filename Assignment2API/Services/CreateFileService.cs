using Assignment2API.Models;
using Google.Apis.Drive.v3;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Assignment2API.Services
{
    public class CreateFileService
    {

        public string CreateFolder(TestModel test, string parent, string folderName)
        {
            try
            {
                DrivesService dv = new DrivesService();
                DriveService service = dv.GetService(test.Token);

                var driveFolder = new Google.Apis.Drive.v3.Data.File();
                driveFolder.Name = folderName;
                driveFolder.MimeType = "application/vnd.google-apps.folder";
                driveFolder.Parents = new string[] { parent };
                var command = service.Files.Create(driveFolder);
                var file = command.Execute();



                //        DriveService service = dv.GetService(test);
                //        var driveFolder = new Google.Apis.Drive.v3.Data.File();
                //        driveFolder.Name = folderName;
                //        driveFolder.MimeType = "application/vnd.google-apps.folder";
                //        driveFolder.Parents = new string[] { parent
                //};
                //        //var command = service.Files.Create(driveFolder);
                //        //var file = command.Execute();
                //        //var list = service.Files.List();
                //        //list.PageSize = 10;


                //        // Define parameters of request.
                //        FilesResource.ListRequest listRequest = service.Files.List();
                //        listRequest.PageSize = 10;
                //        listRequest.Fields = "nextPageToken, files(id, name)";


                //        IList<Google.Apis.Drive.v3.Data.File> files = listRequest.Execute()
                //            .Files;
                //var data = listRequest.Execute();
                // var file = command.Execute();
                return "101";

            }
            catch (Exception ex)
            {
                return "lol";
            }

        }

        public string UploadFile(ImageModel imageModel)
        {
            try
            {
               
                String FileName = imageModel.UserName + "_" + Guid.NewGuid() + ".png";

                string modifiedstream = Regex.Replace(imageModel.ImageData, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);

                byte[] bytes = Convert.FromBase64String(modifiedstream);
                var requestID = "";
                using (Stream ms = new MemoryStream(bytes))
                {
                    DrivesService dv = new DrivesService();
                    DriveService service = dv.GetService(imageModel.Token);


                    var driveFile = new Google.Apis.Drive.v3.Data.File();
                    driveFile.Name = FileName;
                    driveFile.Description = "Upload By Admin";
                    driveFile.MimeType = "image/png";
                    driveFile.Parents = new string[] { "root" };


                    var request = service.Files.Create(driveFile, ms, "image/png");
                    request.Fields = "id";
                    requestID = "12";
                    var response = request.Upload();
                    if (response.Status != Google.Apis.Upload.UploadStatus.Completed)
                        throw response.Exception;
                }
                return requestID;
            }
            catch (Exception ex)
            {
                return "lol";
            }
        }

    }
}
