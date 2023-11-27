namespace WebApi.Models.Snack;

using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

public class SnackModel
{
    [Required]
    public string? Name { get; set; }
    [Required]
    public int Quantity { get; set; }
    [Required]
    public float Cost { get; set; }

    [Required]
    [EnumDataType(typeof(Status))]
    public string? Status { get; set; }
}