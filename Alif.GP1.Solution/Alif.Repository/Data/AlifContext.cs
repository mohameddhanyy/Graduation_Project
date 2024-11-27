using Alif.Core.Entities;
using Alif.Repository.Data.Confg;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository.Data
{
    public class AlifContext : IdentityDbContext<ApplicationUser>
    {
        public AlifContext(DbContextOptions<AlifContext>options) :base(options)
        {
            
        }
        public AlifContext() : base()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server =.; Database = Alif.Api.GP; Trusted_Connection = True");
            base.OnConfiguring(optionsBuilder);

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new AnimalConfigurations());
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            
        }
        
        //public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Animals> Animals { get; set; }
        public DbSet<Admin> Admins  { get; set; }
        public DbSet<AnimalType> AnimalTypes { get; set; }
        public DbSet<LostAnimal> LostAnimals { get; set; }
        public DbSet<Foster> Fosters  { get; set; }
        public DbSet<Shelter> Shelters   { get; set; }
        public DbSet<Blog> Blogs  { get; set; }
        public DbSet<Course > courses  { get; set; }
        public DbSet<AdaptAnimal> AdaptAnimals   { get; set; }
    }
}
