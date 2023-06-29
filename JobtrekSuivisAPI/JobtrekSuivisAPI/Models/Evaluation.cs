using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace JobtrekSuivisAPI.Models
{
    public class Evaluation
    {
        [Key]
        public int IdEvaluation { get; set; }

        public string commentaire_eval { get; set; }
        public int note_eval { get; set; }

        public int? CompetenceId { get; set; }
        [JsonIgnore]
        public Competence? Competence { get; set; }

        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        public int? UserProjetId { get; set; }
        [JsonIgnore]
        public UserProjet? UserProjet { get; set; }
    }
}