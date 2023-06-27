namespace JobtrekSuivisAPI.Services.ProjetService;

public class ProjetService : IProjetService
{
    private readonly DataContext _context;
    
    public ProjetService(DataContext context)
    {
        _context = context;
    }
    
    public async Task<List<Projet>> GetAllProjets()
    {
        var projets = await _context.Projets
            .Include(p => p.Metier).ToListAsync();
        return projets;
    }

    public async Task<Projet?> GetSingleProjet(int id)
    {
        var projet = await _context.Projets
            .Include(p => p.Metier)
            .FirstOrDefaultAsync(p => p.Id == id);
        
        if (projet is null)
            return null;
        
        return projet;
    }

    public async Task<List<Projet>> AddProjet(Projet projet)
    {
        var metier = await _context.Metiers.FirstOrDefaultAsync(m => m.Id == projet.MetierId);

        if (metier is null)
        {
            throw new Exception("Le métier spécifié est invalide.");
        }
        
        projet.Metier = metier;
        
        _context.Projets.Add(projet);
        await _context.SaveChangesAsync();
        
        return await _context.Projets.ToListAsync();
    }

    public async Task<List<Projet>?> UpdateProjet(int id, Projet request)
    {
        var projet = await _context.Projets
            .Include(p => p.Metier)
            .FirstOrDefaultAsync(p => p.Id == id);
        
        if (projet is null)
            return null;
        
        var metier = await _context.Metiers.FirstOrDefaultAsync(m => m.Id == request.MetierId);
    
        if (metier is null)
        {
            throw new Exception("Le métier spécifié est invalide.");
        }

        projet.nom_projet = request.nom_projet;
        projet.desc_projet = request.desc_projet;
        projet.time_estimed = request.time_estimed;
        projet.MetierId = request.MetierId;
        projet.Metier = metier;
        
        await _context.SaveChangesAsync();
        
        return await _context.Projets.ToListAsync();
    }

    public async Task<List<Projet>?> DeleteProjet(int id)
    {
        var projet = await _context.Projets.FindAsync(id);
        if (projet is null)
            return null;

        _context.Projets.Remove(projet);
        await _context.SaveChangesAsync();
        
        return await _context.Projets.ToListAsync();
    }
}