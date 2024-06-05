using System.Globalization;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionServiceHttpClient(HttpClient client, IConfiguration configuration)
{
    public async Task<List<Item>> GetItemsForSearchDb()
    {
        var lastUpdated = await DB.Find<Item, DateTime>()
            .Sort(x => x.Descending(y => y.UpdatedAt))
            .Project(x => x.UpdatedAt)
            .ExecuteFirstAsync();

        var lastUpdatedString = lastUpdated.ToString(CultureInfo.InvariantCulture);

        return await client.GetFromJsonAsync<List<Item>>(
                   configuration["AuctionServiceUrl"] + "/api/auctions?date=" + lastUpdatedString) ??
               throw new InvalidOperationException();
    }
}