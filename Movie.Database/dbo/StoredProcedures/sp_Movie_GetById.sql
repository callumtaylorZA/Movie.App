CREATE PROCEDURE [dbo].[sp_Movie_GetById]
	@Id uniqueidentifier
AS
select * from dbo.[Movie]
    where Enabled = 1 and Id = @Id;
