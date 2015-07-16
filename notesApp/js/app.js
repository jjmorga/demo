angular.module('todo', ['ionic', 'LocalStorageModule'])
.controller('TodoCtrl', function($scope, $ionicModal, localStorageService) {
	$scope.tasks = [];
	$scope.saved = localStorageService.keys();
	  
  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(val) {
	if($scope.editing){
	  	localStorageService.remove($scope.currentNote);
  		localStorageService.set(val.title, $scope.currentNote);
	}else{
		localStorageService.set(val.title);
	}
    $scope.taskModal.hide();
    val.title = "";
	$scope.saved = localStorageService.keys();
  };
  

  // Open our new task modal
  $scope.newTask = function() {
	  $scope.modalTitle="New Note";
	  $scope.editing = false;
	  $scope.modalPlaceholder = "Write a new note!";
      $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
  
  //edit the list item
  $scope.editTask = function(key) {
	  $scope.currentNote = key;
	  $scope.editing = true;
	  $scope.modalTitle="Edit Note";
	  $scope.modalPlaceholder = key;
	$scope.taskModal.show();
  };
  
  //delete the list item
  $scope.deleteRow = function(key) {
   	localStorageService.remove(key);
	$scope.saved = localStorageService.keys();
  }  
});

