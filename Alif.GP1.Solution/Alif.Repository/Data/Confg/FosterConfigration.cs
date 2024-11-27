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
    internal class FosterConfigration : IEntityTypeConfiguration<Foster>
    {
        public void Configure(EntityTypeBuilder<Foster> builder)
        {
            builder.Property(f => f.FOwnername).IsRequired();
            builder.Property(f => f.FPhone).IsRequired();
            builder.Property(f => f.FLocation).IsRequired();
            builder.Property(f => f.FDescripation).IsRequired();

            builder.Property(a => a.FApproval)

                   .HasDefaultValue(false);
        }
    }
}
