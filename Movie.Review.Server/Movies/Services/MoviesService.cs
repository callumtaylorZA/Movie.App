using Microsoft.AspNetCore.Mvc;
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

        public async Task<IResult> AddMovie(MovieDto movie)
        {
            try
            {
                await _movieRepo.InsertMovie(movie.MapToMovieEntity());
                return Results.CreatedAtRoute(movie);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        public async Task<IResult> DisableMovie(Guid movieId)
        {
            try
            {
                await _movieRepo.DisableMovie(movieId);
                return Results.Ok();
            }
        }

        public async Task<IResult> GetAllMovies()
        {
            try
            {
                var results = (await _movieRepo.GetMovies()).Select(x => x.MapToMovieDto()).ToArray();

                return results.Any() ? Results.Ok(results) : Results.NoContent();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        public async Task<IResult> GetMovieById(Guid id)
        {
            try
            {
                return Results.Ok((await _movieRepo.GetMovieById(id))?.MapToMovieDto()) ?? Results.NotFound();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        public async Task<IResult> UpdateMovie(MovieDto movie)
        {
            try
            {
                await _movieRepo.UpdateMovie(movie.MapToMovieEntity();
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
