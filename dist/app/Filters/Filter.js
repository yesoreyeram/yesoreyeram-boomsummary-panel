System.register([], function (exports_1, context_1) {
    "use strict";
    var BoomFilter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            BoomFilter = (function () {
                function BoomFilter(options) {
                    this.field = options.field || "Sample";
                    this.operator = options.operator || "equals";
                    this.value = options.value || "Something";
                    this.value2 = options.value2 || "";
                }
                return BoomFilter;
            }());
            exports_1("BoomFilter", BoomFilter);
            BoomFilter.prototype.CanShowValue2 = function () {
                if (this.operator.replace("ignorecase", "").trim() === "between") {
                    return true;
                }
                else if (this.operator.replace("ignorecase", "").trim() === "insiderange") {
                    return true;
                }
                else if (this.operator.replace("ignorecase", "").trim() === "outsiderange") {
                    return true;
                }
                else if (this.operator.replace("ignorecase", "").trim() === "in") {
                    return true;
                }
                else {
                    return false;
                }
            };
            BoomFilter.prototype.GetValue2Helper = function () {
                if (this.operator.replace("ignorecase", "").trim() === "between") {
                    return "to";
                }
                else if (this.operator.replace("ignorecase", "").trim() === "insiderange") {
                    return "to";
                }
                else if (this.operator.replace("ignorecase", "").trim() === "outsiderange") {
                    return "to";
                }
                else if (this.operator.replace("ignorecase", "").trim() === "in") {
                    return "seperator";
                }
                else {
                    return "";
                }
            };
            BoomFilter.prototype.GetValue1Helper = function () {
                if (this.operator.replace("ignorecase", "").trim() === "between") {
                    return "From";
                }
                else if (this.operator.replace("ignorecase", "").trim() === "insiderange") {
                    return "From";
                }
                else if (this.operator.replace("ignorecase", "").trim() === "outsiderange") {
                    return "From";
                }
                else if (this.operator.replace("ignorecase", "").trim() === "in") {
                    return "Values";
                }
                else {
                    return "Value";
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9GaWx0ZXJzL0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBRUE7Z0JBUUUsb0JBQVksT0FBTztvQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDckMsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBQUMsQUFkRCxJQWNDOztZQUVELFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7b0JBQ2hFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLGFBQWEsRUFBRTtvQkFDM0UsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssY0FBYyxFQUNqRTtvQkFDQSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ2xFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sS0FBSyxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUc7Z0JBQ3JDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtvQkFDaEUsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssYUFBYSxFQUFFO29CQUMzRSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxjQUFjLEVBQ2pFO29CQUNBLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDbEUsT0FBTyxXQUFXLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUc7Z0JBQ3JDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtvQkFDaEUsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssYUFBYSxFQUFFO29CQUMzRSxPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxjQUFjLEVBQ2pFO29CQUNBLE9BQU8sTUFBTSxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDbEUsT0FBTyxRQUFRLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNMLE9BQU8sT0FBTyxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElCb29tRmlsdGVyIH0gZnJvbSBcIi4uLy4uL2RlZmluaXRpb25zL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyIHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgb3BlcmF0b3I6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWUyOiBzdHJpbmc7XHJcbiAgcHVibGljIENhblNob3dWYWx1ZTI7XHJcbiAgcHVibGljIEdldFZhbHVlMkhlbHBlcjtcclxuICBwdWJsaWMgR2V0VmFsdWUxSGVscGVyO1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvciB8fCBcImVxdWFsc1wiO1xyXG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgXCJTb21ldGhpbmdcIjtcclxuICAgIHRoaXMudmFsdWUyID0gb3B0aW9ucy52YWx1ZTIgfHwgXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbkJvb21GaWx0ZXIucHJvdG90eXBlLkNhblNob3dWYWx1ZTIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLCBcIlwiKS50cmltKCkgPT09IFwiYmV0d2VlblwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpID09PSBcImluc2lkZXJhbmdlXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICB0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKSA9PT0gXCJvdXRzaWRlcmFuZ2VcIlxyXG4gICkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKSA9PT0gXCJpblwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuQm9vbUZpbHRlci5wcm90b3R5cGUuR2V0VmFsdWUySGVscGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIFwidG9cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpID09PSBcImluc2lkZXJhbmdlXCIpIHtcclxuICAgIHJldHVybiBcInRvXCI7XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpID09PSBcIm91dHNpZGVyYW5nZVwiXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLCBcIlwiKS50cmltKCkgPT09IFwiaW5cIikge1xyXG4gICAgcmV0dXJuIFwic2VwZXJhdG9yXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuQm9vbUZpbHRlci5wcm90b3R5cGUuR2V0VmFsdWUxSGVscGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIFwiRnJvbVwiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLCBcIlwiKS50cmltKCkgPT09IFwiaW5zaWRlcmFuZ2VcIikge1xyXG4gICAgcmV0dXJuIFwiRnJvbVwiO1xyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICB0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKSA9PT0gXCJvdXRzaWRlcmFuZ2VcIlxyXG4gICkge1xyXG4gICAgcmV0dXJuIFwiRnJvbVwiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLCBcIlwiKS50cmltKCkgPT09IFwiaW5cIikge1xyXG4gICAgcmV0dXJuIFwiVmFsdWVzXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBcIlZhbHVlXCI7XHJcbiAgfVxyXG59O1xyXG4iXX0=