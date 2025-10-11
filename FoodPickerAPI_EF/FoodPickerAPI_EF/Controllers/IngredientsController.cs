using FoodPicker_DB_Schema;
using FoodPickerDB_Schema.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodPickerAPI_EF.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class IngredientsController : ControllerBase
	{
		public IngredientsController(FooPickerDB_Context context)
		{
			_dbContext = context;
		}

		private readonly FooPickerDB_Context _dbContext;

		//Metodo GET : api/ingredients
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredients()
		{
			try
			{
				var ingredients = await _dbContext.Ingredients.ToListAsync();
				return Ok(ingredients);
			}
			catch(Exception ex)
			{
				return StatusCode(500, $"Intern Error: {ex.Message}");
			}
		}

		//Metodo GET para obtener uno : api/ingredients/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Ingredient>> GetOneIngredient(int id)
		{
			try
			{
				var ingredient = await _dbContext.Ingredients.FindAsync(id);

				if(ingredient == null) return NotFound($"Didn't found the ingrediente whit id {id}");

				return Ok(ingredient);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error interno: {ex.Message}");
			}
		}


		//Metodo Post
		[HttpPost]
		public async Task<ActionResult<Ingredient>> CreateIngredient(Ingredient ingredient)
		{
			try
			{
				//Esto sirve para saber si los campos que se obtienen cumplen con las restricciones
				if (!ModelState.IsValid) return BadRequest(ModelState);

				_dbContext.Ingredients.Add(ingredient);
				await _dbContext.SaveChangesAsync();

				return CreatedAtAction(nameof(GetIngredients), new { id = ingredient.Id }, ingredient);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		//Metodo PUT : api/ingredients/5
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateIngredient(int id, Ingredient ingredient)
		{
			try
			{
				if (id != ingredient.Id) return BadRequest("Los Id no coinciden");

				//Esto sirve para saber si los campos que se obtienen cumplen con las restricciones
				if (!ModelState.IsValid) return BadRequest();

				_dbContext.Entry(ingredient).State = EntityState.Modified;
				await _dbContext.SaveChangesAsync();

				return NoContent();
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error updating the ingredient {ex.Message}");
			}
		}

		//Metodo DELETE : api/ingredients/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteIngredient(int id)
		{
			try
			{
				var ingredient = await _dbContext.Ingredients.FindAsync(id);

				if (ingredient == null) return BadRequest("The ingredient with that Id doesn't exists");

				_dbContext.Ingredients.Remove(ingredient);
				await _dbContext.SaveChangesAsync();

				return NoContent();
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error deleting ingredient {ex.Message}");
			}
		}
	}
}