using System;
using Microsoft.AspNetCore.Mvc;

namespace Sample.Controllers
{
    public partial class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
