import Matrix from './Matrix.js';

class NeuralNetwork{
    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        
        //between input and hidden
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ih.randomize();
        //Bias
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_h.randomize();
        
        //between hidden and output
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ho.randomize();
        //Bias
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_o.randomize();
    }
    
    feedForward(i){
        //input to hidden
        let inputs = Matrix.fromArray(i);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.apply(sigmoid);
        
        //hidden to output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.apply(sigmoid);
        
        return output.toArray();
    }
    
    train(input, target){
        let output = this.feedForward(input);
        //Error = target i - output i
        output = Matrix.fromArray(output);
        target = Matrix.fromArray(target);
        
        let errorOutput = Matrix.subtract(target, output);
        output.printTable()
        target.printTable()
        errorOutput.printTable()
        console.log('-------------')
        this.weights_ho.printTable()
        let errorOutput_t = Matrix.transpose(this.weights_ho);
        let errorHidden = Matrix.multiply(errorOutput_t, errorOutput)
        
        errorOutput_t.printTable()
        errorHidden.printTable()
        return errorOutput;
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    printWeightsAndBias(){
        console.info('---------------Weights for hidden---------------')
        this.weights_ih.printTable();
        console.info('---------------Bias for hidden---------------')
        this.bias_h.printTable();
        console.info('---------------Weights for output---------------')
        this.weights_ho.printTable();
        console.info('---------------Bias for output---------------')
        this.bias_o.printTable();
    }
}
function sigmoid(x){
    return 1/(1 + Math.exp(-x));
}
export default NeuralNetwork;