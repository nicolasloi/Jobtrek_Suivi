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
                .Include(c => c.ModuleCompetences)
                .ThenInclude(mc => mc.Module)
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
