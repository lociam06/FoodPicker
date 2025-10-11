using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPickerDB_Schema.Entities
{
	public class Recipe_ingredient
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public required int Quantity { get; set; }

		public bool Is_optional { get; set; }

		public int UnitId { get; set; }

		public virtual Unit? Unit { get; set; }

		public int RecipeId { get; set; }

		public virtual Recipe? Recipe { get; set; }

		public int IngredientId { get; set; }

		public virtual Ingredient? Ingredient { get; set; }
	}
}
