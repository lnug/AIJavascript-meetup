const brain = require('brain.js/index')
const trainingData = require('./multiLabelTrainingData.js')
const fs = require('fs')

/*
    Brain.js accepts training data as an array of objects of the shape:
    {
        input: [],
        output: [],
    }

    This step takes processes our training data into that form to feed into brain.js
*/
const preparedTrainingData = trainingData.map(set => {
    return {
        input: set.slice(0, 9),
        output: set.slice(9)
    }
})

console.log('📈 Data prepared\n')


/*
    Brain.js takes some config when you instantiate the NeuralNet
    more details can be found in the docs https://github.com/brainjs/brain.js
    These are the defaults. Maybe they're rubbish defaults...
*/

const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],
    activation: 'sigmoid'
};

const net = new brain.NeuralNetwork(config);

console.log('🏃‍♀️ Start training -  this could take some time...\n')

net.train(preparedTrainingData);


/*
    We can output our trained Neural net as either a function or json and write it to a file.
*/

fs.writeFileSync('trainedNet.js', `export default ${ net.toFunction().toString() };`);

console.log('🏁 Training finished - model created\n')

process.exit(1);
