var app = angular.module('app',[])

app.run(function($rootScope,$http,$interval){

	var averageBlockTime = 12.7

	function updateLotto(){
		$http
			.get('http://etherpot.com/api/lotto')
			.success(function(lotto){
				$rootScope.lotto = lotto
				$rootScope.blocksLeft = lotto.blocksPerRound-((lotto.blockNumber)%parseInt(lotto.blocksPerRound))
				$rootScope.secondsLeft = $rootScope.blocksLeft*averageBlockTime;
			})
	}

	updateLotto()

	$interval(updateLotto,5000)

	$interval(function(){
		if(!$rootScope.secondsLeft) return
		$rootScope.secondsLeft--
	},1000)

	$rootScope.$watch('secondsLeft',function(secondsLeft){
		$rootScope.timeLeft = {
			hours: Math.floor(secondsLeft/(60*60))
			,minutes: Math.floor(secondsLeft/(60))%60
			,seconds: Math.floor(secondsLeft%60)
		}
	})
})