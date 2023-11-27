namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models.Snack;

[ApiController]
[Route("[controller]")]
public class SnackController : ControllerBase
{
    private ISnackService _snackService;

    public SnackController(ISnackService snackService)
    {
        _snackService = snackService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var Snacks = await _snackService.GetAll();
        return Ok(Snacks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var Snack = await _snackService.GetById(id);
        return Ok(Snack);
    }

    [HttpPost]
    public async Task<IActionResult> Create(SnackModel model)
    {
        await _snackService.Create(model);
        return Ok(new { message = "Snack created" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, SnackModel model)
    {
        await _snackService.Update(id, model);
        return Ok(new { message = "Snack updated" });
    }

    [HttpPut("DecreaseQuantity/{id}")]
    public async Task<IActionResult> DecreaseQuantity(int id, SnackModel model)
    {
        await _snackService.DecreaseQuantity(id);
        return Ok(new { message = "Snack updated" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _snackService.Delete(id);
        return Ok(new { message = "Snack deleted" });
    }
}