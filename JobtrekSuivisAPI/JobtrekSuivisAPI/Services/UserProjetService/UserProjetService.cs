using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobtrekSuivisAPI.Data;

namespace JobtrekSuivisAPI.Services.UserProjetService
{
    public class UserProjetService : IUserProjetService
    {
        private readonly DataContext _context;

        public UserProjetService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<UserProjet>> GetAllUserProjets()
        {
            var userProjets = await _context.UserProjets
                .Include(up => up.User)
                .Include(up => up.Projet)
                .ToListAsync();
            return userProjets;
        }

        public async Task<UserProjet?> GetSingleUserProjet(int id)
        {
            var userProjet = await _context.UserProjets
                .Include(up => up.User)
                .Include(up => up.Projet)
                .FirstOrDefaultAsync(up => up.IdUserProjet == id);

            return userProjet;
        }

        public async Task<List<UserProjet>> AddUserProjet(UserProjet userProjet)
        {
            var existingUser = await _context.Users.FindAsync(userProjet.UserId);
            if (existingUser is null)
            {
                throw new Exception("L'utilisateur spécifié est invalide.");
            }

            var existingProjet = await _context.Projets.FindAsync(userProjet.ProjetId);
            if (existingProjet is null)
            {
                throw new Exception("Le projet spécifié est invalide.");
            }

            userProjet.User = existingUser;
            userProjet.Projet = existingProjet;

            _context.UserProjets.Add(userProjet);
            await _context.SaveChangesAsync();

            return await _context.UserProjets.ToListAsync();
        }



        public async Task<List<UserProjet>?> UpdateUserProjet(int id, UserProjet request)
        {
            var userProjet = await _context.UserProjets
                .Include(up => up.User)
                .Include(up => up.Projet)
                .FirstOrDefaultAsync(up => up.IdUserProjet == id);

            if (userProjet is null)
                return null;

            var user = await _context.Users.FindAsync(request.UserId);
            if (user is null)
            {
                throw new Exception("L'utilisateur spécifié est invalide.");
            }

            var projet = await _context.Projets.FindAsync(request.ProjetId);
            if (projet is null)
            {
                throw new Exception("Le projet spécifié est invalide.");
            }

            userProjet.DateCommencement = request.DateCommencement;
            userProjet.DateRendu = request.DateRendu;
            userProjet.UserId = request.UserId;
            userProjet.ProjetId = request.ProjetId;
            userProjet.User = user;
            userProjet.Projet = projet;

            await _context.SaveChangesAsync();

            return await _context.UserProjets.ToListAsync();
        }

        public async Task<List<UserProjet>?> DeleteUserProjet(int id)
        {
            var userProjet = await _context.UserProjets.FindAsync(id);

            if (userProjet == null)
                return null;

            _context.UserProjets.Remove(userProjet);
            await _context.SaveChangesAsync();
            return await _context.UserProjets.ToListAsync();
        }
    }
}
