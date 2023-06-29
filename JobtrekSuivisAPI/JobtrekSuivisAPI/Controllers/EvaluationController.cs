using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobtrekSuivisAPI.Models;
using JobtrekSuivisAPI.Services;
using JobtrekSuivisAPI.Services.EvaluationService;

namespace JobtrekSuivisAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EvaluationController : ControllerBase
    {
        private readonly IEvaluationService _evaluationService;

        public EvaluationController(IEvaluationService evaluationService)
        {
            _evaluationService = evaluationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evaluation>>> GetEvaluations()
        {
            var evaluations = await _evaluationService.GetEvaluations();
            return Ok(evaluations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Evaluation>> GetEvaluation(int id)
        {
            var evaluation = await _evaluationService.GetEvaluation(id);
            if (evaluation == null)
            {
                return NotFound();
            }
            return Ok(evaluation);
        }

        [HttpPost]
        public async Task<ActionResult<Evaluation>> CreateEvaluation(Evaluation evaluation)
        {
            var createdEvaluation = await _evaluationService.CreateEvaluation(evaluation);
            return CreatedAtAction(nameof(GetEvaluation), new { id = createdEvaluation.IdEvaluation }, createdEvaluation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvaluation(int id, Evaluation evaluation)
        {
            await _evaluationService.UpdateEvaluation(id, evaluation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvaluation(int id)
        {
            await _evaluationService.DeleteEvaluation(id);
            return NoContent();
        }
    }
}