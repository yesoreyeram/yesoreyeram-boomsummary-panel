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
                    this.defaultStat = options.defaultStat || "${first}";
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
                var new_conditional_formatter = new ConditionalFormat_1.BoomSummaryConditionalFormats({
                    field: this.defaultStat || "${first}"
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvU3RhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUdBO2dCQWtCRSx5QkFBWSxPQUFPO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO29CQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQztvQkFDckQsSUFBSSxDQUFDLGdCQUFnQjt3QkFDbkIsT0FBTyxDQUFDLGdCQUFnQjs0QkFDeEIscVBBR0MsQ0FBQztvQkFDSixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO29CQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO29CQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO29CQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQztnQkFDL0QsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBQUMsQUFwQ0QsSUFvQ0M7O1lBRUQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUc7Z0JBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksMEJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQVMsS0FBYTtnQkFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDdkM7WUFDSCxDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHO2dCQUM5QyxJQUFJLHlCQUF5QixHQUFHLElBQUksaURBQTZCLENBQUM7b0JBQ2hFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLFVBQVU7aUJBQ3RDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEdBQUcsVUFDbEQsS0FBYTtnQkFFYixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbkQ7WUFDSCxDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLFVBQ2hELFNBQWlCLEVBQ2pCLEtBQWE7Z0JBRWIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQ2hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2xCLENBQUM7b0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7aUJBQzNEO2dCQUNELElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtvQkFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FDaEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbEIsQ0FBQztvQkFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDM0Q7WUFDSCxDQUFDLENBQUM7WUFFRixlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFTLE1BQVc7Z0JBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMvRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29tU3VtbWFyeUZpbHRlciB9IGZyb20gXCIuL0ZpbHRlclwiO1xyXG5pbXBvcnQgeyBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyB9IGZyb20gXCIuL0NvbmRpdGlvbmFsRm9ybWF0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlTdGF0IHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgZGVmYXVsdFN0YXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGlzcGxheV90ZW1wbGF0ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBzdGF0V2lkdGg6IHN0cmluZztcclxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgZm9ybWF0OiBzdHJpbmc7XHJcbiAgcHVibGljIGRlY2ltYWxzOiBzdHJpbmc7XHJcbiAgcHVibGljIGZpbHRlcnM6IEJvb21TdW1tYXJ5RmlsdGVyW107XHJcbiAgcHVibGljIGNvbmRpdGlvbmFsX2Zvcm1hdHM6IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzW107XHJcbiAgcHVibGljIGFkZEZpbHRlcjtcclxuICBwdWJsaWMgcmVtb3ZlRmlsdGVyO1xyXG4gIHB1YmxpYyBhZGRDb25kaXRvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyByZW1vdmVDb25kaXRpb25hbEZvcm1hdDtcclxuICBwdWJsaWMgbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBzZXRVbml0Rm9ybWF0O1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCB0aGlzLmZpZWxkO1xyXG4gICAgdGhpcy5kZWZhdWx0U3RhdCA9IG9wdGlvbnMuZGVmYXVsdFN0YXQgfHwgXCIke2ZpcnN0fVwiO1xyXG4gICAgdGhpcy5kaXNwbGF5X3RlbXBsYXRlID1cclxuICAgICAgb3B0aW9ucy5kaXNwbGF5X3RlbXBsYXRlIHx8XHJcbiAgICAgIGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtmbG9hdDpsZWZ0O2JvcmRlcjoxcHggc29saWQgYmxhY2s7Ym9yZGVyLXdpZHRoOjFweCAxcHggMHB4IDFweFwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPlxcJHt0aXRsZX08L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjUwJTtmbG9hdDpsZWZ0O3BhZGRpbmc6MTBweDtcIj5cXCR7ZGVmYXVsdH08L2Rpdj5cclxuPC9kaXY+YDtcclxuICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5mb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcIm5vbmVcIjtcclxuICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zLmRlY2ltYWxzIHx8IFwiMFwiO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gb3B0aW9ucy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHt9KTtcclxuICB0aGlzLmZpbHRlcnMgPSB0aGlzLmZpbHRlcnMgfHwgW107XHJcbiAgdGhpcy5maWx0ZXJzLnB1c2gobmV3ZmlsdGVyKTtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUucmVtb3ZlRmlsdGVyID0gZnVuY3Rpb24oaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gIGlmICh0aGlzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgdGhpcy5maWx0ZXJzLnNwbGljZShOdW1iZXIoaW5kZXgpLCAxKTtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmFkZENvbmRpdG9uYWxGb3JtYXQgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICBsZXQgbmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlciA9IG5ldyBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyh7XHJcbiAgICBmaWVsZDogdGhpcy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCJcclxuICB9KTtcclxuICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgfHwgW107XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnB1c2gobmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBpZiAodGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5tb3ZlQ29uZGl0aW9uYWxGb3JtYXQgPSBmdW5jdGlvbihcclxuICBkaXJlY3Rpb246IHN0cmluZyxcclxuICBpbmRleDogTnVtYmVyXHJcbik6IHZvaWQge1xyXG4gIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXTtcclxuICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcclxuICAgICAgTnVtYmVyKGluZGV4KSAtIDFcclxuICAgIF07XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgfVxyXG4gIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgKyAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuc2V0VW5pdEZvcm1hdCA9IGZ1bmN0aW9uKGZvcm1hdDogYW55KTogdm9pZCB7XHJcbiAgdGhpcy5mb3JtYXQgPSBmb3JtYXQgJiYgZm9ybWF0LnZhbHVlID8gZm9ybWF0LnZhbHVlIDogXCJub25lXCI7XHJcbn07XHJcbiJdfQ==