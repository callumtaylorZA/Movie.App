﻿CREATE PROCEDURE [dbo].[sp_Movie_GetAllNames]
AS
    select [name] from dbo.[Movie]
    where Enabled = 1;
