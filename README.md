Telli
Project for LaunchCode's LiftOff Program
-
*Data from The Movie DB API*

Back end repo link: https://github.com/julialoftin/CapStoneBackEnd


Using Website:
Unauthenticated users can view popular movies on the home page. Clicking on an image or a title will lead you to a details page.
This page will include the movie's tagline and overview. It will also include any reviews that have been posted on Telli. If users have tagged the movie,
there will be hyperlinks to pages that will include all movies with the same tag.


Authenticated users will be able to post reviews and create watch lists. Users will have a profile page, where they can delete reviews
and view their watch lists and its details. Authenticated users can also create tags and assign them to movies when they write their review.


To run file on your local machine:
-

-Create an account with https://www.themoviedb.org/

-Within your profile, make note of your API key and token


Clone this repository.
-

-Run 'npm install' to install necessary dependencies.

-Run 'npm install dotenv'.

-Add a .env file at the root level.

-Set variable 'VITE_APP_API_KEY' equal to your key.

-Set variable 'VITE_APP_API_TOKEN' equal to your token.


Open/download MySQL Workbench
-
-Connect to your local instance

-Click 'Create a new schema in the selected server'

-Title the schema. This should match the APP_DB_NAME from application.properties.

-Click the 'Administration' tab.

-Click 'Users and Privileges'.

-Add an account.

  -Create a login name and password.
  
  -You can limit the host matching to 'localhost' or you can leave it as a wild card. A wild card is inherently less secure.
  
  -Apply changes.
  
-Navigate to the 'Schema Privileges" tab.

-Click 'Add Entry' and then click 'Select All'

-Apply changes.


Clone back end repository
-
*If using IntelliJ, use the following steps to set up the back end environmental variables.

*If not using IntelliJ, follow the necessary documents to configure environmental variables.

-Navigate to application.properties, make note of each variable within curly brackets: ${}

-Under the 'Run' tab, click 'Edit Configurations'.

-Create a name value pair for each variable from application.properties.

  -APP_DB_HOST should be localhost
  
  -APP_DB_PORT should be the port your MySQL local instance is running on
  
  -APP_DB_USER should be the username from your MySQL user accouunt
  
  -APP_DB_PASS should be the password from your MySQL user account
  
