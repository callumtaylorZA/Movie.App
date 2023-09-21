namespace Movie.Server.Movies.Interfaces
{
    public interface IValidation
    {
        public Task<bool> ValidateMovieName(string name);
    }
}
