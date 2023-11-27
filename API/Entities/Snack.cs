namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class Snacks
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Quantity { get; set; }
    public int Cost { get; set; }
    public Status Status { get; set; }
}