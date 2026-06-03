using Microsoft.EntityFrameworkCore;
using ProjectCoffee.Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVercel",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseDeveloperExceptionPage();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowVercel");
// app.UseHttpsRedirection(); // Commented out to prevent HTTPS redirect loops behind reverse proxies (Vercel)
app.UseAuthorization();
app.MapControllers();

app.Run();
