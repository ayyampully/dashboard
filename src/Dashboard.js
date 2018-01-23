function solution(movies, K, L){
	
	var ary1 = [], ary2 = [];
	movies.forEach(function(day, index){
		var temp = 0, temp2 = 0;
		for(let i = 0; i<K; i++){
			temp+= movies[index + i] ? movies[index + i] : 0;
		}
		ary1.push(temp)
		
		for(let m = 0; m<L; m++){
			temp2+= movies[index + m] ? movies[index + m] : 0;
		}
		ary2.push(temp2)
		
		
	})
	var max1 = Math.max.apply(null, ary1);
		var day1 = ary1.indexOf(max1);
	var max2 = Math.max.apply(null, ary2);
		var day2 = ary2.indexOf(max2);
	if(day1===day2){
		return -1;
	}else{
		return max1+max2;
	}
}


function solutionA(Ary){
	//if(Ary)
	Ary.forEach(function(g, index){
		Ary.forEach(function(i){
			if(g !== i){
				Ary[index+1] > i
			}
		})
	})
	
	var grp = 0;
	var len = Ary.length;
	for(var i = 0; i<len; i++){
		for(var k = 0; k<len; k++){
			if(i !== k && Ary[i+1] > Ary[k]){
				console.log(Ary[i+1] , Ary[k])
				grp++
				break;
			} else{
			}
		}
	}
	console.log(grp)
}









console.log(solutionA([1,5,4,9,8,7,12,13,14]))
//console.log(solution([6,1,4,6,3,2,7,4], 3, 2))
//console.log(solution([10, 19, 15], 2, 2))
