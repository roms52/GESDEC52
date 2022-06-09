const server = require("./server")
const db = require("./app/models");

db.sequelize.sync();/*{force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "entreprise"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

 Data.create({
    id: 1,
    titre: "Essai data Grid",
    description: "Tout est dans le titre",
    auteur: "Romain"
  });
}
 */

app = server.app;
// simple route
app.get("/", (req, res) => {
  res.json({ message: "API d'accès aux données déchets du SDED52." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);