using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPickerDB_Schema.Entities
{
	public class Food
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[MaxLength(255)]
		public required string Name { get; set; } = "";

		public string? Description { get; set; } = "";

		public string? Eat_time { get; set; }

		public int? Rate { get; set;  }

		public decimal? Min_price { get; set; }

		public decimal? Max_price { get; set; }

		public int? Healthy { get; set; }

		public int? Difficulty { get; set; }

		public int? Approximate_preparation_time { get; set; }

		public virtual List<FoodImage>? Images { get; set; }

		public virtual Recipe? Recipe { get; set; }
	}
}
