using Microsoft.AspNetCore.Http;
using Movie.DataAccess.Enums;
using Movie.Server.Movie.Models;
using Movie.Server.Tests.Common;
using System.Net.Http.Json;

namespace Movie.Server.Tests.Movies
{
    [TestFixture]
    public class MovieControllerTests
    {
        private static HttpClient _httpClient;
        private const string url = $"{Constants.BaseUrl}/movies";

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            _httpClient = new HttpClient();
        }

        #region GetAllMovies

        [Test]
        public async Task GetAllMovies_Test_Valid()
        {
            // Act
            var result = await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url));

            // Assert
            result.Should().NotBeNull();
            result.Should().NotBeEmpty();
        }

        #endregion

        #region GetMovieById

        [Test]
        public async Task GetMovieById_Test_Valid()
        {
            // Arrange
            var movieId = (await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url)))?.FirstOrDefault()?.Id;

            // Act
            var result = await _httpClient.GetFromJsonAsync<MovieDto>(new Uri($"{url}/{movieId}"));

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(movieId);
        }

        [Test]
        public async Task GetMovieById_Test_NotFound()
        {
            // Arrange
            var movieId = Guid.NewGuid();

            // Act
            var result = await _httpClient.GetAsync(new Uri($"{url}/{movieId}"));

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Test]
        public async Task GetMovieById_TestEmptyGuid_BadRequest()
        {
            // Arrange
            var movieId = Guid.Empty;

            // Act
            var result = await _httpClient.GetAsync(new Uri($"{url}/{movieId}"));

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        #endregion

        #region AddMovie

        [Test]
        public async Task AddMovie_Test_Valid()
        {
            // Arrange
            var request = new MovieDto
            {
                Name = "Test",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Incredible,
            };

            // Act
            var result = await _httpClient.PostAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.Created);
        }

        [Test]
        public async Task AddMovie_TestEmptyName_BadRequest()
        {
            // Arrange
            var request = new MovieDto
            {
                Name = "",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Incredible,
            };

            // Act
            var result = await _httpClient.PostAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task AddMovie_TestInvalidCategory_BadRequest()
        {
            // Arrange
            var request = new MovieDto
            {
                Name = "Test",
                CategoryId = 0,
                RatingId = (int)Ratings.Incredible,
            };

            // Act
            var result = await _httpClient.PostAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task AddMovie_TestInvalidRating_BadRequest()
        {
            // Arrange
            var request = new MovieDto
            {
                Name = "Test",
                CategoryId = (int)Categories.Adventure,
                RatingId = 0,
            };

            // Act
            var result = await _httpClient.PostAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        #endregion

        #region UpdateMovie

        [Test]
        public async Task UpdateMovie_Test_Valid()
        {
            // Arrange
            var movieId = (await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url)))?.FirstOrDefault()?.Id;

            var request = new MovieDto
            {
                Id = movieId,
                Name = "There there",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Good,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Test]
        public async Task UpdateMovie_TestNullMovieId_BadRequest()
        {
            // Arrange
            var request = new MovieDto
            {
                Id = null,
                Name = "There there",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Good,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task UpdateMovie_TestEmptyMovieId_BadRequest()
        {
            // Arrange
            var movieId = Guid.Empty;

            var request = new MovieDto
            {
                Id = movieId,
                Name = "There there",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Good,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task UpdateMovie_TestInvalidMovieId_BadRequest()
        {
            // Arrange
            var movieId = Guid.NewGuid();

            var request = new MovieDto
            {
                Id = movieId,
                Name = "There there",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Good,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task UpdateMovie_TestEmptyName_BadRequest()
        {
            // Arrange
            var movieId = (await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url)))?.FirstOrDefault()?.Id;

            var request = new MovieDto
            {
                Id = movieId,
                Name = "",
                CategoryId = (int)Categories.Adventure,
                RatingId = (int)Ratings.Good,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task UpdateMovie_TestInvalidCategory_BadRequest()
        {
            // Arrange
            var movieId = (await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url)))?.FirstOrDefault()?.Id;

            var request = new MovieDto
            {
                Id = movieId,
                Name = "There",
                CategoryId = 0,
                RatingId = (int)Ratings.Good,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Test]
        public async Task UpdateMovie_TestInvalidRating_BadRequest()
        {
            // Arrange
            var movieId = (await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url)))?.FirstOrDefault()?.Id;

            var request = new MovieDto
            {
                Id = movieId,
                Name = "There",
                CategoryId = (int)Categories.Adventure,
                RatingId = 0,
            };

            // Act
            var result = await _httpClient.PutAsJsonAsync(new Uri(url), request);

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        #endregion

        #region DisableMovie

        [Test]
        public async Task DisableMovie_Test_Valid()
        {
            // Arrange
            var movieId = (await _httpClient.GetFromJsonAsync<List<MovieDto>>(new Uri(url)))?.FirstOrDefault()?.Id;

            // Act
            var result = await _httpClient.DeleteAsync(new Uri($"{url}/{movieId}"));

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Test]
        public async Task DisableMovie_TestInvalidId_NotFound()
        {
            // Arrange
            var movieId = Guid.NewGuid();

            // Act
            var result = await _httpClient.DeleteAsync(new Uri($"{url}/{movieId}"));

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Test]
        public async Task DisableMovie_TestEmptyId_NotFound()
        {
            // Arrange
            var movieId = Guid.NewGuid();

            // Act
            var result = await _httpClient.DeleteAsync(new Uri($"{url}/{movieId}"));

            // Assert
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        #endregion
    }
}
