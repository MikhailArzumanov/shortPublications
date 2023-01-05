using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace publicationsApi.Models{
    public class Publication{
        public int                     Id           { get; set; }
        public string                  Text         { get; set; }
        public DateTime                SetTime      { get; set; }
        public User                    Author       { get; set; }
        public ICollection<Commentary> Commentaries { get; set; } = new List<Commentary>();
    }
}
