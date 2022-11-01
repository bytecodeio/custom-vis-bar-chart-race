project_name: "amcharts-custom-bar-chart-race"



# # Use local_dependency: To enable referencing of another project
# # on this instance with include: statements
#
# local_dependency: {
#   project: "name_of_other_project"
# }



visualization: {
  id: "bar-chart-race-amcharts"
  label: "Bar Chart Race amCharts"
  dependencies: [
    "https://www.amcharts.com/lib/4/core.js",
    "https://www.amcharts.com/lib/4/charts.js",
    "https://www.amcharts.com/lib/4/themes/animated.js"
  ]
  file: "bar-chart.js"
}
