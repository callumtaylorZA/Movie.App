namespace Movie.Review.Server.Movie.Interfaces
{
    public interface IMoviesService
    {
        public Task<List<string>> GetAllMovies();
    }
}
