using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models;

public class CompetenceProjet
{
    [Key]
    public int IdCompetenceProjet { get; set; }
    
    public int CompetenceId { get; set; }
    public Competence Competence { get; set; } = null!;
    
    public int ProjetId { get; set; }
    public Projet Projet { get; set; } = null!;
}