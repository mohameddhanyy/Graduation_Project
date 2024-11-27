using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository
{
    public class UserAdaptRepo<T> : IUserAdaptRepo<T> where T : class
    {
        private readonly AlifContext _dbContext;

        public UserAdaptRepo(AlifContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            _dbContext.SaveChanges();
        }

        public async Task<T?> GetAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

    }
}
