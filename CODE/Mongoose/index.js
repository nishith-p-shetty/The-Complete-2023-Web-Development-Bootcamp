const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You didn\'t add a name']
    },
    rating: {
        type: Number,
        min: [1, 'Should be >= 1'],
        max: [10, 'Should be <= 10'],
    },
    review: String
});

const Fruit = mongoose.model('Fruit', fruitsSchema);



const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = new mongoose.model('Person', personSchema);

const apple = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'An apple a day keeps the doctor away'
});
apple.save();

const person = new Person({
    name: "Nishith",
    age: 19
});
person.save();

const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 9,
    review: 'Nice'
});

const banana = new Fruit({
    name: 'Banana',
    rating: 8,
    review: 'Woowwww'
});

const orange = new Fruit({
    name: 'Orange',
    rating: 7.5,
    review: 'Citris'
});


Fruit.insertMany([kiwi, orange, banana]);


run().catch(error => console.log(error.stack));
async function run() {
    const res = await Fruit.find();

    const aa = await Person.updateOne({ _id: '642dbfc7eb642cef5285e6b9' }, { name: 'Nishith P Shetty' });
    console.log(aa);

    mongoose.connection.close();
    console.log(res);
    res.forEach(function(fruit) {
        console.log(fruit.name);
    });
}

