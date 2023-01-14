using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using publicationsApi.Models;
using publicationsApi.Data;
using publicationsApi.Utils;

namespace publicationsApi.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsAllowAny")]
    public class PublicationsController : ControllerBase {

        private ApplicationContext db;
        private IConfiguration config;

        const string USER_NOT_FOUND = "Пользователь с заданными авторизационными данными не найден.";
        const string USER_WAS_BANNED = "Пользователь был заблокирован.";
        const string COMMENTARIES_IS_NOT_EMPTY = "Обнаружены заданные комментарии при создании публикации.";
        const string ID_NOT_FOUND = "Запись с заданным идентификатором не найдена.";
        const string USERS_DOESNT_MATCH = "Пользователь и автор не совпадают.";

        public PublicationsController(ApplicationContext context, IConfiguration config) {
            this.db = context;
            this.config = config;
        }

        [HttpGet]
        public IActionResult GetList([FromQuery] int pageSize, [FromQuery] int lastId){
            var publications = db.Publications.Include(x => x.Author).Where(x => lastId == 0 || x.Id < lastId).OrderBy(x => -x.Id).Take(pageSize).ToArray();
            if(publications.Any())
                lastId = publications.Last().Id;
            return Ok(new { publications = publications, lastId = lastId });
        }

        [HttpGet("{id}")]
        public IActionResult GetConcrete([FromRoute] int id){
            var publication = db.Publications.FirstOrDefault(x => x.Id == id);
            if (publication == null) return NotFound(ID_NOT_FOUND);
            return Ok(publication);
        }

        [HttpPost]
        public IActionResult Publicate([FromBody] PublicationRequest request) {
            var user = AuthValidator.GetUser(db, request.authData);
            if (user == null) return NotFound(USER_NOT_FOUND);
            if (user.WasBanned) return BadRequest(USER_WAS_BANNED);
            var result = request.publication;
            result.Author = user;
            result.SetTime = DateTime.Now;
            if (result.Commentaries.Count() > 0)
                return BadRequest(COMMENTARIES_IS_NOT_EMPTY);
            db.Publications.Add(result);
            db.SaveChanges();
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Redact([FromBody] PublicationRequest request, [FromRoute] int id) {
            var user = AuthValidator.GetUser(db, request.authData);
            if (user == null) return NotFound(USER_NOT_FOUND);
            if (user.WasBanned) return BadRequest(USER_WAS_BANNED);
            var previous = db.Publications.FirstOrDefault(x => x.Id == id);
            if (previous == null) return NotFound(ID_NOT_FOUND);
            if (!user.IsAdmin && previous.Author.Id != user.Id) 
                return BadRequest(USERS_DOESNT_MATCH);
            previous.Text = request.publication.Text;
            db.Publications.Update(previous);
            db.SaveChanges();
            return Ok(previous);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromBody] AuthData authData, [FromRoute] int id){
            var user = AuthValidator.GetUser(db, authData);
            if (user == null) return NotFound(USER_NOT_FOUND);
            if (user.WasBanned) return BadRequest(USER_WAS_BANNED);
            var previous = db.Publications.FirstOrDefault(x => x.Id == id);
            if (previous == null) return NotFound(ID_NOT_FOUND);
            if (!user.IsAdmin && previous.Author.Id != user.Id) 
                return BadRequest(USERS_DOESNT_MATCH);
            db.Publications.Remove(previous);
            db.SaveChanges();
            return Ok(previous);
        }

        public class PublicationRequest{
            public Publication publication { get; set; }
            public AuthData    authData    { get; set; }
        }
    }
}
