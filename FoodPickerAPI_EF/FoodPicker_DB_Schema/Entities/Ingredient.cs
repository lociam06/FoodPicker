using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPickerDB_Schema.Entities
{
	[Index(nameof(Name), IsUnique = true)]
	public class Ingredient
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public required string Name { get; set; }

		[MaxLength(50)]
		public string? Unit { get; set; }
	}
}
