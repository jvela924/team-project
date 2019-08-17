const app = angular.module('MyApp', [])
app.controller('disqoverController', ['$http', function($http){
  // fetch(process.env.APIKEY)
  // .then((response) => {
  //   apiKey = response;
  // })
  const controller = this;
  this.indexOfEditFormToShow = null

  this.logOut = function(){
    $http({
        method:'DELETE',
        url:'/sessions'
    }).then(function(response){
        console.log(response);
        controller.loggedInUsername = undefined;
    }, function(error){
        console.log(error);
    });
  }

  this.createUser = function(){
    $http({
        method:'POST',
        url: '/users',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
        console.log(response);
        controller.loggedInUsername = null;
    }, function(){
        console.log("error");
    });
  }

  this.logIn = function(){
    $http({
        method:'POST',
        url:'/sessions',
        data: {
          username: this.username,
          password: this.password
        }
    }).then(function(response){
        console.log(response);
        controller.login = null;
        controller.credentials = null;
        controller.loggedInUsername = response.data.userData.username
        // controller.goAuthorization(); //add this
    }, function(error){
        console.log(error);
    })
  }

  //this callback might be used if we add a different route for user login
  // this.goAuthorization = function(){
  //     $http({
  //         method:'GET',
  //         url: '/app'
  //     }).then(function(response){
  //         controller.loggedInUsername = response.data.username; //change this
  //     }, function(){
  //         console.log('error');
  //     });
  // }

  this.deleteItem = function(disqover){
      $http({
          method: "DELETE",
          url: '/disqover/' + disqover._id
      }).then(
        function(response){
          controller.getItem();
      }, function(error){
        console.log(error);
      })
    }

  this.editItem = function(disqover){
      $http({
          method:'PUT',
          url: '/disqover/'+ disqover._id,
          data: {
            name: this.updatedName,
            image: this.updatedImage,
            age: this.updatedAge,
            bio: this.updatedBio,
            fav_artists: this.fav_artists,
            fav_movies: this.fav_movies,
            // username: response.data.userData.username
          }
      }).then(
          function(response){
              controller.getItem();
              controller.indexOfEditFormToShow = null;
          },
          function(error){

          }
      );
  }

  this.getItem = function(){
      $http({
        method:'GET',
        url: '/disqover/',
      }).then(function(response){
        controller.items = response.data;
        // console.log(controller.items);
        // console.log(response.data);
      });
    };

  this.createItem = function(){
        $http({
             method:'POST',
             url: '/disqover/',
             data: {
               name: this.name,
               image: this.image,
               age: this.age,
               bio: this.bio,
               fav_artists: this.fav_artists,
               fav_movies: this.fav_movies,
               // username: response.data.userData.username
                }
         }).then(function(response){
           console.log(response);
      controller.getItem();
    });
      }
  //Have a section inside the page where you see your individual collection items
  //In this page, it will say something like "Find Similar" like a button with an input type (dropdown list)
  //The dropdown list will have the options of movies or music
  //Whatever you select turns into the type inside the search URL
  // What your searching for is called 'Q' . We are searching for similar results to 'Q'
  //This is for the most part how the URL will be built
  // this.movies = [];

  this.apiKey = function(){
  $http({
    method: 'GET',
    url: '/apikey'
  }).then(function(response){
    console.log(response);
    controller.apiKey = "k=" + response.data
    console.log(controller.apiKey);
  });
}

  this.apiKey();
  this.music = [];
  this.userInput = '';
  this.category = '';
  this.baseURL = "https://tastedive.com/api/similar?";
  this.info = "info=1";
  this.ampersand = "&";
  this.limit = "limit=5";
  this.query = "q=";
  this.type = "type=";
  // this.musicResults;
  // this.movieResults;
  // this.searchURL = this.baseURL + this.info + this.ampersand + this.apiKey + this.ampersand + this.limit + this.ampersand + this.query + this.ampersand + this.type
  //https://tastedive.com/api/similar?info=1&API-KEY-HERE&limit=5&q=UserInputHere&type=Category
  this.getMusic = function(music){
    $http({
      method: 'GET',
      url: this.baseURL + this.info + this.ampersand + this.apiKey + this.ampersand + this.limit + this.ampersand + this.query + this.userInput + this.ampersand + this.type + this.category,
      header: {"Access-Control-Allow-Origin": "https://disqoverapplication.herokuapp.com/"}
    }).then(function(response){

      controller.music = response.data.Similar.Results
      console.log(controller.music);

    }, function(error){
      console.log(error);
    })
  }

  this.getItem();

}]);
