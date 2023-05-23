namespace JobtrekSuivisAPI.Services.CompetenceService;

public interface ICompetenceService
{
    Task<List<Competence>> GetAllCompetences();

    Task<Competence?> GetSingleCompetence(int id);

    Task<List<Competence>> AddCompetence(Competence competence);

    Task<List<Competence>?> UpdateCompetence(int id, Competence request);
    
    Task<List<Competence>?> DeleteCompetence(int id);
}