namespace Movie.DataAccess.DataAccess
{
    public interface ISqlDataAccess
    {
        public Task<IEnumerable<T>> LoadData<T, U>(string storedProc, U parammeters, string connectionId = "Default");

        public Task SaveData<T>(string storedProc, T parammeters, string connectionId = "Default");
    }
}