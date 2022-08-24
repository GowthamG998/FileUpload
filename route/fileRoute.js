const route = require('express').Router();
const fileCtrl = require('../controller/fileCtrl')
const upload = require('../middleware/config');

route.get(`/fileInfo`, fileCtrl.home);
route.post(`/upload`, upload, fileCtrl.upload);
route.delete(`/delete/:id`, fileCtrl.delete);

module.exports = route;