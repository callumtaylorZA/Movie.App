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
            app.MapGet($"{baseUrl}/all", async (
                HttpContext httpContext,
                [FromServices] IMoviesService moviesService) =>
            {
                return await moviesService.GetAllMovies();
            });

            return app;
        }
    }
}
