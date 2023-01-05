using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace publicationsApi.Models{
    public class Commentary{
        public int         Id           { get; set; }
        public string      Text         { get; set; }
        public DateTime    SetTime      { get; set; }
        public User        Author       { get; set; }
        public Publication Publication  { get; set; }
    }
}
