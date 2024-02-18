using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Entities;

[Table("Items")]
public class Item
{
	public Guid Id { get; set; }

	[StringLength(50)] public string? Make { get; set; }

	[StringLength(100)] public string? Model { get; set; }

	public int Year { get; set; }

	[StringLength(100)] public string? Color { get; set; }

	public int Mileage { get; set; }

	[StringLength(1000)] public string? ImageUrl { get; set; }

	public Auction? Auction { get; set; }
	public Guid AuctionId { get; set; }
}