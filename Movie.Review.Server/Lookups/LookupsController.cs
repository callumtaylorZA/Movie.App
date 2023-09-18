using Microsoft.AspNetCore.Mvc;
using Movie.DataAccess.Repo.Interfaces;
using Movie.Review.Server.Common.Interfaces;

namespace Movie.Server.Lookups
{
    public class LookupsController : IController
    {
        private const string baseUrl = "lookups";

        public WebApplication SetupController(WebApplication app)
        {
            app.MapGet($"{baseUrl}/categories", async (
                [FromServices] ILookupRepo lookupRepo) =>
            {
                try
                {
                    var categories = (await lookupRepo.GetCategories()).ToList();
                    return Results.Ok(categories);
                }
                catch(Exception ex)
                {
                    return Results.Problem(ex.Message);
                }

            });

            app.MapGet($"{baseUrl}/ratings", async (
                [FromServices] ILookupRepo lookupRepo) =>
            {
                try
                {
                    var categories = (await lookupRepo.GetRatings()).ToList();
                    return Results.Ok(categories);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            });

            return app;
        }
    }
}
