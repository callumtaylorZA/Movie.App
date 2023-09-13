using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Movie.DataAccess.DataAccess
{
    public class SqlDataAccess : ISqlDataAccess
    {
        private readonly IConfiguration _configuration;

        public SqlDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<T>> LoadData<T, U>(
            string storedProc,
            U parammeters,
            string connectionId = "Default")
        {
            using IDbConnection connection = new SqlConnection(_configuration.GetConnectionString(connectionId));

            return await connection.QueryAsync<T>(
                storedProc,
                parammeters,
                commandType: CommandType.StoredProcedure);
        }

        public async Task SaveData<T>(
            string storedProc,
            T parammeters,
            string connectionId = "Default")
        {
            using IDbConnection connection = new SqlConnection(_configuration.GetConnectionString(connectionId));

            await connection.ExecuteAsync(
                storedProc,
                parammeters,
                commandType: CommandType.StoredProcedure);
        }
    }
}
