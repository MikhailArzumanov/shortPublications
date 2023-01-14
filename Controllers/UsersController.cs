using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors;
using publicationsApi.Models;
using publicationsApi.Data;
using publicationsApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace publicationsApi.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsAllowAny")]
    public class UsersController : ControllerBase {
        private ApplicationContext db;
        private IConfiguration config;

        const string AUTH_ERROR        = "Авторизационные данные некорректны.";
        const string ID_NOT_FOUND      = "Пользователь с заданным идентификатором не найден.";
        const string AUTH_NOT_FOUND    = "Пользователь с заданным авторизационными данными отсутствует.";
        const string LOGIN_OCCUPIED    = "Логин занят.";
        const string USERNAME_OCCUPIED = "Имя пользователя занято.";
        const string WAS_BANNED        = "Пользователь был заблокирован.";
        const string USER_TOKEN_TYPE  = "user";
        const string ADMIN_TOKEN_TYPE = "admin";

        public UsersController(ApplicationContext context, IConfiguration config) {
            this.db = context;
            this.config = config;
        }

        [HttpPost("token")]
        public IActionResult Login([FromBody] AuthData data){
            var login    = data.Login;
            var password = PasswordHasher.Hash(data.Password);
            var entry = db.Users.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (entry == null) return NotFound(AUTH_NOT_FOUND);
            var tokenType = entry.IsAdmin ? ADMIN_TOKEN_TYPE : USER_TOKEN_TYPE;
            var token = TokenHandler.BuildToken(new string[] {tokenType}, config);
            return Ok(new { token = token, authData = data, user=entry });
        }

        private string CheckUser(User user){
            var previous = db.Users.FirstOrDefault(x => x.Login == user.Login);
            if (previous != null) return LOGIN_OCCUPIED;
            previous = db.Users.FirstOrDefault(x => x.Username == user.Username);
            if (previous != null) return USERNAME_OCCUPIED;
            return "";
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] FullUser userData){
            var user = userData.toUser();
            user.Password = PasswordHasher.Hash(user.Password);
            var checkResult = CheckUser(user);
            if (checkResult != "") return BadRequest(checkResult);
            user.IsAdmin = false;
            user.WasBanned = false;
            db.Users.Add(user);
            db.SaveChanges();
            return Ok(userData);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult RedactEntry([FromRoute] int id, [FromBody] UserRedactionRequest request){
            var previous = db.Users.FirstOrDefault(x => x.Id == id);
            if (previous == null) return NotFound(ID_NOT_FOUND);
            if (previous.WasBanned) return BadRequest(WAS_BANNED);
            var login    = request.authData.Login;
            var password = PasswordHasher.Hash(request.authData.Password);
            if (previous.Login != login || previous.Password != password)
                return BadRequest(AUTH_ERROR);
            var user = request.userData.toUser();
            var checkResult = CheckUser(user);
            if (checkResult != "") return BadRequest(checkResult);
            user.IsAdmin = false;
            user.Password = PasswordHasher.Hash(user.Password);
            previous = user;
            db.Users.Update(previous);
            db.SaveChanges();
            return Ok(previous);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("admin/ban/{id}")]
        public IActionResult BanUser([FromRoute] int id){
            var user = db.Users.FirstOrDefault(x => x.Id == id);
            user.WasBanned = true;
            db.Users.Update(user);
            db.SaveChanges();
            return Ok(user);
        }

        public class UserRedactionRequest{
            public AuthData authData { get; set; }
            public FullUser userData { get; set; }
        }

    }
}