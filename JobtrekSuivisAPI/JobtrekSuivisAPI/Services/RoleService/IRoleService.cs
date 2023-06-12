namespace JobtrekSuivisAPI.Services.RoleService;

public interface IRoleService
{
    Task<List<Role>> GetAllRoles();
}