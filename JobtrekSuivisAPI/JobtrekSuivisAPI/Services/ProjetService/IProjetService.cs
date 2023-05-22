namespace JobtrekSuivisAPI.Services.ProjetService;

public interface IProjetService
{
    Task<List<Projet>> GetAllProjets();

    Task<Projet?> GetSingleProjet(int id);

    Task<List<Projet>> AddProjet(Projet projet);

    Task<List<Projet>?> UpdateProjet(int id, Projet request);
    
    Task<List<Projet>?> DeleteProjet(int id);
}