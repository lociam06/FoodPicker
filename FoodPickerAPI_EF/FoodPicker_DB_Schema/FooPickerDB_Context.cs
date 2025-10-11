using FoodPickerDB_Schema.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodPicker_DB_Schema
{
	public class FooPickerDB_Context(DbContextOptions<FooPickerDB_Context> options) : DbContext(options)
	{
		public DbSet<Ingredient> Ingredients { get; set; }
		public DbSet<Food> Foods { get; set; }
		public DbSet<Recipe> Recipes { get; set; }
		public DbSet<Recipe_ingredient> Recipe_Ingredients { get; set; }
		public DbSet<FoodImage> FoodImages { get; set; }
		public DbSet<Unit> Units { get; set; }
	}
}