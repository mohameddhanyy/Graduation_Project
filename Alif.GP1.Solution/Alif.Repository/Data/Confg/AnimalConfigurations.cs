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
    internal class AnimalConfigurations : IEntityTypeConfiguration<Animals>
    {
        public void Configure(EntityTypeBuilder<Animals> builder)
        {
            builder.Property(a => a.AnimalName)
                .IsRequired()
            .HasMaxLength(100 );

            builder.Property(a => a.Status)
                   
                   .HasDefaultValue(false);



            builder.HasOne(a => a.Type)
                .WithMany()
                .HasForeignKey(a => a.AnimalTypeId);

            builder.HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.AppUserId);








        }
    }
}
