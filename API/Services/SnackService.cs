namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Repositories;
using WebApi.Models.Snack;
using System.Reflection;

public interface ISnackService
{
    Task<IEnumerable<Snacks>> GetAll();
    Task<Snacks> GetById(int id);
    Task Create(SnackModel model);
    Task Update(int id, SnackModel model);
    Task Delete(int id);
    Task DecreaseQuantity(int id);
}

public class SnackService : ISnackService
{
    private ISnackRepository _SnackRepository;
    private readonly IMapper _mapper;

    public SnackService(
        ISnackRepository SnackRepository,
        IMapper mapper)
    {
        _SnackRepository = SnackRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<Snacks>> GetAll()
    {
        return await _SnackRepository.GetAll();
    }

    public async Task<Snacks> GetById(int id)
    {
        var user = await _SnackRepository.GetById(id);

        if (user == null)
            throw new KeyNotFoundException("Snack not found");

        return user;
    }

    public async Task Create(SnackModel model)
    {
        var snack = _mapper.Map<Snacks>(model);

        // save Snack
        Random rnd = new Random();
        await _SnackRepository.Create(snack);
    }

    public async Task Update(int id, SnackModel model)
    {
        var snack = await _SnackRepository.GetById(id);

        if (snack == null)
            throw new KeyNotFoundException("Snack not found");

        // copy model props to snack
        _mapper.Map(model, snack);

        // save snack
        await _SnackRepository.Update(snack);
    }

    public async Task Delete(int id)
    {
        await _SnackRepository.Delete(id);
    }

    public async Task DecreaseQuantity(int id)
    {
        var Snack = await _SnackRepository.GetById(id);

        if (Snack == null)
            throw new KeyNotFoundException("Snack not found");

        Snack.Quantity -= 1;

        // save snack
        await _SnackRepository.Update(Snack);
    }

}