class Matrix{
    constructor(cols, rows){
        if(typeof cols === "object"){
            this.cols = cols[0].length;
            this.rows = cols.length;
            this.data = cols;
        } else {
            this.cols = cols || 1;
            this.rows = rows || 1;
            this.data = [];
            for(let i = 0; i < this.rows; i++){
                this.data[i] = [];
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] = 0;
                }
            }
        }
        
    }
    
    getMatrix(){
        return this.data;
    }
    
    printTable(){
        console.table(this.getMatrix());
    }
    map(fn){
        return this.data.map(function(i){
            return i.map(fn);
        })
    }
    transpose(){
        let result = new Matrix(this.rows, this.cols);
        
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }
    
    add(n){
        if(typeof n !== 'number' && n.getMatrix){
            n = n.getMatrix();
        }
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                if(typeof n === 'number'){
                    this.data[i][j] += n;
                } else {
                    this.data[i][j] += n[i][j];
                }
            }
        }
    }
    
    static multiply(m1, m2){
        if(m1.cols === m2.rows){
            var dotProduct = new Matrix(m1.rows, m2.cols);
            for(let i = 0; i < m1.rows; i++){
                for(let j = 0; j < m2.cols; j++){
                    var sum = 0
                    for(let k = 0; k < m2.rows; k++){
                        sum += m1.data[i][k] * m2.data[k][j];
                    }
                    dotProduct.data[i][j] = sum;
                }
                
            }
            return dotProduct;
        } else {
            throw Error("Columns should match rows of the matrix.")
        }
    }
    
    multiply(n){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] *= n;
            }
        }
    }
    
    randomize(n){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }
}