using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodPickerDB_Schema.Entities;
using FoodPicker_DB_Schema;

namespace FoodPickerAPI_EF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly FooPickerDB_Context _dbContext;
        public RecipesController(FooPickerDB_Context context)
        {
			_dbContext = context;
        }

        // GET: api/Recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            try
            {
                var recipes = await _dbContext.Recipes.ToListAsync();
                return Ok(recipes);
            }
            catch (Exception ex)
            {
				return StatusCode(500, $"Intern error: {ex.Message}");
			}
		}

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            try
            {
				var recipe = await _dbContext.Recipes.FindAsync(id);

				if (recipe == null) return NotFound($"Didn't found a recipe with id {id}");

				return Ok(recipe);
			}
            catch (Exception ex)
            {
				return StatusCode(500, $"Intern error: {ex.Message}");
			}
		}

        // POST: api/Recipes
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            try
            {
				_dbContext.Recipes.Add(recipe);
				await _dbContext.SaveChangesAsync();

				return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
			}
            catch (Exception ex)
            {
				return StatusCode(500, $"Internal error: {ex.Message}");
			}
		}

        // PUT: api/Recipes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            try
            {
                if (id != recipe.Id) return BadRequest("The Ids don't match");

				//Esto sirve para saber si los campos que se obtienen cumplen con las restricciones
				if (!ModelState.IsValid) return BadRequest();

				_dbContext.Entry(recipe).State = EntityState.Modified;
				await _dbContext.SaveChangesAsync();

                return NoContent();
			}
			catch (Exception ex)
            {
				return StatusCode(500, $"Internal error: {ex.Message}");

			}
		}

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            try
            {
				var recipe = await _dbContext.Recipes.FindAsync(id);
				
                if (recipe == null) return BadRequest($"There isn't any recipe with the id {id}");

				_dbContext.Recipes.Remove(recipe);
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