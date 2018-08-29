var Constants = require('../PlanogramDocumentGenerator/DocumentDrawingConfig.js');
var PlanogramInputObject ;
var PlaogramPDfDocument ;


GenerateDocumentFooter =function(segementNumber,pdfDoc,inputPlanogramJSON) {

    //Initalise input Objects
     InitaliseInputObjectsForFooter(pdfDoc,inputPlanogramJSON);
     
     //Draw main footer lines
     DrawMainFooterLines();
    
     //Draw Footer attributes
     DrawFooterAttributes(segementNumber);
    
    //Draw space for Notes
     DrawNotesSection();
   
 };

 InitaliseInputObjectsForFooter =function(pdfDoc,inputPlanogramJSON) {

        PlanogramInputObject= inputPlanogramJSON ;
        PlaogramPDfDocument= pdfDoc;

    };

    DrawMainFooterLines=function(){

        PlaogramPDfDocument.moveTo(Constants.LEFT_MARGIN,Constants.FOOTER_FIRSTBOUNDARY_YPOSITION) ;
        PlaogramPDfDocument.lineWidth(Constants.HEADING_LINE_WIDTH) ;  
        PlaogramPDfDocument.lineTo(Constants.HEADER_WIDTH,Constants.FOOTER_FIRSTBOUNDARY_YPOSITION) ;
        PlaogramPDfDocument.stroke(Constants.HEADING_LINE_COLOR)  ; 
        PlaogramPDfDocument.moveTo(Constants.LEFT_MARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION) ;
        PlaogramPDfDocument.lineWidth(Constants.HEADING_LINE_WIDTH) ;  
        PlaogramPDfDocument.lineTo(Constants.HEADER_WIDTH,Constants.FOOTER_SECONDBOUNDARY_YPOSITION) ;
        PlaogramPDfDocument.stroke(Constants.HEADING_LINE_COLOR)  ;
        
    };

    DrawFooterAttributes=function(segementNumber) {

        PlaogramPDfDocument.fontSize(Constants.FOOTER_FONT_SIZE);
       
       var footerModCountAttributes ="Mod # : " +segementNumber + " of " + PlanogramInputObject.planogramSegment.length;
       PlaogramPDfDocument.text(footerModCountAttributes ,Constants.LEFT_MARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION+Constants.FOOTERTEXT_YMARGIN,{width:Constants.FOOTERATTRIBUTES_TEXTMARGIN}) ;
       
       var footerLiveDateAttributes ="Live Date : "  + PlanogramInputObject.effectiveDate;
       PlaogramPDfDocument.text(footerLiveDateAttributes ,Constants.LEFT_MARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION+5*Constants.FOOTERTEXT_YMARGIN,{width:Constants.FOOTERATTRIBUTES_TEXTMARGIN}) ;
       
       var footerFixtureAttributes ="Fixture : "  + PlanogramInputObject.equipmentType;
       PlaogramPDfDocument.text(footerFixtureAttributes ,Constants.LEFT_MARGIN+Constants.FOOTERATTRIBUTES_TEXTMARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION+Constants.FOOTERTEXT_YMARGIN,{width:Constants.FOOTERATTRIBUTES_TEXTMARGIN}) ;
       
       var footerPlanQualityAttributes ="Plan Quality Score %: "  + PlanogramInputObject.totalPlanogramQualityScore;
       PlaogramPDfDocument.text(footerPlanQualityAttributes ,Constants.LEFT_MARGIN+Constants.FOOTERATTRIBUTES_TEXTMARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION+5*Constants.FOOTERTEXT_YMARGIN,{width:Constants.FOOTERATTRIBUTES_TEXTMARGIN}) ;

       var footerClusterIDAttributes ="ClusterID : "  + PlanogramInputObject.clusterID;
       PlaogramPDfDocument.text(footerClusterIDAttributes ,Constants.LEFT_MARGIN+2*Constants.FOOTERATTRIBUTES_TEXTMARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION+Constants.FOOTERTEXT_YMARGIN,{width:Constants.FOOTERATTRIBUTES_TEXTMARGIN}) ;

       var footerPageNumberAttributes ="Page Number : "  + segementNumber + " of " + PlanogramInputObject.planogramSegment.length;;
       PlaogramPDfDocument.text(footerPageNumberAttributes ,Constants.LEFT_MARGIN+2*Constants.FOOTERATTRIBUTES_TEXTMARGIN,Constants.FOOTER_SECONDBOUNDARY_YPOSITION+5*Constants.FOOTERTEXT_YMARGIN,{width:Constants.FOOTERATTRIBUTES_TEXTMARGIN}) ;
      

    };
    DrawNotesSection=function() {

        PlaogramPDfDocument.moveTo(Constants.LEFT_MARGIN,Constants.FOOTER_NOTES_YPOSITION) ;
        PlaogramPDfDocument.lineWidth(Constants.HEADING_LINE_WIDTH) ;  
        PlaogramPDfDocument.lineTo(Constants.HEADER_WIDTH,Constants.FOOTER_NOTES_YPOSITION) ;
        PlaogramPDfDocument.stroke(Constants.HEADING_LINE_COLOR)  ;
 
        var footerNotesAttributes ="NOTES : "  ;
        PlaogramPDfDocument.fontSize(Constants.FOOTERNOTES_FONT_SIZE);
        PlaogramPDfDocument.text(footerNotesAttributes ,Constants.LEFT_MARGIN,Constants.FOOTER_NOTES_YPOSITION+Constants.FOOTERNOTESTEXT_YMARGIN) ;
     };

    
   
module.exports={
       
    GenerateDocumentFooter
    
}; 
