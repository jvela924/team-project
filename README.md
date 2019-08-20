# Disqover
**Disqover** is a social networking site where users can discover others who share similar music and movie tastes, as well as a portal to discovering new music and movies.
### Disclaimer
This project is created by Jeremy Velo, Aaron Neme, and Marcos Benedicto solely for the use and purpose of completing the necessary project requirements for General Assembly's Software Engineering Immersive (remote).

The Goal of this project is to create a full-stack CRUD application with a team of individuals. The project highlights skills and techniques learned during the course of the program. A list of technologies used can be found below.

The current state of the application is for development purposes only and is currently not available for public use. If you wish to use the code and work with, please contact the the owner of this repository. Thank you!
### Live Site
[Disqover](https://disqoverapplication.herokuapp.com/)

### User Stories
* User can create their disqover which includes their profile name, an image, age, bio, favorite artists, and favorite movies.
* Users can edit and delete their disqover.
* Users can view and search through all disqovers.
* Users can search for similar music and/or movies, based on their specified search criteria.
* Users can like a similar result and view all of their likes.
* Users can leave a comment on other users disqover pages.
* Users can like a comment that was leaved by another user.
  
### Technologies Used
#### Node.js
Node.js is an event driven, lock-free javascript runtime. It handles multiple events concurrently, and fires callbacks upon each connection.

#### Express
Express is a web framework for Node.js.

#### Angular
Angular is a structural framework for developing dynamic single-page applications in HTML, CSS, and JavaScript

#### Mongoose
Mongoose is a schema based framework for modeling application data. It connects to MongoDb, and has built-in type-casting and validation.

### The API
We used the [TastedDive](https://tastedive.com/read/api) API to get similar results for music and movies, based on the users search criteria. We limited results to 5, and se the type of query based on whether the user selected movies or music. 
While using the API, we came across a CORS (Cross-Origin Resource Sharing) issue. TasteDive was not sending the Access-Control-Allow-Origin header, so Heroku would not get resuklts from the API. As a workaround, for the purposes of this project, all users need to install the [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) plugin, which allows you to make an http request to any site from any source.
