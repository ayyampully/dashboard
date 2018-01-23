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


function groupArray(Ary){
    var grp = 0;
    (function innerFunc(array){
        var len = array.length;
        if(!len) return len;
        var siblings = 0;
        var min = Math.min.apply(null, array);
        
        (function findNext(k){
            siblings++;
            if(array[k]===min){
                grp++;
                array.splice(0, siblings)
                innerFunc(array);
            } else {
                findNext(siblings);
            }
        })(0);
    })(Ary);
    return grp;
	
}



console.log(groupArray([1,5,4,9,8,7,12,13,14]))
console.log(groupArray([4,3,2,6,1]))
//console.log(solution([6,1,4,6,3,2,7,4], 3, 2))
//console.log(solution([10, 19, 15], 2, 2))
