System.register([], function (exports_1, context_1) {
    "use strict";
    var plugin_id, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            plugin_id = "yesoreyeram-boomsummary-panel";
            exports_1("config", config = {
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
                    dark: "plugins/" + plugin_id + "/css/default.dark.css",
                    light: "plugins/" + plugin_id + "/css/default.light.css"
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
                        templatePath: "public/plugins/" + plugin_id + "/partials/stats.html",
                        title: "Stats"
                    },
                    {
                        position: 3,
                        templatePath: "public/plugins/" + plugin_id + "/partials/options.html",
                        title: "Panel Options"
                    }
                ],
                format_as: ["String", "Number", "Date"],
                grafana_events: {
                    dataReceived: "data-received",
                    initEditMode: "init-edit-mode"
                },
                plugin_id: plugin_id,
                statTypes: [
                    { text: "first", value: "first" },
                    { text: "min", value: "min" },
                    { text: "max", value: "max" },
                    { text: "mean", value: "mean" },
                    { text: "sum", value: "sum" },
                    { text: "count", value: "count" },
                    { text: "uniquecount", value: "uniquecount" }
                ],
                templateTypes: [
                    { text: "Default Template", value: "default" },
                    { text: "Auto Stats", value: "auto" },
                    { text: "Jumbo Stat", value: "jumbo" },
                    { text: "Jumbo Stat without title", value: "jumbo_without_title" },
                    { text: "Title only", value: "titleonly" },
                    { text: "Custom", value: "custom" },
                ]
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUksU0FBUyxHQUFHLCtCQUErQixDQUFDO1lBRWhELG9CQUFXLE1BQU0sR0FBRztnQkFDaEIsZ0JBQWdCLEVBQUU7b0JBQ2QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ25DLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUN6QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7b0JBQzdDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtvQkFDNUQsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFO29CQUNsRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtvQkFDdEUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO29CQUNwRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLGtC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QU8sRUFBRTtvQkFDdEMsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNsRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7aUJBQ3RDO2FBQ0osRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImxldCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb21zdW1tYXJ5LXBhbmVsXCI7XHJcblxyXG5leHBvcnQgbGV0IGNvbmZpZyA9IHtcclxuICAgIGNvbXBhcmVPcGVyYXRvcnM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiZXF1YWxzXCIsIHZhbHVlOiBcImVxdWFsc1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGVxdWFsc1wiLCB2YWx1ZTogXCJub3RlcXVhbHNcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJjb250YWluc1wiLCB2YWx1ZTogXCJjb250YWluc1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zXCIsIHZhbHVlOiBcIm5vdGNvbnRhaW5zXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwic3RhcnRzd2l0aFwiLCB2YWx1ZTogXCJzdGFydHN3aXRoXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZW5kc3dpdGhcIiwgdmFsdWU6IFwiZW5kc3dpdGhcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJpblwiLCB2YWx1ZTogXCJpblwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImVxdWFscyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImVxdWFscyBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibm90ZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90ZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJjb250YWlucyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImNvbnRhaW5zIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJub3Rjb250YWlucyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcIm5vdGNvbnRhaW5zIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJzdGFydHN3aXRoIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwic3RhcnRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZW5kc3dpdGggKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJlbmRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiaW4gKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJpbiBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPT1cIiwgdmFsdWU6IFwiPT1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCIhPVwiLCB2YWx1ZTogXCIhPVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjxcIiwgdmFsdWU6IFwiPFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjw9XCIsIHZhbHVlOiBcIjw9XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPlwiLCB2YWx1ZTogXCI+XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPj1cIiwgdmFsdWU6IFwiPj1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJpbnNpZGVyYW5nZVwiLCB2YWx1ZTogXCJpbnNpZGVyYW5nZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm91dHNpZGVyYW5nZVwiLCB2YWx1ZTogXCJvdXRzaWRlcmFuZ2VcIiB9XHJcbiAgICBdLFxyXG4gICAgY3NzVGhlbWVzOiB7XHJcbiAgICAgICAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICAgICAgICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxuICAgIH0sXHJcbiAgICBkZWNpbWFsVmFsdWVzOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjFcIiwgdmFsdWU6IFwiMVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjJcIiwgdmFsdWU6IFwiMlwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjNcIiwgdmFsdWU6IFwiM1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjRcIiwgdmFsdWU6IFwiNFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjVcIiwgdmFsdWU6IFwiNVwiIH1cclxuICAgIF0sXHJcbiAgICBkZWZhdWx0X3RlbXBsYXRlVVJMOiBcInBhcnRpYWxzL21vZHVsZS5odG1sXCIsXHJcbiAgICBlZGl0b3JUYWJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMixcclxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3N0YXRzLmh0bWxgLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJTdGF0c1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAzLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCxcclxuICAgICAgICAgICAgdGl0bGU6IFwiUGFuZWwgT3B0aW9uc1wiXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGZvcm1hdF9hcyA6IFtcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCJdLFxyXG4gICAgZ3JhZmFuYV9ldmVudHM6IHtcclxuICAgICAgICBkYXRhUmVjZWl2ZWQ6IFwiZGF0YS1yZWNlaXZlZFwiLFxyXG4gICAgICAgIGluaXRFZGl0TW9kZTogXCJpbml0LWVkaXQtbW9kZVwiXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luX2lkOiBwbHVnaW5faWQsXHJcbiAgICBzdGF0VHlwZXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiZmlyc3RcIiwgdmFsdWU6IFwiZmlyc3RcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJtaW5cIiwgdmFsdWU6IFwibWluXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibWF4XCIsIHZhbHVlOiBcIm1heFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm1lYW5cIiwgdmFsdWU6IFwibWVhblwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcInN1bVwiLCB2YWx1ZTogXCJzdW1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJjb3VudFwiLCB2YWx1ZTogXCJjb3VudFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcInVuaXF1ZWNvdW50XCIsIHZhbHVlOiBcInVuaXF1ZWNvdW50XCIgfVxyXG4gICAgXSxcclxuICAgIHRlbXBsYXRlVHlwZXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiRGVmYXVsdCBUZW1wbGF0ZVwiLCB2YWx1ZTogXCJkZWZhdWx0XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiQXV0byBTdGF0c1wiLCB2YWx1ZTogXCJhdXRvXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiSnVtYm8gU3RhdFwiLCB2YWx1ZTogXCJqdW1ib1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIkp1bWJvIFN0YXQgd2l0aG91dCB0aXRsZVwiLCB2YWx1ZTogXCJqdW1ib193aXRob3V0X3RpdGxlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiVGl0bGUgb25seVwiLCB2YWx1ZTogXCJ0aXRsZW9ubHlcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJDdXN0b21cIiwgdmFsdWU6IFwiY3VzdG9tXCIgfSxcclxuICAgIF1cclxufTtcclxuIl19