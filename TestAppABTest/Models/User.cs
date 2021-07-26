using System;

namespace TestAppABTest.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime LastActivityDate { get; set; }
    }
}
