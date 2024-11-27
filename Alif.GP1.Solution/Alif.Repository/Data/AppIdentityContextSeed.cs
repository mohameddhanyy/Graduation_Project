using Alif.Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository.Data
{
    public static class AppIdentityContextSeed
    {
        public static async Task SeedUserAsync(UserManager<ApplicationUser> userManager)
        {
            if(userManager.Users.Count()==0)
            {
                var user = new ApplicationUser()
                {
                   
                    UserName ="Hossam",
                    Email = "hossam.salah@gmail.com",
                    UserCity = "Asyet",
                    UserLocation = "Helwan",
                    PhoneNumber = "01145197866",
                    UserImage = "IMG_٢٠٢٢١٠٣١_١٣٤٣٠٦ (2).jpg",
                    UserVerification= true,
                    //IMG_٢٠٢٢١٠٣١_١٣٤٣٠٦ (2)


                };
                await userManager.CreateAsync(user,"PAsw@123");
            }
        }
    }
}
