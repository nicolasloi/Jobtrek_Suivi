using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JobtrekSuivisAPI.Models;

public class Metier
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Le nom du metier est obligatoire.")]
    [RegularExpression(@"^[a-zA-Z0-9\s-]+$", ErrorMessage = "Le nom du métier ne doit contenir que des lettres, des chiffres, des espaces et des tirets.")]
    [StringLength(75, ErrorMessage = "Le nom du metier ne peut pas dépasser 30 caractères.")]
    public string nom_metier { get; set; }

    [JsonIgnore]
    public ICollection<User> Users { get; set; } = new List<User>();
    [JsonIgnore]
    public ICollection<Projet> Projets { get; set; } = new List<Projet>();
    [JsonIgnore]
    public ICollection<Domaine> Domaines { get; set; } = new List<Domaine>();
}