//using Alif.Core.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Alif.Core.Specifications.AnimalSpecification
//{
//    public class AnimalWithCategorySpecification : BaseSpecifications<Animals>
//    {
//        public AnimalWithCategorySpecification(string type)
//            : base(a=>a.Type=type)
//        {
//            Includes.Add(a => a.Type);
//            //Includes.Add(b=>b.User);
//            //Includes.Add(a=>a.AnimalImages);

//        }
//        //public AnimalWithCategorySpecification(int id)
//        //    : base(a => a.Id == id)
//        //{
//        //    Includes.Add(a => a.Type);
//        //    //Includes.Add(b => b.User);
//        //    //Includes.Add(a=>a.AnimalImages);

//        //}

//    }
//}
