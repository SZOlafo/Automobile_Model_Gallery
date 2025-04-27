using AutomobileGallery.Data;
using AutomobileGallery.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

//Add ICar service to DI container
builder.Services.AddScoped<ICarService, CarService>();

//Get DB connection string from env variables
var connectionString = builder.Configuration.GetConnectionString("AutomobileGallery");

//Add Database context
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("api/carList", async (ICarService _carService) =>
{
    return await _carService.GetCarList();
})
.WithName("GetCarList")
.WithOpenApi();

app.MapGet("api/carDetails/{carId}", async (ICarService _carService, Guid carId) =>
{
    return await _carService.GetCarById(carId);
})
.WithName("GetCarDetails")
.WithOpenApi();

app.MapFallbackToFile("/index.html");

app.UseCors(MyAllowSpecificOrigins);

app.Run();
