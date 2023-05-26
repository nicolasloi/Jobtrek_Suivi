using System;
using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models
{
    public class UserProjet
    {
        [Key]
        public int IdUserProjet { get; set; }
        
        public DateTime DateCommencement { get; set; } 
        public DateTime? DateRendu { get; set; }
        
        public int UserId { get; set; }
        public User? User { get; set; }
        
        public int ProjetId { get; set; }
        public Projet Projet { get; set; } = null!;
    }
}