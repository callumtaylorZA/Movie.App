CREATE PROCEDURE [dbo].[sp_Movie_GetAllNames]
    @Id uniqueidentifier
AS
    select [name] from dbo.[Movie]
    where Enabled = 1 and Id != @Id;
