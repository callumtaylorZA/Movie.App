namespace Movie.Server.Movie.Models.Entities
{
    public class MovieEntity
    {
        public Guid Id { get; set }

        public string Name { get; set; }

        public int CategoryId { get; set; }

        public int RatingId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime ModifiedAt { get; set; }

        public bool Enabled { get; set; }
    }
}