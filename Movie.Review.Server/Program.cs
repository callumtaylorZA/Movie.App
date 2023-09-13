using Movie.Review.Server.Common.Interfaces;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var services = Assembly.GetExecutingAssembly()
    .GetTypes()
    .Where(x => typeof(IService).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
    .Select(Activator.CreateInstance);

var controllers = Assembly.GetExecutingAssembly()
    .GetTypes()
    .Where(x => typeof(IController).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
    .Select(Activator.CreateInstance);

foreach (var service in services)
{
    (service as IService)?.Configure(builder);
}

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

foreach (var controller in controllers)
{
    (controller as IController)?.SetupController(app);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}