using Microsoft.AspNetCore.Mvc;
using Movie.Server.Movie.Models;

namespace Movie.Review.Server.Movie.Interfaces
{
    public interface IMoviesService
    {
        public Task<IResult> GetAllMovies();

        public Task<IResult> GetMovieById(Guid id);

        public Task<IResult> AddMovie(MovieDto movie, string route);

        public Task<IResult> UpdateMovie(MovieDto movie);

        public Task<IResult> DisableMovie(Guid movieId);
    }
}
