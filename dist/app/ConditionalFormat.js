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
                    this.operator = options.field || "equals";
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
                if (this.operator === "between") {
                    return true;
                }
                else if (this.operator === "inside range") {
                    return true;
                }
                else if (this.operator === "outside range") {
                    return true;
                }
                else if (this.operator === "in") {
                    return true;
                }
                else {
                    return false;
                }
            };
            BoomSummaryConditionalFormats.prototype.GetValue2Helper = function () {
                if (this.operator === "between") {
                    return "to";
                }
                else if (this.operator === "inside range") {
                    return "to";
                }
                else if (this.operator === "outside range") {
                    return "to";
                }
                else if (this.operator === "in") {
                    return "seperator";
                }
                else {
                    return "";
                }
            };
            BoomSummaryConditionalFormats.prototype.GetValue1Helper = function () {
                if (this.operator === "between") {
                    return "From";
                }
                else if (this.operator === "inside range") {
                    return "From";
                }
                else if (this.operator === "outside range") {
                    return "From";
                }
                else if (this.operator === "in") {
                    return "Values";
                }
                else {
                    return "Value";
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uYWxGb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0NvbmRpdGlvbmFsRm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQTtnQkFXRSx1Q0FBWSxPQUFPO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDO29CQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO29CQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDO29CQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO29CQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO29CQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztnQkFDekQsQ0FBQztnQkFDSCxvQ0FBQztZQUFELENBQUMsQUFwQkQsSUFvQkM7O1lBRUQsNkJBQTZCLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRztnQkFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtvQkFDL0IsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLGNBQWMsRUFBRTtvQkFDM0MsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLGVBQWUsRUFBRTtvQkFDNUMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDakMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLENBQUM7WUFDRiw2QkFBNkIsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO2dCQUN4RCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMvQixPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssY0FBYyxFQUFFO29CQUMzQyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssZUFBZSxFQUFFO29CQUM1QyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNqQyxPQUFPLFdBQVcsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUM7WUFDRiw2QkFBNkIsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO2dCQUN4RCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMvQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssY0FBYyxFQUFFO29CQUMzQyxPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssZUFBZSxFQUFFO29CQUM1QyxPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNqQyxPQUFPLFFBQVEsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0wsT0FBTyxPQUFPLENBQUM7aUJBQ2hCO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgb3BlcmF0b3I6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWUyOiBzdHJpbmc7XHJcbiAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgdGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIGRpc3BsYXlfdGVtcGxhdGU6IHN0cmluZztcclxuICBwdWJsaWMgQ2FuU2hvd1ZhbHVlMjtcclxuICBwdWJsaWMgR2V0VmFsdWUySGVscGVyO1xyXG4gIHB1YmxpYyBHZXRWYWx1ZTFIZWxwZXI7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCIke2RlZmF1bHR9XCI7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5maWVsZCB8fCBcImVxdWFsc1wiO1xyXG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgXCJTb21ldGhpbmdcIjtcclxuICAgIHRoaXMudmFsdWUyID0gb3B0aW9ucy52YWx1ZTIgfHwgXCJcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5kaXNwbGF5X3RlbXBsYXRlID0gb3B0aW9ucy5kaXNwbGF5X3RlbXBsYXRlIHx8IFwiXCI7XHJcbiAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cy5wcm90b3R5cGUuQ2FuU2hvd1ZhbHVlMiA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluc2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwib3V0c2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwiaW5cIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcbkJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzLnByb3RvdHlwZS5HZXRWYWx1ZTJIZWxwZXIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gXCJiZXR3ZWVuXCIpIHtcclxuICAgIHJldHVybiBcInRvXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluc2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvciA9PT0gXCJvdXRzaWRlIHJhbmdlXCIpIHtcclxuICAgIHJldHVybiBcInRvXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiBcInNlcGVyYXRvclwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn07XHJcbkJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzLnByb3RvdHlwZS5HZXRWYWx1ZTFIZWxwZXIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gXCJiZXR3ZWVuXCIpIHtcclxuICAgIHJldHVybiBcIkZyb21cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwiaW5zaWRlIHJhbmdlXCIpIHtcclxuICAgIHJldHVybiBcIkZyb21cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwib3V0c2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJGcm9tXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiBcIlZhbHVlc1wiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJWYWx1ZVwiO1xyXG4gIH1cclxufTtcclxuIl19