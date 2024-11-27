using Alif.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository.Data.Confg
{
    internal class AdaptAnimalConfigration : IEntityTypeConfiguration<AdaptAnimal>
    {
        public void Configure(EntityTypeBuilder<AdaptAnimal> builder)
        {
            
            
            builder.HasKey(uad => uad.AnimalId );


            builder.HasOne(uad => uad.User)
            .WithMany()
            .HasForeignKey(uad => uad.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(uad => uad.Animal)
            .WithMany()
            .HasForeignKey(uad => uad.AnimalId)
            .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
