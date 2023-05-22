namespace JobtrekSuivisAPI.Services.DomaineService;

public interface IDomaineService
{
    Task<List<Domaine>> GetAllDomaines();

    Task<Domaine?> GetSingleDomaine(int id);

    Task<List<Domaine>> AddDomaine(Domaine domaine);

    Task<List<Domaine>?> UpdateDomaine(int id, Domaine request);
    
    Task<List<Domaine>?> DeleteDomaine(int id);
}