﻿using Alif.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Specifications
{
    public class BaseSpecifications<T> : ISpecifications<T> where T : BaseEntity
    {
        public Expression<Func<T, bool>> Criteria { get; set; } = null;
        public List<Expression<Func<T, object>>> Includes { get ; set ; } = new List<Expression<Func<T, object>>>();

        public BaseSpecifications()
        {
           //ncludes = new List<Expression<Func<T, object>>> ();//all Animal when Criteria is null
           
        }

        public BaseSpecifications(Expression<Func<T, bool>> criteriaExpression)
        {
            Criteria = criteriaExpression; // a => a.id ==10            //spacific animal

           //ncludes = new List<Expression<Func<T, object>>>();

        }
    }
}
