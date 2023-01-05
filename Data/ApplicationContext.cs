using Microsoft.EntityFrameworkCore;

namespace publicationsApi.Data{
    public class ApplicationContext : DbContext{
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {
            //Database.EnsureCreated();
        }
        
    }
}