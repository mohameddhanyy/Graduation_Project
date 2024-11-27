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
    internal class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasOne(u => u.user)
             .WithMany()
             .HasForeignKey(u => u.AppUserId);
        }
    }
}
