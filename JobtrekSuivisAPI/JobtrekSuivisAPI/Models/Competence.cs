using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models;

public class Competence
{
    [Key]
    public int IdCompetence { get; set; }

    public string nom_competence { get; set; }
    public string desc_competence { get; set; }
    
    public int DomaineId { get; set; }
    public Domaine Domaine { get; set; } = null!;
    
    public List<Module> Modules { get; set; }
}