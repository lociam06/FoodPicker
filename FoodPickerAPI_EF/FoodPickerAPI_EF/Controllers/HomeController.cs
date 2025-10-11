using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodPickerAPI_EF.Controllers
{
	[Route("api/")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		[HttpGet]
		public string Get() => "API working";
	}
}
