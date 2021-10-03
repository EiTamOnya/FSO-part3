const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) { // eslint-disable-line no-undef
  console.log('Please provide the password')
  process.exit(1) // eslint-disable-line no-undef
}

const password = process.argv[2] // eslint-disable-line no-undef

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ovglg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  number: { type: String, unique: true, required: true }
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) { // eslint-disable-line no-undef
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3] // eslint-disable-line no-undef
  const number = process.argv[4] // eslint-disable-line no-undef

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => { // eslint-disable-line no-unused-vars
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

