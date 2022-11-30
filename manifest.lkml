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


application: dashboard-navigation {
  label: "Elizabeth Dashboard Navigation"
  url: "http://localhost:8080/dashboard_nav_bundle.js"
  # file: "dashboard_nav_bundle.js"
  entitlements: {
    use_embeds: yes
    core_api_methods: ["folder", "folder_dashboards", "me", "user_roles"]
  }
}


visualization: {
  label: "liz custom viz"
  url: "https://localhost:8080/bundle.js"

  id :  "elizabeth"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js",
    "https://www.amcharts.com/lib/4/core.js",
    "https://www.amcharts.com/lib/4/charts.js",
    "https://www.amcharts.com/lib/4/themes/animated.js"
  ]

}
