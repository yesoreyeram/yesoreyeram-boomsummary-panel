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
                if (isNaN(value) || !value) {
                    return value;
                }
                else {
                    var decimalInfo = getDecimalsForValue(value, decimals || "0");
                    var formatFunc = kbn_1.default.valueFormats[format || "none"];
                    var value_formatted = formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                    return String(value_formatted);
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhZmFuYVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0dyYWZhbmFVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUtBLGlDQUFhLG1CQUFtQixHQUFHLFVBQVUsS0FBSyxFQUFFLFNBQVM7Z0JBQzNELElBQUksZ0JBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLEdBQVc7d0JBQ2QsUUFBUSxFQUFFLFNBQVM7d0JBQ25CLGNBQWMsRUFBRSxJQUFJO3FCQUNyQixDQUFDO29CQUNGLE9BQU8sQ0FBQyxDQUFDO2lCQUNWO2dCQUVELElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDM0IsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQ25CLElBQUksQ0FBQztnQkFFUCxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDVjtxQkFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ25CLElBQUksR0FBRyxDQUFDLENBQUM7b0JBRVQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO3dCQUNmLElBQUksR0FBRyxHQUFHLENBQUM7d0JBQ1gsRUFBRSxHQUFHLENBQUM7cUJBQ1A7aUJBQ0Y7cUJBQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNyQixJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNWO3FCQUFNO29CQUNMLElBQUksR0FBRyxFQUFFLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFHYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUMvQixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNUO2dCQUVELElBQUksTUFBTSxHQUFXO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO29CQUMxQixjQUFjLEVBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNoRSxDQUFDO2dCQUVGLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsRUFBQztZQUVGLGdDQUFXLGtCQUFrQixHQUFHLFVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRO2dCQUMvRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDMUIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0wsSUFBSSxXQUFXLEdBQVEsbUJBQW1CLENBQUMsS0FBSyxFQUFFLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDbkUsSUFBSSxVQUFVLEdBQUcsYUFBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUM7b0JBQ3BELElBQUksZUFBZSxHQUFHLFVBQVUsQ0FDOUIsS0FBSyxFQUNMLFdBQVcsQ0FBQyxRQUFRLEVBQ3BCLFdBQVcsQ0FBQyxjQUFjLENBQzNCLENBQUM7b0JBQ0YsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ2hDO1lBQ0gsQ0FBQyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGtibiBmcm9tIFwiYXBwL2NvcmUvdXRpbHMva2JuXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0RGVjaW1hbHNGb3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgX2RlY2ltYWxzKSB7XHJcbiAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgIGxldCBvOiBPYmplY3QgPSB7XHJcbiAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXHJcbiAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG87XHJcbiAgfVxyXG5cclxuICBsZXQgZGVsdGEgPSB2YWx1ZSAvIDI7XHJcbiAgbGV0IGRlYyA9IC1NYXRoLmZsb29yKE1hdGgubG9nKGRlbHRhKSAvIE1hdGguTE4xMCk7XHJcblxyXG4gIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgbm9ybSA9IGRlbHRhIC8gbWFnbiwgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxyXG4gICAgc2l6ZTtcclxuXHJcbiAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgIHNpemUgPSAxO1xyXG4gIH0gZWxzZSBpZiAobm9ybSA8IDMpIHtcclxuICAgIHNpemUgPSAyO1xyXG4gICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcclxuICAgIGlmIChub3JtID4gMi4yNSkge1xyXG4gICAgICBzaXplID0gMi41O1xyXG4gICAgICArK2RlYztcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgIHNpemUgPSA1O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaXplID0gMTA7XHJcbiAgfVxyXG5cclxuICBzaXplICo9IG1hZ247XHJcblxyXG4gIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xyXG4gICAgZGVjID0gMDtcclxuICB9XHJcblxyXG4gIGxldCByZXN1bHQ6IE9iamVjdCA9IHtcclxuICAgIGRlY2ltYWxzOiBNYXRoLm1heCgwLCBkZWMpLFxyXG4gICAgc2NhbGVkRGVjaW1hbHM6XHJcbiAgICAgIE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICB9O1xyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRGb3JtYXR0ZWRPdXRwdXQgPSBmdW5jdGlvbiAodmFsdWUsIGZvcm1hdCwgZGVjaW1hbHMpIHtcclxuICBpZiAoaXNOYU4odmFsdWUpIHx8ICF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgZGVjaW1hbEluZm86IGFueSA9IGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIGRlY2ltYWxzIHx8IFwiMFwiKTtcclxuICAgIGxldCBmb3JtYXRGdW5jID0ga2JuLnZhbHVlRm9ybWF0c1tmb3JtYXQgfHwgXCJub25lXCJdO1xyXG4gICAgbGV0IHZhbHVlX2Zvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoXHJcbiAgICAgIHZhbHVlLFxyXG4gICAgICBkZWNpbWFsSW5mby5kZWNpbWFscyxcclxuICAgICAgZGVjaW1hbEluZm8uc2NhbGVkRGVjaW1hbHNcclxuICAgICk7XHJcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlX2Zvcm1hdHRlZCk7XHJcbiAgfVxyXG59O1xyXG4iXX0=