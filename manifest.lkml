project_name: "helloworld-js"

application: helloworld-js {
  label: "Helloworld (JavaScript)"
  url: "https://localhost:8080/bundle.js"
  entitlements: {
    core_api_methods: ["me","query_for_slug", "run_query", "create_query"
      , "create_merge_query"]
  }
}
