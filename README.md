# Movie.App
A basic web app add and keep track of movies. Written in angular framework frontend, a .net core minimal api backend and ms sql server database.

## Setup on local
### Movie.Database
- Generate publish profile from Movie.Database.
- Publish profile to local MS SQL server (script will create tables and populate with data).

### Movie.Server
- Update ConnectionStrings.Default in appsettings.json to match local connection string.

### Movie.Web
- Run npm build to install dependencies
- Update app.constants.BASE_URL to the local url of the movie server instance.