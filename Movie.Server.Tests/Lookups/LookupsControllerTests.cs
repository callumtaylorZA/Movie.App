using Movie.DataAccess.Entities;
using Movie.Server.Tests.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Movie.Server.Tests.Lookups
{
    [TestFixture]
    public class LookupsControllerTests
    {
        private static HttpClient _httpClient;
        private const string url = $"{Constants.BaseUrl}/lookups";

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            _httpClient = new HttpClient();
        }

        #region GetAllCategories

        [Test]
        public async Task GetAllCategories_Test_Valid()
        {
            // Act
            var result = await _httpClient.GetFromJsonAsync<List<CategoryEntity>>($"{url}/categories");

            // Assert
            result.Should().NotBeEmpty();
            result.Should().NotBeEmpty();
        }

        #endregion

        #region GetAllRatings

        [Test]
        public async Task GetAllRatings_Test_Valid()
        {
            // Act
            var result = await _httpClient.GetFromJsonAsync<List<RatingEntity>>($"{url}/ratings");

            // Assert
            result.Should().NotBeEmpty();
            result.Should().NotBeEmpty();
        }

        #endregion
    }
}
