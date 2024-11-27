using Alif.Core.Entities;
using Alif.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    public class ShelterController : Controller
    {
        private readonly AlifContext _context;

        public ShelterController(AlifContext context)
        {
            _context = context;
        }

        // GET: Shelter
        public async Task<IActionResult> Index()
        {
            return _context.Shelters != null ?
                        View(await _context.Shelters.ToListAsync()) :
                        Problem("Entity set 'Alif_databaseContext.Shelters' is null.");
        }

        // GET: Shelter/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Shelters == null)
            {
                return NotFound();
            }

            var shelter = await _context.Shelters
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shelter == null)
            {
                return NotFound();
            }

            return View(shelter);
        }

        // GET: Shelter/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Shelter/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,SEmail,SLocation,ManagerPhone,AvailablePlaces,SName,Image")] Shelter shelter)
        {
            Shelter s = _context.Shelters.FirstOrDefault();
            shelter.AppUserId = s.AppUserId;

            _context.Add(shelter);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Shelter/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Shelters == null)
            {
                return NotFound();
            }

            var shelter = await _context.Shelters.FindAsync(id);
            if (shelter == null)
            {
                return NotFound();
            }
            return View(shelter);
        }

        // POST: Shelter/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SEmail,SLocation,ManagerPhone,AvailablePlaces,SName,Image")] Shelter shelter)
        {
            Shelter s = _context.Shelters.FirstOrDefault(a => a.Id == id);
            shelter.AppUserId = s.AppUserId;
            _context.Entry<Shelter>(s).State = EntityState.Detached;

            if (id != shelter.Id)
            {
                return NotFound();
            }

            try
            {
                _context.Update(shelter);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShelterExists(shelter.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // GET: Shelter/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Shelters == null)
            {
                return NotFound();
            }

            var shelter = await _context.Shelters
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shelter == null)
            {
                return NotFound();
            }

            return View(shelter);
        }

        // POST: Shelter/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Shelters == null)
            {
                return Problem("Entity set 'Alif_databaseContext.Shelters' is null.");
            }
            var shelter = await _context.Shelters.FindAsync(id);
            if (shelter != null)
            {
                _context.Shelters.Remove(shelter);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ShelterExists(int id)
        {
            return (_context.Shelters?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
