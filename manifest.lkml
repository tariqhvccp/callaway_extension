project_name: "helloworld-js"

application: helloworld-js {
  label: "Helloworld (JavaScript)"
  url: "bundle.js"
  entitlements: {
    core_api_methods: ["me","query_for_slug", "run_query", "create_query"
      , "create_merge_query"]
  }
}
