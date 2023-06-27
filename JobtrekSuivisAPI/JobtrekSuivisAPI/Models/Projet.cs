using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JobtrekSuivisAPI.Models;

public class Projet
{
    [Key]
    public int IdProjet { get; set; }
    
    public string nom_projet { get; set; }
    public string desc_projet { get; set; }
    public string time_estimed { get; set; }
    
    public int MetierId { get; set; }
    public Metier Metier { get; set; } = null!;
}