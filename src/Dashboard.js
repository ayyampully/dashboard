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
        var max = sum.reduce(function(a, b){
            if(a>=0 && b<0){return a;}else{return b;}
        });
        if(max < 0) continue;
        var len = sum.lastIndexOf(max);
        topSlice.push(len+1);
    }
    if(!topSlice.length) return 0;
    return Math.max.apply(null, topSlice);
}
function finalTurn(X, Y, T){
    var p = [], q = [], e =[], eL, eR;
    var max = Math.max.apply(null, Y);
    for(let i = 0; i<T.length; i++){
        var x = X[i], y = Y[i];
        if(T[i] === 'X'){
            q.push(x, y);
        } else if(T[i] === 'q'){
            e.push(x, y);
            eL = (x-1) +','+ (y+1);
            eR = (x+1) +','+ (y+1);
        } else {
            p.push([x, y]);
        }
    };
    var pString = p.join('');
    //console.log(pString, eL, eR)
    var eL_i = pString.indexOf(eL)
    var eR_i = pString.indexOf(eR)
    //p.splice(eL_i, 1);//TODO
    
    eL_i = (eL_i === 0 && e[1]-q[1] < 3);
    eR_i = (eR_i === 0 && e[1]-q[1] < 3);
    
    var point = 0;

    Number.prototype.toPositive = function(){
        return this<0 ? this*-1 : this;
    }
    Array.prototype.findNext = function(val){
        var temp;
        var x = 0, x2 = 0;
        this.forEach(function(ary){
            if(ary[1]>val[1]){
                x = (ary[0] - val[0]) * (ary[1] - val[1]);
                x = x.toPositive();
                if(x < x2 || !temp){
                    temp = ary;
                    x2 = x;
                }
            }
        })
        return temp;
    }
    
    var defaultPoint = 10;
    var currentPosition = 0,
        pawnIndex = 0;
    (function huntFor(prey){
        currentPosition++;
        if(currentPosition > max) return 0;
        if(defaultPoint !== 10){eL_i=false; eR_i=false;}
        if(prey[0]<=q[0] && !eL_i){
            q[0] = q[0]-1;
            q[1] = q[1]+1;
            if(prey[0]===q[0] && prey[1]===q[1]){
                point+=defaultPoint;
                q[0] = q[0]-1;
                q[1] = q[1]+1;
                currentPosition++;
                if(defaultPoint === 1) pawnIndex++;
                defaultPoint = 1
                huntFor(p.findNext(q));
            } else {
                huntFor(prey);
            }
            
        }else if(prey[0]>=q[0] && !eR_i){
            q[0] = q[0]+1;
            q[1] = q[1]+1;
            if(prey[0]===q[0] && prey[1]===q[1]){
                point+=defaultPoint;
                q[0] = q[0]-1;
                q[1] = q[1]+1;
                currentPosition++;
                if(defaultPoint === 1) pawnIndex++;
                defaultPoint = 1;
                huntFor(p.findNext(q));
            } else {
                huntFor(prey);
            }
            
        }else{
            defaultPoint = 1;
            huntFor(p.findNext(q));
        }
    })(e);

    return point;
}

//console.log(groupArray([1,5,4,9,8,7,12,13,14]))
//console.log(groupArray([4,3,2,6,1]))
//console.log(solution([6,1,4,6,3,2,7,4], 3, 2))
//console.log(solution([6,1,4,6,3,2,7,3], 3, 2))
//console.log(solution([10, 19, 15], 2, 2))
//console.log(slice([-1, -1, 1, -1, 1, 0, 1, -1, -1]))
//console.log(slice([1, 1, -1, -1, -1, -1, -1, 1, 1]))
/*var array = [
    ['0','0','.','0'],
    ['0','.','0','0'],
    ['.','.','.','0'],
    ['0','.','0','.'],
    ['.','.','.','0'],
    ['0','0','0','.'],
];


var width = array[0].length; // the number of cells on the X axis
var height = array.length; // the number of cells on the Y axis


var str = [];
var max = Math.max.apply(null, [width, height])
for(var x = 0; x<max; x++){
    
    for(var y = 0; y<max; y++){
        
        str = [y, x];
        if(!array[x]) break;
        if(array[x][y] === '0'){
            
            (function findNext(count){
                if(array[x][y + count] === '0'){
                    str.push(y + count, x);
                } else if (array[x][y + (++count)]){
                    findNext(count)
                } else{
                    str.push(-1,-1);
                }
            })(1);
            
            (function findNext(count){
               // debugger;
                if(array[x + count] && array[x + count][y] === '0'){
                    str.push(y,x + count)
                 }else if (array[x + (++count)]){
                    findNext(count)
                } else{
                    str.push(-1,-1);
                }
            })(1);
            console.log(str.join(' '));
        }
    }
}*/

(function(){
    //console.log('-----Close to zero-----');
    var array = [-5,-4,-2,12,-40,4,2,18,11,5]
    
    var x = array.reduce(function(i, next){
        var temp = i, temp2 = next;
        if(i < 0) temp = i * -1;
        if(next < 0) temp2 = next * -1;
        if(temp === temp2) return i < next ? next : i;
        return temp < temp2 ? i : next;
    });
    console.log(x)
})()

/*console.log(finalTurn([3, 5, 1, 6], [1, 3, 3, 8], "Xpqp"))//10
console.log(finalTurn([0, 3, 5, 1, 6], [4, 1, 3, 3, 8], "pXpqp"))//2
console.log(finalTurn([0, 6, 2, 5, 3, 0], [4, 8, 2, 3, 1, 6], "ppqpXp"))//12
*/
var Utils = (function(){
    var publicMethod = {};
    
    publicMethod.stackManager = function(command, limit){
        var commandArray = command.split(''),
        roboPos = -1,
        isPicked = 0,
        memory = [],
        hexVal = '';
        
        for(var i =0; i<limit; i++){
            memory[i] = 0;
        }
        commandArray.forEach(function(elm,index){
            switch(elm){
                case 'P':
                    roboPos = 0;
                    isPicked = 1;
                break;
                case 'M':
                    if(roboPos<(limit-1)){
                        roboPos++
                    }
                break;
                case 'L':
                    var tempVal = memory[roboPos];
                    if(isPicked && tempVal<15){
                        memory[roboPos] = ++tempVal;
                    }
                break;
            }
        });
        for(var i=0, len=memory.length; i<len; i++){
            hexVal += memory[i].toString(16);
        }
        return hexVal.toUpperCase();
    }
    publicMethod.LookAndSay = function(sayit,n){
        var split = sayit.split(''),
        curCount = 1,
        curItem = 0,
        groupcount = '',
        output = '';
        
        for(var i=0; i<split.length; i++){
            curItem = split[i]
            if(curItem==split[i+1]){
                if(i != (split.length-1)){
                    curCount++
                }
            }else{
                groupcount=curCount+''+split[i]
                curCount = 1
                output+=groupcount
            }
        }
        if(n>1){
            return publicMethod.LookAndSay(output, n-1)
        }else{
            return output;
        }
    }
    publicMethod.find = function(list, sublist){
        list = list.join('');
        sublist = sublist.join('');
        return (list.indexOf(sublist));
    }
    publicMethod.convertToBase7 = function(number){
        var denominator = 7,
            remain = 0,
            remainArray = [],
            base7ref = ['0', 'a', 't', 'l', 's', 'i', 'n'],
            base7 = [];
        do{
            remain = number%denominator;
            number = parseInt(number/denominator);
            remainArray.push(remain)
        }while(number);
        base7 = remainArray.map(function(no){
            return base7ref[no];
        });
        return base7.reverse().join('');
    }
    publicMethod.validate = function(str){
        var split = str.split('~n'),
            formattedData = [],
            countRecord = 0,
            countField = 0,
            countEmpty = 0,
            userMsg = "format_error";
            if(!str){
                return [countRecord, countField, countEmpty, userMsg].join(':');
            }
        split = split.slice(0,split.length-1)
        countRecord = split.length-1;
        split.forEach(function(elm, index){
            var row = split[index].split(/[^\~]\|/g);
                row = row.splice(1,row.length-2)
                formattedData[index] = row;
                if(row.length>countField)countField = row.length;
                row.forEach(function(elm, i){
                    if(elm === '')countEmpty++
                    if(elm.indexOf('~|') !=-1){
                        row[i] = elm.replace('~|','|')
                    }
                    if(elm.indexOf('~~') !=-1){
                        row[i] = elm.replace('~~','~')
                    }
                })
        })
        console.log(formattedData)
        var len = formattedData[0].length
        /* if(len<countField){
            var diff = countField-len,
                headers = formattedData[0];
            for(var i=1; i<=diff; i++){
                var newtitle = headers[1]+'_'+i;
                formattedData[0].push(newtitle);
            }
        } */
        console.log(formattedData)
        userMsg = formattedData[0];
        userMsg = userMsg[userMsg.length-1]
        return [countRecord, countField, countEmpty, userMsg].join(':');
    }
    return publicMethod;
})();
/*var start = new Date().getTime()
 console.log(Utils.stackManager("PMLPMMMLPMLPMML", 10))
console.log(Utils.stackManager("qqPML123PMMMLPMLPasdMML", 10))
console.log(Utils.stackManager("PLPLPLPLPLPLPLPLPLPLPLPLPLPLPLPMLPMLPMLPMLPMLPMLPMLPMLPMLPMLPMLPML", 10))

console.log(Utils.LookAndSay('11',2))
console.log(Utils.LookAndSay('11',1))
console.log(Utils.LookAndSay('11',4))
console.log(Utils.LookAndSay('11'))

console.log(Utils.find([1,2,3], [2,3]))
console.log(Utils.find([1,2,3], [3,2]))

console.log(Utils.convertToBase7(99))
console.log(Utils.convertToBase7(7))
 
 var rgx =/\|/g;
 var myArray = ("|na~|me|address|").split(rgx);
//console.log(Utils.validate('|name|add~|ress|~n|Patr~~ick|patrick@test.com|pat@test.com|~n|Annie||annie@test.com|~n'))
console.log(myArray)*/