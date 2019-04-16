let plugin_id = "yesoreyeram-boomsummary-panel";

export let config = {
  compareOperators: [
    { text: "equals", value: "equals" },
    { text: "notequals", value: "notequals" },
    { text: "contains", value: "contains" },
    { text: "notcontains", value: "notcontains" },
    { text: "startswith", value: "startswith" },
    { text: "endswith", value: "endswith" },
    { text: "in", value: "in" },
    { text: "equals (ignore case)", value: "equals ignorecase" },
    { text: "notequals (ignore case)", value: "notequals ignorecase" },
    { text: "contains (ignore case)", value: "contains ignorecase" },
    { text: "notcontains (ignore case)", value: "notcontains ignorecase" },
    { text: "startswith (ignore case)", value: "startswith ignorecase" },
    { text: "endswith (ignore case)", value: "endswith ignorecase" },
    { text: "in (ignore case)", value: "in ignorecase" },
    { text: "==", value: "==" },
    { text: "!=", value: "!=" },
    { text: "<", value: "<" },
    { text: "<=", value: "<=" },
    { text: ">", value: ">" },
    { text: ">=", value: ">=" },
    { text: "insiderange", value: "insiderange" },
    { text: "outsiderange", value: "outsiderange" }
  ],
  cssThemes: {
    dark: `plugins/${plugin_id}/css/default.dark.css`,
    light: `plugins/${plugin_id}/css/default.light.css`
  },
  decimalValues: [
    { text: "0", value: "0" },
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" },
    { text: "4", value: "4" },
    { text: "5", value: "5" }
  ],
  default_templateURL: "partials/module.html",
  editorTabs: [
    {
      position: 2,
      templatePath: `public/plugins/${plugin_id}/partials/stats.html`,
      title: "Stats"
    },
    {
      position: 3,
      templatePath: `public/plugins/${plugin_id}/partials/options.html`,
      title: "Panel Options"
    }
  ],
  grafana_events: {
    dataReceived: "data-received",
    initEditMode: "init-edit-mode"
  },
  plugin_id: plugin_id,
  statTypes: [
    { text: "first", value: "${first}" },
    { text: "min", value: "${min}" },
    { text: "max", value: "${max}" },
    { text: "mean", value: "${mean}" },
    { text: "sum", value: "${sum}" },
    { text: "count", value: "${count}" },
    { text: "uniquecount", value: "${uniquecount}" }
  ],
  templates: {
    default_jumbo: `<div style="width:100%;float:left;text-align:center;border:1px solid black;border-width:1px 1px 0px 1px">
    <br/>
    <h5>\${title}</h5>
    <br/>
    <h1>\${default}</h1>
    <br/>
</div>`,
    default_normal: `<div style="width:100%;float:left;border:1px solid black;border-width:1px 1px 0px 1px">
    <div style="width:50%;float:left;padding:10px;">\${title}</div>
    <div style="width:50%;float:left;padding:10px;">\${default}</div>
</div>`
  }
};
