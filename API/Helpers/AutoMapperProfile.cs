namespace WebApi.Helpers;

using AutoMapper;
using WebApi.Entities;
using WebApi.Models.Snack;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // OrderModel -> Order
        CreateMap<SnackModel, Snacks>();
    }
}