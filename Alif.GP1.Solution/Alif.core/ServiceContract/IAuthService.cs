using Alif.Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.ServiceContract
{
    public interface IAuthService
    {
        Task<string> CreateTokenAsync(ApplicationUser user,UserManager<ApplicationUser> userManager);
    }
}
