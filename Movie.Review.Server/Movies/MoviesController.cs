using Microsoft.AspNetCore.Mvc;
using Movie.Review.Server.Common.Interfaces;
using Movie.Review.Server.Movie.Interfaces;

namespace Movie.Review.Server.Movie
{
    public class MoviesController : IController
    {
        private const string baseUrl = "movies";

        public WebApplication SetupController(WebApplication app)
        {
            app.MapGet($"{baseUrl}", async (
                HttpContext httpContext,
                [FromServices] IMoviesService moviesService) =>
            {
                try
                {
                    var results = await moviesService.GetAllMovies();

                    if (results.Any())
                        return Results.Ok(results);

                    return Results.NoContent();
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            });

            app.MapGet($"{baseUrl}/{{movieId}}", async (
                HttpContext httpContext,
                [FromServices] IMoviesService moviesService,
                [FromRoute] Guid movieId) =>
            {
                try
                {
                    var result = await moviesService.GetMovieById(movieId);

                    if (result is null)
                        return Results.NotFound();

                    return Results.Ok(result);
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
