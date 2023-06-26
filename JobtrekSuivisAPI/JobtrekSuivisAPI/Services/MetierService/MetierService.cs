namespace JobtrekSuivisAPI.Services.MetierService;

public class MetierService : IMetierService
{
    private readonly DataContext _context;
    
    public MetierService(DataContext context)
    {
        _context = context;
    }
    
    public async Task<List<Metier>> GetAllMetiers()
    {
        var metiers = await _context.Metiers.ToListAsync();
        return metiers;
    }

    public async Task<Metier?> GetSingleMetier(int id)
    {
        var metier = await _context.Metiers.FindAsync(id);
        if (metier is null)
            return null;
        
        return metier;
    }

    public async Task<List<Metier>> AddMetier(Metier metier)
    {
        try
        {
            foreach (var domaine in metier.Domaines)
            {
                var existingDomaine = await _context.Domaines.FirstOrDefaultAsync(d => d.IdDomaine == domaine.IdDomaine);
                if (existingDomaine != null)
                {
                    domaine.IdDomaine = existingDomaine.IdDomaine;
                }
                else
                {
                    _context.Domaines.Add(domaine);
                }

                foreach (var competence in domaine.Competences)
                {
                    var existingCompetence = await _context.Competences.FirstOrDefaultAsync(c => c.IdCompetence == competence.IdCompetence);
                    if (existingCompetence != null)
                    {
                        competence.IdCompetence = existingCompetence.IdCompetence;
                    }
                    else
                    {
                        _context.Competences.Add(competence);
                    }

                    foreach (var moduleCompetence in competence.ModuleCompetences)
                    {
                        var existingModuleCompetence = await _context.ModuleCompetences.FirstOrDefaultAsync(mc => mc.IdModuleCompetence == moduleCompetence.IdModuleCompetence);
                        if (existingModuleCompetence != null)
                        {
                            moduleCompetence.IdModuleCompetence = existingModuleCompetence.IdModuleCompetence;
                        }
                        else
                        {
                            _context.ModuleCompetences.Add(moduleCompetence);
                        }
                    }
                }
            }
            
            _context.Metiers.Add(metier);
            await _context.SaveChangesAsync();
            
            var result = await _context.Metiers
                .Include(m => m.Domaines)
                    .ThenInclude(d => d.Competences)
                        .ThenInclude(c => c.ModuleCompetences)
                            .ThenInclude(mc => mc.Module)
                .ToListAsync();

            return result;
        }
        catch (Exception ex)
        {
            throw new Exception($"Une erreur s'est produite lors de l'ajout du métier : {ex.Message}");
        }
    }



    public async Task<List<Metier>?> UpdateMetier(int id, Metier request)
    {
        var metier = await _context.Metiers.FindAsync(id);
        if (metier is null)
            return null;
        
        metier.NomMetier = request.NomMetier;

        await _context.SaveChangesAsync();
        
        return await _context.Metiers.ToListAsync();
    }

    public async Task<List<Metier>?> DeleteMetier(int id)
    {
        var metier = await _context.Metiers.FindAsync(id);
        if (metier is null)
            return null;

        _context.Metiers.Remove(metier);
        await _context.SaveChangesAsync();
        
        return await _context.Metiers.ToListAsync();
    }
}