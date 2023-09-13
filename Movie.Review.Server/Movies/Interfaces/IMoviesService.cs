using Movie.Server.Movie.Models;

namespace Movie.Review.Server.Movie.Interfaces
{
    public interface IMoviesService
    {
        public Task<MovieDto[]> GetAllMovies();

        public Task<MovieDto?> GetMovieById(Guid id);
    }
}
