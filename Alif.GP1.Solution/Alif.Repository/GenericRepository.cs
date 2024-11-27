using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications;
using Alif.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly AlifContext _dbContext;

        public GenericRepository(AlifContext dbContext )
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(T entity)
        { 
            await _dbContext.Set<T>().AddAsync(entity); 
            _dbContext.SaveChanges();
        }
       

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            //if(typeof(T) ==  typeof(Animal))
               // return ( IEnumerable < T >) await _dbContext.Set<Animal>().Include(a=>a.Type).ToListAsync();
            return await _dbContext.Set<T>().ToListAsync();   
        }
        //public async Task<IEnumerable<T>> GetAllAsync(int id)
        //{
        //    //if(typeof(T) ==  typeof(Animal))
        //    // return ( IEnumerable < T >) await _dbContext.Set<Animal>().Include(a=>a.Type).ToListAsync();
        //    return await _dbContext.Set<T>().ToListAsync(id);
        //}

        public async Task<IEnumerable<T>> GetAllWithSpecAsync(ISpecifications<T> spec)
        {
            return await SpecificationsEvalutor<T>.GetQuery(_dbContext.Set<T>(), spec).ToListAsync();
        }

        public async Task<T?> GetAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<T?> GetWithSpecAsync(ISpecifications<T> spec)
        {
            return await SpecificationsEvalutor<T>.GetQuery(_dbContext.Set<T>(), spec).FirstOrDefaultAsync();
        }

        public Task ListAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Remove(T entity)
        =>_dbContext.Set<T>().Remove(entity);

        public void Update(T entity)
        =>_dbContext.Set<T>().Update(entity);
    }
}
