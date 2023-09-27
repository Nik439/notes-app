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

db.serialize(()=>{
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
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ex sed nisl feugiat suscipit. Mauris nunc tortor, scelerisque sed consectetur non, imperdiet quis est. Aliquam consequat erat ante, vel faucibus risus laoreet quis. Suspendisse varius justo vehicula, pulvinar quam quis, scelerisque ligula. Suspendisse metus dolor, sodales at vehicula sed, porttitor eu libero. Sed augue metus, scelerisque eu luctus vel, vestibulum non eros. Aenean sodales dolor vel turpis fermentum consectetur. Mauris iaculis velit quis tortor laoreet, quis convallis justo venenatis.",
                  new Date().toISOString(),
                ],
                [
                  "test title 2",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ex sed nisl feugiat suscipit. Mauris nunc tortor, scelerisque sed consectetur non, imperdiet quis est. Aliquam consequat erat ante, vel faucibus risus laoreet quis. Suspendisse varius justo vehicula, pulvinar quam quis, scelerisque ligula. Suspendisse metus dolor, sodales at vehicula sed, porttitor eu libero. Sed augue metus, scelerisque eu luctus vel, vestibulum non eros. Aenean sodales dolor vel turpis fermentum consectetur. Mauris iaculis velit quis tortor laoreet, quis convallis justo venenatis.",
                  new Date().toISOString(),
                ],
                [
                  "test title 3",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ex sed nisl feugiat suscipit. Mauris nunc tortor, scelerisque sed consectetur non, imperdiet quis est. Aliquam consequat erat ante, vel faucibus risus laoreet quis. Suspendisse varius justo vehicula, pulvinar quam quis, scelerisque ligula. Suspendisse metus dolor, sodales at vehicula sed, porttitor eu libero. Sed augue metus, scelerisque eu luctus vel, vestibulum non eros. Aenean sodales dolor vel turpis fermentum consectetur. Mauris iaculis velit quis tortor laoreet, quis convallis justo venenatis.",
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
})