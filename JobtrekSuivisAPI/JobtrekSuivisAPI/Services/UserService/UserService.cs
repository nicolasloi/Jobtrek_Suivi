namespace JobtrekSuivisAPI.Services.UserService;

using Utilities;

public class UserService : IUserService
{
    private readonly DataContext _context;
    public UserService(DataContext context)
    {
        _context = context;
    }
    
    public async Task<List<User>> GetAllUsers()
    {
        var users = await _context.Users
            .Include(user => user.Metier)
            .Include(user => user.Role)
            .ToListAsync();
        return users;
    }

    public async Task<User?> GetSingleUser(int id)
    {
        var user = await _context.Users
            .Include(user => user.Metier)
            .Include(user => user.Role)
            .FirstOrDefaultAsync(user => user.Id == id);
        
        if (user is null)
            return null;
        
        return user;
    }

    public async Task<List<User>> AddUser(User user)
    {
        
        var metier = await _context.Metiers.FirstOrDefaultAsync(m => m.Id == user.MetierId);
    
        if (metier is null)
        {
            throw new Exception("Le métier spécifié est invalide.");
        }
        
        var role = await _context.Roles.FirstOrDefaultAsync(r => r.IdRole == user.RoleId);
    
        if (role is null)
        {
            throw new Exception("Le rôle spécifié est invalide.");
        }

        user.password = BCrypt.Net.BCrypt.HashPassword(user.password);
        
        user.Metier = metier;
        
        user.Role = role;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    
        return await _context.Users.ToListAsync();
    }

    public async Task<List<User>?> UpdateUser(int id, User request)
    {
        var user = await _context.Users
            .Include(user => user.Metier)
            .Include(user => user.Role)
            .FirstOrDefaultAsync(user => user.Id == id);
    
        if (user is null)
            return null;

        // Vérifier si le rôle demandé existe déjà dans la base de données
        var role = await _context.Roles.FirstOrDefaultAsync(r => r.IdRole == request.RoleId);
    
        if (role is null)
        {
            // Gérer le cas où le rôle demandé n'existe pas
            // Par exemple, retourner une erreur indiquant que le rôle spécifié est invalide
            throw new Exception("Le rôle spécifié est invalide.");
        }

        // Vérifier si le métier demandé existe déjà dans la base de données
        var metier = await _context.Metiers.FirstOrDefaultAsync(m => m.Id == request.MetierId);
    
        if (metier is null)
        {
            // Gérer le cas où le métier demandé n'existe pas
            // Par exemple, retourner une erreur indiquant que le métier spécifié est invalide
            throw new Exception("Le métier spécifié est invalide.");
        }

        user.email = request.email;
        user.password = request.password;
        user.username = request.username;
        user.CreatedAt = request.CreatedAt;
        user.RoleId = request.RoleId;
        user.MetierId = request.MetierId;
        user.Role = role; // Mettre à jour la référence du rôle de l'utilisateur
        user.Metier = metier; // Mettre à jour la référence du métier de l'utilisateur

        await _context.SaveChangesAsync();
    
        return await _context.Users.ToListAsync();
    }

    public async Task<List<User>?> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
            return null;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        
        return await _context.Users.ToListAsync();
    }
    
    public async Task<User> GetUserByEmail(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.email == email);
        return user;
    }


}