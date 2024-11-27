using Alif.GP.APIs.Errors;
using Microsoft.AspNetCore.Mvc;

namespace Alif.GP.APIs.Controllers
{
    [Route("errors/{code}")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]  // to avoid doc of this endpoint because i dont write [httpget]
    public class ErrorController : ControllerBase
    {


        public ActionResult Error(int code)
        {
            return NotFound(new ApiResponse(code));
        }
    }
}
