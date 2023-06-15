using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JobtrekSuivisAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "L'email est obligatoire.")]
        [RegularExpression(@"^[A-Za-z0-9._%+-]+@jobtrek\.ch$", ErrorMessage = "L'email doit se terminer par @jobtrek.ch.")]
        public string email { get; set; }
        
        [Required(ErrorMessage = "Le mot de passe est obligatoire.")]
        [MinLength(8, ErrorMessage = "Le mot de passe doit contenir au moins 8 caractères.")]
        public string password { get; set; }
        
        [Required(ErrorMessage = "Le nom d'utilisateur est obligatoire.")]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Le nom d'utilisateur ne doit contenir que des lettres.")]
        [StringLength(24, ErrorMessage = "Le nom d'utilisateur ne peut pas dépasser 30 caractères.")]
        public string username { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        [Range(1, 4, ErrorMessage = "L'année doit être comprise entre 1 et 4.")]
        public int year { get; set; }
        
        public int MetierId { get; set; }
        public Metier Metier { get; set; } = null!;
        
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;
    }
}