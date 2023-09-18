using Microsoft.AspNetCore.Mvc;
using Movie.DataAccess.Repo.Interfaces;
using Movie.Review.Server.Common.Interfaces;
using Movie.Review.Server.Movie.Interfaces;
using Movie.Server.Movie.Models;

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
                    await moviesService.GetAllMovies());

            app.MapGet($"{baseUrl}/{{movieId}}", async (
                HttpContext httpContext,
                [FromServices] IMoviesService moviesService,
                [FromRoute] Guid movieId) => 
                    await moviesService.GetMovieById(movieId));

            app.MapPost($"{baseUrl}", async (
                [FromServices] IMoviesService moviesService,
                [FromBody] MovieDto movieDto) =>
                    await moviesService.AddMovie(movieDto));

            app.MapPut($"{baseUrl}", async (
                [FromServices] IMoviesService moviesService,
                [FromBody] Guid movieId) => 
                    await moviesService.DisableMovie(movieId));

            app.MapGet($"{baseUrl}/categories", async (
                [FromServices] ILookupRepo lookupRepo) =>
                    (await lookupRepo.GetCategories()).ToList());

            app.MapGet($"{baseUrl}/ratings", async (
                [FromServices] ILookupRepo lookupRepo) =>
                    (await lookupRepo.GetRatings()).ToList());

            return app;
        }
    }
}
