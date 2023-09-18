using Movie.Server.Movie.Models.Entities;
using Movie.Server.Movie.Models;

namespace Movies.Server.Movies.Mapping
{
    public static class MappingExtensions
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

        public static MovieEntity MapToMovieEntity(this MovieDto movieDto)
        {
            return new MovieEntity
            {
                Id = movieDto?.Id ?? Guid.Empty,
                Name = movieDto.Name,
                CategoryId = movieDto.CategoryId,
                RatingId = movieDto.RatingId,
            };
        }
    }
}
