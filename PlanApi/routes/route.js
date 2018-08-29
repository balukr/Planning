var express = require('express');
var router = express.Router();
var PlanPublisher_controller = require('../controllers/PlanPublisherController');

var routes = function () {
    router.route('/')
        .get(function (req, res) {
            
            res.send("Inside Get method");//method to be implemented
        });
//handle all post requests 
    router.route('/')
        .post(function (req, res) {
            console.log("Router for Post Invoked");
            PlanPublisher_controller.Planogram_create_post(req,res)          
                   
        });
        return router;

       
};
module.exports = routes;