using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobtrekSuivisAPI.Services.MetierService;


namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class MetierController : Controller
    {

    private readonly IMetierService _metierService;

        public MetierController(IMetierService metierService)
        {
            _metierService = metierService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Metier>>> GetAllMetiers()
        {
            return await _metierService.GetAllMetiers();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Metier>> GetSingleMetier(int id)
        {
            var result = await _metierService.GetSingleMetier(id);
            if (result is null)
                return NotFound("Metier not found");
            return Ok(result);
        }
        
        [HttpPost]
        public async Task<ActionResult<List<Metier>>> AddMetier(Metier metier)
        {
            var result = await _metierService.AddMetier(metier);
            return Ok(result);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Metier>>> UpdateMetier(int id, Metier request)
        {
            var result = await _metierService.UpdateMetier(id, request);
            if (result is null)
                return NotFound("Metier not found");
            return Ok(result);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Metier>>> DeleteMetier(int id)
        {
            var result = await _metierService.DeleteMetier(id);
            if (result is null)
                return NotFound("Metier not found");
            return Ok(result);
        }
    }
}