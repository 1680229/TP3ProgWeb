using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GallerieInfinie.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace GallerieInfinie.Data
{
    public class GallerieInfinieContext : IdentityDbContext<User>
    {
        public GallerieInfinieContext (DbContextOptions<GallerieInfinieContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            PasswordHasher<User> hasher = new PasswordHasher<User>();
            User u1 = new()
            {
                Id = "1111111-1111-1111-1111-111111111111",
                UserName = "Gigapop32",
                Email = "jingkungfu@mail.com",
                NormalizedEmail = "JINGKUNGFU@MAIL.COM",
                NormalizedUserName = "GIGAPOP32"
            };
            u1.PasswordHash = hasher.HashPassword(u1, "Hola2!");
            User u2 = new()
            {
                Id = "1111111-1111-1111-1111-111111111112",
                UserName = "Coquecinelle9",
                Email = "wallah@mail.com",
                NormalizedEmail = "WALLAH@MAIL.COM",
                NormalizedUserName = "COQUECINELLE9"
            };
            u2.PasswordHash = hasher.HashPassword(u2, "Hola2!");
            builder.Entity<User>().HasData(u1, u2);

            builder.Entity<Gallery>().HasData(
                new { Id = 1, Name = "MaGalerie1", IsPublic= true },
                new { Id = 2, Name = "MaGalerieAmoi2", IsPublic = false }
            );
            builder.Entity<Gallery>()
                .HasMany(g => g.Owners)
                .WithMany(u => u.Galleries)
                .UsingEntity(e =>
                {
                    e.HasData(new { OwnersId = u1.Id, GalleriesId = 1 });
                    e.HasData(new { OwnersId = u2.Id, GalleriesId = 2 });
                });
        }

        public DbSet<Gallery> Gallery { get; set; } = default!;
        public DbSet<User> User { get; set; } = default!;
    }
}
