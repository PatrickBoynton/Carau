using System.ComponentModel.DataAnnotations;

namespace AuctionService.Entities;

public class Auction
{
	public Guid Id { get; set; }
	public int ReservePrice { get; set; }

	[StringLength(50)] public string? Seller { get; set; }

	[StringLength(50)] public string? Winner { get; set; }

	public int? SoldAmount { get; set; } = 0;
	public int? CurrentHighBid { get; set; } = 0;
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public DateTime AuctionEnd { get; set; }
	public Status Status { get; set; }
	public Item? Item { get; set; }
}