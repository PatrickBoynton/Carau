using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Item>> SearchItems([FromQuery] SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item, Item>();

        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            Console.WriteLine($"Searching for {searchParams.SearchTerm}");
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        Console.WriteLine($"Ordering by {searchParams.OrderBy}");
        query = searchParams.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(y => y.Make)).Sort(x => x.Ascending(y => y.Model)),
            "model" => query.Sort(x => x.Ascending(y => y.Model)),
            "new" => query.Sort(x => x.Descending(y => y.CreatedAt)),
            _ => query.Sort(x => x.Ascending(y => y.AuctionEnd))
        };

        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x =>
                x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow),
            _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        };

        if (!string.IsNullOrEmpty(searchParams.Seller))
            query.Match(x => x.Seller == searchParams.Seller);

        if (!string.IsNullOrEmpty(searchParams.Winner))
            query.Match(x => x.Winner == searchParams.Winner);

        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            results = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount
        });
    }
}