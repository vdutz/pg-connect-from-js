const arg = process.argv[2]

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

function output(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${arg}'`)
  for (let i = 0; i < rows.length; i++) {
    date = rows[i].birthdate
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
    console.log(`- ${i + 1}: ${rows[i].first_name} ${rows[i].last_name}, born '${year}-${month+1}-${day}'`)
  }
}

knex('famous_people')
.where('last_name', arg)
.select()
.asCallback( (err, rows) => {
  if (err) {
    return console.error(err);
  }
  console.log("Searching... ")
  output(rows)
})

knex.destroy(() => {
  console.log("Database connection ended.")
})