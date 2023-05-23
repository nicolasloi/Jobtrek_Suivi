using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobtrekSuivisAPI.Services.CompetenceService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class CompetenceController : ControllerBase
    {
        
        private readonly ICompetenceService _competenceService;

        public CompetenceController(ICompetenceService competenceService)
        {
            _competenceService = competenceService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Competence>>> GetAllCompetences()
        {
            return await _competenceService.GetAllCompetences();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Competence>> GetSingleCompetence(int id)
        {
            var result = await _competenceService.GetSingleCompetence(id);
            if (result is null)
                return NotFound("Competence not found");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Competence>>> AddCompetence(Competence competence)
        {
            var result = await _competenceService.AddCompetence(competence);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Competence>>> UpdateCompetence(int id, Competence request)
        {
            var result = await _competenceService.UpdateCompetence(id, request);
            if (result is null)
                return NotFound("Competence not found");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Competence>>> DeleteCompetence(int id)
        {
            var result = await _competenceService.DeleteCompetence(id);
            if (result is null)
                return NotFound("Competence not found");
            return Ok(result);
        }
    }
}
