using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace publicationsApi.Models{
    public class FullUser{
        public int    Id        { get; set; }
        public string Login     { get; set; }
        public string Password  { get; set; }
        public string Username  { get; set; }
        public bool   IsAdmin   { get; set; }
        public bool   WasBanned { get; set; }
        public User toUser() { return new User { Id = Id, Login = Login, Password = Password, Username = Username, IsAdmin = IsAdmin, WasBanned = WasBanned }; }
    }
}
