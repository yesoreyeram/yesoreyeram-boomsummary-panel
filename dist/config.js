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
                ],
                ctrl_width: [
                    { text: "100%", value: "12" },
                    { text: "50%", value: "6" },
                    { text: "33%", value: "4" },
                    { text: "25%", value: "3" }
                ]
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUksU0FBUyxHQUFHLCtCQUErQixDQUFDO1lBRWhELG9CQUFXLE1BQU0sR0FBRztnQkFDaEIsZ0JBQWdCLEVBQUU7b0JBQ2QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ25DLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUN6QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7b0JBQzdDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtvQkFDNUQsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFO29CQUNsRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtvQkFDdEUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO29CQUNwRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLGtC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QUFxQixFQUFFO29CQUM5RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7aUJBQ3RDO2dCQUNELFVBQVUsRUFBRztvQkFDVCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFHLElBQUksRUFBQztvQkFDN0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRyxHQUFHLEVBQUM7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUcsR0FBRyxFQUFDO29CQUMzQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFHLEdBQUcsRUFBQztpQkFDOUI7YUFDSixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHBsdWdpbl9pZCA9IFwieWVzb3JleWVyYW0tYm9vbXN1bW1hcnktcGFuZWxcIjtcclxuXHJcbmV4cG9ydCBsZXQgY29uZmlnID0ge1xyXG4gICAgY29tcGFyZU9wZXJhdG9yczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJlcXVhbHNcIiwgdmFsdWU6IFwiZXF1YWxzXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibm90ZXF1YWxzXCIsIHZhbHVlOiBcIm5vdGVxdWFsc1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImNvbnRhaW5zXCIsIHZhbHVlOiBcImNvbnRhaW5zXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibm90Y29udGFpbnNcIiwgdmFsdWU6IFwibm90Y29udGFpbnNcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJzdGFydHN3aXRoXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGhcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJlbmRzd2l0aFwiLCB2YWx1ZTogXCJlbmRzd2l0aFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImluXCIsIHZhbHVlOiBcImluXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJub3RlcXVhbHMgKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJub3RlcXVhbHMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiY29udGFpbnMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90Y29udGFpbnMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcInN0YXJ0c3dpdGggKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJzdGFydHN3aXRoIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJlbmRzd2l0aCAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImVuZHN3aXRoIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJpbiAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImluIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI9PVwiLCB2YWx1ZTogXCI9PVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIiE9XCIsIHZhbHVlOiBcIiE9XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPFwiLCB2YWx1ZTogXCI8XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPD1cIiwgdmFsdWU6IFwiPD1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI+XCIsIHZhbHVlOiBcIj5cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI+PVwiLCB2YWx1ZTogXCI+PVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImluc2lkZXJhbmdlXCIsIHZhbHVlOiBcImluc2lkZXJhbmdlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwib3V0c2lkZXJhbmdlXCIsIHZhbHVlOiBcIm91dHNpZGVyYW5nZVwiIH1cclxuICAgIF0sXHJcbiAgICBjc3NUaGVtZXM6IHtcclxuICAgICAgICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gICAgICAgIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG4gICAgfSxcclxuICAgIGRlY2ltYWxWYWx1ZXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiMFwiLCB2YWx1ZTogXCIwXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiMlwiLCB2YWx1ZTogXCIyXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiM1wiLCB2YWx1ZTogXCIzXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiNFwiLCB2YWx1ZTogXCI0XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiNVwiLCB2YWx1ZTogXCI1XCIgfVxyXG4gICAgXSxcclxuICAgIGRlZmF1bHRfdGVtcGxhdGVVUkw6IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIixcclxuICAgIGVkaXRvclRhYnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAyLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvc3RhdHMuaHRtbGAsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlN0YXRzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IDMsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9vcHRpb25zLmh0bWxgLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJQYW5lbCBPcHRpb25zXCJcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgZm9ybWF0X2FzIDogW1wiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIl0sXHJcbiAgICBncmFmYW5hX2V2ZW50czoge1xyXG4gICAgICAgIGRhdGFSZWNlaXZlZDogXCJkYXRhLXJlY2VpdmVkXCIsXHJcbiAgICAgICAgaW5pdEVkaXRNb2RlOiBcImluaXQtZWRpdC1tb2RlXCJcclxuICAgIH0sXHJcbiAgICBwbHVnaW5faWQ6IHBsdWdpbl9pZCxcclxuICAgIHN0YXRUeXBlczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJSYW5kb21cIiwgdmFsdWU6IFwicmFuZG9tXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiTWluXCIsIHZhbHVlOiBcIm1pblwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIk1heFwiLCB2YWx1ZTogXCJtYXhcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJNZWFuXCIsIHZhbHVlOiBcIm1lYW5cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJTdW1cIiwgdmFsdWU6IFwic3VtXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiQ291bnRcIiwgdmFsdWU6IFwiY291bnRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJVbmlxdWUgQ291bnRcIiwgdmFsdWU6IFwidW5pcXVlY291bnRcIiB9XHJcbiAgICBdLFxyXG4gICAgdGVtcGxhdGVUeXBlczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJBdXRvIFRlbXBsYXRlXCIsIHZhbHVlOiBcImF1dG9cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJKdW1ibyBTdGF0XCIsIHZhbHVlOiBcImp1bWJvXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiSnVtYm8gU3RhdCB3L28gdGl0bGVcIiwgdmFsdWU6IFwianVtYm9fd2l0aG91dF90aXRsZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlZhbHVlIG9ubHlcIiwgdmFsdWU6IFwidGl0bGVvbmx5XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiQ3VzdG9tXCIsIHZhbHVlOiBcImN1c3RvbVwiIH0sXHJcbiAgICBdLFxyXG4gICAgY3RybF93aWR0aCA6IFtcclxuICAgICAgICB7IHRleHQ6IFwiMTAwJVwiLCB2YWx1ZSA6IFwiMTJcIn0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjUwJVwiLCB2YWx1ZSA6IFwiNlwifSxcclxuICAgICAgICB7IHRleHQ6IFwiMzMlXCIsIHZhbHVlIDogXCI0XCJ9LFxyXG4gICAgICAgIHsgdGV4dDogXCIyNSVcIiwgdmFsdWUgOiBcIjNcIn1cclxuICAgIF1cclxufTtcclxuIl19