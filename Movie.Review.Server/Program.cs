using Movie.DataAccess.DataAccess;
using Movie.DataAccess.Repo;
using Movie.DataAccess.Repo.Interfaces;
using Movie.Review.Server.Common.Interfaces;
using Movie.Review.Server.Movie.Interfaces;
using Movie.Review.Server.Movie.Services;
using Movie.Server.Movies.Interfaces;
using Movie.Server.Movies.Validation;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var controllers = Assembly.GetExecutingAssembly()
    .GetTypes()
    .Where(x => typeof(IController).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
    .Select(Activator.CreateInstance);

builder.Services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
builder.Services.AddSingleton<ILookupRepo, LookupRepo>();
builder.Services.AddSingleton<IMoviesRepo, MoviesRepo>();
builder.Services.AddSingleton<IValidation, Validation>();
builder.Services.AddSingleton<IMoviesService, MoviesService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

foreach (var controller in controllers)
{
    (controller as IController)?.SetupController(app);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
}

app.UseHttpsRedirection();

app.Run();