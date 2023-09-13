using Movie.DataAccess.DataAccess;
using Movie.DataAccess.Entities;
using Movie.DataAccess.Repo.Interfaces;

namespace Movie.DataAccess.Repo
{
    public class LookupRepo : ILookupRepo
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public LookupRepo(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public async Task<IEnumerable<CategoryEntity>> GetCategories() =>
            await _sqlDataAccess.LoadData<CategoryEntity, dynamic>("dbo.sp_Category_GetAll", new { });

        public async Task<IEnumerable<RatingEntity>> GetRatings() =>
            await _sqlDataAccess.LoadData<RatingEntity, dynamic>("dbo.sp_Rating_GetAll", new { });
    }
}
