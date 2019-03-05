System.register([], function (exports_1, context_1) {
    "use strict";
    var config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
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
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsb0JBQVcsTUFBTSxHQUFHO2dCQUNsQixnQkFBZ0IsRUFBRTtvQkFDaEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ25DLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUN6QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7b0JBQzdDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtvQkFDNUQsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFO29CQUNsRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtvQkFDdEUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO29CQUNwRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7b0JBQ2hFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUU7b0JBQ3BELEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUMzQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDM0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ3pCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO29CQUMzQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO29CQUM3QyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtpQkFDaEQ7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUN6QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ3pCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUN6QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7aUJBQzFCO2dCQUNELFNBQVMsRUFBRSwrQkFBK0I7Z0JBQzFDLFNBQVMsRUFBRTtvQkFDVCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDcEMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ2hDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUNoQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtvQkFDbEMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ2hDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO29CQUNwQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFO2lCQUNqRDthQUNGLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbGV0IGNvbmZpZyA9IHtcclxuICBjb21wYXJlT3BlcmF0b3JzOiBbXHJcbiAgICB7IHRleHQ6IFwiZXF1YWxzXCIsIHZhbHVlOiBcImVxdWFsc1wiIH0sXHJcbiAgICB7IHRleHQ6IFwibm90ZXF1YWxzXCIsIHZhbHVlOiBcIm5vdGVxdWFsc1wiIH0sXHJcbiAgICB7IHRleHQ6IFwiY29udGFpbnNcIiwgdmFsdWU6IFwiY29udGFpbnNcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zXCIsIHZhbHVlOiBcIm5vdGNvbnRhaW5zXCIgfSxcclxuICAgIHsgdGV4dDogXCJzdGFydHN3aXRoXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGhcIiB9LFxyXG4gICAgeyB0ZXh0OiBcImVuZHN3aXRoXCIsIHZhbHVlOiBcImVuZHN3aXRoXCIgfSxcclxuICAgIHsgdGV4dDogXCJpblwiLCB2YWx1ZTogXCJpblwiIH0sXHJcbiAgICB7IHRleHQ6IFwiZXF1YWxzIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwiZXF1YWxzIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm5vdGVxdWFscyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcIm5vdGVxdWFscyBpZ25vcmVjYXNlXCIgfSxcclxuICAgIHsgdGV4dDogXCJjb250YWlucyAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImNvbnRhaW5zIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm5vdGNvbnRhaW5zIChpZ25vcmUgY2FzZSlcIiwgdmFsdWU6IFwibm90Y29udGFpbnMgaWdub3JlY2FzZVwiIH0sXHJcbiAgICB7IHRleHQ6IFwic3RhcnRzd2l0aCAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcInN0YXJ0c3dpdGggaWdub3JlY2FzZVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiZW5kc3dpdGggKGlnbm9yZSBjYXNlKVwiLCB2YWx1ZTogXCJlbmRzd2l0aCBpZ25vcmVjYXNlXCIgfSxcclxuICAgIHsgdGV4dDogXCJpbiAoaWdub3JlIGNhc2UpXCIsIHZhbHVlOiBcImluIGlnbm9yZWNhc2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIj09XCIsIHZhbHVlOiBcIj09XCIgfSxcclxuICAgIHsgdGV4dDogXCIhPVwiLCB2YWx1ZTogXCIhPVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiPFwiLCB2YWx1ZTogXCI8XCIgfSxcclxuICAgIHsgdGV4dDogXCI8PVwiLCB2YWx1ZTogXCI8PVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiPlwiLCB2YWx1ZTogXCI+XCIgfSxcclxuICAgIHsgdGV4dDogXCI+PVwiLCB2YWx1ZTogXCI+PVwiIH0sXHJcbiAgICB7IHRleHQ6IFwiaW5zaWRlcmFuZ2VcIiwgdmFsdWU6IFwiaW5zaWRlcmFuZ2VcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIm91dHNpZGVyYW5nZVwiLCB2YWx1ZTogXCJvdXRzaWRlcmFuZ2VcIiB9XHJcbiAgXSxcclxuICBkZWNpbWFsVmFsdWVzOiBbXHJcbiAgICB7IHRleHQ6IFwiMFwiLCB2YWx1ZTogXCIwXCIgfSxcclxuICAgIHsgdGV4dDogXCIxXCIsIHZhbHVlOiBcIjFcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIjJcIiwgdmFsdWU6IFwiMlwiIH0sXHJcbiAgICB7IHRleHQ6IFwiM1wiLCB2YWx1ZTogXCIzXCIgfSxcclxuICAgIHsgdGV4dDogXCI0XCIsIHZhbHVlOiBcIjRcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIjVcIiwgdmFsdWU6IFwiNVwiIH1cclxuICBdLFxyXG4gIHBsdWdpbl9pZDogXCJ5ZXNvcmV5ZXJhbS1ib29tc3VtbWFyeS1wYW5lbFwiLFxyXG4gIHN0YXRUeXBlczogW1xyXG4gICAgeyB0ZXh0OiBcImZpcnN0XCIsIHZhbHVlOiBcIiR7Zmlyc3R9XCIgfSxcclxuICAgIHsgdGV4dDogXCJtaW5cIiwgdmFsdWU6IFwiJHttaW59XCIgfSxcclxuICAgIHsgdGV4dDogXCJtYXhcIiwgdmFsdWU6IFwiJHttYXh9XCIgfSxcclxuICAgIHsgdGV4dDogXCJtZWFuXCIsIHZhbHVlOiBcIiR7bWVhbn1cIiB9LFxyXG4gICAgeyB0ZXh0OiBcInN1bVwiLCB2YWx1ZTogXCIke3N1bX1cIiB9LFxyXG4gICAgeyB0ZXh0OiBcImNvdW50XCIsIHZhbHVlOiBcIiR7Y291bnR9XCIgfSxcclxuICAgIHsgdGV4dDogXCJ1bmlxdWVjb3VudFwiLCB2YWx1ZTogXCIke3VuaXF1ZWNvdW50fVwiIH1cclxuICBdXHJcbn07XHJcbiJdfQ==