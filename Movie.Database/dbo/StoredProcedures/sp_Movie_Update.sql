CREATE PROCEDURE [dbo].[sp_Movie_Update]
	@Id uniqueidentifier,
    @Name nvarchar(50),
    @CategoryId int,
    @RatingId int
AS
	update dbo.[Movie]
    set Name = @Name, CategoryId = @CategoryId, RatingId = @RatingId, ModifiedAt = GETDATE()
    where Id = @Id;