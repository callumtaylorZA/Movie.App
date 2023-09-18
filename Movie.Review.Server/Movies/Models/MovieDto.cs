namespace Movie.Server.Movie.Models
{
    public class MovieDto
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }

        public int CategoryId { get; set; }

        public int RatingId { get; set; }
    }
}
