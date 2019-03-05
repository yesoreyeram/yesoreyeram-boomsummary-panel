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
            BoomSummaryFilter.prototype.GetValue2Helper = function () {
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
            BoomSummaryFilter.prototype.GetValue1Helper = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9GaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQVFFLDJCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUM7b0JBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQUFDLEFBZEQsSUFjQzs7WUFDRCxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7b0JBQy9ELE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLGFBQWEsRUFBRTtvQkFDMUUsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssY0FBYyxFQUFFO29CQUMzRSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ2pFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sS0FBSyxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRztnQkFDNUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO29CQUMvRCxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxhQUFhLEVBQUU7b0JBQzFFLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLGNBQWMsRUFBRTtvQkFDM0UsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUNqRSxPQUFPLFdBQVcsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUM7WUFDRixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7b0JBQy9ELE9BQU8sTUFBTSxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLGFBQWEsRUFBRTtvQkFDMUUsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssY0FBYyxFQUFFO29CQUMzRSxPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ2pFLE9BQU8sUUFBUSxDQUFDO2lCQUNqQjtxQkFBTTtvQkFDTCxPQUFPLE9BQU8sQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlGaWx0ZXIge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyBvcGVyYXRvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyB2YWx1ZTI6IHN0cmluZztcclxuICBwdWJsaWMgQ2FuU2hvd1ZhbHVlMjtcclxuICBwdWJsaWMgR2V0VmFsdWUySGVscGVyO1xyXG4gIHB1YmxpYyBHZXRWYWx1ZTFIZWxwZXI7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLmZpZWxkIHx8IFwiZXF1YWxzXCI7XHJcbiAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZSB8fCBcIlNvbWV0aGluZ1wiO1xyXG4gICAgdGhpcy52YWx1ZTIgPSBvcHRpb25zLnZhbHVlMiB8fCBcIlwiO1xyXG4gIH1cclxufVxyXG5Cb29tU3VtbWFyeUZpbHRlci5wcm90b3R5cGUuQ2FuU2hvd1ZhbHVlMiA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImluc2lkZXJhbmdlXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJvdXRzaWRlcmFuZ2VcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5Cb29tU3VtbWFyeUZpbHRlci5wcm90b3R5cGUuR2V0VmFsdWUySGVscGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIixcIlwiKS50cmltKCkgPT09IFwiYmV0d2VlblwiKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJpbnNpZGVyYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJ0b1wiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJvdXRzaWRlcmFuZ2VcIikge1xyXG4gICAgcmV0dXJuIFwidG9cIjtcclxuICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIixcIlwiKS50cmltKCkgPT09IFwiaW5cIikge1xyXG4gICAgcmV0dXJuIFwic2VwZXJhdG9yXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuQm9vbVN1bW1hcnlGaWx0ZXIucHJvdG90eXBlLkdldFZhbHVlMUhlbHBlciA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImJldHdlZW5cIikge1xyXG4gICAgcmV0dXJuIFwiRnJvbVwiO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLFwiXCIpLnRyaW0oKSA9PT0gXCJpbnNpZGVyYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJGcm9tXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcIm91dHNpZGVyYW5nZVwiKSB7XHJcbiAgICByZXR1cm4gXCJGcm9tXCI7XHJcbiAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsXCJcIikudHJpbSgpID09PSBcImluXCIpIHtcclxuICAgIHJldHVybiBcIlZhbHVlc1wiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJWYWx1ZVwiO1xyXG4gIH1cclxufTtcclxuIl19