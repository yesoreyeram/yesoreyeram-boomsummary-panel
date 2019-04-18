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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFJLFNBQVMsR0FBRywrQkFBK0IsQ0FBQztZQUVoRCxvQkFBVyxNQUFNLEdBQUc7Z0JBQ2hCLGdCQUFnQixFQUFFO29CQUNkLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUNuQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDekMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO29CQUM3QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUMzQixFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7b0JBQzVELEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRTtvQkFDbEUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNoRSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7b0JBQ3RFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtvQkFDcEUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNoRSxFQUFFLElBQUksRUFB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T0FBTyxFQUFFO29CQUNqQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtpQkFDakQ7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO29CQUN4QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtvQkFDdEMsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUM5RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7aUJBQ3RDO2FBQ0osRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImxldCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb21zdW1tYXJ5LXBhbmVsXCI7XHJcblxyXG5leHBvcnQgbGV0IGNvbmZpZyA9IHtcclxuICAgIGNvbXBhcmVPcGVyYXRvcnM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiZXF1YWxzXCIsIHZhbHVlOiBcImVxdWFsc1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGVxdWFsc1wiLCB2YWx1ZTogXCJub3RlcXVhbHNcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJjb250YWluc1wiLCB2YWx1ZTogXCJjb250YWluc1wiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zXCIsIHZhbHVlOiBcIm5vdGNvbnRhaW5zXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwic3RhcnRzd2l0aFwiLCB2YWx1ZTogXCJzdGFydHN3aXRoXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZW5kc3dpdGhcIiwgdmFsdWU6IFwiZW5kc3dpdGhcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJpblwiLCB2YWx1ZTogXCJpblwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImVxdWFscyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImVxdWFscyBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibm90ZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90ZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJjb250YWlucyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImNvbnRhaW5zIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJub3Rjb250YWlucyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcIm5vdGNvbnRhaW5zIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJzdGFydHN3aXRoIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwic3RhcnRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZW5kc3dpdGggKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJlbmRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiaW4gKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJpbiBpZ25vcmVjYXNlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPT1cIiwgdmFsdWU6IFwiPT1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCIhPVwiLCB2YWx1ZTogXCIhPVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjxcIiwgdmFsdWU6IFwiPFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjw9XCIsIHZhbHVlOiBcIjw9XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPlwiLCB2YWx1ZTogXCI+XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiPj1cIiwgdmFsdWU6IFwiPj1cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJpbnNpZGVyYW5nZVwiLCB2YWx1ZTogXCJpbnNpZGVyYW5nZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIm91dHNpZGVyYW5nZVwiLCB2YWx1ZTogXCJvdXRzaWRlcmFuZ2VcIiB9XHJcbiAgICBdLFxyXG4gICAgY3NzVGhlbWVzOiB7XHJcbiAgICAgICAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICAgICAgICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxuICAgIH0sXHJcbiAgICBjdHJsX3dpZHRoOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIjEwMCVcIiwgdmFsdWU6IFwiMTJcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI1MCVcIiwgdmFsdWU6IFwiNlwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIjMzJVwiLCB2YWx1ZTogXCI0XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiMjUlXCIsIHZhbHVlOiBcIjNcIiB9XHJcbiAgICBdLFxyXG4gICAgZGVjaW1hbFZhbHVlczogW1xyXG4gICAgICAgIHsgdGV4dDogXCIwXCIsIHZhbHVlOiBcIjBcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCIxXCIsIHZhbHVlOiBcIjFcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCIyXCIsIHZhbHVlOiBcIjJcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCIzXCIsIHZhbHVlOiBcIjNcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI0XCIsIHZhbHVlOiBcIjRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCI1XCIsIHZhbHVlOiBcIjVcIiB9XHJcbiAgICBdLFxyXG4gICAgZGVmYXVsdF90ZW1wbGF0ZVVSTDogXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiLFxyXG4gICAgZWRpdG9yVGFiczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IDIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9zdGF0cy5odG1sYCxcclxuICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMyxcclxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlBhbmVsIE9wdGlvbnNcIlxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBmb3JtYXRfYXM6IFtcIlN0cmluZ1wiLCBcIk51bWJlclwiLCBcIkRhdGVcIl0sXHJcbiAgICBncmFmYW5hX2V2ZW50czoge1xyXG4gICAgICAgIGRhdGFSZWNlaXZlZDogXCJkYXRhLXJlY2VpdmVkXCIsXHJcbiAgICAgICAgaW5pdEVkaXRNb2RlOiBcImluaXQtZWRpdC1tb2RlXCJcclxuICAgIH0sXHJcbiAgICBwbHVnaW5faWQ6IHBsdWdpbl9pZCxcclxuICAgIHN0YXRUeXBlczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJSYW5kb21cIiwgdmFsdWU6IFwicmFuZG9tXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiTWluXCIsIHZhbHVlOiBcIm1pblwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIk1heFwiLCB2YWx1ZTogXCJtYXhcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJNZWFuXCIsIHZhbHVlOiBcIm1lYW5cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJTdW1cIiwgdmFsdWU6IFwic3VtXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiQ291bnRcIiwgdmFsdWU6IFwiY291bnRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJVbmlxdWUgQ291bnRcIiwgdmFsdWU6IFwidW5pcXVlY291bnRcIiB9XHJcbiAgICBdLFxyXG4gICAgdGVtcGxhdGVUeXBlczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJBdXRvIFRlbXBsYXRlXCIsIHZhbHVlOiBcImF1dG9cIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJKdW1ibyBTdGF0XCIsIHZhbHVlOiBcImp1bWJvXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiSnVtYm8gU3RhdCB3L28gdGl0bGVcIiwgdmFsdWU6IFwianVtYm9fd2l0aG91dF90aXRsZVwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlZhbHVlIG9ubHlcIiwgdmFsdWU6IFwidGl0bGVvbmx5XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiQ3VzdG9tXCIsIHZhbHVlOiBcImN1c3RvbVwiIH0sXHJcbiAgICBdXHJcbn07XHJcbiJdfQ==