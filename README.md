Open source- Bar Chart Race using Amchart.js:

<a href="https://www.amcharts.com/">https://www.amcharts.com</a>


<img width="1578" alt="Screen Shot 2022-11-05 at 2 16 28 PM" src="https://user-images.githubusercontent.com/114446653/200135021-d7406db4-2d6a-41d7-96d0-d24b7a3c01c4.png">


To run locally, download the repo, then npm i, npm run build, and npm start.

Add the appropriate parameters to your manifest file in Looker. Something like this:




project_name: "amcharts-custom-bar-chart-race"



visualization: {
  id: "bar-chart-race-amcharts"
  label: "Bar Chart Race amCharts"
  url: "https://localhost:8080/bundle.js"

  dependencies: [
    "https://www.amcharts.com/lib/4/core.js",
    "https://www.amcharts.com/lib/4/charts.js",
    "https://www.amcharts.com/lib/4/themes/animated.js"
  ]

}


Then commit and deploy changes to see the visual displayed in Looker visualization options.
