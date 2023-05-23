using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobtrekSuivisAPI.Data;
using JobtrekSuivisAPI.Models;

namespace JobtrekSuivisAPI.Services.CompetenceService
{
    public class CompetenceService : ICompetenceService
    {
        private readonly DataContext _context;

        public CompetenceService(DataContext context)
        {
            _context = context;
        }

public async Task<List<Competence>> GetAllCompetences()
{
    var competences = await _context.Competences
        .Include(c => c.Domaine)
        .ToListAsync();

    return competences;
}

public async Task<Competence?> GetSingleCompetence(int id)
{
    var competence = await _context.Competences
        .Include(c => c.Domaine)
        .FirstOrDefaultAsync(c => c.IdCompetence == id);

    if (competence is null)
        return null;

    competence.Modules = await _context.ModuleCompetences
        .Where(mc => mc.CompetenceId == competence.IdCompetence)
        .Select(mc => mc.Module)
        .ToListAsync();

    return competence;
}

public async Task<List<Competence>> AddCompetence(Competence competence)
{
    var existingDomaine = await _context.Domaines.FindAsync(competence.DomaineId);
    if (existingDomaine is null)
    {
        throw new Exception("Le domaine spécifié est invalide.");
    }

    competence.Domaine = existingDomaine;

    if (competence.Modules != null && competence.Modules.Any())
    {
        var moduleIds = competence.Modules.Select(m => m.IdModule).ToList();
        var existingModules = await _context.Modules.Where(m => moduleIds.Contains(m.IdModule)).ToListAsync();
        if (existingModules.Count != moduleIds.Count)
        {
            throw new Exception("Certains modules spécifiés sont invalides.");
        }

        competence.Modules = existingModules;
    }

    _context.Competences.Add(competence);
    await _context.SaveChangesAsync();

    return await GetAllCompetences();
}

public async Task<List<Competence>?> UpdateCompetence(int id, Competence request)
{
    var competence = await _context.Competences
        .Include(c => c.Domaine)
        .FirstOrDefaultAsync(c => c.IdCompetence == id);

    if (competence is null)
        return null;

    var existingDomaine = await _context.Domaines.FindAsync(request.DomaineId);
    if (existingDomaine is null)
    {
        throw new Exception("Le domaine spécifié est invalide.");
    }

    competence.nom_competence = request.nom_competence;
    competence.desc_competence = request.desc_competence;
    competence.DomaineId = request.DomaineId;
    competence.Domaine = existingDomaine;

    if (request.Modules != null && request.Modules.Any())
    {
        var moduleIds = request.Modules.Select(m => m.IdModule).ToList();
        var existingModules = await _context.Modules.Where(m => moduleIds.Contains(m.IdModule)).ToListAsync();
        if (existingModules.Count != moduleIds.Count)
        {
            throw new Exception("Certains modules spécifiés sont invalides.");
        }

        competence.Modules = existingModules;
    }
    else
    {
        competence.Modules.Clear();
    }

    await _context.SaveChangesAsync();

    return await GetAllCompetences();
}

public async Task<List<Competence>?> DeleteCompetence(int id)
{
    var competence = await _context.Competences.FindAsync(id);
    if (competence is null)
    {
        return null;
    }

    _context.Competences.Remove(competence);
    await _context.SaveChangesAsync();

    return await GetAllCompetences();
}

    }
}
