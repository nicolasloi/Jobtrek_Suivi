using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobtrekSuivisAPI.Models;

namespace JobtrekSuivisAPI.Services.EvaluationService
{
    public class EvaluationService : IEvaluationService
    {
        private readonly DataContext _context;

        public EvaluationService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Evaluation>> GetEvaluations()
        {
            return await _context.Evaluations.ToListAsync();
        }

        public async Task<Evaluation> GetEvaluation(int id)
        {
            return await _context.Evaluations.FindAsync(id);
        }

        public async Task<Evaluation> CreateEvaluation(Evaluation evaluation)
        {
            _context.Evaluations.Add(evaluation);
            await _context.SaveChangesAsync();
            return evaluation;
        }

        public async Task UpdateEvaluation(int id, Evaluation evaluation)
        {
            if (id != evaluation.IdEvaluation)
            {
                throw new ArgumentException("ID mismatch");
            }

            _context.Entry(evaluation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEvaluation(int id)
        {
            var evaluation = await _context.Evaluations.FindAsync(id);
            if (evaluation == null)
            {
                throw new Exception("Evaluation not found");
            }

            _context.Evaluations.Remove(evaluation);
            await _context.SaveChangesAsync();
        }
    }
}