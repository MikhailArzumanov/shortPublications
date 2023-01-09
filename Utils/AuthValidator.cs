using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using publicationsApi.Models;
using publicationsApi.Data;
using publicationsApi.Utils;

namespace publicationsApi.Utils{
    public class AuthValidator{
        public static User GetUser(ApplicationContext db, AuthData authData){
            var login    = authData.Login;
            var password = PasswordHasher.Hash(authData.Password);
            var user = db.Users.FirstOrDefault(x => x.Login == login && x.Password == password);
            return user;
        }
    }
}
