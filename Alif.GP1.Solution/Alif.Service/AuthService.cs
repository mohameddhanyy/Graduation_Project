using Alif.Core.Entities;
using Alif.Core.ServiceContract;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Alif.Service
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> CreateTokenAsync(ApplicationUser user , UserManager<ApplicationUser> userManager)
        {
            //private claims(user Defined)
            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.GivenName,user.UserName),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.NameIdentifier,user.Id)
            };

             var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
                authClaims.Add(new Claim(ClaimTypes.Role, role));
                
            var authkey = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(_configuration["JWT:Secretkey"]));
            double tokenDurationInHours = double.Parse(_configuration["JWT:DurationInHours"]);

            var token = new JwtSecurityToken(

                audience: _configuration["JWT:ValidAudience"],
                issuer: _configuration["JWT:ValidIssuer"],
                //expires: DateTime.UtcNow.AddDays(double.Parse(_configuration["JWT:DurationInHours"])),
                expires: DateTime.UtcNow.AddHours(tokenDurationInHours),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authkey, SecurityAlgorithms.HmacSha256Signature)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
            
        }
    }
}

