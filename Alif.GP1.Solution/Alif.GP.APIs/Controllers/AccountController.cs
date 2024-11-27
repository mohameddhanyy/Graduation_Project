using Alif.Core.Entities;
using Alif.Core.ServiceContract;
using Alif.GP.APIs.DTOs;
using Alif.GP.APIs.Errors;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Pipelines;
using System.Security.Claims;

namespace Alif.GP.APIs.Controllers
{
    
    public class AccountController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public IWebHostEnvironment _env { get; }

        public AccountController(UserManager<ApplicationUser> userManager,
                                 SignInManager<ApplicationUser> signInManager,
                                 IAuthService authService, IWebHostEnvironment env)
                                 //IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authService = authService;
            _env = env;
        }

        [HttpPost("login")] //post: /api/account/login
        public async Task<ActionResult<UserDto>>Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return Unauthorized(new ApiResponse(401));
             var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded is false)
                return Unauthorized(new ApiResponse(401));

            return Ok(new UserDto()
            { 
                //Id=user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = await _authService.CreateTokenAsync(user,_userManager)
            });
        }

        [HttpPost("register")] // POST: /api/account/register
        public async Task<ActionResult<UserDto>> Register([FromForm] RegisterDto model)
        {
            string fileName = null;
            if (model.Iamge != null && model.Iamge.Length > 0)
            {
                // Validate and move file to wwwroot if necessary
                string filePath;

                // Generate a unique file name
                fileName = Path.GetFileName(model.Iamge.FileName);
                filePath = Path.Combine(_env.WebRootPath, "images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Iamge.CopyToAsync(fileStream);
                }
            }

            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                UserCity = model.City,
                UserLocation = model.Location,
                Email = model.Email,
                PhoneNumber = model.PhoneNamber,
                UserImage = fileName // Save the file name in the database
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return Ok(new UserDto()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = await _authService.CreateTokenAsync(user, _userManager)
            });
        }
        [Authorize]
        // GET: /api/accounts
        [HttpGet]
        public async Task<ActionResult<UserReturnDto>> GetUser( )
        {
           var Email= User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.FindByEmailAsync(Email);
            string baseUrl = Request.Scheme + "://" + Request.Host + "/"+"images/";
            string fullImageUrl = baseUrl + user.UserImage;
            return Ok(new UserReturnDto()
            {
                Id=user.Id,
                UserName = user.UserName,
                Email = user.Email,
                City = user.UserCity,
                Location=user.UserLocation,  
                UserImage = fullImageUrl,
                Token = await _authService.CreateTokenAsync(user, _userManager)

            });

        }

        #region com
        //[Authorize]
        //[HttpPut("edit/{id}")]
        //public async Task<ActionResult<UserReturnDto>> EditUserById(string id,  UpdateUserDto model)
        //{
        //    var user = await _userManager.FindByIdAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound(new ApiResponse(404, "User not found."));
        //    }

        //    // Update user properties
        //    user.UserName = model.UserName ?? user.UserName;
        //    user.Email = model.Email ?? user.Email;
        //    user.UserCity = model.City ?? user.UserCity;
        //    user.UserLocation = model.Location ?? user.UserLocation;

        //    if (!string.IsNullOrEmpty(model.NewPassword))
        //    {
        //        var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, model.CurrentPassword, false);
        //        if (!passwordCheck.Succeeded)
        //        {
        //            return BadRequest(new ApiResponse(400, "Current password is incorrect."));
        //        }
        //        var passwordChangeResult = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        //        if (!passwordChangeResult.Succeeded)
        //        {
        //            return BadRequest(new ApiResponse(400, "Password change failed."));
        //        }
        //    }

        //    var result = await _userManager.UpdateAsync(user);
        //    if (!result.Succeeded)
        //    {
        //        return BadRequest(new ApiResponse(400, "Update failed."));
        //    }

        //    string baseUrl = $"{Request.Scheme}://{Request.Host}/images/";
        //    string fullImageUrl = baseUrl + user.UserImage;

        //    return Ok(new UserReturnDto()
        //    {
        //        Id = user.Id,
        //        UserName = user.UserName,
        //        Email = user.Email,
        //        City = user.UserCity,
        //        Location = user.UserLocation,
        //        UserImage = fullImageUrl,
        //        Token = await _authService.CreateTokenAsync(user, _userManager)
        //    });
        //}

        #endregion

        [Authorize]
        [HttpPut("edit/{id}")]
        public async Task<ActionResult<UserReturnDto>> EditUserById(string id, [FromBody] UpdateUserDto model)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new ApiResponse(404, "User not found."));
            }

            // Update user properties
            user.UserName = model.UserName ?? user.UserName;
            user.Email = model.Email ?? user.Email;
            user.UserCity = model.City ?? user.UserCity;
            user.UserLocation = model.Location ?? user.UserLocation;
            //user.UserImage=model.UserImage ?? user.UserImage;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400, "Update failed."));
            }

            string baseUrl = $"{Request.Scheme}://{Request.Host}/images/";
            string fullImageUrl = baseUrl + user.UserImage;

            return Ok(new UserReturnDto()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                City = user.UserCity,
                Location = user.UserLocation,
            });
        }

        [Authorize]
        [HttpPut("reset-password/{id}")]
        public async Task<ActionResult> ResetPassword(string id,  ResetPasswordDto model)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new ApiResponse(404, "User not found."));
            }

            var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, model.CurrentPassword,false);
            if (!passwordCheck.Succeeded)
            {
                return BadRequest(new ApiResponse(400, "Current password is incorrect."));
            }

            var passwordChangeResult = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!passwordChangeResult.Succeeded)
            {
                return BadRequest(new ApiResponse(400, "Password change failed."));
            }

            return Ok(new ApiResponse(200, "Password changed successfully."));
        }




    }
}
    

