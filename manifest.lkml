project_name: "amcharts-custom-bar-chart-race"



visualization: {
  id: "bar-chart-race-amcharts"
  label: "Bar Chart Race amCharts"
  dependencies: [
    "https://www.amcharts.com/lib/4/core.js",
    "https://www.amcharts.com/lib/4/charts.js",
    "https://www.amcharts.com/lib/4/themes/animated.js"
  ]
  file: "src/customVis.js"
}










application: react1 {
  label: "react1"
  url: "http://localhost:8080/bundle.js"
  # file: "dashboard_nav_bundle.js"
  entitlements: {
    use_embeds: yes
    core_api_methods: ["folder", "folder_dashboards", "me", "user_roles"]
  }
}
