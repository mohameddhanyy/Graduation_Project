﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Repository.Data;
using Admin.Models;
using AutoMapper;
using Alif.Core;

namespace Admin.Controllers
{
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        public async Task<IActionResult> Index()
            {
                var Roles = await roleManager.Roles.ToListAsync();
                return View(Roles);
            }
        [HttpPost]
        public async Task<IActionResult> Create(RoleFormViewModel model)
        {
            if (ModelState.IsValid)
            {
                var RoleExsits = await roleManager.RoleExistsAsync(model.Name);
                if (!RoleExsits)
                {
                    await roleManager.CreateAsync(new IdentityRole(model.Name.Trim()));
                    return RedirectToAction(nameof(Index), await roleManager.Roles.ToListAsync());
                }
                else
                {
                    ModelState.AddModelError("Name", "Role Is Exists");
                    return View(nameof(Index), await roleManager.Roles.ToListAsync());


                }
            }
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> Delete(string id)
        {
            var role = await roleManager.FindByIdAsync(id);
            await roleManager.DeleteAsync(role);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(string id)
        {
            var role = await roleManager.FindByIdAsync(id);
            var mappedRole = new RoleViewModel()
            {
                Name = role.Name
            };
            return View(mappedRole);
        }


        [HttpPost]
        public async Task<IActionResult> Edit(string id, RoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var RoleExsits = await roleManager.RoleExistsAsync(model.Name);
                if (!RoleExsits)
                {
                    var role = await roleManager.FindByIdAsync(model.Id);
                    role.Name = model.Name;
                    await roleManager.UpdateAsync(role);
                    return RedirectToAction(nameof(Index));
                }

                else
                {
                    ModelState.AddModelError("Name", "Role Is Exists");
                    return View(nameof(Index), await roleManager.Roles.ToListAsync());


                }
            }
            return RedirectToAction(nameof(Index));

        }


    }
}
