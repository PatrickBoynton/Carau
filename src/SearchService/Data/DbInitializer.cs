using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public static class DbInitializer
{
	public static async Task InitDb(WebApplication app)
	{
		await DB.InitAsync("Search",
			MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDBConnection")));

		await DB.Index<Item>()
			.Key(x => x.Make, KeyType.Text)
			.Key(x => x.Color, KeyType.Text)
			.Key(x => x.Model, KeyType.Text).CreateAsync();

		var count = await DB.CountAsync<Item>();

		using var scope = app.Services.CreateScope();
		var httpClient = scope.ServiceProvider.GetRequiredService<AuctionServiceHttpClient>();

		var items = await httpClient.GetItemsForSearchDb();

		Console.WriteLine($"Items from AuctionService: {count}");

		if (items?.Count > 0) await DB.SaveAsync(items);
	}
}