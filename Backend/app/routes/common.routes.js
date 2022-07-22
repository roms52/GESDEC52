const controller = require("../controllers/common.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
 
  app.get("/api/common/datas/:table",controller.allDatasOfTable)
  app.get("/api/common/occur/:table",controller.allOccur)
};