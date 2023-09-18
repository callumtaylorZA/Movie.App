using Movie.DataAccess.Enums;
using Movie.Server.Movie.Models;

namespace Movie.Server.Movies.Validation
{
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
