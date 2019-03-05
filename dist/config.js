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
                    default_jumbo: "<div style=\"width:100%;float:left;text-align:center;border:1px solid black;border-width:1px 1px 0px 1px\">\n    <br/>\n    <h5>${title}</h5>\n    <br/>\n    <h1>${default}</h1>\n    <br/>\n</div>",
                    default_normal: "<div style=\"width:100%;float:left;border:1px solid black;border-width:1px 1px 0px 1px\">\n    <div style=\"width:50%;float:left;padding:10px;\">${title}</div>\n    <div style=\"width:50%;float:left;padding:10px;\">${default}</div>\n</div>"
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUksU0FBUyxHQUFHLCtCQUErQixDQUFDO1lBRWhELG9CQUFXLE1BQU0sR0FBRztnQkFDbEIsZ0JBQWdCLEVBQUU7b0JBQ2hCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUNuQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDekMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO29CQUM3QyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3ZDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUMzQixFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7b0JBQzVELEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRTtvQkFDbEUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNoRSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7b0JBQ3RFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtvQkFDcEUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNoRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO29CQUNwRCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDM0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUN6QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDM0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ3pCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUMzQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtvQkFDN0MsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7aUJBQ2hEO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsYUFBVyxTQUFTLDBCQUF1QjtvQkFDakQsS0FBSyxFQUFFLGFBQVcsU0FBUywyQkFBd0I7aUJBQ3BEO2dCQUNELGFBQWEsRUFBRTtvQkFDYixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ3pCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUN6QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ3pCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2lCQUMxQjtnQkFDRCxtQkFBbUIsRUFBRSxzQkFBc0I7Z0JBQzNDLFVBQVUsRUFBRTtvQkFDVjt3QkFDRSxRQUFRLEVBQUUsQ0FBQzt3QkFDWCxZQUFZLEVBQUUsb0JBQWtCLFNBQVMseUJBQXNCO3dCQUMvRCxLQUFLLEVBQUUsT0FBTztxQkFDZjtvQkFDRDt3QkFDRSxRQUFRLEVBQUUsQ0FBQzt3QkFDWCxZQUFZLEVBQUUsb0JBQWtCLFNBQVMsMkJBQXdCO3dCQUNqRSxLQUFLLEVBQUUsZUFBZTtxQkFDdkI7aUJBQ0Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLFlBQVksRUFBRSxlQUFlO29CQUM3QixZQUFZLEVBQUUsZ0JBQWdCO2lCQUMvQjtnQkFDRCxTQUFTLEVBQUUsU0FBUztnQkFDcEIsU0FBUyxFQUFFO29CQUNULEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO29CQUNwQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtvQkFDaEMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ2hDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO29CQUNsQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtvQkFDaEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7b0JBQ3BDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7aUJBQ2pEO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxhQUFhLEVBQUUsc01BTVo7b0JBQ0gsY0FBYyxFQUFFLGlQQUdiO2lCQUNKO2FBQ0YsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImxldCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb21zdW1tYXJ5LXBhbmVsXCI7XHJcblxyXG5leHBvcnQgbGV0IGNvbmZpZyA9IHtcclxuICBjb21wYXJlT3BlcmF0b3JzOiBbXHJcbiAgICB7IHRleHQ6IFwiZXF1YWxzXCIsIHZhbHVlOiBcImVxdWFsc1wiIH0sXHJcbiAgICB7IHRleHQ6IFwibm90ZXF1YWxzXCIsIHZhbHVlOiBcIm5vdGVxdWFsc1wiIH0sXHJcbiAgICB7IHRleHQ6IFwiY29udGFpbnNcIiwgdmFsdWU6IFwiY29udGFpbnNcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zXCIsIHZhbHVlOiBcIm5vdGNvbnRhaW5zXCIgfSxcclxuICAgIHsgdGV4dDogXCJzdGFydHN3aXRoXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGhcIiB9LFxyXG4gICAgeyB0ZXh0OiBcImVuZHN3aXRoXCIsIHZhbHVlOiBcImVuZHN3aXRoXCIgfSxcclxuICAgIHsgdGV4dDogXCJpblwiLCB2YWx1ZTogXCJpblwiIH0sXHJcbiAgICB7IHRleHQ6IFwiZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm5vdGVxdWFscyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcIm5vdGVxdWFscyBpZ25vcmVjYXNlXCIgfSxcclxuICAgIHsgdGV4dDogXCJjb250YWlucyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImNvbnRhaW5zIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90Y29udGFpbnMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICB7IHRleHQ6IFwic3RhcnRzd2l0aCAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGggaWdub3JlY2FzZVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiZW5kc3dpdGggKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJlbmRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcclxuICAgIHsgdGV4dDogXCJpbiAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImluIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIj09XCIsIHZhbHVlOiBcIj09XCIgfSxcclxuICAgIHsgdGV4dDogXCIhPVwiLCB2YWx1ZTogXCIhPVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiPFwiLCB2YWx1ZTogXCI8XCIgfSxcclxuICAgIHsgdGV4dDogXCI8PVwiLCB2YWx1ZTogXCI8PVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiPlwiLCB2YWx1ZTogXCI+XCIgfSxcclxuICAgIHsgdGV4dDogXCI+PVwiLCB2YWx1ZTogXCI+PVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiaW5zaWRlcmFuZ2VcIiwgdmFsdWU6IFwiaW5zaWRlcmFuZ2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm91dHNpZGVyYW5nZVwiLCB2YWx1ZTogXCJvdXRzaWRlcmFuZ2VcIiB9XHJcbiAgXSxcclxuICBjc3NUaGVtZXM6IHtcclxuICAgIGRhcms6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5kYXJrLmNzc2AsXHJcbiAgICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxuICB9LFxyXG4gIGRlY2ltYWxWYWx1ZXM6IFtcclxuICAgIHsgdGV4dDogXCIwXCIsIHZhbHVlOiBcIjBcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIjFcIiwgdmFsdWU6IFwiMVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiMlwiLCB2YWx1ZTogXCIyXCIgfSxcclxuICAgIHsgdGV4dDogXCIzXCIsIHZhbHVlOiBcIjNcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIjRcIiwgdmFsdWU6IFwiNFwiIH0sXHJcbiAgICB7IHRleHQ6IFwiNVwiLCB2YWx1ZTogXCI1XCIgfVxyXG4gIF0sXHJcbiAgZGVmYXVsdF90ZW1wbGF0ZVVSTDogXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiLFxyXG4gIGVkaXRvclRhYnM6IFtcclxuICAgIHtcclxuICAgICAgcG9zaXRpb246IDIsXHJcbiAgICAgIHRlbXBsYXRlUGF0aDogYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9zdGF0cy5odG1sYCxcclxuICAgICAgdGl0bGU6IFwiU3RhdHNcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcG9zaXRpb246IDMsXHJcbiAgICAgIHRlbXBsYXRlUGF0aDogYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9vcHRpb25zLmh0bWxgLFxyXG4gICAgICB0aXRsZTogXCJQYW5lbCBPcHRpb25zXCJcclxuICAgIH1cclxuICBdLFxyXG4gIGdyYWZhbmFfZXZlbnRzOiB7XHJcbiAgICBkYXRhUmVjZWl2ZWQ6IFwiZGF0YS1yZWNlaXZlZFwiLFxyXG4gICAgaW5pdEVkaXRNb2RlOiBcImluaXQtZWRpdC1tb2RlXCJcclxuICB9LFxyXG4gIHBsdWdpbl9pZDogcGx1Z2luX2lkLFxyXG4gIHN0YXRUeXBlczogW1xyXG4gICAgeyB0ZXh0OiBcImZpcnN0XCIsIHZhbHVlOiBcIiR7Zmlyc3R9XCIgfSxcclxuICAgIHsgdGV4dDogXCJtaW5cIiwgdmFsdWU6IFwiJHttaW59XCIgfSxcclxuICAgIHsgdGV4dDogXCJtYXhcIiwgdmFsdWU6IFwiJHttYXh9XCIgfSxcclxuICAgIHsgdGV4dDogXCJtZWFuXCIsIHZhbHVlOiBcIiR7bWVhbn1cIiB9LFxyXG4gICAgeyB0ZXh0OiBcInN1bVwiLCB2YWx1ZTogXCIke3N1bX1cIiB9LFxyXG4gICAgeyB0ZXh0OiBcImNvdW50XCIsIHZhbHVlOiBcIiR7Y291bnR9XCIgfSxcclxuICAgIHsgdGV4dDogXCJ1bmlxdWVjb3VudFwiLCB2YWx1ZTogXCIke3VuaXF1ZWNvdW50fVwiIH1cclxuICBdLFxyXG4gIHRlbXBsYXRlczoge1xyXG4gICAgZGVmYXVsdF9qdW1ibzogYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztib3JkZXItd2lkdGg6MXB4IDFweCAwcHggMXB4XCI+XHJcbiAgICA8YnIvPlxyXG4gICAgPGg1PlxcJHt0aXRsZX08L2g1PlxyXG4gICAgPGJyLz5cclxuICAgIDxoMT5cXCR7ZGVmYXVsdH08L2gxPlxyXG4gICAgPGJyLz5cclxuPC9kaXY+YCxcclxuICAgIGRlZmF1bHRfbm9ybWFsOiBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO2JvcmRlci13aWR0aDoxcHggMXB4IDBweCAxcHhcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDo1MCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7XCI+XFwke3RpdGxlfTwvZGl2PlxyXG4gICAgPGRpdiBzdHlsZT1cIndpZHRoOjUwJTtmbG9hdDpsZWZ0O3BhZGRpbmc6MTBweDtcIj5cXCR7ZGVmYXVsdH08L2Rpdj5cclxuPC9kaXY+YFxyXG4gIH1cclxufTtcclxuIl19