using Movie.Server.Movie.Models.Entities;

namespace Movie.DataAccess.Repo.Interfaces
{
    public interface IMoviesRepo
    {
        public Task<IEnumerable<MovieEntity>> GetMovies();

        public Task<MovieEntity?> GetMovieById(Guid id);

        public Task InsertMovie(MovieEntity movieEntity);

        public Task UpdateMovie(MovieEntity movieEntity);

        public Task DisableMovie(Guid id);
    }
}
