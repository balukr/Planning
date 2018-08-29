var Constants = require('../PlanogramDocumentGenerator/DocumentDrawingConfig.js');
var PlanogramInputObject ;
var PlaogramPDfDocument ;


GenerateDocumentHeadings =function(pdfDoc,inputPlanogramJSON) {
       
    //Initalise input Objects
    InitaliseInputObjectsForHeader(pdfDoc,inputPlanogramJSON);
    
    //Basic Header Details - Display Group and Date
    DrawBasicHeaderInformation();
    //Draw Legends
    DrawHeaderLegends();
    //Product Type Headers
    DrawProductTypeHeaderInformation();
    
};

InitaliseInputObjectsForHeader =function(pdfDoc,inputPlanogramJSON) {

    PlanogramInputObject= inputPlanogramJSON ;
    PlaogramPDfDocument= pdfDoc;

};

DrawProductTypeHeaderInformation = function(){

    PlaogramPDfDocument.align = 'center' ;
    PlaogramPDfDocument.fontSize(Constants.PRODUCTTYPE_LEGENDTEXTFONT_SIZE);
    PlaogramPDfDocument.rect(Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION,Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION,Constants.PRODUCTTYPE_BOX_SIZE,Constants.PRODUCTTYPE_BOX_SIZE);
    PlaogramPDfDocument.text("L",Constants.PRODUCTTYPE_LEGENDTEXT_ALIGNMENTXPOSITION+Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION,2+Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION);
    PlaogramPDfDocument.rect(Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION+Constants.PRODUCTTYPE_WIDTH_BETWEENBOXES,Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION,Constants.PRODUCTTYPE_BOX_SIZE,Constants.PRODUCTTYPE_BOX_SIZE);
    PlaogramPDfDocument.text("T",Constants.PRODUCTTYPE_LEGENDTEXT_ALIGNMENTXPOSITION+Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION+Constants.PRODUCTTYPE_WIDTH_BETWEENBOXES,Constants.PRODUCTTYPE_LEGENDTEXT_ALIGNMENTYPOSITION+Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION);
    PlaogramPDfDocument.rect(Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION+2*Constants.PRODUCTTYPE_WIDTH_BETWEENBOXES,Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION,Constants.PRODUCTTYPE_BOX_SIZE,Constants.PRODUCTTYPE_BOX_SIZE);
    PlaogramPDfDocument.text("M",Constants.PRODUCTTYPE_LEGENDTEXT_ALIGNMENTXPOSITION+Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION+2*Constants.PRODUCTTYPE_WIDTH_BETWEENBOXES,Constants.PRODUCTTYPE_LEGENDTEXT_ALIGNMENTYPOSITION+Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION);
     
    PlaogramPDfDocument.fontSize(Constants.PRODUCTTYPE_DESCRIPTIONFONT_SIZE);
    PlaogramPDfDocument.text("Local Choice Product",Constants.PRODUCTTYPE_LEGENDDESCRIPTION_ALIGNMENTXPOSITION+Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION,2+Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION,{width:Constants.PRODUCTTYPE_DESCRIPTION_WIDTH});
    PlaogramPDfDocument.text("Tray Products",Constants.PRODUCTTYPE_LEGENDDESCRIPTION_ALIGNMENTXPOSITION+Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION+Constants.PRODUCTTYPE_WIDTH_BETWEENBOXES,2+Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION,{width:Constants.PRODUCTTYPE_DESCRIPTION_WIDTH});
    PlaogramPDfDocument.text("Multi-located Product",Constants.PRODUCTTYPE_LEGENDDESCRIPTION_ALIGNMENTXPOSITION+Constants.LEFT_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTXPOSITION+2*Constants.PRODUCTTYPE_WIDTH_BETWEENBOXES,2+Constants.TOP_MARGIN+Constants.PRODUCTTYPE_DESCRIPTION_STARTYPOSITION,{width:Constants.PRODUCTTYPE_DESCRIPTION_WIDTH});

};

DrawHeaderLegends=function(){

    PlaogramPDfDocument.lineWidth(Constants.DEFAULT_LINE_WIDTH) ; 
    PlaogramPDfDocument.rect(Constants.LEFT_MARGIN+Constants.DISPLAY_GROUP_DESCRIPTION_STARTPOSITION,Constants.TOP_MARGIN+Constants.LEGEND_BOX_MARGIN,Constants.LEGEND_BOX_SIZE,Constants.LEGEND_BOX_SIZE)
    .fillAndStroke(Constants.LEGEND_NEWPRODUCT_COLOR,Constants.DEFAULT_STROKECOLOR);
    PlaogramPDfDocument.rect(Constants.LEFT_MARGIN+Constants.DISPLAY_GROUP_DESCRIPTION_STARTPOSITION,Constants.TOP_MARGIN+Constants.LEGEND_BOX_MARGIN+10,Constants.LEGEND_BOX_SIZE,Constants.LEGEND_BOX_SIZE)
    .fillAndStroke(Constants.LEGEND_NOCHANGE_COLOR,Constants.DEFAULT_STROKECOLOR);
    PlaogramPDfDocument.rect(Constants.LEFT_MARGIN+Constants.DISPLAY_GROUP_DESCRIPTION_STARTPOSITION,Constants.TOP_MARGIN+Constants.LEGEND_BOX_MARGIN+20,Constants.LEGEND_BOX_SIZE,Constants.LEGEND_BOX_SIZE)
    .fillAndStroke(Constants.LEGEND_NEWLOCATION_COLOR,Constants.DEFAULT_STROKECOLOR);

    PlaogramPDfDocument.fontSize(Constants.LEGEND_TEXT_FONTSIZE);
    PlaogramPDfDocument.fillColor(Constants.DEFAULT_FONTCOLOR);
    PlaogramPDfDocument.text("New Product",Constants.LEFT_MARGIN+Constants.LEGEND_STARTPOSITION,Constants.TOP_MARGIN+Constants.LEGEND_BOX_MARGIN);
    PlaogramPDfDocument.text("No Change",Constants.LEFT_MARGIN+Constants.LEGEND_STARTPOSITION,Constants.TOP_MARGIN+Constants.LEGEND_BOX_MARGIN+10);
    PlaogramPDfDocument.text("Relocated Product",Constants.LEFT_MARGIN+Constants.LEGEND_STARTPOSITION,Constants.TOP_MARGIN+Constants.LEGEND_BOX_MARGIN+20);

    PlaogramPDfDocument.stroke();

};

DrawBasicHeaderInformation=function(){

    PlaogramPDfDocument.moveTo(Constants.LEFT_MARGIN,Constants.TOP_MARGIN) ;
    PlaogramPDfDocument.lineWidth(Constants.HEADING_LINE_WIDTH) ;  
    PlaogramPDfDocument.lineTo(Constants.HEADER_WIDTH,Constants.RIGHT_MARGIN) ;
    PlaogramPDfDocument.stroke(Constants.HEADING_LINE_COLOR)  ; 
    PlaogramPDfDocument.fontSize(Constants.HEADING_FONT_SIZE);
    PlaogramPDfDocument.text("Cluster Planogram for Display Group : " +PlanogramInputObject.displayGroup + "  Effective Date :  "+ PlanogramInputObject.effectiveDate,Constants.LEFT_MARGIN,Constants.TOP_MARGIN+2*Constants.HEADING_LINE_WIDTH,{width:200}) ;
    PlaogramPDfDocument.lineWidth(Constants.HEADING_LINE_WIDTH) ;  
    PlaogramPDfDocument.moveTo(Constants.LEFT_MARGIN,4*Constants.TOP_MARGIN) ;
    PlaogramPDfDocument.lineTo(Constants.HEADER_WIDTH,4*Constants.RIGHT_MARGIN) ;
    PlaogramPDfDocument.stroke(Constants.HEADING_LINE_COLOR)  ; 

};

 
module.exports={
       
    GenerateDocumentHeadings
    
}; 
