namespace JobtrekSuivisAPI.Services.MetierService;

public interface IMetierService
{
    Task<List<Metier>> GetAllMetiers();

    Task<Metier?> GetSingleMetier(int id);

    Task<List<Metier>> AddMetier(Metier metier);

    Task<List<Metier>?> UpdateMetier(int id, Metier request);
    
    Task<List<Metier>?> DeleteMetier(int id);
}