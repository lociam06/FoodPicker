using FoodPicker_DB_Schema;
using FoodPickerDB_Schema.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodPickerAPI_EF.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UnitsController : Controller
	{
		public UnitsController(FooPickerDB_Context context)
		{
			_dbContext = context;
		}

		private readonly FooPickerDB_Context _dbContext;

		[HttpGet]
		public async Task<ActionResult<List<Unit>>> GetUnits()
		{
			try
			{
				var Units = await _dbContext.Units.ToListAsync();
				return Ok(Units);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Inter error: {ex.Message}");
			}
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Unit>> GetUnitById(int id)
		{
			try
			{
				var unit = await _dbContext.Units.FirstOrDefaultAsync(u => u.Id == id);

				if(unit == null) return NotFound("The unit with id {id} doesn't exist");

				return Ok(unit);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Inter error: {ex.Message}");
			}
		}

		[HttpPost]
		public async Task<ActionResult<Unit>> PostUnit(Unit unit)
		{
			try
			{
				var existentUnit = await _dbContext.Units.FirstOrDefaultAsync(u => u.UnitName == unit.UnitName);

				if (existentUnit != null) return BadRequest("That unit already exits");

				if (!ModelState.IsValid) return BadRequest(ModelState);

				_dbContext.Units.Add(unit);
				await _dbContext.SaveChangesAsync();

				return CreatedAtAction(nameof(GetUnits), new { id = unit.Id }, unit);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Inter error: {ex.Message}");
			}
		}
		/*
		[HttpDelete]
		public async Task<ActionResult> DeleteUnit(Unit unit)
		{
			try
			{
				var existentUnit = await _dbContext.Units.FirstOrDefaultAsync(u => u.UnitName == unit.UnitName);

				if (existentUnit != null) return BadRequest("That unit already exits");

				if (!ModelState.IsValid) return BadRequest(ModelState);

				_dbContext.Units.Add(unit);
				await _dbContext.SaveChangesAsync();

				return CreatedAtAction(nameof(GetUnits), new { id = unit.Id }, unit);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Inter error: {ex.Message}");
			}
		}
		*/
	}
}
