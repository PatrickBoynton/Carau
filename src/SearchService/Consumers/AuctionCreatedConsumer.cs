using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer(IMapper mapper) : IConsumer<AuctionCreated>
{
	public async Task Consume(ConsumeContext<AuctionCreated> context)
	{
		Console.WriteLine($"--->  AuctionCreatedConsumer: {context.Message.Id}");

		var item = mapper.Map<Item>(context.Message);

		// Example of handling an exception
		if (item == null)
			throw new ArgumentNullException("---------------> Can't find item with name: " + nameof(item));

		await item.SaveAsync();
	}
}