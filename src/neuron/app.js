function Matrix(cols, rows){
    this.cols = cols;
    this.rows = rows;
    this.matrix = [];
    for(let i = 0; i < this.rows; i++){
        this.matrix[i] = [];
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] = 0;
        }
    }
}
Matrix.prototype.getMatrix = function(n){
    return this.matrix;
}
Matrix.prototype.add = function(n){
    if(typeof n !== 'number' && n.getMatrix){
        n = n.getMatrix();
    }
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            if(typeof n === 'number'){
                this.matrix[i][j] += n;
            } else {
                this.matrix[i][j] += n[i][j];
            }
        }
    }
}
Matrix.prototype.multiply = function(n){
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] *= n;
        }
    }
}