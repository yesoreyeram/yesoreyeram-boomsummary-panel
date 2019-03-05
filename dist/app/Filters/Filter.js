System.register([], function (exports_1, context_1) {
    "use strict";
    var BoomFilter, getSecondaryFieldDetails;
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
            getSecondaryFieldDetails = function (operator) {
                var CanShowValue2 = false;
                var Value1Helper = "Value";
                var Value2Helper = "";
                switch (operator.replace("ignorecase", "").trim()) {
                    case "between":
                        CanShowValue2 = true;
                        Value1Helper = "From";
                        Value2Helper = "To";
                        break;
                    case "insiderange":
                        CanShowValue2 = true;
                        Value1Helper = "From";
                        Value2Helper = "To";
                        break;
                    case "outsiderange":
                        CanShowValue2 = true;
                        Value1Helper = "From";
                        Value2Helper = "To";
                        break;
                    case "in":
                        CanShowValue2 = true;
                        Value1Helper = "Values";
                        Value2Helper = "Seperator";
                        break;
                    default:
                        break;
                }
                return {
                    CanShowValue2: CanShowValue2,
                    Value1Helper: Value1Helper,
                    Value2Helper: Value2Helper
                };
            };
            BoomFilter.prototype.GetValue1Helper = function () {
                return getSecondaryFieldDetails(this.operator).Value1Helper;
            };
            BoomFilter.prototype.GetValue2Helper = function () {
                return getSecondaryFieldDetails(this.operator).Value2Helper;
            };
            BoomFilter.prototype.CanShowValue2 = function () {
                return getSecondaryFieldDetails(this.operator).CanShowValue2;
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9GaWx0ZXJzL0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBRUE7Z0JBUUUsb0JBQVksT0FBTztvQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDckMsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBQUMsQUFkRCxJQWNDOztZQUVHLHdCQUF3QixHQUFHLFVBQVMsUUFBUTtnQkFDOUMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBQzNCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDakQsS0FBSyxTQUFTO3dCQUNaLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLFlBQVksR0FBRyxNQUFNLENBQUM7d0JBQ3RCLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQ3BCLE1BQU07b0JBQ1IsS0FBSyxhQUFhO3dCQUNoQixhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUNyQixZQUFZLEdBQUcsTUFBTSxDQUFDO3dCQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDO3dCQUNwQixNQUFNO29CQUNSLEtBQUssY0FBYzt3QkFDakIsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDckIsWUFBWSxHQUFHLE1BQU0sQ0FBQzt3QkFDdEIsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDcEIsTUFBTTtvQkFDUixLQUFLLElBQUk7d0JBQ1AsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDckIsWUFBWSxHQUFHLFFBQVEsQ0FBQzt3QkFDeEIsWUFBWSxHQUFHLFdBQVcsQ0FBQzt3QkFDM0IsTUFBTTtvQkFDUjt3QkFDRSxNQUFNO2lCQUNUO2dCQUNELE9BQU87b0JBQ0wsYUFBYSxlQUFBO29CQUNiLFlBQVksY0FBQTtvQkFDWixZQUFZLGNBQUE7aUJBQ2IsQ0FBQztZQUNKLENBQUMsQ0FBQztZQUVGLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHO2dCQUNyQyxPQUFPLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFDOUQsQ0FBQyxDQUFDO1lBQ0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUc7Z0JBQ3JDLE9BQU8sd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUM5RCxDQUFDLENBQUM7WUFDRixVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRztnQkFDbkMsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQy9ELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElCb29tRmlsdGVyIH0gZnJvbSBcIi4uLy4uL2RlZmluaXRpb25zL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyIHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgb3BlcmF0b3I6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICBwdWJsaWMgdmFsdWUyOiBzdHJpbmc7XHJcbiAgcHVibGljIENhblNob3dWYWx1ZTI7XHJcbiAgcHVibGljIEdldFZhbHVlMkhlbHBlcjtcclxuICBwdWJsaWMgR2V0VmFsdWUxSGVscGVyO1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvciB8fCBcImVxdWFsc1wiO1xyXG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgXCJTb21ldGhpbmdcIjtcclxuICAgIHRoaXMudmFsdWUyID0gb3B0aW9ucy52YWx1ZTIgfHwgXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmxldCBnZXRTZWNvbmRhcnlGaWVsZERldGFpbHMgPSBmdW5jdGlvbihvcGVyYXRvcikge1xyXG4gIGxldCBDYW5TaG93VmFsdWUyID0gZmFsc2U7XHJcbiAgbGV0IFZhbHVlMUhlbHBlciA9IFwiVmFsdWVcIjtcclxuICBsZXQgVmFsdWUySGVscGVyID0gXCJcIjtcclxuICBzd2l0Y2ggKG9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKSkge1xyXG4gICAgY2FzZSBcImJldHdlZW5cIjpcclxuICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XHJcbiAgICAgIFZhbHVlMUhlbHBlciA9IFwiRnJvbVwiO1xyXG4gICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluc2lkZXJhbmdlXCI6XHJcbiAgICAgIENhblNob3dWYWx1ZTIgPSB0cnVlO1xyXG4gICAgICBWYWx1ZTFIZWxwZXIgPSBcIkZyb21cIjtcclxuICAgICAgVmFsdWUySGVscGVyID0gXCJUb1wiO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJvdXRzaWRlcmFuZ2VcIjpcclxuICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XHJcbiAgICAgIFZhbHVlMUhlbHBlciA9IFwiRnJvbVwiO1xyXG4gICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluXCI6XHJcbiAgICAgIENhblNob3dWYWx1ZTIgPSB0cnVlO1xyXG4gICAgICBWYWx1ZTFIZWxwZXIgPSBcIlZhbHVlc1wiO1xyXG4gICAgICBWYWx1ZTJIZWxwZXIgPSBcIlNlcGVyYXRvclwiO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgQ2FuU2hvd1ZhbHVlMixcclxuICAgIFZhbHVlMUhlbHBlcixcclxuICAgIFZhbHVlMkhlbHBlclxyXG4gIH07XHJcbn07XHJcblxyXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTFIZWxwZXIgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLlZhbHVlMUhlbHBlcjtcclxufTtcclxuQm9vbUZpbHRlci5wcm90b3R5cGUuR2V0VmFsdWUySGVscGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGdldFNlY29uZGFyeUZpZWxkRGV0YWlscyh0aGlzLm9wZXJhdG9yKS5WYWx1ZTJIZWxwZXI7XHJcbn07XHJcbkJvb21GaWx0ZXIucHJvdG90eXBlLkNhblNob3dWYWx1ZTIgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLkNhblNob3dWYWx1ZTI7XHJcbn07XHJcbiJdfQ==