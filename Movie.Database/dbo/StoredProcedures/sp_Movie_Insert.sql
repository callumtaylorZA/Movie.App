CREATE PROCEDURE [dbo].[sp_Movie_Insert]
    @Name nvarchar(50),
    @CategoryId int,
    @RatingId int
AS
    insert into dbo.[Movie] (Id, Name, CategoryId, RatingId, CreatedAt)
    values (NEWID(), @Name, @CategoryId, @RatingId, GETDATE());
