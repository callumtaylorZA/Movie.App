CREATE PROCEDURE [dbo].[sp_Movie_Disable]
	@Id uniqueidentifier
AS
	update dbo.[Movie]
    set Enabled = 0, ModifiedAt = GETDATE()
    where Id = @Id;
