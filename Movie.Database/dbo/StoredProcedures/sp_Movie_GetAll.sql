CREATE PROCEDURE [dbo].[sp_Movie_GetAll]
AS
    select * from dbo.[Movie]
    where Enabled = 1;
