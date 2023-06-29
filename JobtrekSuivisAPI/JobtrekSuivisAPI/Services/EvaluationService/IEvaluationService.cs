using System.Collections.Generic;
using System.Threading.Tasks;
using JobtrekSuivisAPI.Models;

namespace JobtrekSuivisAPI.Services.EvaluationService
{
    public interface IEvaluationService
    {
        Task<IEnumerable<Evaluation>> GetEvaluations();
        Task<Evaluation> GetEvaluation(int id);
        Task<Evaluation> CreateEvaluation(Evaluation evaluation);
        Task UpdateEvaluation(int id, Evaluation evaluation);
        Task DeleteEvaluation(int id);
    }
}