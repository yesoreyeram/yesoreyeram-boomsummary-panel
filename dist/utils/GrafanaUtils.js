System.register(["lodash", "app/core/utils/kbn"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, kbn_1, getDecimalsForValue, getFormattedOutput;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }
        ],
        execute: function () {
            exports_1("getDecimalsForValue", getDecimalsForValue = function (value, _decimals) {
                if (lodash_1.default.isNumber(+_decimals)) {
                    var o = {
                        decimals: _decimals,
                        scaledDecimals: null
                    };
                    return o;
                }
                var delta = value / 2;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                var magn = Math.pow(10, -dec), norm = delta / magn, size;
                if (norm < 1.5) {
                    size = 1;
                }
                else if (norm < 3) {
                    size = 2;
                    if (norm > 2.25) {
                        size = 2.5;
                        ++dec;
                    }
                }
                else if (norm < 7.5) {
                    size = 5;
                }
                else {
                    size = 10;
                }
                size *= magn;
                if (Math.floor(value) === value) {
                    dec = 0;
                }
                var result = {
                    decimals: Math.max(0, dec),
                    scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
                };
                return result;
            });
            exports_1("getFormattedOutput", getFormattedOutput = function (value, format, decimals) {
                var decimalInfo = getDecimalsForValue(value, decimals || "0");
                var formatFunc = kbn_1.default.valueFormats[format || "none"];
                var value_formatted = formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                return String(value_formatted);
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhZmFuYVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0dyYWZhbmFVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUtBLGlDQUFhLG1CQUFtQixHQUFHLFVBQVMsS0FBSyxFQUFFLFNBQVM7Z0JBQzFELElBQUksZ0JBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLEdBQVc7d0JBQ2QsUUFBUSxFQUFFLFNBQVM7d0JBQ25CLGNBQWMsRUFBRSxJQUFJO3FCQUNyQixDQUFDO29CQUNGLE9BQU8sQ0FBQyxDQUFDO2lCQUNWO2dCQUVELElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDM0IsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQ25CLElBQUksQ0FBQztnQkFFUCxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDVjtxQkFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ25CLElBQUksR0FBRyxDQUFDLENBQUM7b0JBRVQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO3dCQUNmLElBQUksR0FBRyxHQUFHLENBQUM7d0JBQ1gsRUFBRSxHQUFHLENBQUM7cUJBQ1A7aUJBQ0Y7cUJBQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNyQixJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNWO3FCQUFNO29CQUNMLElBQUksR0FBRyxFQUFFLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFHYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUMvQixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNUO2dCQUVELElBQUksTUFBTSxHQUFXO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO29CQUMxQixjQUFjLEVBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNoRSxDQUFDO2dCQUVGLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsRUFBQztZQUVGLGdDQUFXLGtCQUFrQixHQUFHLFVBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRO2dCQUM5RCxJQUFJLFdBQVcsR0FBUSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLFVBQVUsR0FBRyxhQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUM5QixLQUFLLEVBQ0wsV0FBVyxDQUFDLFFBQVEsRUFDcEIsV0FBVyxDQUFDLGNBQWMsQ0FDM0IsQ0FBQztnQkFDRixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXREZWNpbWFsc0ZvclZhbHVlID0gZnVuY3Rpb24odmFsdWUsIF9kZWNpbWFscykge1xyXG4gIGlmIChfLmlzTnVtYmVyKCtfZGVjaW1hbHMpKSB7XHJcbiAgICBsZXQgbzogT2JqZWN0ID0ge1xyXG4gICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICBzY2FsZWREZWNpbWFsczogbnVsbFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvO1xyXG4gIH1cclxuXHJcbiAgbGV0IGRlbHRhID0gdmFsdWUgLyAyO1xyXG4gIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICBsZXQgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcclxuICAgIG5vcm0gPSBkZWx0YSAvIG1hZ24sIC8vIG5vcm0gaXMgYmV0d2VlbiAxLjAgYW5kIDEwLjBcclxuICAgIHNpemU7XHJcblxyXG4gIGlmIChub3JtIDwgMS41KSB7XHJcbiAgICBzaXplID0gMTtcclxuICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICBzaXplID0gMjtcclxuICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXHJcbiAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgc2l6ZSA9IDIuNTtcclxuICAgICAgKytkZWM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XHJcbiAgICBzaXplID0gNTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2l6ZSA9IDEwO1xyXG4gIH1cclxuXHJcbiAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAvLyByZWR1Y2Ugc3RhcnRpbmcgZGVjaW1hbHMgaWYgbm90IG5lZWRlZFxyXG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgIGRlYyA9IDA7XHJcbiAgfVxyXG5cclxuICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XHJcbiAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgIHNjYWxlZERlY2ltYWxzOlxyXG4gICAgICBNYXRoLm1heCgwLCBkZWMpIC0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGguTE4xMCkgKyAyXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0Rm9ybWF0dGVkT3V0cHV0ID0gZnVuY3Rpb24odmFsdWUsIGZvcm1hdCwgZGVjaW1hbHMpIHtcclxuICBsZXQgZGVjaW1hbEluZm86IGFueSA9IGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIGRlY2ltYWxzIHx8IFwiMFwiKTtcclxuICBsZXQgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbZm9ybWF0IHx8IFwibm9uZVwiXTtcclxuICBsZXQgdmFsdWVfZm9ybWF0dGVkID0gZm9ybWF0RnVuYyhcclxuICAgIHZhbHVlLFxyXG4gICAgZGVjaW1hbEluZm8uZGVjaW1hbHMsXHJcbiAgICBkZWNpbWFsSW5mby5zY2FsZWREZWNpbWFsc1xyXG4gICk7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZV9mb3JtYXR0ZWQpO1xyXG59O1xyXG4iXX0=