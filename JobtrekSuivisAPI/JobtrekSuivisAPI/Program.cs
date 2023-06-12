global using JobtrekSuivisAPI.Models;
global using JobtrekSuivisAPI.Data;
using System.Text.Json.Serialization;
using JobtrekSuivisAPI.Services.CompetenceService;
using JobtrekSuivisAPI.Services.DomaineService;
using JobtrekSuivisAPI.Services.MetierService;
using JobtrekSuivisAPI.Services.ProjetService;
using JobtrekSuivisAPI.Services.RoleService;
using JobtrekSuivisAPI.Services.SuperHeroService;
using JobtrekSuivisAPI.Services.UserProjetService;
using JobtrekSuivisAPI.Services.UserService;
using Microsoft.Extensions.Options;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ISuperHeroService, SuperHeroService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjetService, ProjetService>();
builder.Services.AddScoped<IMetierService, MetierService>();
builder.Services.AddScoped<IDomaineService, DomaineService>();
builder.Services.AddScoped<ICompetenceService, CompetenceService>();
builder.Services.AddScoped<IUserProjetService, UserProjetService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddDbContext<DataContext>();

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();

builder.Services.AddCors(options =>
{
    var frontendURL = configuration.GetValue<string>("frontend_url");
    
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();