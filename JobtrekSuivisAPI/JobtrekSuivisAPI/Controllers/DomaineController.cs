using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JobtrekSuivisAPI.Services.DomaineService;
using JobtrekSuivisAPI.Models;

namespace JobtrekSuivisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DomaineController : ControllerBase
    {
        private readonly IDomaineService _domaineService;

        public DomaineController(IDomaineService domaineService)
        {
            _domaineService = domaineService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Domaine>>> GetAllDomaines()
        {
            return await _domaineService.GetAllDomaines();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Domaine>> GetSingleDomaine(int id)
        {
            var result = await _domaineService.GetSingleDomaine(id);
            if (result is null)
                return NotFound("Domaine not found");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Domaine>>> AddDomaine(Domaine domaine)
        {
            var result = await _domaineService.AddDomaine(domaine);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Domaine>>> UpdateDomaine(int id, Domaine request)
        {
            var result = await _domaineService.UpdateDomaine(id, request);
            if (result is null)
                return NotFound("Domaine not found");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Domaine>>> DeleteDomaine(int id)
        {
            var result = await _domaineService.DeleteDomaine(id);
            if (result is null)
                return NotFound("Domaine not found");
            return Ok(result);
        }
    }
}