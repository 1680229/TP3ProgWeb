using GallerieInfinie.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace GallerieInfinie.Data
{
    public class GenericService<T> where T : class
    {
        protected readonly GallerieInfinieContext _context;
        public GenericService(GallerieInfinieContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<T?> Get(int id)
        {
            if (_context.Set<T>() == null)
            {
                return null;
            }
            var t = await _context.Set<T>().FindAsync(id);
            if (t == null) { return null; }
            return t;
        }
        public async Task<T?> Post(T t)
        {
            if (_context.Set<T>() == null)
            {
                return null;
            }
            _context.Set<T>().Add(t);
            await _context.SaveChangesAsync();
            return t;
        }
        public async Task Delete(int id)
        {
            if (_context.Set<T>() == null)
            {
                return;
            }
            var t = await _context.Set<T>().FindAsync(id);
            if (t == null) 
            {
                return;
            }
            _context.Set<T>().Remove(t);
            await _context.SaveChangesAsync();
        }
        public async Task<T?> Put(int id , T t)
        {
            _context.Entry(t).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) 
            {
                if(await _context.Set<T>().FindAsync(id) == null)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            return t;
        }
        public async Task<T?> GetUserById(string id)
        {
            return await _context.Set<T>().FindAsync(id);
        }
        public bool IsGallerySetEmpty()
        {
            return _context.Gallery == null;
        }
        public async Task CreateGallery(User user, Gallery gallery)
        {
            user.Galleries.Add(gallery);
            gallery.Owners.Add(user);
            _context.Gallery.Add(gallery);
            await _context.SaveChangesAsync();
        }
    }
}
