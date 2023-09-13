using Movie.Server.Movie.Models.Entities;
using Movie.Server.Movie.Models;

namespace Movies.Server.Movies.Mapping
{
    public static class MovieExtensions
    {
        public static MovieDto MapToMovieDto(this MovieEntity movieEntity)
        {
            return new MovieDto
            {
                Id = movieEntity.Id,
                Name = movieEntity.Name,
                CategoryId = movieEntity.CategoryId,
                RatingId = movieEntity.RatingId,
            };
        }
    }
}
