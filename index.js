var app = angular.module('app',[])

app.run(function($rootScope,$http,$interval){
	function updateLotto(){
		$http
			.get('http://etherpot.com/api/lotto')
			.success(function(lotto){
				$rootScope.lotto = lotto
			})
	}

	updateLotto()

	$interval(updateLotto,1000)
})