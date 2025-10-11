using FoodPicker_DB_Schema;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<FooPickerDB_Context>( options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("FoodPickerConnection"));
});

// Agrega una política de CORS
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowReactApp",
		policy =>
		{
			policy.WithOrigins("http://localhost:5173") // Origen permitido
				  .AllowAnyHeader()
				  .AllowAnyMethod();
		});
});

var app = builder.Build();

//Es para crear la base de datos

using (var scope = app.Services.CreateScope())
{
	var dataContext = scope.ServiceProvider.GetRequiredService<FooPickerDB_Context>();
	dataContext.Database.Migrate();
}

app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
