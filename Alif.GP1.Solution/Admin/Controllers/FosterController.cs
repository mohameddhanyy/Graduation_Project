using Alif.Core.Entities;
using Alif.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    public class FosterController : Controller
    {
        private readonly AlifContext _context;

        public FosterController(AlifContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Fosters.ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foster = await _context.Fosters.FirstOrDefaultAsync(m => m.Id == id);
            if (foster == null)
            {
                return NotFound();
            }

            return View(foster);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,FOwnername,FAvailablePlaces,FPhone,ForDay,ForWeek,ForMonth,FLocation,FDescripation,FApproval,Image,AppUserId")] Foster foster)
        {
            Foster f = _context.Fosters.FirstOrDefault();
            foster.AppUserId = f.AppUserId;
            _context.Add(foster);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foster = await _context.Fosters.FindAsync(id);
            if (foster == null)
            {
                return NotFound();
            }
            return View(foster);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,FOwnername,FAvailablePlaces,FPhone,ForDay,ForWeek,ForMonth,FLocation,FDescripation,FApproval,Image,AppUserId")] Foster foster)
        {
            if (id != foster.Id)
            {
                return NotFound();
            }
            Foster f = _context.Fosters.FirstOrDefault(a => a.Id == id);
            foster.AppUserId = f.AppUserId;
            _context.Entry<Foster>(f).State = EntityState.Detached;


            try
            {
                _context.Update(foster);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FosterExists(foster.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foster = await _context.Fosters.FirstOrDefaultAsync(m => m.Id == id);
            if (foster == null)
            {
                return NotFound();
            }

            return View(foster);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var foster = await _context.Fosters.FindAsync(id);
            _context.Fosters.Remove(foster);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FosterExists(int id)
        {
            return _context.Fosters.Any(e => e.Id == id);
        }
    }
}
