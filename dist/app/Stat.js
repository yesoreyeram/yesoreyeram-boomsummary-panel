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
                    this.title = options.title || this.field;
                    this.display_template =
                        options.display_template ||
                            "<div style=\"width:100%;float:left;border:1px solid black;border-width:1px 1px 0px 1px\">\n      <div style=\"width:50%;float:left;padding:10px;\">${title}</div>\n      <div style=\"width:50%;float:left;padding:10px;\">${default}</div>\n</div>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvU3RhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUdBO2dCQWlCRSx5QkFBWSxPQUFPO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO29CQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDekMsSUFBSSxDQUFDLGdCQUFnQjt3QkFDbkIsT0FBTyxDQUFDLGdCQUFnQjs0QkFDeEIscVBBR0MsQ0FBQztvQkFDSixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO29CQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO29CQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO29CQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQztnQkFDL0QsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBQUMsQUFsQ0QsSUFrQ0M7O1lBRUQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUc7Z0JBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksMEJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQVMsS0FBYTtnQkFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDdkM7WUFDSCxDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHO2dCQUM5QyxJQUFJLHlCQUF5QixHQUFHLElBQUksaURBQTZCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDO1lBRUYsZUFBZSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsR0FBRyxVQUNsRCxLQUFhO2dCQUViLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNuRDtZQUNILENBQUMsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsVUFDaEQsU0FBaUIsRUFDakIsS0FBYTtnQkFFYixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FDaEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbEIsQ0FBQztvQkFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDM0Q7Z0JBQ0QsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO29CQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNsQixDQUFDO29CQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO2lCQUMzRDtZQUNILENBQUMsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVMsTUFBVztnQkFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQy9ELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb21TdW1tYXJ5RmlsdGVyIH0gZnJvbSBcIi4vRmlsdGVyXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIH0gZnJvbSBcIi4vQ29uZGl0aW9uYWxGb3JtYXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29tU3VtbWFyeVN0YXQge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkaXNwbGF5X3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgcHVibGljIHN0YXRXaWR0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtYXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGVjaW1hbHM6IHN0cmluZztcclxuICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICBwdWJsaWMgY29uZGl0aW9uYWxfZm9ybWF0czogQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHNbXTtcclxuICBwdWJsaWMgYWRkRmlsdGVyO1xyXG4gIHB1YmxpYyByZW1vdmVGaWx0ZXI7XHJcbiAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmRpc3BsYXlfdGVtcGxhdGUgPVxyXG4gICAgICBvcHRpb25zLmRpc3BsYXlfdGVtcGxhdGUgfHxcclxuICAgICAgYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztib3JkZXItd2lkdGg6MXB4IDFweCAwcHggMXB4XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDo1MCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7XCI+XFwke3RpdGxlfTwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPlxcJHtkZWZhdWx0fTwvZGl2PlxyXG48L2Rpdj5gO1xyXG4gICAgdGhpcy5zdGF0V2lkdGggPSBvcHRpb25zLnN0YXRXaWR0aCB8fCBcIjEwMFwiO1xyXG4gICAgdGhpcy5iZ0NvbG9yID0gb3B0aW9ucy5iZ0NvbG9yIHx8IFwiXCI7XHJcbiAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICB0aGlzLmZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0IHx8IFwibm9uZVwiO1xyXG4gICAgdGhpcy5kZWNpbWFscyA9IG9wdGlvbnMuZGVjaW1hbHMgfHwgXCIwXCI7XHJcbiAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmZpbHRlcnMgfHwgW107XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgPSBvcHRpb25zLmNvbmRpdGlvbmFsX2Zvcm1hdHMgfHwgW107XHJcbiAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKCk6IHZvaWQge1xyXG4gIGxldCBuZXdmaWx0ZXIgPSBuZXcgQm9vbVN1bW1hcnlGaWx0ZXIoe30pO1xyXG4gIHRoaXMuZmlsdGVycyA9IHRoaXMuZmlsdGVycyB8fCBbXTtcclxuICB0aGlzLmZpbHRlcnMucHVzaChuZXdmaWx0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuYWRkQ29uZGl0b25hbEZvcm1hdCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xyXG4gIGxldCBuZXdfY29uZGl0aW9uYWxfZm9ybWF0dGVyID0gbmV3IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzKHt9KTtcclxuICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgfHwgW107XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnB1c2gobmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBpZiAodGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5tb3ZlQ29uZGl0aW9uYWxGb3JtYXQgPSBmdW5jdGlvbihcclxuICBkaXJlY3Rpb246IHN0cmluZyxcclxuICBpbmRleDogTnVtYmVyXHJcbik6IHZvaWQge1xyXG4gIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXTtcclxuICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcclxuICAgICAgTnVtYmVyKGluZGV4KSAtIDFcclxuICAgIF07XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgfVxyXG4gIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgKyAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuc2V0VW5pdEZvcm1hdCA9IGZ1bmN0aW9uKGZvcm1hdDogYW55KTogdm9pZCB7XHJcbiAgdGhpcy5mb3JtYXQgPSBmb3JtYXQgJiYgZm9ybWF0LnZhbHVlID8gZm9ybWF0LnZhbHVlIDogXCJub25lXCI7XHJcbn07XHJcbiJdfQ==