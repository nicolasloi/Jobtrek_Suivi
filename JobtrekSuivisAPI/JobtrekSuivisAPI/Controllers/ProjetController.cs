using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobtrekSuivisAPI.Services.ProjetService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProjetController : ControllerBase
    {
        private readonly IProjetService _projetService;

        public ProjetController(IProjetService projetService)
        {
            _projetService = projetService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Projet>>> GetAllProjets()
        {
            return await _projetService.GetAllProjets();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<SuperHero>> GetSingleHero(int id)
        {
            var result = await _projetService.GetSingleProjet(id);
            if (result is null)
                return NotFound("Projet not found");
            return Ok(result);
        }
        
        [HttpPost]
        public async Task<ActionResult<List<Projet>>> AddProjet(Projet projet)
        {
            var result = await _projetService.AddProjet(projet);
            return Ok(result);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Projet>>> UpdateProjet(int id, Projet request)
        {
            var result = await _projetService.UpdateProjet(id, request);
            if (result is null)
                return NotFound("Projet not found");
            return Ok(result);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Projet>>> DeleteProjet(int id)
        {
            var result = await _projetService.DeleteProjet(id);
            if (result is null)
                return NotFound("Projet not found");
            return Ok(result);
        }
    }
}
