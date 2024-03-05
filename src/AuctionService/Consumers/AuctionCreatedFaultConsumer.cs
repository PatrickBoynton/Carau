using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
	public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
	{
		Console.WriteLine($"--->  Consuming faulty creation: {context.Message.Message}");

		var exception = context.Message.Exceptions.First();

		if (exception.ExceptionType == "System.ArgumentNullException")
			await context.Publish(context.Message.Message);
		else
			Console.WriteLine("---------------> Unknown exception: " + exception.Message);
	}
}