var ionicApp = angular.module("starter",[]);

ionicApp.controller('MainController', ['$scope', function($scope) {
	$scope.btnstring="";
	$scope.capitalLettersFlag=false;
	$scope.smallLettersFlag=true;
	$scope.btnpress= function(btnid) 
    {	
		btnstring=$scope.btnstring;//Required if mixing both type of inputs at same time in same box
		btnstring+=btnid;
	   	$scope.btnstring=btnstring;
    }
	
	$scope.cncpress= function() 
    {
		btnstring=btnstring.substring(0,btnstring.length-1);
		$scope.btnstring=btnstring;
    }
	
	$scope.cancelpress= function() 
    {
		btnstring="";
		$scope.btnstring=btnstring;
    } 
	
	$scope.capitalLetters=function()
	{
		$scope.capitalLettersFlag=false;
		$scope.smallLettersFlag=true;
	}
	$scope.smallLetters=function()
	{
		$scope.capitalLettersFlag=true;
		$scope.smallLettersFlag=false;
	}
}]);