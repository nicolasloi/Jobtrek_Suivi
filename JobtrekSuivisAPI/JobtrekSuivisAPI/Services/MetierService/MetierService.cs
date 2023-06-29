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
        _context.Metiers.Add(metier);
        await _context.SaveChangesAsync();

        foreach (var domaine in metier.Domaines)
        {
            domaine.MetierId = metier.Id;
            _context.Domaines.Add(domaine);

            foreach (var competence in domaine.Competences)
            {
                competence.DomaineId = domaine.IdDomaine;
                _context.Competences.Add(competence);

                foreach (var module in competence.ModuleCompetences)
                {
                    var moduleCompetence = new ModuleCompetence
                    {
                        CompetenceId = competence.IdCompetence,
                        ModuleId = module.Module.IdModule
                    };

                    _context.ModuleCompetences.Add(moduleCompetence);
                }
            }
        }

        await _context.SaveChangesAsync();

        var metiers = await _context.Metiers
            .Include(m => m.Domaines)
            .ThenInclude(d => d.Competences)
            .ThenInclude(c => c.ModuleCompetences)
            .ThenInclude(mc => mc.Module)
            .ToListAsync();

        return metiers;
    }

    public async Task<List<Metier>?> UpdateMetier(int id, Metier request)
    {
        var metier = await _context.Metiers.FindAsync(id);
        if (metier is null)
            return null;
        
        metier.nom_metier = request.nom_metier;

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