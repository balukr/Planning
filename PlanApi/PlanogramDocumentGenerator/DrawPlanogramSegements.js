var Constants = require('../PlanogramDocumentGenerator/DocumentDrawingConfig.js');
var Footer = require('../PlanogramDocumentGenerator/PlanogramDocumentFooter.js');
var Header = require('../PlanogramDocumentGenerator/PlanogramDocumentHeader.js');

var PlanogramInputObject ;
var PlaogramPDfDocument ;

    DrawPlanogramSegements=function(pdfDoc,inputPlanogramJSON){

        InitaliseInputObjectsForSegements(pdfDoc,inputPlanogramJSON);

        //Draw Fixtures for all segements
        for (var segementIndex = 0; segementIndex < PlanogramInputObject.planogramSegment.length; segementIndex++) {
            
            Header.GenerateDocumentHeadings(PlaogramPDfDocument,PlanogramInputObject) ;  
            console.log("Segement being drawn :" + segementIndex );
            DrawFixture(PlanogramInputObject.planogramSegment[segementIndex]); //Draw fixture for each segement
            Footer.GenerateDocumentFooter(segementIndex+1,PlaogramPDfDocument,PlanogramInputObject);

            if(segementIndex != PlanogramInputObject.planogramSegment.length -1 ) {
                PlaogramPDfDocument.addPage();
            }             
            
        }        

    };

    InitaliseInputObjectsForSegements =function(pdfDoc,inputPlanogramJSON) {

        PlanogramInputObject= inputPlanogramJSON ;
        PlaogramPDfDocument= pdfDoc;
    
    };
   
    
    DrawFixture=function (planSegement) {
        //Draw all shelves
        DrawShelves(planSegement);
               
    } ;

    DrawShelves=function(planSegement) {

       
        var OrderedFixture =[] ;
        var aspectRatio= CalculateDrawingAspectRatio(planSegement.equipmentWidth);
     
        OrderedFixture= OrderFixturesBasedOnVerticalPosition(planSegement.planogramFixture);

       var StartShelfXPosition; // Shelf x Position remains same for all shelves
       var StartShelfYPosition;
       var currentShelfYPosition;
       //var shelfDimensionDEtails;

       //Initalise First Shelf Position
       StartShelfXPosition=Constants.CANVAS_STARTINGXPOSITION+((1-Constants.PERCENTAGE_AVAILABLE_WIDTH_FOR_SHELVES)*Constants.CANVAS_WIDTH);
       

       StartShelfYPosition=Constants.CANVAS_STARTINGYPOSITION+Constants.CANVAS_HEIGHT-Constants.STANDARD_SHELF_THICKNESS;
       currentShelfYPosition=StartShelfYPosition;
       

       DrawShelfVerticalScale(StartShelfXPosition);

       //Draw first shelf
       PlaogramPDfDocument.rect(StartShelfXPosition,StartShelfYPosition,(Constants.PERCENTAGE_AVAILABLE_WIDTH_FOR_SHELVES * Constants.CANVAS_WIDTH),Constants.STANDARD_SHELF_THICKNESS)
       .fillAndStroke(Constants.SHELF_FILL_COLOR,Constants.SHELF_STROKE_COLOR);

       PlaogramPDfDocument.rect(Constants.LEFT_MARGIN,StartShelfYPosition,Constants.SHELF_DIMENSION_DETAILS_WIDTH,Constants.STANDARD_SHELF_THICKNESS);
       PlaogramPDfDocument.fontSize(Constants.DEFAULT_TEXTFONT_SIZE);
       PlaogramPDfDocument.align = 'left' ;
       shelfDimensionDetails ="Height: " + OrderedFixture[0].fixtureYPosition + " Depth: " +OrderedFixture[0].fixtureDepth + " Slope: " +OrderedFixture[0].fixtureSlope + " GrilleHeight :" + OrderedFixture[0].fixtureGrillHeight;
       PlaogramPDfDocument.text(shelfDimensionDetails,Constants.LEFT_MARGIN,StartShelfYPosition-Constants.FIXTURE_DIMENSION_DETAILS_HEIGHT ,{ width :Constants.FIXTURE_DIMENSION_DETAILS_WIDTH , height :Constants.FIXTURE_DIMENSION_DETAILS_HEIGHT})
       .fillColor(Constants.DEFAULT_DRAWING_COLOR);
       PlaogramPDfDocument.text("All Dimensions in CM",Constants.LEFT_MARGIN,Constants.CANVAS_STARTINGYPOSITION ,{ width :60 , height :25});
       PlaogramPDfDocument.stroke(Constants.SHELF_COLOR);

       //Draw First Product in the shelf
       currentProductXPosition=StartShelfXPosition;
       currentProductYPosition=StartShelfYPosition-aspectRatio*OrderedFixture[0].productPosition[0].positionHeight;
       
       
       PlaogramPDfDocument.rect(currentProductXPosition,currentProductYPosition,aspectRatio*OrderedFixture[0].productPosition[0].positionWidth,aspectRatio*OrderedFixture[0].productPosition[0].positionHeight);
       PlaogramPDfDocument.stroke(Constants.DEFAULT_DRAWING_COLOR);

       PlaogramPDfDocument.fontSize(Constants.DEFAULT_TEXTFONT_SIZE);
       PlaogramPDfDocument.align = 'left' ;
           
       PlaogramPDfDocument.text(OrderedFixture[0].productPosition[0].productDescription,currentProductXPosition,currentProductYPosition+5 ,{ width :aspectRatio*OrderedFixture[0].productPosition[0].positionWidth , height :aspectRatio*OrderedFixture[0].productPosition[0].positionHeight} );
       PlaogramPDfDocument.stroke(Constants.DEFAULT_DRAWING_COLOR);
      
       
       //Draw rest of the Products in the shelf
       for(var productIndex=1 ; productIndex < OrderedFixture[0].productPosition.length ; productIndex++ ) {
           
           currentProductXPosition=currentProductXPosition +aspectRatio*OrderedFixture[0].productPosition[productIndex-1].positionWidth;
           currentProductYPosition=currentShelfYPosition-aspectRatio*OrderedFixture[0].productPosition[productIndex].positionHeight;
                                
           PlaogramPDfDocument.rect(currentProductXPosition,currentProductYPosition,aspectRatio*OrderedFixture[0].productPosition[productIndex].positionWidth,aspectRatio*OrderedFixture[0].productPosition[productIndex].positionHeight);
           PlaogramPDfDocument.stroke('PRODUCT_BORDER_COLOR');
           
           PlaogramPDfDocument.fontSize(Constants.DEFAULT_TEXTFONT_SIZE);
           PlaogramPDfDocument.align = 'left' ;
                    
          PlaogramPDfDocument.text(OrderedFixture[0].productPosition[productIndex].productDescription,currentProductXPosition,currentProductYPosition+5 ,{ width :aspectRatio*OrderedFixture[0].productPosition[productIndex].positionWidth , height :aspectRatio*OrderedFixture[0].productPosition[productIndex].positionHeight});
                    
          PlaogramPDfDocument.stroke(Constants.DEFAULT_DRAWING_COLOR);              

           
       }

       //Draw rest of the shelves
       for (var fixtureIndex = 1; fixtureIndex < OrderedFixture.length; fixtureIndex++) {
            
            var lastShelfYPosition=currentShelfYPosition ;
            var maxProdHeight= FindMaximumProductHeight(OrderedFixture[fixtureIndex]);
            currentShelfYPosition=StartShelfYPosition-(aspectRatio*OrderedFixture[fixtureIndex].fixtureYPosition);

            //if default shelf position is less than tallest product
            if (aspectRatio*maxProdHeight > (lastShelfYPosition-currentShelfYPosition)){
                currentShelfYPosition=lastShelfYPosition-aspectRatio*maxProdHeight;
            }
            
            PlaogramPDfDocument.rect(StartShelfXPosition,currentShelfYPosition,(Constants.PERCENTAGE_AVAILABLE_WIDTH_FOR_SHELVES * Constants.CANVAS_WIDTH),Constants.STANDARD_SHELF_THICKNESS)
            .fillAndStroke(Constants.SHELF_FILL_COLOR,Constants.SHELF_STROKE_COLOR);
            PlaogramPDfDocument.rect(Constants.LEFT_MARGIN,currentShelfYPosition,Constants.SHELF_DIMENSION_DETAILS_WIDTH,Constants.STANDARD_SHELF_THICKNESS);
            PlaogramPDfDocument.fontSize(Constants.DEFAULT_TEXTFONT_SIZE);
                        
            PlaogramPDfDocument.align = 'left' ;
            shelfDimensionDetails ="Height: " + OrderedFixture[fixtureIndex].fixtureYPosition + " Depth: " +OrderedFixture[fixtureIndex].fixtureDepth + " Slope: " +OrderedFixture[fixtureIndex].fixtureSlope + " GrilleHeight :" + OrderedFixture[fixtureIndex].fixtureGrillHeight;
            PlaogramPDfDocument.text(shelfDimensionDetails,Constants.LEFT_MARGIN,currentShelfYPosition-Constants.FIXTURE_DIMENSION_DETAILS_HEIGHT ,{ width :Constants.FIXTURE_DIMENSION_DETAILS_WIDTH , height :Constants.FIXTURE_DIMENSION_DETAILS_HEIGHT});
            PlaogramPDfDocument.stroke(Constants.SHELF_COLOR);

            //Draw First Product in the shelf
            currentProductXPosition=StartShelfXPosition;
            currentProductYPosition=currentShelfYPosition-aspectRatio*OrderedFixture[fixtureIndex].productPosition[0].positionHeight;
                   
            PlaogramPDfDocument.rect(currentProductXPosition,currentProductYPosition,aspectRatio*OrderedFixture[fixtureIndex].productPosition[0].positionWidth,aspectRatio*OrderedFixture[fixtureIndex].productPosition[0].positionHeight);
            PlaogramPDfDocument.stroke('PRODUCT_BORDER_COLOR');

            PlaogramPDfDocument.fontSize(Constants.DEFAULT_TEXTFONT_SIZE);
            PlaogramPDfDocument.align = 'left' ;
           
            PlaogramPDfDocument.text(OrderedFixture[fixtureIndex].productPosition[0].productDescription,currentProductXPosition,currentProductYPosition+5 ,{ width :aspectRatio*OrderedFixture[fixtureIndex].productPosition[0].positionWidth , height :aspectRatio*OrderedFixture[fixtureIndex].productPosition[0].positionHeight} );
            PlaogramPDfDocument.stroke(Constants.DEFAULT_DRAWING_COLOR);

            //Draw rest of the Products in the shelf
            for(var productIndex=1 ; productIndex < OrderedFixture[fixtureIndex].productPosition.length ; productIndex++ ) {
                currentProductXPosition=currentProductXPosition +aspectRatio*OrderedFixture[fixtureIndex].productPosition[productIndex-1].positionWidth;
                currentProductYPosition=currentShelfYPosition-aspectRatio*OrderedFixture[fixtureIndex].productPosition[productIndex].positionHeight;
                PlaogramPDfDocument.rect(currentProductXPosition,currentProductYPosition,aspectRatio*OrderedFixture[fixtureIndex].productPosition[productIndex].positionWidth,aspectRatio*OrderedFixture[fixtureIndex].productPosition[productIndex].positionHeight);
                PlaogramPDfDocument.stroke('PRODUCT_BORDER_COLOR');

                PlaogramPDfDocument.fontSize(Constants.DEFAULT_TEXTFONT_SIZE);
                PlaogramPDfDocument.align = 'left' ;
           
               PlaogramPDfDocument.text(OrderedFixture[fixtureIndex].productPosition[productIndex].productDescription,currentProductXPosition,currentProductYPosition+5 ,{ width :aspectRatio*OrderedFixture[fixtureIndex].productPosition[productIndex].positionWidth , height :aspectRatio*OrderedFixture[fixtureIndex].productPosition[productIndex].positionHeight} );
               PlaogramPDfDocument.stroke(Constants.DEFAULT_DRAWING_COLOR);
            }

       }
       
        
    };

    DrawShelfVerticalScale=function(StartShelfXPosition){

        //PlaogramPDfDocument.lineWidth(Constants.HEADING_LINE_WIDTH) ;  
        PlaogramPDfDocument.moveTo(StartShelfXPosition,Constants.CANVAS_STARTINGYPOSITION) ;
        PlaogramPDfDocument.lineTo(StartShelfXPosition,Constants.CANVAS_STARTINGYPOSITION+Constants.CANVAS_HEIGHT) ;
        PlaogramPDfDocument.moveTo(Constants.LEFT_MARGIN,Constants.CANVAS_STARTINGYPOSITION) ;
        PlaogramPDfDocument.lineTo(Constants.LEFT_MARGIN,Constants.CANVAS_STARTINGYPOSITION+Constants.CANVAS_HEIGHT) ;
        PlaogramPDfDocument.stroke(Constants.VERTICALSHELF_LINE_COLOR)  ; 

        //Draw scale lines
        startYPosition=Constants.CANVAS_STARTINGYPOSITION+Constants.CANVAS_HEIGHT ;

        while(startYPosition > Constants.CANVAS_STARTINGYPOSITION ) {
            
            PlaogramPDfDocument.moveTo(StartShelfXPosition,startYPosition) ;
            PlaogramPDfDocument.lineTo(StartShelfXPosition-10,startYPosition) ;
            
            PlaogramPDfDocument.stroke('Constants.VERTICALSHELF_LINE_COLOR')  ; //
            startYPosition=startYPosition-2*Constants.STANDARD_SHELF_THICKNESS;           
            
        }

        

    };

    OrderFixturesBasedOnVerticalPosition=function(unOrderedFixture) {
        var orderedArrayFixtures =[] ;
        var fixtureIndex;
        var tempIndex;
        var tempunOrderedFixtureYPosition=[];
        var fixtureHeight;

        for (fixtureIndex=0;fixtureIndex < unOrderedFixture.length ; fixtureIndex++ ) {
            
            tempunOrderedFixtureYPosition.push(unOrderedFixture[fixtureIndex].fixtureYPosition);            
            
         }

         tempunOrderedFixtureYPosition.sort(function(a, b){return a - b});

         for(tempIndex=0;tempIndex < tempunOrderedFixtureYPosition.length;tempIndex++ ){

            for (fixtureIndex=0;fixtureIndex < unOrderedFixture.length ; fixtureIndex++ ) {
            
                if(tempunOrderedFixtureYPosition[tempIndex]==unOrderedFixture[fixtureIndex].fixtureYPosition)  {

                    orderedArrayFixtures.push(unOrderedFixture[fixtureIndex]) ;
                    break;

                }          
                
            }

         }
    return orderedArrayFixtures;

    };

    FindMaximumProductHeight=function(FixtureDetails){

        //console.log("fixtureHeight before calculation" + fixtureHeight);
        var fixtureHeight =0;
        for(var productIndex=0 ;productIndex < FixtureDetails.productPosition.length ; productIndex++) {

            if (fixtureHeight <FixtureDetails.productPosition[productIndex].positionHeight ) {
                
                fixtureHeight =FixtureDetails.productPosition[productIndex].positionHeight;
            }
            
        }
        //console.log("fixtureHeight after calculation" + fixtureHeight);
            return fixtureHeight;
    }

    CalculateDrawingAspectRatio=function(equipmentWidth){
        var aspectRatio=(Constants.PERCENTAGE_AVAILABLE_WIDTH_FOR_SHELVES*Constants.CANVAS_WIDTH)/equipmentWidth;
        return aspectRatio;
    }

    

      
   
module.exports={
       
    DrawPlanogramSegements
    
}; 
