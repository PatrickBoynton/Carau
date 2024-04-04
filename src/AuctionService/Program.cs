using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

	x.UsingRabbitMq((context, cfg) =>
	{
		cfg.Host(builder.Configuration["RabbitMq:Host"], "/",
			host =>
			{
				host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
				host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
			});
		cfg.ConfigureEndpoints(context);
	});
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
	options.Authority = builder.Configuration["IdentityServiceUrl"];
	options.RequireHttpsMetadata = false;
	options.TokenValidationParameters.ValidateAudience = false;
	options.TokenValidationParameters.NameClaimType = "username";
});


var app = builder.Build();

app.UseAuthentication();

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