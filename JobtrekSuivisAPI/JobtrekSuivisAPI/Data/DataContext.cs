global using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DotNetEnv;

namespace JobtrekSuivisAPI.Data
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            
            DotNetEnv.Env.Load();

            var host = Environment.GetEnvironmentVariable("HOST");
            var database = Environment.GetEnvironmentVariable("DATABASE");
            var port = Environment.GetEnvironmentVariable("PORT");
            var username = Environment.GetEnvironmentVariable("USERNAME");
            var password = Environment.GetEnvironmentVariable("PASSWORD");

            var connectionString = $"Host={host};Database={database};Port={port};Username={username};Password={password}";

            optionsBuilder.UseNpgsql(connectionString);
        }
        
        public DbSet<SuperHero> SuperHeroes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Metier> Metiers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Projet> Projets { get; set; }
        public DbSet<UserProjet> UserProjets { get; set; }
        public DbSet<Domaine> Domaines { get; set; }
        public DbSet<Competence> Competences { get; set; }
        public DbSet<CompetenceProjet> CompetenceProjets { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<Module> Modules { get; set; }
    }
}