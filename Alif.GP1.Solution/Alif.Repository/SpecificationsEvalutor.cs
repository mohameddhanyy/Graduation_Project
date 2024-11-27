using Alif.Core.Entities;
using Alif.Core.Specifications;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Repository
{
    internal static class SpecificationsEvalutor<TEntity> where TEntity : BaseEntity
    {                                              //our dbset                   , 
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecifications<TEntity> spec)
        {
            var query = inputQuery;
            if (spec.Criteria is not null) //a=>a.id==1
                query = query.Where(spec.Criteria);
            //query = _dbset.set<animal>.where(a => a.id ==1)

            query = spec.Includes.Aggregate(query,(currentQuery,includeExpression)=>currentQuery.Include(includeExpression));
            return query;

        }
    }
}
