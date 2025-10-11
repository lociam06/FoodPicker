using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPickerDB_Schema.Entities
{
	public class Unit
	{
		public int Id { get; set; }
		public required string UnitName { get; set; }
	}
}
