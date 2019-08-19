const app = angular.module('MyApp', [])
app.controller('disqoverController', ['$http', function($http){
  const controller = this;
  this.likes = []
  // this.getUser = function(){
  //   $http({
  //     method:'GET',
  //     url: '/users'
  //   }).then(function(response){
  //     controller.users = response.data
  //     console.log(controller.users);
  //     console.log(response);
  //   }, function(error){
  //     console.log(error);
  //   })
  // }
  //
  // this.getUser()
  this.comments = [];
  this.addComment = function(disqover){
    $http({
        method:'PUT',
        url: '/disqover/'+ disqover._id,
        data: {
          comments: this.comments
        }
      }).then(function(response){
          console.log(controller.cmtName);
          controller.comments.push(controller.cmtName)
          console.log(response);
        },function(error){
          
        });
    }
  // this.getComments = function(disqover){
  //   $http({
  //     method: 'GET',
  //     url: '/disqover/' + disqover._id
  //   }).then(function(response){
  //     controller.comments = response.data.comments
  //   }, function(error){
  //     console.log(error);
  //   })
  // }
  // this.getComments();
  this.addLikes = function () {
    $http({
     method:'PUT',
     url: '/users/' + controller.userId,
     data:{
       likes: this.likes}
     }).then(function(response){
       console.log(controller.likes);

     }, function(error){
       console.log(error);
     })
   }
   this.getLikes = function() {
     $http({
       method:"GET",
       url: '/users/' + controller.userId,
     }).then(function(response){
       controller.likes = response.data.likes;
       console.log(controller.likes);
     })
   }
  this.like = function (music) {
    $http({
      method: 'GET',
      url: this.baseURL + this.info + this.ampersand + this.apiKey + this.ampersand + this.limit + this.ampersand + this.query + this.userInput + this.ampersand + this.type + this.category,
      header: {"Access-Control-Allow-Origin": "https://tastedive.com"}
    }).then(function(response){
      // click something and get back specific result
      // console.log(controller.loggedInUsername);
      // console.log(music);
      controller.likes.push(music)
      console.log(controller.likes);
      // console.log(controller.likes);
      controller.addLikes()
      // Push that information to an array

    }, function(error){
      console.log(error);
    })
  }
  this.wobble = function () {
    console.log("hello");
    this.hype = !this.hype;
  };
  this.toggle = function () {
    console.log("hello");
    this.state = !this.state;
  };
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
        controller.userId = response.data.userData._id
        controller.getLikes()
    }, function(error){
        console.log(error);
    })
  }
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
  this.apiKey = function(){
  $http({
    method: 'GET',
    url: '/apikey'
  }).then(function(response){
    controller.apiKey = "k=" + response.data
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
  this.getMusic = function(music){
    $http({
      method: 'GET',
      url: this.baseURL + this.info + this.ampersand + this.apiKey + this.ampersand + this.limit + this.ampersand + this.query + this.userInput + this.ampersand + this.type + this.category,
      header: {"Access-Control-Allow-Origin": "https://tastedive.com"}
    }).then(function(response){

      controller.music = response.data.Similar.Results
      console.log(controller.music);

    }, function(error){
      console.log(error);
    })
  }
  this.getSpotify = function(){
    $http({
      method:"GET",
      url: 'https://api.spotify.com/v1/search?q=track:antartica&type=track'
    }).then(function(response){
      console.log(response);
    }, function(error){
      console.log(error);
    })
  }
  this.getItem();
}]);
