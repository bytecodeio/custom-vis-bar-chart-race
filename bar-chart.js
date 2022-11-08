
const visObject = {

  options: {
    first_option: {
      type: "string",
      label: "My First Option",
      default: "Default Value"
    },
    second_option: {
      type: "number",
      label: "My Second Option",
      default: 42
    }
  },

create: function (element, config) {},

  updateAsync: function(data, element, config, queryResponse, details, doneRendering){

    this.clearErrors();

    const updatedOptions = { ...this.options };

    if (config.legendLocation === "bottom") {
      updatedOptions.legendLabelRightMargin = {
        type: "string",
        label: "Legend Label Right Margin",
        default: "6px",
        display: "text",
        placeholder: "6px",
        section: "Legend",
      };
    }

    else {
      delete updatedOptions.legendLabelRightMargin;
    }
    this.trigger("registerOptions", updatedOptions);



element.innerHTML =  '<div id="chartdiv" style="width: 100%;height:500px;"></div>';

const allData = []

console.log(queryResponse)

//define values

const grouping_dim = queryResponse.fields.dimensions[1].name;
const iterator = queryResponse.fields.dimensions[0].name;
const plot_measure = queryResponse.fields.measures[0].name;

//push values

    data.forEach(function(d) {
      allData.push({
        year: d[grouping_dim]["value"],
        name: d[iterator]["value"],
        count:d[plot_measure]["value"]
      });

    });

     if(!isNaN(grouping_dim)){

       console.log("this is a number")


     }

   if(isNaN(grouping_dim)){


       console.log("this is not a number")


     }

     if(!isNaN(iterator)){

       console.log("this is a number")


     }

   if(isNaN(iterator)){


       console.log("this is not a number")


     }


console.log(allData, "first allData")


console.log(iterator)

console.log(grouping_dim)

console.log(plot_measure)

//reformat json
const output2 = () => {

  let result = {};

  allData.forEach((data) => {
    if (result[data.year]) {
      result[data.year] = [...result[data.year], data];
    } else {
      result[data.year] = [data];
    }

  });
  return result;

};


console.log(allData, "second allData")


console.log(output2(), "output2")


const finalData = output2();

//grab first and last key from reformatted json

const lastKey = Object.keys(finalData)[Object.keys(finalData).length - 1]
const firstKey = Object.keys(finalData)[0]

console.log(firstKey)
console.log(lastKey)


//define conditions of data

    const hasTwoDimensions = queryResponse.fields.dimensions.length === 2;
    const hasOneMeasure = queryResponse.fields.measures.length === 1;
    const isMeasureNumeric = queryResponse.fields.measures[0]?.is_numeric;


//write error for unmet conditions

    if (!hasTwoDimensions || !hasOneMeasure || !isMeasureNumeric ) {
      this.addError({
        title: "Incompatible Data",
        message: "This chart requires one dimension and one numerical measure.",
      });
      return;
    }



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
label.dx = -15;
label.fontSize = 50;

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


categoryAxis.dataFields.category = "name";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = false;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "name";
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


//define iterative value


var year = firstKey;

label.text = year.toString();


  function propertyIterator(obj) {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const length = keys.length
    let nextIndex = 0
    return {
      next: function() {
        const value = {
          key: keys[nextIndex],
          value: values[nextIndex]
        }
        nextIndex++
        return { current: value}
      }
    }
  }

  const incrementObj = propertyIterator(finalData)





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

//increment iterative value

function nextYear() {


  if(!isNaN(year)){


    year++


      if (year > lastKey) {
        year = firstKey;
      }

    var newData = finalData[year];
    console.log(newData)
    var itemsWithNonZero = 0;

    for (var i = 0; i < chart.data.length; i++) {

      chart.data[i]["count"] = newData[i]["count"];

      if (chart.data[i]["count"] > 0) {
        itemsWithNonZero++;
      }
    }


  }
  if(isNaN(year)){
  year = incrementObj.next().current.key
   console.log(year)
   console.log(firstKey)
   console.log(lastKey)

    if (year > lastKey) {
      year = firstKey;
    }


    var newData = finalData[year];
    console.log(finalData[year])
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
