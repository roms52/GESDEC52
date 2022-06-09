const multer = require("multer");
const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("application/wps-office.xlsx") ||
    file.mimetype.includes("application/wps-office.xls") ||
    file.mimetype.includes("spreadsheetml") 
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;