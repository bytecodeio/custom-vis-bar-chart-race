
const visObject = {

create: function (element, config) {},

  updateAsync: function(data, element, config, queryResponse, details, doneRendering){


    element.innerHTML = "";
    element.innerHTML = `
      <style>
       @import url(https://fonts.googleapis.com/css?family=Open+Sans);

         body{
          font-family: 'Open Sans',serif;
          font-weight:bold
         }
        #chartdiv {
          height:100%;
          min-height: 500px;
          width: 100%;

        }

      </style>
    `;


var visContainer = document.createElement('div');
visContainer.setAttribute("id", "chartdiv");
element.append(visContainer)

am4core.addLicense("ch-custom-attribution");


const allData = []



//define conditions of data

    const hasTwoDimensions = queryResponse.fields.dimensions.length === 2;
    const hasOneMeasure = queryResponse.fields.measures.length === 1;
    // const isMeasureNumeric = queryResponse.fields.measures[0]?.is_numeric;


//write error for unmet conditions

    if (!hasTwoDimensions || !hasOneMeasure ) {

      element.innerHTML = "<p style='text-align:center;font-size:1.25em;padding-top:2em;font-family: 'Open Sans',serif;'>Incompatible Data. This chart requires <em>two dimensions</em> and <em>one measure</em>.<br>For example, year, name, and count.</p>";

    }



//define values

const grouping_dim = queryResponse.fields.dimensions[0].name;
const iterator = queryResponse.fields.dimensions[1].name;
const plot_measure = queryResponse.fields.measures[0].name;



//write error for too many values on Y axis

if (iterator.length > 40 && !isNaN(iterator)) {

  element.innerHTML = "<p style='text-align:center;font-size:1.25em;padding-top:2em;font-family: 'Open Sans',serif;'>Incompatible Data. There are too many values in your dimensions. Please limit them so there are 40 or less on the Y axis.</p>";

}

if (grouping_dim.length > 40 && isNaN(grouping_dim)) {

  element.innerHTML = "<p style='text-align:center;font-size:1.25em;padding-top:2em;font-family: 'Open Sans',serif;'>Incompatible Data. There are too many values in your dimensions. Please limit them so there are 40 or less on the Y axis.</p>";

}


if (grouping_dim.length > 40 && isNaN(grouping_dim) && isNaN(iterator)) {

  element.innerHTML = "<p style='text-align:center;font-size:1.25em;padding-top:2em;font-family: 'Open Sans',serif;'>Incompatible Data. There are too many values in your dimensions. Please limit them so there are 40 or less on the Y axis.</p>";

}




//push values

    data.forEach(function(d) {
      allData.push({
        year: d[grouping_dim]["value"],
        name: d[iterator]["value"],
        count:d[plot_measure]["value"]
      });

    });


let firstIterator = allData[0].name


//reformat object
const output2 = () => {

  let result = {};

  allData.forEach((data) => {


  if(!isNaN(firstIterator)){

    if (result[data.name]) {

       // checks to see if there's an array for that value yet. If there is, the spread operator copies the existing array and adds a new entry to that array

      result[data.name] = [...result[data.name], data];
    } else {

      //if there's no array yet for that value, this simply assigns the data to a new value key and adds it to the result object
      result[data.name] = [data];
    }

  }

  if(isNaN(firstIterator)){

    if (result[data.year]) {
      result[data.year] = [...result[data.year], data];
    } else {
      result[data.year] = [data];
    }
  }

  });
  return result;

};


const finalData = output2();


//grab first and last key from reformatted json

const lastKey = Object.keys(finalData)[Object.keys(finalData).length - 1]
const firstKey = Object.keys(finalData)[0]



//amcharts package

am4core.useTheme(am4themes_animated);

am4core.globalAdapter.addAll(2);
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(40, 40, 40, 40);
chart.numberFormatter.numberFormat = "#,###.";
var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -10;
label.fontSize = 30;

var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(97);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function (event) {
  if (event.target.isActive) {
    play();
  } else {
    stop();
  }
});

var stepDuration = 4000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;

if(!isNaN(firstIterator)){
categoryAxis.dataFields.category = "year";
}

if(isNaN(firstIterator)){
categoryAxis.dataFields.category = "name";
}



categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = false;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());

if(!isNaN(firstIterator)){
series.dataFields.categoryY = "year";

}

if(isNaN(firstIterator)){
series.dataFields.categoryY = "name";

}



series.dataFields.valueX = "count";
series.tooltipText = "{valueX.value}";
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.maxColumns = 1;
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;
var labelBullet = series.bullets.push(new am4charts.LabelBullet());
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;
labelBullet.label.maxColumns = 1;
chart.zoomOutButton.disabled = true;


series.columns.template.adapter.add("fill", function (fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});





var year = firstKey;

label.text = year.toString();


//this function will be for incrementing through next key in object until you get to the last key and then return to first key

    function propertyIterator(obj) {
        const keys = Object.keys(obj);
        const values = Object.values(obj);
        const length = keys.length;
        let nextIndex = 0;
        return {
          next: function () {
            if (nextIndex !== keys.length - 1) {
              nextIndex++;
            } else {
              nextIndex = 0;
            }
            const value = {
              key: keys[nextIndex],
              value: values[nextIndex],
            };
            return { current: value };
          },
        };
      }

    const incrementObj = propertyIterator(finalData);




var interval;

function play() {
  interval = setInterval(function () {
    nextYear();
  }, stepDuration);
  nextYear();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}



function nextYear() {

//increment value if it is a number

  if(!isNaN(year)){


    year++


      if (year > lastKey) {
        year = firstKey;
      }

    var newData = finalData[year];
    // console.log(newData)
    var itemsWithNonZero = 0;

    for (var i = 0; i < chart.data.length; i++) {

      chart.data[i]["count"] = newData[i]["count"];

      if (chart.data[i]["count"] > 0) {
        itemsWithNonZero++;
      }
    }


  }

//increment  value if it is not a number

  if(isNaN(year)){


     year = incrementObj.next().current.key;
     // console.log(year);


    var newData = finalData[year];
    // console.log(finalData[year])
    var itemsWithNonZero = 0;

    for (var i = 0; i < newData.length; i++) {


      chart.data[i]["count"] = newData[i]["count"];

      if (chart.data[i]["count"] > 0) {
        itemsWithNonZero++;
      }
    }


  }



  if (itemsWithNonZero > 25) {
    itemsWithNonZero = 25;
  }

  if (year == lastKey) {
    series.interpolationDuration = stepDuration / 4;
    valueAxis.rangeChangeDuration = stepDuration / 4;
  } else {
    series.interpolationDuration = stepDuration;
    valueAxis.rangeChangeDuration = stepDuration;
  }

  chart.invalidateRawData();
  label.text = year.toString();

  categoryAxis.zoom({
    start: 0,
    end: itemsWithNonZero / categoryAxis.dataItems.length,
  });
}

categoryAxis.sortBySeries = series;

chart.data = JSON.parse(JSON.stringify(finalData[year]));

categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function () {
  setTimeout(function () {
    playButton.isActive = true;
  }, 2000);
});


doneRendering()
  }
};

looker.plugins.visualizations.add(visObject);
