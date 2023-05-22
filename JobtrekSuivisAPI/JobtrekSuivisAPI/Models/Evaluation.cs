using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models;

public class Evaluation
{
    [Key]
    public int IdEvaluation { get; set; }

    public string commentaire_eval { get; set; }
    public int note_eval { get; set; }

    public int CompetenceId { get; set; }
    public Competence Competence { get; set; } = null!;
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public int UserProjetId { get; set; }
    public UserProjet UserProjet { get; set; } = null!;
}