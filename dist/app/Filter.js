System.register([], function (exports_1, context_1) {
    "use strict";
    var BoomSummaryFilter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            BoomSummaryFilter = (function () {
                function BoomSummaryFilter(options) {
                    this.field = options.field || "Sample";
                    this.operator = options.field || "equals";
                    this.value = options.value || "Something";
                    this.value2 = options.value2 || "";
                }
                return BoomSummaryFilter;
            }());
            exports_1("BoomSummaryFilter", BoomSummaryFilter);
            BoomSummaryFilter.prototype.CanShowValue2 = function () {
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
            BoomSummaryFilter.prototype.GetValue2Helper = function () {
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
            BoomSummaryFilter.prototype.GetValue1Helper = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9GaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQVFFLDJCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUM7b0JBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQUFDLEFBZEQsSUFjQzs7WUFDRCxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMvQixPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssY0FBYyxFQUFFO29CQUMzQyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssZUFBZSxFQUFFO29CQUM1QyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNqQyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLEtBQUssQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQztZQUNGLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUc7Z0JBQzVDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQy9CLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxjQUFjLEVBQUU7b0JBQzNDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxlQUFlLEVBQUU7b0JBQzVDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7b0JBQ2pDLE9BQU8sV0FBVyxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDTCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQztZQUNGLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUc7Z0JBQzVDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQy9CLE9BQU8sTUFBTSxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxjQUFjLEVBQUU7b0JBQzNDLE9BQU8sTUFBTSxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxlQUFlLEVBQUU7b0JBQzVDLE9BQU8sTUFBTSxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7b0JBQ2pDLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjtxQkFBTTtvQkFDTCxPQUFPLE9BQU8sQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlGaWx0ZXIge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyBvcGVyYXRvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyB2YWx1ZTI6IHN0cmluZztcclxuICBwdWJsaWMgQ2FuU2hvd1ZhbHVlMjtcclxuICBwdWJsaWMgR2V0VmFsdWUySGVscGVyO1xyXG4gIHB1YmxpYyBHZXRWYWx1ZTFIZWxwZXI7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLmZpZWxkIHx8IFwiZXF1YWxzXCI7XHJcbiAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZSB8fCBcIlNvbWV0aGluZ1wiO1xyXG4gICAgdGhpcy52YWx1ZTIgPSBvcHRpb25zLnZhbHVlMiB8fCBcIlwiO1xyXG4gIH1cclxufVxyXG5Cb29tU3VtbWFyeUZpbHRlci5wcm90b3R5cGUuQ2FuU2hvd1ZhbHVlMiA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluc2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwib3V0c2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwiaW5cIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcbkJvb21TdW1tYXJ5RmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTJIZWxwZXIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gXCJiZXR3ZWVuXCIpIHtcclxuICAgIHJldHVybiBcInRvXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluc2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvciA9PT0gXCJvdXRzaWRlIHJhbmdlXCIpIHtcclxuICAgIHJldHVybiBcInRvXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiBcInNlcGVyYXRvclwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn07XHJcbkJvb21TdW1tYXJ5RmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTFIZWxwZXIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gXCJiZXR3ZWVuXCIpIHtcclxuICAgIHJldHVybiBcIkZyb21cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwiaW5zaWRlIHJhbmdlXCIpIHtcclxuICAgIHJldHVybiBcIkZyb21cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IgPT09IFwib3V0c2lkZSByYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJGcm9tXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiBcIlZhbHVlc1wiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJWYWx1ZVwiO1xyXG4gIH1cclxufTtcclxuIl19