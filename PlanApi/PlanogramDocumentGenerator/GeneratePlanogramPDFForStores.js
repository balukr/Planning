var PDFGenerationLibrary = require('pdfkit');
var fs = require('fs');
var dateTime = require('node-datetime');
var Constants = require('../PlanogramDocumentGenerator/DocumentDrawingConfig.js');
var Footer = require('../PlanogramDocumentGenerator/PlanogramDocumentFooter.js');
var Header = require('../PlanogramDocumentGenerator/PlanogramDocumentHeader.js');
var Segement = require('../PlanogramDocumentGenerator/DrawPlanogramSegements.js');
var PlanogramInputObject ;
var PlaogramPDfDocument ;

GeneratePlanogramPDF = function (PlanogramJsonObject)
    {
        var PlanPdFFilepath ;
        
        PlanogramInputObject=PlanogramJsonObject;
        PlanPdFFilepath=InitaliseDocumentGeneration();
        Segement.DrawPlanogramSegements(PlaogramPDfDocument,PlanogramInputObject);
        CloseDocumentGeneration();
        return PlanPdFFilepath;
    } ;
    
    InitaliseDocumentGeneration = function ()
    {
       var PlanPdFFile;
       PlaogramPDfDocument = new PDFGenerationLibrary ;
       PlaogramPDfDocument.margins
       top: Constants.TOP_MARGIN
       bottom: Constants.BOTTOM_MARGIN
       left: Constants.LEFT_MARGIN
       right: Constants.RIGHT_MARGIN ; 
       PlanPdFFile=GenerateFileName();
      
       PlaogramPDfDocument.pipe(fs.createWriteStream(PlanPdFFile));
       return PlanPdFFile;
    } ;

   
    
    CloseDocumentGeneration=function() {
        PlaogramPDfDocument.end();
    };

    GenerateFileName = function() {
       var dt = dateTime.create(Date.now());
       var formattedDate = dt.format('Y-m-d H-M');
       var  DocumentName= PlanogramInputObject.displayGroup +formattedDate+".pdf" ;
        return DocumentName;
       
    };
    
   
module.exports={
       
    GeneratePlanogramPDF
    
}; 
