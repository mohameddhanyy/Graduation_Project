using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alif.Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Alif.Repository.Data.Confg
{
    internal class ShelterCofiguration : IEntityTypeConfiguration<Shelter>
    {
        public void Configure(EntityTypeBuilder<Shelter> builder)
        {
            builder.HasOne(u => u.user)
             .WithMany()
             .HasForeignKey(u => u.AppUserId);
        }
    }
}
