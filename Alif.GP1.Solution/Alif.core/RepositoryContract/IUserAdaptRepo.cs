using Alif.Core.Entities;
using Alif.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.RepositoryContract
{
    public interface IUserAdaptRepo<T> where T : class
    {
        Task<T?> GetAsync(int id);

        //Task<IEnumerable<T>> GetAllAsync();

       // Task<IEnumerable<T>> GetAllWithSpecAsync(ISpecifications<T> spec);
        //Task<T?> GetWithSpecAsync(ISpecifications<T> spec);

        Task AddAsync(T entity);
        //void Update(T entity);
       // void Remove(T entity);
    }
}
