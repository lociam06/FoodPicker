using FoodPicker_DB_Schema;
using FoodPickerDB_Schema.Entities;
using Microsoft.AspNetCore.Connections.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

namespace FoodPickerAPI_EF.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RecipeIngredientsController : ControllerBase
	{
		private readonly FooPickerDB_Context _dbContext;
		public RecipeIngredientsController(FooPickerDB_Context context) => _dbContext = context;

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Recipe_ingredient>>> GetRecipe_Ingredients()
		{
			try
			{
				var recipeIngredients = await _dbContext.Recipe_Ingredients.ToListAsync();
				return Ok(recipeIngredients);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Server internal error: {ex.Message}");
			}
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<IEnumerable<Recipe_ingredient>>> GetRecipe_IngredientsById(int id)
		{
			try
			{
				var recipeIngredient = await _dbContext.Recipe_Ingredients.FindAsync(id);

				if (recipeIngredient == null) return NotFound($"Didn't found any RecipeIngredient with Id {id}");

				return Ok(recipeIngredient);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Server internal error: {ex.Message}");
			}
		}

		//POST api/RecipeIngredient
		[HttpPost]
		public async Task<ActionResult<Recipe_ingredient>> CreateRecipeIngredient(Recipe_ingredient recipeIngredient)
		{
			try
			{
				if(!ModelState.IsValid) return BadRequest(ModelState);

				_dbContext.Recipe_Ingredients.Add(recipeIngredient);

				await _dbContext.SaveChangesAsync();

				return CreatedAtAction(nameof(GetRecipe_IngredientsById), new { id = recipeIngredient.Id }, recipeIngredient);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

		//PUT api/RecipeIngredient/5
		[HttpPut("{id}")]
		public async Task<ActionResult<Recipe_ingredient>> UpdateRecipeIngredient(int id, Recipe_ingredient recipeIngredient)
		{
			try
			{
				if (id != recipeIngredient.Id) return BadRequest("The ids doesn't match");

				if (!ModelState.IsValid) return BadRequest();

				_dbContext.Recipe_Ingredients.Entry(recipeIngredient).State = EntityState.Modified;
				await _dbContext.SaveChangesAsync();				

				return Ok(recipeIngredient);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal error: {ex.Message}"); 
			}
		}

		//DELETE api/RecipeIngredient/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Recipe_ingredient>> DeleteRecipeIngredient(int id)
		{
			try
			{
				var recipeIngredient = await _dbContext.Recipe_Ingredients.FindAsync(id);

				if (recipeIngredient == null) return BadRequest($"There isn't any RecipeIngredients with id {id}");

				_dbContext.Recipe_Ingredients.Remove(recipeIngredient);
				await _dbContext.SaveChangesAsync();

				return Ok(recipeIngredient);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
			
		}
	}
}