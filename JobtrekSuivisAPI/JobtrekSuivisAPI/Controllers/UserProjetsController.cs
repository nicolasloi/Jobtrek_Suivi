using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobtrekSuivisAPI.Services.UserProjetService;

namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjetsController : ControllerBase
    {
        private readonly IUserProjetService _userProjetService;

        public UserProjetsController(IUserProjetService userProjetService)
        {
            _userProjetService = userProjetService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserProjet>>> GetAllUserProjets()
        {
            var userProjets = await _userProjetService.GetAllUserProjets();
            return userProjets;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserProjet>> GetSingleUserProjet(int id)
        {
            var userProjet = await _userProjetService.GetSingleUserProjet(id);

            if (userProjet == null)
                return NotFound("UserProjet not found");

            return userProjet;
        }

        [HttpPost]
        public async Task<ActionResult<List<UserProjet>>> AddUserProjet(UserProjet userProjet)
        {
            var result = await _userProjetService.AddUserProjet(userProjet);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<UserProjet>>> UpdateUserProjet(int id, UserProjet request)
        {
            var result = await _userProjetService.UpdateUserProjet(id, request);

            if (result == null)
                return NotFound("UserProjet not found");

            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<UserProjet>>> DeleteUserProjet(int id)
        {
            var result = await _userProjetService.DeleteUserProjet(id);

            if (result == null)
                return NotFound("UserProjet not found");

            return result;
        }
        
        [HttpGet("{userId}/projects")]
        public async Task<IActionResult> GetProjetsByUserId(int userId)
        {
            var userProjets = await _userProjetService.GetProjetsByUserId(userId);
            return Ok(userProjets);
        }
    }
}
