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
        
        var combined = -1;
        if(!dayDiff || dayDiff < L){
            if(ary1.getCount(max1) > 1){
                ary1.splice(day1, 1);
                return returnValue();
            }else if(ary2.getCount(max2) > 1){
                ary2.splice(day2, 1);
                return returnValue();
            } 
            return -1;
        }else{

            return max1+max2;
        }
    })();
    
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

/*
You are given an array A consisting of the integers −1, 0 and 1. A slice of that array is any pair of integers (P, Q) such that 0 ≤ P ≤ Q < N. Your task is to find the longest slice of A whose elements yield a non-negative sum.

Write a function:

function solution(A);

that, given an array A of length N, consisting only of the values −1, 0, 1, returns the length of the longest slice of A that yields a non-negative sum. If there's no such slice, your function should return 0.

For example, given A = [−1, −1, 1, −1, 1, 0, 1, −1, −1], your function should return 7, as the slice starting at the second position and ending at the eighth is the longest slice with a non-negative sum.

For another example, given A = [1, 1, −1, −1, −1, −1, −1, 1, 1] your function should return 4: both the first four elements and the last four elements of array A are longest valid slices.
*/
function slice(A){
    var topSlice = [];
    for(let i = 0; i<A.length; i++){
        var temp = 0;
        var sum = [];
        for(let k = 0; k<A.length; k++){
            if(k < i) continue;
            temp += A[k];
            sum.push(temp);
        }
        var max = Math.max.apply(null, sum);
        if(max < 0) continue;
        var len = sum.lastIndexOf(max);
        if(sum.lastIndexOf(0) > len) len = sum.lastIndexOf(0);
        topSlice.push(len+1);
    }
    if(!topSlice.length) return 0;
    return Math.max.apply(null, topSlice);
}


//console.log(groupArray([1,5,4,9,8,7,12,13,14]))
//console.log(groupArray([4,3,2,6,1]))
//console.log(solution([6,1,4,6,3,2,7,4], 3, 2))
//console.log(solution([6,1,4,6,3,2,7,3], 3, 2))
//console.log(solution([10, 19, 15], 2, 2))
console.log(slice([-1, -1, 1, -1, 1, 0, 1, -1, -1]))
console.log(slice([1, 1, -1, -1, -1, -1, -1, 1, 1]))
