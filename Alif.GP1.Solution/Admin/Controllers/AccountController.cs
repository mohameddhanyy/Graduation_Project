using Admin.ViewModel;
using Alif.Core.Entities;
using Alif.GP.APIs.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;

namespace Admin.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        #region ERROR LOG IN
        //public IActionResult LogIn()
        //{
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]

        //public async Task<IActionResult> LogIn([FromForm] LoginViewModel log)
        //{

        //    var user = await userManager.FindByEmailAsync(log.Email);
        //    if (user == null)
        //    {
        //        ModelState.AddModelError("Email", "Invalid Email");
        //        return RedirectToAction(nameof(LogIn));
        //    }
        //    var result = await signInManager.CheckPasswordSignInAsync(user, log.Password, false);
        //    if (!result.Succeeded && !await userManager.IsInRoleAsync(user, "Admin"))
        //    {
        //        ModelState.AddModelError(string.Empty, "you are not authorized");
        //        return RedirectToAction(nameof(LogIn));
        //    }
        //    else
        //        return RedirectToAction("Index", "Home");
        //}
        #endregion


        [HttpGet]//<a href>
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]//<a href>
        public async Task<IActionResult> Register([FromForm] RegisterUserViewModel newUserVM)
        {
            if (ModelState.IsValid)
            {
                //create account
                ApplicationUser userModel = new ApplicationUser();
                userModel.UserName = newUserVM.UserName;
                userModel.PasswordHash = newUserVM.Password;
                userModel.UserLocation = newUserVM.UserLocation;
                userModel.UserCity = newUserVM.UserCity;
                IdentityResult result = await userManager.CreateAsync(userModel, newUserVM.Password);
                if (result.Succeeded == true)
                {
                    //creat cookie
                    await signInManager.SignInAsync(userModel, false);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    foreach (var item in result.Errors)
                    {
                        ModelState.AddModelError("", item.Description);
                    }
                }

            }
            return View(newUserVM);
        }

        public IActionResult TestLogIn()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> TestLogin([FromForm] LoginViewModel log)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser user = await userManager.FindByEmailAsync(log.Email);
                if (user != null)
                {
                    bool found = await userManager.CheckPasswordAsync(user, log.Password);
                    if (found && await userManager.IsInRoleAsync(user, "admin"))
                    {
                        return RedirectToAction("Index", "Role");
                    }
                }
                ModelState.AddModelError("", "Username and password invalid");
            }
            return RedirectToAction(nameof(TestLogin));

        }

        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction(nameof(TestLogin));
        }

    }
}
