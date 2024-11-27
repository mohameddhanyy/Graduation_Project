using Alif.Core.Entities;
using Alif.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Admin.Controllers
{
    public class AnimalController : Controller
    {
        private readonly AlifContext _context;

        public AnimalController(AlifContext context)
        {
            _context = context;
        }

        // GET: Animals
        public async Task<IActionResult> Index()
        {
            var animals = await _context.Animals.ToListAsync();
            var adoptionRequests = await _context.AdaptAnimals.Include(a => a.Animal).Include(a => a.User).ToListAsync();
            var viewModel = new AdminPanelViewModel
            {
                Animals = animals,
                AdaptAnimals = adoptionRequests
            };
            return View(viewModel);
        }

        // GET: Animals/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var animal = await _context.Animals.Include(i => i.Type)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (animal == null)
            {
                return NotFound();
            }

            return View(animal);
        }


        [HttpPost]
        public async Task<IActionResult> Accept(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            animal.Status = true;
            _context.Update(animal);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(animal);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> AcceptAdoption(int animalId)
        {
            var adoptionRequest = await _context.AdaptAnimals
                .FirstOrDefaultAsync(a => a.AnimalId == animalId); ;

            if (adoptionRequest == null)
            {
                return NotFound();
            }

            adoptionRequest.Status = "Approved";
            _context.Update(adoptionRequest);
            var animal = await _context.Animals.FindAsync(animalId);
            if (animal != null)
            {
                _context.Animals.Remove(animal);
            }

            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> RejectAdoption( int animalId)
        {

            var adoptionRequest = await _context.AdaptAnimals
                .FirstOrDefaultAsync(a => a.AnimalId == animalId);

            if (adoptionRequest == null)
            {
                return NotFound();
            }

            adoptionRequest.Status = "Rejected";
            _context.Update(adoptionRequest);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(animal);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }


    private bool AnimalExists(int id)
        {
            return _context.Animals.Any(e => e.Id == id);
        }
    }
}
