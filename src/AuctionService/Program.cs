using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<AuctionDbContext>(options =>
{
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddMassTransit(x =>
{
	x.AddEntityFrameworkOutbox<AuctionDbContext>(options =>
	{
		options.QueryDelay = TimeSpan.FromSeconds(100);
		options.UsePostgres();
		options.UseBusOutbox();
	});
	x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();

	x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction", false));

	x.UsingRabbitMq((context, cfg) => { cfg.ConfigureEndpoints(context); });
});

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

try
{
	DbInitializer.InitDb(app);
}
catch (Exception e)
{
	Console.WriteLine("An error occured during initialization." + e);
	throw;
}

app.Run();