using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models;

public class Domaine
{
    [Key]
    public int IdDomaine { get; set; }

    public string domaine_competence { get; set; }
    
    public int MetierId { get; set; }
    
    public Metier Metier { get; set; } = null!;
    
    public ICollection<Competence> Competences { get; } = new List<Competence>();
}