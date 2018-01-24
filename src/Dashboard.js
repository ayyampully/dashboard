function solution(movies, K, L){
	'use strict';
    Array.prototype.getCount = function(val){
        var _array = this.slice();//copy of array for splice
        var _count = 0;
        while(_array.indexOf(val) !== -1){
            var _index = _array.indexOf(val);
            _array.splice(_index, 1);
            _count++;
        }
        return _count
    }
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
    
    return (function returnValue(){
        var max1 = Math.max.apply(null, ary1);
        var day1 = ary1.indexOf(max1);
        
        var max2 = Math.max.apply(null, ary2);
        var day2 = ary2.indexOf(max2);
        
        var dayDiff = day1-day2;
        dayDiff = dayDiff < 0 ? dayDiff*-1 : dayDiff;
        
        if(!dayDiff || dayDiff < L){
            if(ary1.getCount(max1) > 1){
                ary1.splice(day1, 0);
                returnValue();
            }
            if(ary2.getCount(max2) > 1){
                ary2.splice(day2, 0);
                returnValue();
            }
            return -1;
        }else{
            return max1+max2;
        }
    })()
    
}


function groupArray(Ary){
    'use strict';
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
                array.splice(0, siblings);
                innerFunc(array);
            } else {
                findNext(siblings);
            }
        })(0);
    })(Ary);
    return grp;
	
}



//console.log(groupArray([1,5,4,9,8,7,12,13,14]))
//console.log(groupArray([4,3,2,6,1]))
console.log(solution([6,1,4,6,3,2,7,4], 3, 2))
console.log(solution([10, 19, 15], 2, 2))
