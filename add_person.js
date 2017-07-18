const fname = process.argv[2]
const lname = process.argv[3]
let bdateString = process.argv[4]
const year = bdateString.slice(0,4)
const month = bdateString.slice(5,7)
const day = bdateString.slice(8,10)
const bdateObject = new Date(year,month-1,day)

const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host:     settings.hostname,
    user:     settings.user,
    password: settings.password,
    // port:     settings.port,
    database: settings.database
    // ssl:      settings.ssl
  }
})

knex('famous_people')
.insert({first_name: fname, last_name: lname, birthdate: bdateObject})
.asCallback( (err, rows) => {
  if (err) {
    return console.error(err);
  }
  console.log("Searching... ")
  // console.log(rows)
})

knex.destroy(() => {
  console.log("Database connection ended.")
})