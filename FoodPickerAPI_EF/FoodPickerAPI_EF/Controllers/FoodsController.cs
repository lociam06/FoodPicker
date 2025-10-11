using CloudinaryDotNet;
using FoodPicker_DB_Schema;
using FoodPickerDB_Schema.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CloudinaryDotNet.Actions;
using FoodPickerAPI_EF.Data;
using System.Net.WebSockets;
using System.Drawing;
using static System.Net.Mime.MediaTypeNames;

namespace FoodPickerAPI_EF.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FoodsController : ControllerBase
	{
		private readonly FooPickerDB_Context _dbContext;
		private readonly Cloudinary _cloudinary;

		public FoodsController(FooPickerDB_Context context, IConfiguration config) {
			_dbContext = context;

			var cloudSettings = config.GetSection("CloudinarySettings").Get<CloudinarySettings>();

			var account = new Account(
				cloudSettings?.CloudName,
				cloudSettings?.ApiKey,
				cloudSettings?.ApiSecret
			);

			_cloudinary = new Cloudinary(account);
		}

		// GET: api/Foods
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Food>>> GetFoods()
		{
			try
			{
				var foods = await _dbContext.Foods
					.Include(f => f.Recipe)
					.Include(f => f.Images)
					.ToListAsync();
				return Ok(foods);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Intern error: {ex.Message}");
			}
		}

		// GET api/Foods/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Food>> GetOneFood(int id)
		{
			try
			{
				var food = await _dbContext.Foods
					.Include(f => f.Recipe)
					.Include(f => f.Images)
					.FirstOrDefaultAsync(f => f.Id == id);

				if(food == null) return NotFound($"Didn't found a food with id {id}");

				return Ok(food);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Intern error: {ex.Message}");
			}
		}

		// POST api/foods
		[HttpPost]
		public async Task<ActionResult<Food>> CreateFood(Food food)
		{
			try
			{
				//Esto sirve para saber si los campos que se obtienen cumplen con las restricciones
				if (!ModelState.IsValid) return BadRequest(ModelState);

				_dbContext.Foods.Add(food);
				await _dbContext.SaveChangesAsync();

				return CreatedAtAction(nameof(GetOneFood), new { id = food.Id }, food);
			}
			catch(Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		// PUT: api/foods/5
		[HttpPut("{id}")]
		public async Task<IActionResult> UpDateFood(int id, Food food)
		{
			try
			{
				if (id != food.Id) return BadRequest("The Ids doesn't match");

				//Esto sirve para saber si los campos que se obtienen cumplen con las restricciones
				if (!ModelState.IsValid) return BadRequest();

				_dbContext.Foods.Entry(food).State = EntityState.Modified;
				await _dbContext.SaveChangesAsync();

				return CreatedAtAction(nameof(GetOneFood), new { id = food.Id }, food);
			}
			catch(Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		// DELETE api/Foods/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteFood(int id)
		{
			try
			{
				var food = await _dbContext.Foods.FindAsync(id);

				if (food == null) return BadRequest($"There isn't any food with the id {id}");

				_dbContext.Foods.Remove(food);
				await _dbContext.SaveChangesAsync();

				return Ok(food);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error deleting ingredient {ex.Message}");
			}
		}

		// GET recipe food : api/foods/5/recipe
		[HttpGet("{id}/recipe")]
		public async Task<ActionResult<Recipe>> GetRecipeFood(int id)
		{
			try
			{
				var food = await _dbContext.Foods
					.Include(f => f.Recipe)
					.FirstOrDefaultAsync(f => f.Id == id);

				if (food == null) return NotFound($"There isn't any food with the id {id}");

				if (food.Recipe == null) return NotFound($"There isn't any recipe asociated with that food");

				return Ok(food.Recipe);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		// GET foods ingredients : api/foods/5/ingredients
		[HttpGet("{id}/ingredients")]
		public async Task<ActionResult<Recipe>> GetFoodIngredients(int id)
		{
			try
			{
				var ingredients = await _dbContext.Recipe_Ingredients
				.Include(ri => ri.Ingredient)
				.Include(ri => ri.Recipe)
				.Where(ri => ri.RecipeId == id && ri.Ingredient != null)
				.Select(ri => new
				{
					ri.Id, 
					ri.RecipeId,
					ri.IngredientId,
					ri.Ingredient.Name,
					ri.Quantity,
					ri.Unit,
					ri.UnitId,
					ri.Is_optional
				})
				.ToListAsync();

				return Ok(ingredients);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		// PUT foods ingredients : api/foods/5/ingredients
		[HttpPut("{id}/ingredients")]
		public async Task<ActionResult<Recipe>> UpdateFoodIngredients(int id, List<Recipe_ingredient> recipeIngredients)
		{
			try
			{
				var recipe = await _dbContext.Recipes.FirstOrDefaultAsync(x => x.Id == id);

				if (recipe == null) return BadRequest($"There isn't any recipe with id {id}");

				var ingredients = await _dbContext.Recipe_Ingredients
				.Include(ri => ri.Ingredient)
				.Include(ri => ri.Recipe)
				.Where(ri => ri.RecipeId == id && ri.Ingredient != null)
				.ToListAsync();

				if (ingredients != null && ingredients.Any())
				{
					foreach(var ing in ingredients)
					{
						_dbContext.Recipe_Ingredients.Remove(ing);
					}
				}

				foreach(var ing in recipeIngredients)
				{
					_dbContext.Recipe_Ingredients.Add(ing);
				}

				await _dbContext.SaveChangesAsync();

				return Ok(recipeIngredients);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		//POST foods images : foods/5/image
		[HttpPost("{foodId}/image")]
		public async Task<ActionResult> PostFoodImage(int foodId, [FromForm] List<IFormFile> images)
		{
			try
			{
				//Validaciones
				var food = await _dbContext.Foods
					.FirstOrDefaultAsync(x => x.Id == foodId);

				if (food == null) return NotFound($"There istn't any food whit ID {foodId}");

				if (images == null || images.Count == 0) return BadRequest("Didn't send any image");

				//Ejecucion
				var imagesToUpload = new List<FoodImage>();

				foreach (var image in images)
				{
					// Subir a Cloudinary
					var uploadParams = new ImageUploadParams
					{
						File = new FileDescription(image.FileName, image.OpenReadStream()),
						PublicId = Path.GetFileNameWithoutExtension(image.FileName)
					};

					var uploadResult = _cloudinary.Upload(uploadParams);

					// Crear entidad imagen y asociar
					var imagen = new FoodImage
					{
						Name = food.Name + " - imagen",
						Url = uploadResult.SecureUrl.ToString(),
						FoodId = food.Id
					};

					_dbContext.FoodImages.Add(imagen);
					imagesToUpload.Add(imagen);
				}

				await _dbContext.SaveChangesAsync();

				return Ok(imagesToUpload);
			}
			catch(Exception ex)
			{
				return StatusCode(500, $"Intern error: {ex.Message}");
			}
		}

		//POST foods images : foods/5/image
		[HttpPut("{foodId}/image")]
		public async Task<ActionResult> UpdateFoodImage(int foodId, [FromForm] List<IFormFile> images)
		{
			try
			{
				//Validaciones
				var food = await _dbContext.Foods
					.Include(x => x.Images)
					.FirstOrDefaultAsync(x => x.Id == foodId);

				if (food == null) return NotFound($"There istn't any food whit ID {foodId}");

				if (images == null || images.Count == 0) return BadRequest("Didn't send any image");


				//Eliminar la imagenes viejas
				if (food.Images != null && food.Images.Any())
				{
					foreach (var oldImage in food.Images)
					{
						// Intentar borrar de Cloudinary usando el PublicId
						var publicId = Path.GetFileNameWithoutExtension(
							new Uri(oldImage.Url).Segments.Last()
						);

						var deletionParams = new DeletionParams(publicId);
						_cloudinary.Destroy(deletionParams);

						// Eliminar de la BD
						_dbContext.FoodImages.Remove(oldImage);
					}
				}

				//Ejecucion
				var imagesToUpload = new List<FoodImage>();

				foreach (var image in images)
				{
					// Subir a Cloudinary
					var uploadParams = new ImageUploadParams
					{
						File = new FileDescription(image.FileName, image.OpenReadStream()),
						PublicId = Path.GetFileNameWithoutExtension(image.FileName)
					};

					var uploadResult = _cloudinary.Upload(uploadParams);

					// Crear entidad imagen y asociar
					var imagen = new FoodImage
					{
						Name = food.Name + " - imagen",
						Url = uploadResult.SecureUrl.ToString(),
						FoodId = food.Id
					};

					_dbContext.FoodImages.Add(imagen);
					imagesToUpload.Add(imagen);
				}

				await _dbContext.SaveChangesAsync();

				return Ok(imagesToUpload);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Intern error: {ex.Message}");
			}
		}
	}
}