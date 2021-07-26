using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace TestAppABTest.Models
{
    public partial class ABTestContext : DbContext
    {
        public ABTestContext()
        {
        }

        public ABTestContext(DbContextOptions<ABTestContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer("Data Source=DESKTOP-DPE2P6U\\SQLEXPRESS;Initial Catalog=ABTest;Integrated Security=True");
                optionsBuilder.UseSqlServer("workstation id=ABTestDB.mssql.somee.com;packet size=4096;user id=mr_hyde_SQLLogin_1;pwd=1ck5772b3m;data source=ABTestDB.mssql.somee.com;persist security info=False;initial catalog=ABTestDB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USERS");

                entity.Property(e => e.LastActivityDate).HasColumnType("datetime");

                entity.Property(e => e.RegistrationDate).HasColumnType("datetime");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
