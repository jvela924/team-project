const app = angular.module('MyApp', []);

app.controller('disqoverController', ['$http', function($http){
  const controller = this;

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

  this.deleteItem = function(item){
    console.log('hello');
      $http({
          method:'DELETE',
          url: '/disqover/' + item._id
      }).then(
        function(response){

            controller.getItem();
      })
    }

  this.editItem = function(item){
      $http({
          method:'PUT',
          url: '/disqover/'+ item._id,
          data: {
            name: this.name,
            image: this.image,
            age: this.age,
            bio: this.bio,
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
        console.log(response.data);
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

  this.getItem();

}]);
