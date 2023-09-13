CREATE TABLE [dbo].[Movie]
(
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(50) NOT NULL,
    [CategoryId] INT,
    [RatingId] INT NOT NULL,
    [CreatedAt] Datetime NOT NULL,
    [ModifiedAt] DateTime NULL,
    [Enabled] BIT NOT NULL DEFAULT 1,

    CONSTRAINT FK_Movie_Category FOREIGN KEY (CategoryId) REFERENCES dbo.Category (Id),
    CONSTRAINT FK_Movie_Rating FOREIGN KEY (RatingId) REFERENCES dbo.Rating (Id)
)
