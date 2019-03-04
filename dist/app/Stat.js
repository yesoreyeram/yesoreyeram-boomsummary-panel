System.register(["./Filter", "./ConditionalFormat"], function (exports_1, context_1) {
    "use strict";
    var Filter_1, ConditionalFormat_1, BoomSummaryStat;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Filter_1_1) {
                Filter_1 = Filter_1_1;
            },
            function (ConditionalFormat_1_1) {
                ConditionalFormat_1 = ConditionalFormat_1_1;
            }
        ],
        execute: function () {
            BoomSummaryStat = (function () {
                function BoomSummaryStat(options) {
                    this.field = options.field || "Sample";
                    this.title = options.title || this.field + " info";
                    this.display_template =
                        options.display_template ||
                            "<div style=\"width:100%;float:left;\">\n            <div style=\"width:50%;float:left;padding:10px;border:1px solid black;\">${title}</div>\n            <div style=\"width:50%;float:left;padding:10px;border:1px solid black;\">${default}</div>\n</div>";
                    this.statWidth = options.statWidth || "100";
                    this.bgColor = options.bgColor || "";
                    this.textColor = options.textColor || "";
                    this.format = options.format || "none";
                    this.decimals = options.decimals || "0";
                    this.filters = options.filters || [];
                    this.conditional_formats = options.conditional_formats || [];
                }
                return BoomSummaryStat;
            }());
            exports_1("BoomSummaryStat", BoomSummaryStat);
            BoomSummaryStat.prototype.addFilter = function () {
                var newfilter = new Filter_1.BoomSummaryFilter({});
                this.filters = this.filters || [];
                this.filters.push(newfilter);
            };
            BoomSummaryStat.prototype.removeFilter = function (index) {
                if (this.filters.length > 0) {
                    this.filters.splice(Number(index), 1);
                }
            };
            BoomSummaryStat.prototype.addConditonalFormat = function () {
                var new_conditional_formatter = new ConditionalFormat_1.BoomSummaryConditionalFormats({});
                this.conditional_formats = this.conditional_formats || [];
                this.conditional_formats.push(new_conditional_formatter);
            };
            BoomSummaryStat.prototype.removeConditionalFormat = function (index) {
                if (this.conditional_formats.length > 0) {
                    this.conditional_formats.splice(Number(index), 1);
                }
            };
            BoomSummaryStat.prototype.moveConditionalFormat = function (direction, index) {
                var tempElement = this.conditional_formats[Number(index)];
                if (direction === "UP") {
                    this.conditional_formats[Number(index)] = this.conditional_formats[Number(index) - 1];
                    this.conditional_formats[Number(index) - 1] = tempElement;
                }
                if (direction === "DOWN") {
                    this.conditional_formats[Number(index)] = this.conditional_formats[Number(index) + 1];
                    this.conditional_formats[Number(index) + 1] = tempElement;
                }
            };
            BoomSummaryStat.prototype.setUnitFormat = function (format) {
                this.format = format && format.value ? format.value : "none";
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvU3RhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUdBO2dCQWlCRSx5QkFBWSxPQUFPO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO29CQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7b0JBQ25ELElBQUksQ0FBQyxnQkFBZ0I7d0JBQ25CLE9BQU8sQ0FBQyxnQkFBZ0I7NEJBQ3hCLDRQQUdDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7Z0JBQy9ELENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQUFDLEFBbENELElBa0NDOztZQUVELGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHO2dCQUNwQyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxVQUFTLEtBQWE7Z0JBQzdELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsZUFBZSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRztnQkFDOUMsSUFBSSx5QkFBeUIsR0FBRyxJQUFJLGlEQUE2QixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEdBQUcsVUFDbEQsS0FBYTtnQkFFYixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbkQ7WUFDSCxDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLFVBQ2hELFNBQWlCLEVBQ2pCLEtBQWE7Z0JBRWIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQ2hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2xCLENBQUM7b0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7aUJBQzNEO2dCQUNELElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtvQkFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FDaEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbEIsQ0FBQztvQkFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDM0Q7WUFDSCxDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFTLE1BQVc7Z0JBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMvRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29tU3VtbWFyeUZpbHRlciB9IGZyb20gXCIuL0ZpbHRlclwiO1xyXG5pbXBvcnQgeyBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyB9IGZyb20gXCIuL0NvbmRpdGlvbmFsRm9ybWF0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlTdGF0IHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgZGlzcGxheV90ZW1wbGF0ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBzdGF0V2lkdGg6IHN0cmluZztcclxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgZm9ybWF0OiBzdHJpbmc7XHJcbiAgcHVibGljIGRlY2ltYWxzOiBzdHJpbmc7XHJcbiAgcHVibGljIGZpbHRlcnM6IEJvb21TdW1tYXJ5RmlsdGVyW107XHJcbiAgcHVibGljIGNvbmRpdGlvbmFsX2Zvcm1hdHM6IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzW107XHJcbiAgcHVibGljIGFkZEZpbHRlcjtcclxuICBwdWJsaWMgcmVtb3ZlRmlsdGVyO1xyXG4gIHB1YmxpYyBhZGRDb25kaXRvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyByZW1vdmVDb25kaXRpb25hbEZvcm1hdDtcclxuICBwdWJsaWMgbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBzZXRVbml0Rm9ybWF0O1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCB0aGlzLmZpZWxkICsgXCIgaW5mb1wiO1xyXG4gICAgdGhpcy5kaXNwbGF5X3RlbXBsYXRlID1cclxuICAgICAgb3B0aW9ucy5kaXNwbGF5X3RlbXBsYXRlIHx8XHJcbiAgICAgIGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtmbG9hdDpsZWZ0O1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O2JvcmRlcjoxcHggc29saWQgYmxhY2s7XCI+XFwke3RpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O2JvcmRlcjoxcHggc29saWQgYmxhY2s7XCI+XFwke2RlZmF1bHR9PC9kaXY+XHJcbjwvZGl2PmA7XHJcbiAgICB0aGlzLnN0YXRXaWR0aCA9IG9wdGlvbnMuc3RhdFdpZHRoIHx8IFwiMTAwXCI7XHJcbiAgICB0aGlzLmJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3IgfHwgXCJcIjtcclxuICAgIHRoaXMudGV4dENvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3IgfHwgXCJcIjtcclxuICAgIHRoaXMuZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgfHwgXCJub25lXCI7XHJcbiAgICB0aGlzLmRlY2ltYWxzID0gb3B0aW9ucy5kZWNpbWFscyB8fCBcIjBcIjtcclxuICAgIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuZmlsdGVycyB8fCBbXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IG9wdGlvbnMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcclxuICB9XHJcbn1cclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuYWRkRmlsdGVyID0gZnVuY3Rpb24oKTogdm9pZCB7XHJcbiAgbGV0IG5ld2ZpbHRlciA9IG5ldyBCb29tU3VtbWFyeUZpbHRlcih7fSk7XHJcbiAgdGhpcy5maWx0ZXJzID0gdGhpcy5maWx0ZXJzIHx8IFtdO1xyXG4gIHRoaXMuZmlsdGVycy5wdXNoKG5ld2ZpbHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICBpZiAodGhpcy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRDb25kaXRvbmFsRm9ybWF0ID0gZnVuY3Rpb24oKTogdm9pZCB7XHJcbiAgbGV0IG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIgPSBuZXcgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMoe30pO1xyXG4gIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcclxuICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMucHVzaChuZXdfY29uZGl0aW9uYWxfZm9ybWF0dGVyKTtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUucmVtb3ZlQ29uZGl0aW9uYWxGb3JtYXQgPSBmdW5jdGlvbihcclxuICBpbmRleDogTnVtYmVyXHJcbik6IHZvaWQge1xyXG4gIGlmICh0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoID4gMCkge1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnNwbGljZShOdW1iZXIoaW5kZXgpLCAxKTtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLm1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uKFxyXG4gIGRpcmVjdGlvbjogc3RyaW5nLFxyXG4gIGluZGV4OiBOdW1iZXJcclxuKTogdm9pZCB7XHJcbiAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldO1xyXG4gIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW1xyXG4gICAgICBOdW1iZXIoaW5kZXgpIC0gMVxyXG4gICAgXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpIC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICB9XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcclxuICAgICAgTnVtYmVyKGluZGV4KSArIDFcclxuICAgIF07XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5zZXRVbml0Rm9ybWF0ID0gZnVuY3Rpb24oZm9ybWF0OiBhbnkpOiB2b2lkIHtcclxuICB0aGlzLmZvcm1hdCA9IGZvcm1hdCAmJiBmb3JtYXQudmFsdWUgPyBmb3JtYXQudmFsdWUgOiBcIm5vbmVcIjtcclxufTtcclxuIl19