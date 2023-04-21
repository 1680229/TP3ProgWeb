using Microsoft.Build.Framework;
using System.Text.Json.Serialization;

namespace GallerieInfinie.Models
{
    public class Gallery
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool IsPublic { get; set; }

        [JsonIgnore]
        public virtual List<User>? Owners { get; set; }
        
   //     public string Owner { get; set; }
    }
}
