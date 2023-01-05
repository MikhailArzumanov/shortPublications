using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace publicationsApi.Models{
    public class User{
        public int    Id        { get; set; }
        [JsonIgnore]
        public string Login     { get; set; }
        [JsonIgnore]
        public string Password  { get; set; }
        public string Username  { get; set; }
        public bool   IsAdmin   { get; set; }
        public bool   WasBanned { get; set; }
    }
}
