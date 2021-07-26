using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestAppABTest.Models;

namespace TestAppABTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        static ABTestContext dbContext = new ABTestContext();
        static List<User> data;
        static UsersController()
        {
            while(data == null)
            {
                data = dbContext.Users.ToList();
            }
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return data;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] string registrationDate, [FromForm] string lastActivityDate)
        {
            User User = new();
            User.RegistrationDate = DateTime.ParseExact(registrationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            User.LastActivityDate = DateTime.ParseExact(lastActivityDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            dbContext.Users.Add(User);
            await dbContext.SaveChangesAsync();
            User.Id = dbContext.Users.OrderBy(user => user.Id).Last().Id;
            data.Add(User);
            return Ok(User);
        }

        [HttpPut("{id}")]
        public IActionResult Put([FromForm]int id, [FromForm] string registrationDate, [FromForm] string lastActivityDate)
        {
            User User = data.FirstOrDefault(x => x.Id == id);
            if (User == null)
            {
                return NotFound();
            }
            User.RegistrationDate = DateTime.ParseExact(registrationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            User.LastActivityDate = DateTime.ParseExact(lastActivityDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            dbContext.SaveChangesAsync();
            return Ok(User);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            User User = data.FirstOrDefault(x => x.Id == id);
            if (User == null)
            {
                return NotFound();
            }
            dbContext.Users.Remove(User);
            dbContext.SaveChangesAsync();
            data.Remove(User);
            return Ok(User);
        }
    }
}
