using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JobtrekSuivisAPI.Models;

public class Domaine
{
    [Key]
    public int IdDomaine { get; set; }

    public string domaine_competence { get; set; }
    [JsonIgnore]
    public int MetierId { get; set; }
    
    [JsonIgnore]
    public Metier Metier { get; set; } = null!;
    
    
    public ICollection<Competence> Competences { get; } = new List<Competence>();
}