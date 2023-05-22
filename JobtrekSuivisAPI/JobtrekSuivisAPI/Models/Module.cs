using System.ComponentModel.DataAnnotations;

namespace JobtrekSuivisAPI.Models;

public class Module
{
    [Key]
    public int IdModule { get; set; }

    public string nom_module { get; set; }
    public bool lieu_module { get; set; }
    
    public List<Competence> Competences { get; set; }
}