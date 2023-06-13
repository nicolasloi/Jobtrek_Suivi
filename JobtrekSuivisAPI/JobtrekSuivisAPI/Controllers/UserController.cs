using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobtrekSuivisAPI.Services.UserService;
using JobtrekSuivisAPI.Utilities;

namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : Controller
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetSingleUser(int id)
        {
            var result = await _userService.GetSingleUser(id);
            if (result is null)
                return NotFound("User not found");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser([FromBody] User user)
        {
            var result = await _userService.AddUser(user);
            return Ok(result);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _userService.GetUserByEmail(loginRequest.Email);
            if (user == null)
                return BadRequest("Invalid email or password");

            var isPasswordValid = Security.VerifyPassword(loginRequest.Password, user.password);
            if (!isPasswordValid)
                return BadRequest("Invalid email or password");

            // Générez le token JWT
            var token = TokenService.GenerateToken(user);

            // Retournez le token JWT dans la réponse
            return Ok(new { token, user });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> UpdateUser(int id, User request)
        {
            var result = await _userService.UpdateUser(id, request);
            if (result is null)
                return NotFound("User not found");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var result = await _userService.DeleteUser(id);
            if (result is null)
                return NotFound("User not found");
            return Ok(result);

        }
    }
}