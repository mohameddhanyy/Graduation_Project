using Alif.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository.Data.Confg
{
    internal class LostAnimalConfigration : IEntityTypeConfiguration<LostAnimal>
    {
        public void Configure(EntityTypeBuilder<LostAnimal> builder)
        {
            builder.Property(l => l.LostAnimalLocation).IsRequired();
            builder.Property(l=>l.LostAnimalDescription).IsRequired();
            builder.Property(l=>l.LostAnimalImage).IsRequired();
            builder.Property(l=>l.LostAnimalPhonenum).IsRequired();

            builder.HasOne(u => u.user)
                .WithMany()
                .HasForeignKey(u => u.AppUserId);
                
        }
    }
}
