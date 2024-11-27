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
    internal class AnimalIamagesConfguration// : IEntityTypeConfiguration<AnimalImage>
    {
       // public void Configure(EntityTypeBuilder<AnimalImage> builder)
       // {
           // builder.Property(a => a.AnimalImages)
               // .IsRequired();

           // builder.HasOne(a => a.Animal)
             //   .WithMany(a=>a.AnimalImages)
               // .HasForeignKey(a => a.AnimalId);
       // }
    }
}
