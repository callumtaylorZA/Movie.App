using Movie.Review.Server.Movie.Interfaces;

namespace Movie.Review.Server.Movie.Services
{
    public class MoviesService : IMoviesService
    {
        public async Task<List<string>> GetAllMovies()
        {
            return await Task.FromResult(new List<string> { "movie1", "movie2" });
        }
    }
}
