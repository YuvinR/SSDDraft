using Assignment2API.Models;
using Google.Apis.Drive.v3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment2API.Services
{
    public class CreateFileService
    {

        public string CreateFolder(TestModel test ,string parent, string folderName)
        {
            try
            {
                       DrivesService dv = new DrivesService();
                       DriveService service = dv.GetService(test);
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

            }catch(Exception ex)
            {
                return "lol";
            }
          
        }
       
    }
}
