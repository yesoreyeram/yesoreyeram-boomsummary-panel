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
  decimalValues: [
    { text: "0", value: "0" },
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" },
    { text: "4", value: "4" },
    { text: "5", value: "5" }
  ],
  plugin_id: "yesoreyeram-boomsummary-panel",
  statTypes: [
    { text: "first", value: "${first}" },
    { text: "min", value: "${min}" },
    { text: "max", value: "${max}" },
    { text: "mean", value: "${mean}" },
    { text: "sum", value: "${sum}" },
    { text: "count", value: "${count}" },
    { text: "uniquecount", value: "${uniquecount}" }
  ]
};
