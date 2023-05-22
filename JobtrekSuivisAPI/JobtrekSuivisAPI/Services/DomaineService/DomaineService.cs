using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobtrekSuivisAPI.Models;

namespace JobtrekSuivisAPI.Services.DomaineService
{
    public class DomaineService : IDomaineService
    {
        private readonly DataContext _context;

        public DomaineService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Domaine>> GetAllDomaines()
        {
            var domaines = await _context.Domaines
                .Include(d => d.Metier)
                .ToListAsync();
            return domaines;
        }

        public async Task<Domaine?> GetSingleDomaine(int id)
        {
            var domaine = await _context.Domaines
                .Include(d => d.Metier)
                .FirstOrDefaultAsync(d => d.IdDomaine == id);

            if (domaine is null)
                return null;

            return domaine;
        }

        public async Task<List<Domaine>> AddDomaine(Domaine domaine)
        {
            var metier = await _context.Metiers.FirstOrDefaultAsync(m => m.IdMetier == domaine.MetierId);

            if (metier is null)
            {
                throw new Exception("Le métier spécifié est invalide.");
            }

            domaine.Metier = metier;

            _context.Domaines.Add(domaine);
            await _context.SaveChangesAsync();

            return await _context.Domaines.ToListAsync();
        }

        public async Task<List<Domaine>?> UpdateDomaine(int id, Domaine request)
        {
            var domaine = await _context.Domaines
                .Include(d => d.Metier)
                .FirstOrDefaultAsync(d => d.IdDomaine == id);

            if (domaine is null)
                return null;

            var metier = await _context.Metiers.FirstOrDefaultAsync(m => m.IdMetier == request.MetierId);

            if (metier is null)
            {
                throw new Exception("Le métier spécifié est invalide.");
            }

            domaine.domaine_competence = request.domaine_competence;
            domaine.MetierId = request.MetierId;
            domaine.Metier = metier;

            await _context.SaveChangesAsync();

            return await _context.Domaines.ToListAsync();
        }

        public async Task<List<Domaine>?> DeleteDomaine(int id)
        {
            var domaine = await _context.Domaines.FindAsync(id);
            if (domaine is null)
                return null;

            _context.Domaines.Remove(domaine);
            await _context.SaveChangesAsync();

            return await _context.Domaines.ToListAsync();
        }
    }
}
