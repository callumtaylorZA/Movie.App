using Movie.DataAccess.Repo.Interfaces;
using Movie.Review.Server.Movie.Interfaces;
using Movie.Server.Movie.Models;
using Movies.Server.Movies.Mapping;

namespace Movie.Review.Server.Movie.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly IMoviesRepo _movieRepo;

        public MoviesService(IMoviesRepo moviesRepo)
        {
            _movieRepo = moviesRepo;
        }

        public async Task<MovieDto[]> GetAllMovies()
        {
            return (await _movieRepo.GetMovies()).Select(x => x.MapToMovieDto()).ToArray();
        }

        public async Task<MovieDto?> GetMovieById(Guid id)
        {
            return (await _movieRepo.GetMovieById(id))?.MapToMovieDto() ?? null;
        }
    }
}
