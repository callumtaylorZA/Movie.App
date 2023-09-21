using Movie.DataAccess.Enums;
using Movie.DataAccess.Repo.Interfaces;
using Movie.Server.Movie.Models;
using Movie.Server.Movies.Interfaces;

namespace Movie.Server.Movies.Validation
{
    public class Validation : IValidation
    {
        private readonly IMoviesRepo _moviesRepo;

        public Validation(IMoviesRepo moviesRepo)
        {
            _moviesRepo = moviesRepo;
        }

        public async Task<bool> ValidateMovieName(string name)
        {
            return !(await _moviesRepo.GetMovieNames()).Contains(name);
        }
    }

    public static class ValidationExtensions
    {
        public static bool IsAddRequestValid(this MovieDto dto)
        {
            return dto is not null
                && !string.IsNullOrEmpty(dto.Name)
                && Enum.IsDefined(typeof(Categories), dto.CategoryId)
                && Enum.IsDefined(typeof(Ratings), dto.RatingId);
        }

        public static bool IsUpdateRequestValid(this MovieDto dto)
        {
            return dto is not null
                && dto.Id != null
                && dto.Id != Guid.Empty
                && !string.IsNullOrEmpty(dto.Name)
                && Enum.IsDefined(typeof(Categories), dto.CategoryId)
                && Enum.IsDefined(typeof(Ratings), dto.RatingId);
        }
    }
}
