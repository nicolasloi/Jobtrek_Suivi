using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models;

public class ModuleCompetence
{
    [Key]
        public int IdModuleCompetence { get; set; }
        
        public int CompetenceId { get; set; }
        public Competence Competence { get; set; } = null!;

        public int ModuleId { get; set; }
        public Module Module { get; set; } = null!;
}