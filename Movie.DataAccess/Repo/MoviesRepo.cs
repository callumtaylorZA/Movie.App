﻿using Movie.DataAccess.DataAccess;
using Movie.DataAccess.Repo.Interfaces;
using Movie.Server.Movie.Models.Entities;

namespace Movie.DataAccess.Repo
{
    public class MoviesRepo : IMoviesRepo
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public MoviesRepo(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public async Task<IEnumerable<MovieEntity>> GetMovies() =>
            await _sqlDataAccess.LoadData<MovieEntity, object>(
                "dbo.sp_Movie_GetAll", new { });

        public async Task<MovieEntity?> GetMovieById(Guid id) =>
            (await _sqlDataAccess.LoadData<MovieEntity, object>(
                "dbo.sp_Movie_GetById", new { Id = id })).FirstOrDefault();

        public async Task InsertMovie(MovieEntity movieEntity) =>
            await _sqlDataAccess.SaveData(
                "dbo.sp_Movie_Insert",
                new { movieEntity.Name, movieEntity.CategoryId, movieEntity.RatingId });

        public async Task UpdateMovie(MovieEntity movieEntity) =>
            await _sqlDataAccess.SaveData(
                "dbo.sp_Movie_Update",
                new { movieEntity.Id, movieEntity.Name, movieEntity.CategoryId, movieEntity.RatingId });

        public async Task DisableMovie(Guid id) =>
            await _sqlDataAccess.SaveData(
                "dbo.sp_Movie_Disable", new { Id = id });

        public async Task<IEnumerable<string>> GetMovieNamesExcluding(Guid movieId) =>
            await _sqlDataAccess.LoadData<string, object>(
                "dbo.sp_Movie_GetAllNames", new { Id = movieId });
    }
}
