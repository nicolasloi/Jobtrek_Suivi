namespace JobtrekSuivisAPI.Services.UserProjetService;

public interface IUserProjetService
{
    Task<List<UserProjet>> GetAllUserProjets();
    Task<UserProjet?> GetSingleUserProjet(int id);
    Task<List<UserProjet>> AddUserProjet(UserProjet userProjet);
    Task<List<UserProjet>?> UpdateUserProjet(int id, UserProjet request);
    Task<List<UserProjet>?> DeleteUserProjet(int id);
    Task<List<UserProjet>> GetProjetsByUserId(int userId);
}