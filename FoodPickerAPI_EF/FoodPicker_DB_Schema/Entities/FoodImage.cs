using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPickerDB_Schema.Entities
{
	public class FoodImage
	{
		public int Id { get; set; }

		public required string Name { get; set; }

		public required string Url { get; set; }

		public int FoodId { get; set; }
	}
}
