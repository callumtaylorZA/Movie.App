if not exists (select 1 from Category)
begin
    insert into dbo.Category (Id, Name)
    values
    (1, 'Action'),
    (2, 'Adventure'),
    (3, 'Horror'),
    (4, 'Thriller'),
    (5, 'Comedy'),
    (6, 'Romance'),
    (7, 'Cerebral'),
    (8, 'Drama'),
    (9, 'Fantasy'),
    (10, 'Documentry');
end

if not exists (select 1 from Rating)
begin
    insert into dbo.Rating (Id, Name)
    values
    (1, 'Please no'),
    (2, 'Meh'),
    (3, 'Passable'),
    (4, 'Average'),
    (5, 'Good'),
    (6, 'Incredible'),
    (7, 'Mind blowing');
end

if not exists (select 1 from Movie)
begin
    insert into dbo.[Movie] (Id, Name, CategoryId, RatingId, CreatedAt)
    values 
    (NEWID(), 'The great adventure', 2, 5, GETDATE()),
    (NEWID(), 'Strange text on the wall', 3, 7, GETDATE()),
    (NEWID(), 'We went far but came back', 9, 1, GETDATE()),
    (NEWID(), 'I lost my sense', 8, 6, GETDATE());
end