using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobtrekSuivisAPI.Models;
using JobtrekSuivisAPI.Services.CompetenceService;

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
            var competences = await _competenceService.GetAllCompetences();
            return Ok(competences);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Competence>> GetSingleCompetence(int id)
        {
            var competence = await _competenceService.GetSingleCompetence(id);
            if (competence is null)
            {
                return NotFound("Competence not found");
            }
            return Ok(competence);
        }

        [HttpPost]
        public async Task<ActionResult<List<Competence>>> AddCompetence(Competence competence)
        {
            var competences = await _competenceService.AddCompetence(competence);
            return Ok(competences);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Competence>>> UpdateCompetence(int id, Competence request)
        {
            var competences = await _competenceService.UpdateCompetence(id, request);
            if (competences is null)
            {
                return NotFound("Competence not found");
            }
            return Ok(competences);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Competence>>> DeleteCompetence(int id)
        {
            var competences = await _competenceService.DeleteCompetence(id);
            if (competences is null)
            {
                return NotFound("Competence not found");
            }
            return Ok(competences);
        }
    }
}
