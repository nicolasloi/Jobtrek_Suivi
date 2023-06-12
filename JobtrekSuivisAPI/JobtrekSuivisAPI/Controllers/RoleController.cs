using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobtrekSuivisAPI.Services.RoleService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Role>>> GetAllRoles()
        {
            return await _roleService.GetAllRoles();
        }
    }
}
