const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

if (process.argv.length < 3) {
    console.log('Please provide the password')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.ovglg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    number: { type: String, unique: true, required: true }
})

personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

