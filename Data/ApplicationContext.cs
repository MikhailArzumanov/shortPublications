using Microsoft.EntityFrameworkCore;
using publicationsApi.Models;

namespace publicationsApi.Data{
    public class ApplicationContext : DbContext{
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {
            //Database.EnsureCreated();
        }
        

        public DbSet<User>          Users        { get; set; }
        public DbSet<Publication>   Publications { get; set; }
        public DbSet<Commentary>    Commentaries { get; set; }
    }
}