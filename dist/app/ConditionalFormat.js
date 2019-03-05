System.register([], function (exports_1, context_1) {
    "use strict";
    var BoomSummaryConditionalFormats;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            BoomSummaryConditionalFormats = (function () {
                function BoomSummaryConditionalFormats(options) {
                    this.field = options.field || "${default}";
                    this.operator = options.operator || "equals";
                    this.value = options.value || "Something";
                    this.value2 = options.value2 || "";
                    this.bgColor = options.bgColor || "";
                    this.textColor = options.textColor || "";
                    this.display_template = options.display_template || "";
                }
                return BoomSummaryConditionalFormats;
            }());
            exports_1("BoomSummaryConditionalFormats", BoomSummaryConditionalFormats);
            BoomSummaryConditionalFormats.prototype.CanShowValue2 = function () {
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
            BoomSummaryConditionalFormats.prototype.GetValue2Helper = function () {
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
            BoomSummaryConditionalFormats.prototype.GetValue1Helper = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uYWxGb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0NvbmRpdGlvbmFsRm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQTtnQkFXRSx1Q0FBWSxPQUFPO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDO29CQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO29CQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDO29CQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztnQkFDekQsQ0FBQztnQkFDSCxvQ0FBQztZQUFELENBQUMsQUFwQkQsSUFvQkM7O1lBRUQsNkJBQTZCLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRztnQkFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO29CQUMvRCxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxhQUFhLEVBQUU7b0JBQzFFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLGNBQWMsRUFBRTtvQkFDM0UsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUNqRSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLEtBQUssQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQztZQUNGLDZCQUE2QixDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUc7Z0JBQ3hELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRTtvQkFDL0QsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssYUFBYSxFQUFFO29CQUMxRSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxjQUFjLEVBQUU7b0JBQzNFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDakUsT0FBTyxXQUFXLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsNkJBQTZCLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRztnQkFDeEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO29CQUMvRCxPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxhQUFhLEVBQUU7b0JBQzFFLE9BQU8sTUFBTSxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLGNBQWMsRUFBRTtvQkFDM0UsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUNqRSxPQUFPLFFBQVEsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0wsT0FBTyxPQUFPLENBQUM7aUJBQ2hCO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgb3BlcmF0b3I6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWUyOiBzdHJpbmc7XHJcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgdGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIGRpc3BsYXlfdGVtcGxhdGU6IHN0cmluZztcclxuICBwdWJsaWMgQ2FuU2hvd1ZhbHVlMjtcclxuICBwdWJsaWMgR2V0VmFsdWUySGVscGVyO1xyXG4gIHB1YmxpYyBHZXRWYWx1ZTFIZWxwZXI7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCIke2RlZmF1bHR9XCI7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvciB8fCBcImVxdWFsc1wiO1xyXG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgXCJTb21ldGhpbmdcIjtcclxuICAgIHRoaXMudmFsdWUyID0gb3B0aW9ucy52YWx1ZTIgfHwgXCJcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5kaXNwbGF5X3RlbXBsYXRlID0gb3B0aW9ucy5kaXNwbGF5X3RlbXBsYXRlIHx8IFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cy5wcm90b3R5cGUuQ2FuU2hvd1ZhbHVlMiA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImluc2lkZXJhbmdlXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJvdXRzaWRlcmFuZ2VcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5Cb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cy5wcm90b3R5cGUuR2V0VmFsdWUySGVscGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIixcIlwiKS50cmltKCkgPT09IFwiYmV0d2VlblwiKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJpbnNpZGVyYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJvdXRzaWRlcmFuZ2VcIikge1xyXG4gICAgcmV0dXJuIFwidG9cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIixcIlwiKS50cmltKCkgPT09IFwiaW5cIikge1xyXG4gICAgcmV0dXJuIFwic2VwZXJhdG9yXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMucHJvdG90eXBlLkdldFZhbHVlMUhlbHBlciA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIFwiRnJvbVwiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJpbnNpZGVyYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJGcm9tXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcIm91dHNpZGVyYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJGcm9tXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiBcIlZhbHVlc1wiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJWYWx1ZVwiO1xyXG4gIH1cclxufTtcclxuIl19