using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
	public async Task Consume(ConsumeContext<BidPlaced> context)
	{
		Console.WriteLine("-------> Consuming bid placed event");

		var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

		if (context.Message.BidStatus.Contains("Accepted") &&
		    context.Message.Amount > auction.CurrentBid)
		{
			auction.CurrentBid = (int)context.Message.Amount;
			await auction.SaveAsync();
		}

		auction.Status = "Finished";

		await auction.SaveAsync();
	}
}