using Movie.DataAccess.Repo.Interfaces;
using Movie.Review.Server.Movie.Interfaces;
using Movie.Server.Movie.Models;
using Movie.Server.Movies.Interfaces;
using Movie.Server.Movies.Validation;
using Movies.Server.Movies.Mapping;

namespace Movie.Review.Server.Movie.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly IMoviesRepo _movieRepo;
        private readonly IValidation _validation;

        public MoviesService(
            IMoviesRepo moviesRepo,
            IValidation validation)
        {
            _movieRepo = moviesRepo;
            _validation = validation;
        }

        public async Task<IResult> AddMovie(MovieDto movie, string route)
        {
            try
            {
                if (!movie.IsAddRequestValid())
                {
                    return Results.BadRequest();
                }

                if (!await _validation.ValidateMovieName(movie.Name))
                {
                    return Results.BadRequest($"{nameof(movie.Name)}: {movie.Name}");
                }

                await _movieRepo.InsertMovie(movie.MapToMovieEntity());
                return Results.Created(route, movie);
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
                if (movieId == Guid.Empty || (await _movieRepo.GetMovieById(movieId)) == null)
                {
                    return Results.NotFound();
                }

                await _movieRepo.DisableMovie(movieId);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
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

        public async Task<IResult> GetMovieById(Guid movieId)
        {
            try
            {
                if (movieId == Guid.Empty)
                {
                    return Results.BadRequest();
                }

                var movie = await _movieRepo.GetMovieById(movieId);

                return movie is not null ? Results.Ok(movie.MapToMovieDto()) : Results.NotFound();
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
                if (!movie.IsUpdateRequestValid() || (await _movieRepo.GetMovieById(movie.Id.Value)) == null)
                {
                    return Results.BadRequest();
                }

                if (!await _validation.ValidateMovieName(movie.Name))
                {
                    return Results.BadRequest($"{nameof(movie.Name)}: {movie.Name}");
                }

                await _movieRepo.UpdateMovie(movie.MapToMovieEntity());
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
