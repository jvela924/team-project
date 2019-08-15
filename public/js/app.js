const app = angular.module('MyApp', []);

app.controller('disqoverController', ['$http', function($http){

const controller = this;

this.logOut = function(){
    $http({
        method:'DELETE',
        url:'/sessions'
    }).then(function(response){
        console.log(response);
        controller.loggedInUsername = null; //add this
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
        controller.loggedInUsername = response.date.userData.username
        controller.goApp(); //add this
    }, function(error){
        console.log(error);
    })
}

this.goApp = function(){
    $http({
        method:'GET',
        url: '/app'
    }).then(function(response){
        controller.loggedInUsername = response.data.username; //change this
    }, function(){
        console.log('error');
    });
}

this.deleteItem = function(item){
      console.log('hello');
      $http({
          method:'DELETE',
          url: '/disqover/'+ item._id,
      }).then(
          function(response){
              controller.getItem();

          }
      );
  }

this.editItem = function(item){
    $http({
        method:'PUT',
        url: '/bookmark/'+ item._id,
        data: {

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
      controller.books = response.data;
      console.log(response.data);
    });
  };

this.createItem = function(){
      $http({
           method:'POST',
           url: '/disqover/',
           data: {

              }
       }).then(function(){

    controller.getItem();
  });
    }

this.getItem();











}]);
