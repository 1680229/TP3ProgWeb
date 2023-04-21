using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GallerieInfinie.Data;
using GallerieInfinie.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace GallerieInfinie.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GalleriesController : ControllerBase
    {
        private readonly GenericService<Gallery> GalleryService;        
        private readonly GenericService<User> UserService;

        public GalleriesController(GenericService<Gallery> galleryService, GenericService<User> userService)
        {
            GalleryService = galleryService;
            UserService = userService;
        }

        // GET: api/MyGalleries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gallery>>> GetMyGalleries()
        {
            User? user = await UserService.GetUserById(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (GalleryService.IsGallerySetEmpty() || user == null) 
            {
                return NotFound();
            }
            return user.Galleries;
        }

        // GET: api/Galleries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gallery>>> GetGalleries()
        {
            return Ok(await GalleryService.GetAll());
        }


        // GET: api/Galleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gallery>> GetGallery(int id)
        {
            Gallery? gallery = await GalleryService.Get(id);
            return gallery == null ? NotFound() : gallery;
        }

        // PUT: api/Galleries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGallery(int id, Gallery gallery)
        {
            User? user = await UserService.GetUserById(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (id != gallery.Id)
            {
                return BadRequest();
            }

            Gallery? oldGallery = await GalleryService.Get(id);

            if (user == null || GalleryService.IsGallerySetEmpty() || oldGallery == null) 
            {
                return NotFound();
            }

            if (!user.Galleries.Contains(oldGallery))
            {
                return Unauthorized(new { Message = "Ceci n'est pas votre galerie." });
            }

            Gallery? newGallery = await GalleryService.Put(id, gallery);

            if(newGallery == null)
            {
                return NotFound();
            }

            return Ok(new {Message = "Galerie modifiée."});
        }

        // POST: api/Galleries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Gallery>> PostGallery(Gallery gallery)
        {
            User? user = await UserService.GetUserById(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (GalleryService.IsGallerySetEmpty() || user == null)
            {
                return NotFound();
            }
            await GalleryService.CreateGallery(user, gallery);
            
            return CreatedAtAction("GetGallery", new { id = gallery.Id }, gallery);
        }

        // DELETE: api/Galleries/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteGallery(int id)
        {
            User? user = await UserService.GetUserById(User.FindFirstValue(ClaimTypes.NameIdentifier));

            //Galerie à supprimer
            var gallery = await GalleryService.Get(id);

            //Si rien n'est trouvé
            if(GalleryService.IsGallerySetEmpty() || user == null || gallery == null)
            {
                return NotFound();
            }

            //Si user n'est PAS proprio de la galerie
            if (!user.Galleries.Contains(gallery))
            {
                return Unauthorized(new { Message = "Ceci n'est pas votre galerie" });
            }

            //Supprimer la galerie
            await GalleryService.Delete(id);

            return Ok(new { Message = "Galerie supprimée."});
        }
    }
}
