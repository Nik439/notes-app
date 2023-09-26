const sqlite3 = require("sqlite3")
const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err)
      console.error(err.message);
    else
      console.log("Connected to the database.");
  }
)

db.run(
  `CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY,
    title TEXT,
    text TEXT,
    last_update TEXT
  )`,
  (err) => {
    if (err)
      console.error(err)
    else {
      console.log("Created notes table.");
      db.run(
        `DELETE FROM notes`,
        (err) => {
          if (err)
            console.error(err.message);
          else {
            console.log("All rows deleted from notes");

            const rows = [
              [
                "test title 1",
                "test text 1",
                new Date().toISOString(),
              ],
              [
                "test title 2",
                "test text 2",
                new Date().toISOString(),
              ],
              [
                "test title 3",
                "test text 3",
                new Date().toISOString(),
              ]
          ]

            db.run(
              `INSERT INTO notes(title, text, last_update) VALUES(?, ?, ?)`,
              rows[0],
              (err) => {
                if (err)
                  console.error(err.message);
                else
                  console.log(`Row inserted`);
              }
            )

            db.run(
              `INSERT INTO notes(title, text, last_update) VALUES(?, ?, ?)`,
              rows[1],
              (err) => {
                if (err)
                  console.error(err.message);
                else
                  console.log(`Row inserted`);
              }
            )

            db.run(
              `INSERT INTO notes(title, text, last_update) VALUES(?, ?, ?)`,
              rows[2],
              (err) => {
                if (err)
                  console.error(err.message);
                else
                  console.log(`Row inserted`);
              }
            )

            db.close((err) => {
              if (err) 
                console.error(err.message);
              else
                console.log("Closed the database connection.");
            });

          }
        }
      )
    }
  }
)