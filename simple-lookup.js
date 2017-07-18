const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const arg = process.argv[2]

function output(result) {
  console.log(`Found ${result.rows.length} person(s) by the name '${arg}'`)
  for (let i = 0; i < result.rows.length; i++) {
    console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate.toLocaleDateString()}`)
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  query = "SELECT * FROM famous_people WHERE last_name = $1"
  values = [arg]
  client.query(query, values, (err, result) => {
    if (err) {
      return console.error("Error running query", err);
    }
    console.log("Searching... ")
    output(result)
    client.end();
  });
});