using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JobtrekSuivisAPI.Models;

public class Role
{
    [Key]
    public int IdRole { get; set; }

    public string nom_role { get; set; }

    [JsonIgnore]
    public ICollection<User> Users { get; } = new List<User>();
}