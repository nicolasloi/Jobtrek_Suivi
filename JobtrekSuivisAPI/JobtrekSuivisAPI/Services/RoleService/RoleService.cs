namespace JobtrekSuivisAPI.Services.RoleService;

public class RoleService : IRoleService
{
    private readonly DataContext _context;
    
    public RoleService(DataContext context)
    {
        _context = context;
    }
    
    public async Task<List<Role>> GetAllRoles()
    {
        var roles = await _context.Roles.ToListAsync();
        return roles;
    }
}