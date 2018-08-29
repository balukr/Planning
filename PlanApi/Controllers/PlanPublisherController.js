var express = require("express");
var bodyParser = require("body-parser");
var PlaogramPDFGenerator =require("../PlanogramDocumentGenerator/GeneratePlanogramPDFForStores.js");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Display Plan Document on request of GET.
var planogram_get =function() {
    res.send('NOT IMPLEMENTED: Plan GET');
} ;

// Handle Plan creation request on POST.
var Planogram_create_post = function (req ,res) {

    var PlanogramObject =req.body;
     PDFURL= PlaogramPDFGenerator.GeneratePlanogramPDF(PlanogramObject);
     res.send('Planogram Document Generated Succesfully , File Name:'+ PDFURL);
    } ;

 module.exports={
    planogram_get ,
    Planogram_create_post
};