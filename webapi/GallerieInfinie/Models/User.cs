using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GallerieInfinie.Models
{
    public class User : IdentityUser
    {
        [JsonIgnore]
        public virtual List<Gallery> Galleries { get; set; } = null!;
    }
}
