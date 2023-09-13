using Movie.DataAccess.Entities;
using Movie.Server.Movie.Models.Entities;

namespace Movie.DataAccess.Repo.Interfaces
{
    public interface ILookupRepo
    {
        public Task<IEnumerable<CategoryEntity>> GetCategories();

        public Task<IEnumerable<RatingEntity>> GetRatings();
    }
}
