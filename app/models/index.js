const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.admin = require("./admin.model");
db.user = require("./user.model");
db.sales_rep = require("./sales_rep.model");
db.role = require("./role.model");
db.appointmentScheduler = require("./appointment.scheduler.model");
db.attendance = require("./attendance.model");
db.supplier = require("./supplier.model");
db.product = require("./product.model");
db.collectionTracking = require("./collectionTracking.model");
db.supplierPurchaseOrder = require("./supplierPurchaseOrder.model");
db.customerPurchaseOrder = require("./customerPurchaseOrder.model");
db.billing = require("./billing.model");
db.customers = require("./customers.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;