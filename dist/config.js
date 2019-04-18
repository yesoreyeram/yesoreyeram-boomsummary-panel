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
                ctrl_width: [
                    { text: "100%", value: "12" },
                    { text: "50%", value: "6" },
                    { text: "33%", value: "4" },
                    { text: "25%", value: "3" }
                ],
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
                    { text: "Random", value: "random" },
                    { text: "Min", value: "min" },
                    { text: "Max", value: "max" },
                    { text: "Mean", value: "mean" },
                    { text: "Sum", value: "sum" },
                    { text: "Count", value: "count" },
                    { text: "Unique Count", value: "uniquecount" }
                ],
                templateTypes: [
                    { text: "Auto Template", value: "auto" },
                    { text: "Jumbo Stat", value: "jumbo" },
                    { text: "Jumbo Stat w/o title", value: "jumbo_without_title" },
                    { text: "Value only", value: "titleonly" },
                    { text: "Custom", value: "custom" },
                ]
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUksU0FBUyxHQUFHLCtCQUErQixDQUFDO1lBRWhELG9CQUFXLE1BQU0sR0FBRztnQkFDaEIsZ0JBQWdCLEVBQUU7b0JBQ2QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ25DLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUN6QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7b0JBQzdDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtvQkFDNUQsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFO29CQUNsRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtvQkFDdEUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO29CQUNwRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLGtC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LEVBQUU7b0JBQ2pDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2lCQUNqRDtnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7b0JBQ3hDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO29CQUN0QyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQzlELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUMxQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtpQkFDdEM7YUFDSixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHBsdWdpbl9pZCA9IFwieWVzb3JleWVyYW0tYm9vbXN1bW1hcnktcGFuZWxcIjtcclxuXHJcbmV4cG9ydCBsZXQgY29uZmlnID0ge1xyXG4gICAgY29tcGFyZU9wZXJhdG9yczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJlcXVhbHNcIiwgdmFsdWU6IFwiZXF1YWxzXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibm90ZXF1YWxzXCIsIHZhbHVlOiBcIm5vdGVxdWFsc1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImNvbnRhaW5zXCIsIHZhbHVlOiBcImNvbnRhaW5zXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibm90Y29udGFpbnNcIiwgdmFsdWU6IFwibm90Y29udGFpbnNcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJzdGFydHN3aXRoXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGhcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJlbmRzd2l0aFwiLCB2YWx1ZTogXCJlbmRzd2l0aFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImluXCIsIHZhbHVlOiBcImluXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJub3RlcXVhbHMgKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJub3RlcXVhbHMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiY29udGFpbnMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90Y29udGFpbnMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcInN0YXJ0c3dpdGggKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJzdGFydHN3aXRoIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJlbmRzd2l0aCAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImVuZHN3aXRoIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJpbiAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImluIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI9PVwiLCB2YWx1ZTogXCI9PVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIiE9XCIsIHZhbHVlOiBcIiE9XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPFwiLCB2YWx1ZTogXCI8XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPD1cIiwgdmFsdWU6IFwiPD1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI+XCIsIHZhbHVlOiBcIj5cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI+PVwiLCB2YWx1ZTogXCI+PVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImluc2lkZXJhbmdlXCIsIHZhbHVlOiBcImluc2lkZXJhbmdlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwib3V0c2lkZXJhbmdlXCIsIHZhbHVlOiBcIm91dHNpZGVyYW5nZVwiIH1cclxuICAgIF0sXHJcbiAgICBjc3NUaGVtZXM6IHtcclxuICAgICAgICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gICAgICAgIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG4gICAgfSxcclxuICAgIGN0cmxfd2lkdGg6IFtcclxuICAgICAgICB7IHRleHQ6IFwiMTAwJVwiLCB2YWx1ZTogXCIxMlwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjUwJVwiLCB2YWx1ZTogXCI2XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiMzMlXCIsIHZhbHVlOiBcIjRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCIyNSVcIiwgdmFsdWU6IFwiM1wiIH1cclxuICAgIF0sXHJcbiAgICBkZWNpbWFsVmFsdWVzOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjFcIiwgdmFsdWU6IFwiMVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjJcIiwgdmFsdWU6IFwiMlwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjNcIiwgdmFsdWU6IFwiM1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjRcIiwgdmFsdWU6IFwiNFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjVcIiwgdmFsdWU6IFwiNVwiIH1cclxuICAgIF0sXHJcbiAgICBkZWZhdWx0X3RlbXBsYXRlVVJMOiBcInBhcnRpYWxzL21vZHVsZS5odG1sXCIsXHJcbiAgICBlZGl0b3JUYWJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMixcclxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3N0YXRzLmh0bWxgLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJTdGF0c1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAzLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCxcclxuICAgICAgICAgICAgdGl0bGU6IFwiUGFuZWwgT3B0aW9uc1wiXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGZvcm1hdF9hczogW1wiU3RyaW5nXCIsIFwiTnVtYmVyXCIsIFwiRGF0ZVwiXSxcclxuICAgIGdyYWZhbmFfZXZlbnRzOiB7XHJcbiAgICAgICAgZGF0YVJlY2VpdmVkOiBcImRhdGEtcmVjZWl2ZWRcIixcclxuICAgICAgICBpbml0RWRpdE1vZGU6IFwiaW5pdC1lZGl0LW1vZGVcIlxyXG4gICAgfSxcclxuICAgIHBsdWdpbl9pZDogcGx1Z2luX2lkLFxyXG4gICAgc3RhdFR5cGVzOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlJhbmRvbVwiLCB2YWx1ZTogXCJyYW5kb21cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJNaW5cIiwgdmFsdWU6IFwibWluXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiTWF4XCIsIHZhbHVlOiBcIm1heFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIk1lYW5cIiwgdmFsdWU6IFwibWVhblwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlN1bVwiLCB2YWx1ZTogXCJzdW1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJDb3VudFwiLCB2YWx1ZTogXCJjb3VudFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlVuaXF1ZSBDb3VudFwiLCB2YWx1ZTogXCJ1bmlxdWVjb3VudFwiIH1cclxuICAgIF0sXHJcbiAgICB0ZW1wbGF0ZVR5cGVzOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIkF1dG8gVGVtcGxhdGVcIiwgdmFsdWU6IFwiYXV0b1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIkp1bWJvIFN0YXRcIiwgdmFsdWU6IFwianVtYm9cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJKdW1ibyBTdGF0IHcvbyB0aXRsZVwiLCB2YWx1ZTogXCJqdW1ib193aXRob3V0X3RpdGxlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiVmFsdWUgb25seVwiLCB2YWx1ZTogXCJ0aXRsZW9ubHlcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJDdXN0b21cIiwgdmFsdWU6IFwiY3VzdG9tXCIgfSxcclxuICAgIF1cclxufTtcclxuIl19