using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer(AuctionDbContext context) : IConsumer<AuctionFinished>
{
	private readonly AuctionDbContext dbContext;

	public async Task Consume(ConsumeContext<AuctionFinished> context)
	{
		Console.WriteLine("--> Consuming auction finished.");
		var auction = await dbContext.Auctions.FindAsync(context.Message.AuctionId);

		if (context.Message.ItemSold)
		{
			auction.Winner = context.Message.Winner;
			auction.SoldAmount = context.Message.Amount;
		}

		auction.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReservePriceNotMet;

		await dbContext.SaveChangesAsync();
	}
}