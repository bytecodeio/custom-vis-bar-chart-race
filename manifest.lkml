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



project_name: "cardinal-health"
application: cardinal-health {
  label: "Cardinal Health"
  url: "http://localhost:8080/bundle.js"
  entitlements: {
    local_storage: yes
    use_embeds: yes
    use_iframes: yes
    core_api_methods: ["all_connections", "search_folders", "run_query", "me",
      "query_for_slug", "create_sql_query", "run_sql_query"]
    use_form_submit: yes
  }
}
