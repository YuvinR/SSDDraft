using Assignment2API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;

namespace Assignment2API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesHandlerController : ControllerBase
    {
        [HttpPost]
        [Authorize]
        [Route("ImageDataSave")]
        public bool SaveUserImage([FromBody] ImageModel imageModel)
        {
            try
            {
                var path = "D:\\ImagesOfEmployees";
                String FileName = imageModel.UserName + "_" + Guid.NewGuid() + ".png";

                string modifiedstream = Regex.Replace(imageModel.ImageData, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);

                byte[] bytes = Convert.FromBase64String(modifiedstream);

                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    Image img = Image.FromStream(ms);
                    
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string FilePath = path + "/" + FileName;

                    img.Save(FilePath, ImageFormat.Jpeg);
                    ms.Dispose();
                }
                return true;

            }catch(Exception ex)
            {
                return false;
            }
          
        }
    }
}
