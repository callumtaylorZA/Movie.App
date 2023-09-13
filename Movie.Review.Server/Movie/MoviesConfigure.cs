using Movie.Review.Server.Common.Interfaces;
using Movie.Review.Server.Movie.Interfaces;
using Movie.Review.Server.Movie.Services;

namespace Movie.Review.Server.Movie
{
    public class MoviesConfigure : IService
    {
        public WebApplicationBuilder Configure(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IMoviesService, MoviesService>();

            return builder;
        }
    }
}
