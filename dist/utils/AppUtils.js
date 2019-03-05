System.register(["lodash", "./GrafanaUtils", "./MatchUtils"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, GrafanaUtils_1, MatchUtils_1, replaceTokens, getStatFromStatsGroup, buildOutput, getMatchingCondition, getOutputValue;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (GrafanaUtils_1_1) {
                GrafanaUtils_1 = GrafanaUtils_1_1;
            },
            function (MatchUtils_1_1) {
                MatchUtils_1 = MatchUtils_1_1;
            }
        ],
        execute: function () {
            exports_1("replaceTokens", replaceTokens = function (value) {
                var FA_TOKEN_PREFIX = "${fa-";
                var FA_TOKEN_SUFFIX = "}";
                var FA_DELIMITER = ",";
                var IMG_TOKEN_PREFIX = "${img-";
                var IMG_TOKEN_SUFFIX = "}";
                var IMG_DELIMITER = ",";
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith(FA_TOKEN_PREFIX) && a.endsWith(FA_TOKEN_SUFFIX)) {
                        var mytoken = a
                            .replace(/\$/g, "")
                            .replace(/\{/g, "")
                            .replace(/\}/g, "");
                        var icon = mytoken.split(FA_DELIMITER)[0];
                        var color = a.indexOf(FA_DELIMITER) > -1
                            ? " style=\"color:" + mytoken.split(IMG_DELIMITER)[1] + "\" "
                            : "";
                        var repeatCount = a.split(FA_DELIMITER).length > 2
                            ? +mytoken.split(IMG_DELIMITER)[2]
                            : 1;
                        if (a.split(FA_DELIMITER).length > 4) {
                            var operator = mytoken.split(IMG_DELIMITER)[3];
                            var _value = +mytoken.split(IMG_DELIMITER)[4];
                            switch (operator) {
                                case "plus":
                                    repeatCount = repeatCount + _value;
                                    break;
                                case "minus":
                                    repeatCount = repeatCount - _value;
                                    break;
                                case "multiply":
                                    repeatCount = Math.round(repeatCount * _value);
                                    break;
                                case "divideby":
                                    repeatCount = Math.round(repeatCount / _value);
                                    break;
                                case "min":
                                    repeatCount = Math.round(lodash_1.default.min([repeatCount, _value]));
                                    break;
                                case "max":
                                    repeatCount = Math.round(lodash_1.default.max([repeatCount, _value]));
                                    break;
                                case "mean":
                                    repeatCount = Math.round(lodash_1.default.mean([repeatCount, _value]));
                                    break;
                            }
                        }
                        a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                    }
                    else if (a.startsWith(IMG_TOKEN_PREFIX) &&
                        a.endsWith(IMG_TOKEN_SUFFIX)) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[0];
                        var imgWidth = a.split(IMG_DELIMITER).length > 1
                            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[1]
                            : "20px";
                        var imgHeight = a.split(IMG_DELIMITER).length > 2
                            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[2]
                            : "20px";
                        var repeatCount = a.split(IMG_DELIMITER).length > 3
                            ? +a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[3]
                            : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
                return value;
            });
            exports_1("getStatFromStatsGroup", getStatFromStatsGroup = function (statsGroup, stat, format, decimals) {
                switch (stat.toLowerCase()) {
                    case "first":
                    case "default":
                    case "value":
                        return isNaN(statsGroup.first)
                            ? statsGroup.first
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.first, format, decimals);
                    case "count":
                    case "length":
                        return isNaN(statsGroup.count)
                            ? statsGroup.count
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.count, "none", "0");
                    case "uniquecount":
                    case "uniquelength":
                        return isNaN(statsGroup.uniquecount)
                            ? statsGroup.uniquecount
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.uniquecount, "none", "0");
                    case "sum":
                    case "total":
                        return isNaN(statsGroup.sum)
                            ? statsGroup.sum
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.sum, format, decimals);
                    case "mean":
                    case "avg":
                    case "average":
                        return isNaN(statsGroup.mean)
                            ? statsGroup.mean
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.mean, format, decimals);
                    case "min":
                        return isNaN(statsGroup.min)
                            ? statsGroup.min
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.min, format, decimals);
                    case "max":
                        return isNaN(statsGroup.max)
                            ? statsGroup.max
                            : GrafanaUtils_1.getFormattedOutput(statsGroup.max, format, decimals);
                }
                return "Not a valid stat";
            });
            exports_1("buildOutput", buildOutput = function (statWidth, output, bgColor, textColor) {
                return "<div style=\"width:" + (statWidth ||
                    "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\">\n    " + output + "\n  </div>";
            });
            exports_1("getMatchingCondition", getMatchingCondition = function (statsGroup, stat) {
                var matching_condition = lodash_1.default.first(stat.conditional_formats.filter(function (condition) {
                    var original_value = getStatFromStatsGroup(statsGroup, (condition.field || "${value}").replace("${", "").replace("}", ""), stat.format, stat.decimals);
                    var operator = condition.operator;
                    var compare_value1 = condition.value;
                    var compare_value2 = condition.value2;
                    return MatchUtils_1.isMatch(original_value, operator, compare_value1, compare_value2);
                }));
                return matching_condition;
            });
            exports_1("getOutputValue", getOutputValue = function (masterdata, stat) {
                if (masterdata.length === 0) {
                    return {
                        bgColor: "",
                        output: "No data",
                        textColor: "red"
                    };
                }
                else {
                    var mystats = stat.getValues(masterdata);
                    var statsGroup = stat.getStats(mystats);
                    var matching_condition = getMatchingCondition(statsGroup, stat);
                    var bgColor = stat.bgColor;
                    var textColor = stat.textColor;
                    var template = stat.display_template;
                    if (matching_condition) {
                        bgColor = matching_condition.bgColor || stat.bgColor;
                        textColor = matching_condition.textColor || stat.textColor;
                        template = matching_condition.display_template || stat.display_template;
                    }
                    var outstat = getStatFromStatsGroup(statsGroup, stat.display_template, stat.format, stat.decimals);
                    if (outstat !== "Not a valid stat") {
                        return {
                            bgColor: bgColor,
                            output: outstat + "",
                            textColor: textColor
                        };
                    }
                    var output = template;
                    output = output.replace(/\$\{[^}]?default\}/gi, stat.defaultStat || "${first}");
                    output = output.replace(/\$\{[^}]?value\}/gi, isNaN(statsGroup.first)
                        ? statsGroup.first
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.first, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?first\}/gi, isNaN(statsGroup.first)
                        ? statsGroup.first
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.first, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?count\}/gi, isNaN(statsGroup.count)
                        ? statsGroup.count
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.count || 0, "none", "0"));
                    output = output.replace(/\$\{[^}]?length\}/gi, isNaN(statsGroup.count)
                        ? statsGroup.count
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.count || 0, "none", "0"));
                    output = output.replace(/\$\{[^}]?uniquecount\}/gi, isNaN(statsGroup.uniquecount)
                        ? statsGroup.uniquecount
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.uniquecount || 0, "none", "0"));
                    output = output.replace(/\$\{[^}]?uniquelength\}/gi, isNaN(statsGroup.uniquecount)
                        ? statsGroup.uniquecount
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.uniquecount || 0, "none", "0"));
                    output = output.replace(/\$\{[^}]?sum\}/gi, isNaN(statsGroup.sum)
                        ? statsGroup.sum
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.sum, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?total\}/gi, isNaN(statsGroup.sum)
                        ? statsGroup.sum
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.sum, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?mean\}/gi, isNaN(statsGroup.mean)
                        ? statsGroup.mean
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.mean, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?average\}/gi, isNaN(statsGroup.mean)
                        ? statsGroup.mean
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.mean, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?avg\}/gi, isNaN(statsGroup.mean)
                        ? statsGroup.mean
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.mean, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?min\}/gi, isNaN(statsGroup.min)
                        ? statsGroup.min
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.min, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?max\}/gi, isNaN(statsGroup.max)
                        ? statsGroup.max
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.max, stat.format, stat.decimals));
                    output = output.replace(/\$\{[^}]?title\}/gi, stat.title);
                    output = output.replace(/\$\{[^}]?field\}/gi, stat.field);
                    output = output.replace(/\$\{[^}]?bgColor\}/gi, stat.bgColor);
                    output = output.replace(/\$\{[^}]?textColor\}/gi, stat.textColor);
                    return {
                        bgColor: bgColor,
                        output: output,
                        textColor: textColor
                    };
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQSwyQkFBVyxhQUFhLEdBQUcsVUFBUyxLQUFLO2dCQUN2QyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQzlCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7Z0JBQzNCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FB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Q0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLGtCQUFrQixFQUNsQixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHO3dCQUNoQixDQUFDLENBQUMsaUNBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDbkUsQ0FBQztvQkFDRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2xFLE9BQU87d0JBQ0wsT0FBTyxTQUFBO3dCQUNQLE1BQU0sUUFBQTt3QkFDTixTQUFTLFdBQUE7cUJBQ1YsQ0FBQztpQkFDSDtZQUNILENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgZ2V0Rm9ybWF0dGVkT3V0cHV0IH0gZnJvbSBcIi4vR3JhZmFuYVV0aWxzXCI7XHJcbmltcG9ydCB7IGlzTWF0Y2ggfSBmcm9tIFwiLi9NYXRjaFV0aWxzXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5U3RhdCB9IGZyb20gXCIuLi9hcHAvQm9vbVN0YXRcIjtcclxuXHJcbmV4cG9ydCBsZXQgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgbGV0IEZBX1RPS0VOX1BSRUZJWCA9IFwiJHtmYS1cIjtcclxuICBsZXQgRkFfVE9LRU5fU1VGRklYID0gXCJ9XCI7XHJcbiAgbGV0IEZBX0RFTElNSVRFUiA9IFwiLFwiO1xyXG4gIGxldCBJTUdfVE9LRU5fUFJFRklYID0gXCIke2ltZy1cIjtcclxuICBsZXQgSU1HX1RPS0VOX1NVRkZJWCA9IFwifVwiO1xyXG4gIGxldCBJTUdfREVMSU1JVEVSID0gXCIsXCI7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICB2YWx1ZSA9IHZhbHVlXHJcbiAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAubWFwKGEgPT4ge1xyXG4gICAgICBpZiAoYS5zdGFydHNXaXRoKEZBX1RPS0VOX1BSRUZJWCkgJiYgYS5lbmRzV2l0aChGQV9UT0tFTl9TVUZGSVgpKSB7XHJcbiAgICAgICAgbGV0IG15dG9rZW4gPSBhXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFwkL2csIFwiXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFx7L2csIFwiXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFx9L2csIFwiXCIpO1xyXG4gICAgICAgIGxldCBpY29uID0gbXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzBdO1xyXG4gICAgICAgIGxldCBjb2xvciA9XHJcbiAgICAgICAgICBhLmluZGV4T2YoRkFfREVMSU1JVEVSKSA+IC0xXHJcbiAgICAgICAgICAgID8gYCBzdHlsZT1cImNvbG9yOiR7bXl0b2tlbi5zcGxpdChJTUdfREVMSU1JVEVSKVsxXX1cIiBgXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgICAgICBsZXQgcmVwZWF0Q291bnQgPVxyXG4gICAgICAgICAgYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDJcclxuICAgICAgICAgICAgPyArbXl0b2tlbi5zcGxpdChJTUdfREVMSU1JVEVSKVsyXVxyXG4gICAgICAgICAgICA6IDE7XHJcbiAgICAgICAgaWYgKGEuc3BsaXQoRkFfREVMSU1JVEVSKS5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICBsZXQgb3BlcmF0b3IgPSBteXRva2VuLnNwbGl0KElNR19ERUxJTUlURVIpWzNdO1xyXG4gICAgICAgICAgbGV0IF92YWx1ZSA9ICtteXRva2VuLnNwbGl0KElNR19ERUxJTUlURVIpWzRdO1xyXG4gICAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICAgICAgICBjYXNlIFwicGx1c1wiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gcmVwZWF0Q291bnQgKyBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtaW51c1wiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gcmVwZWF0Q291bnQgLSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aXBseVwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChyZXBlYXRDb3VudCAqIF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkaXZpZGVieVwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChyZXBlYXRDb3VudCAvIF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtaW5cIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5taW4oW3JlcGVhdENvdW50LCBfdmFsdWVdKSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5tYXgoW3JlcGVhdENvdW50LCBfdmFsdWVdKSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtZWFuXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKF8ubWVhbihbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICBhLnN0YXJ0c1dpdGgoSU1HX1RPS0VOX1BSRUZJWCkgJiZcclxuICAgICAgICBhLmVuZHNXaXRoKElNR19UT0tFTl9TVUZGSVgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGEgPSBhLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzBdO1xyXG4gICAgICAgIGxldCBpbWdXaWR0aCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgPyBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMV1cclxuICAgICAgICAgICAgOiBcIjIwcHhcIjtcclxuICAgICAgICBsZXQgaW1nSGVpZ2h0ID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gMlxyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsyXVxyXG4gICAgICAgICAgICA6IFwiMjBweFwiO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDNcclxuICAgICAgICAgICAgPyArYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzNdXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChcclxuICAgICAgICAgIHJlcGVhdENvdW50XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRTdGF0RnJvbVN0YXRzR3JvdXAgPSBmdW5jdGlvbihcclxuICBzdGF0c0dyb3VwLFxyXG4gIHN0YXQsXHJcbiAgZm9ybWF0LFxyXG4gIGRlY2ltYWxzXHJcbikge1xyXG4gIHN3aXRjaCAoc3RhdC50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICBjYXNlIFwiZmlyc3RcIjpcclxuICAgIGNhc2UgXCJkZWZhdWx0XCI6XHJcbiAgICBjYXNlIFwidmFsdWVcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgICBjYXNlIFwiY291bnRcIjpcclxuICAgIGNhc2UgXCJsZW5ndGhcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAuY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCwgXCJub25lXCIsIFwiMFwiKTtcclxuICAgIGNhc2UgXCJ1bmlxdWVjb3VudFwiOlxyXG4gICAgY2FzZSBcInVuaXF1ZWxlbmd0aFwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC51bmlxdWVjb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnVuaXF1ZWNvdW50LCBcIm5vbmVcIiwgXCIwXCIpO1xyXG4gICAgY2FzZSBcInN1bVwiOlxyXG4gICAgY2FzZSBcInRvdGFsXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLnN1bSlcclxuICAgICAgICA/IHN0YXRzR3JvdXAuc3VtXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5zdW0sIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gICAgY2FzZSBcIm1lYW5cIjpcclxuICAgIGNhc2UgXCJhdmdcIjpcclxuICAgIGNhc2UgXCJhdmVyYWdlXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLm1lYW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1lYW4sIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gICAgY2FzZSBcIm1pblwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5taW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1pblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWluLCBmb3JtYXQsIGRlY2ltYWxzKTtcclxuICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAubWF4KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tYXhcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1heCwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgfVxyXG4gIHJldHVybiBcIk5vdCBhIHZhbGlkIHN0YXRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgYnVpbGRPdXRwdXQgPSBmdW5jdGlvbihzdGF0V2lkdGgsIG91dHB1dCwgYmdDb2xvciwgdGV4dENvbG9yKSB7XHJcbiAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6JHtzdGF0V2lkdGggfHxcclxuICAgIFwiMTAwXCJ9JTtmbG9hdDpsZWZ0O2JhY2tncm91bmQ6JHtiZ0NvbG9yfTtjb2xvcjoke3RleHRDb2xvcn07XCI+XHJcbiAgICAke291dHB1dH1cclxuICA8L2Rpdj5gO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRNYXRjaGluZ0NvbmRpdGlvbiA9IGZ1bmN0aW9uKHN0YXRzR3JvdXAsIHN0YXQpIHtcclxuICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9uID0gXy5maXJzdChcclxuICAgIHN0YXQuY29uZGl0aW9uYWxfZm9ybWF0cy5maWx0ZXIoY29uZGl0aW9uID0+IHtcclxuICAgICAgbGV0IG9yaWdpbmFsX3ZhbHVlID0gZ2V0U3RhdEZyb21TdGF0c0dyb3VwKFxyXG4gICAgICAgIHN0YXRzR3JvdXAsXHJcbiAgICAgICAgKGNvbmRpdGlvbi5maWVsZCB8fCBcIiR7dmFsdWV9XCIpLnJlcGxhY2UoXCIke1wiLCBcIlwiKS5yZXBsYWNlKFwifVwiLCBcIlwiKSxcclxuICAgICAgICBzdGF0LmZvcm1hdCxcclxuICAgICAgICBzdGF0LmRlY2ltYWxzXHJcbiAgICAgICk7XHJcbiAgICAgIGxldCBvcGVyYXRvciA9IGNvbmRpdGlvbi5vcGVyYXRvcjtcclxuICAgICAgbGV0IGNvbXBhcmVfdmFsdWUxID0gY29uZGl0aW9uLnZhbHVlO1xyXG4gICAgICBsZXQgY29tcGFyZV92YWx1ZTIgPSBjb25kaXRpb24udmFsdWUyO1xyXG4gICAgICByZXR1cm4gaXNNYXRjaChvcmlnaW5hbF92YWx1ZSwgb3BlcmF0b3IsIGNvbXBhcmVfdmFsdWUxLCBjb21wYXJlX3ZhbHVlMik7XHJcbiAgICB9KVxyXG4gICk7XHJcbiAgcmV0dXJuIG1hdGNoaW5nX2NvbmRpdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0T3V0cHV0VmFsdWUgPSBmdW5jdGlvbihtYXN0ZXJkYXRhLCBzdGF0OiBCb29tU3VtbWFyeVN0YXQpIHtcclxuICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJnQ29sb3I6IFwiXCIsXHJcbiAgICAgIG91dHB1dDogXCJObyBkYXRhXCIsXHJcbiAgICAgIHRleHRDb2xvcjogXCJyZWRcIlxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IG15c3RhdHM6IGFueSA9IHN0YXQuZ2V0VmFsdWVzKG1hc3RlcmRhdGEpO1xyXG4gICAgbGV0IHN0YXRzR3JvdXAgPSBzdGF0LmdldFN0YXRzKG15c3RhdHMpO1xyXG4gICAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IGdldE1hdGNoaW5nQ29uZGl0aW9uKHN0YXRzR3JvdXAsIHN0YXQpO1xyXG4gICAgbGV0IGJnQ29sb3IgPSBzdGF0LmJnQ29sb3I7XHJcbiAgICBsZXQgdGV4dENvbG9yID0gc3RhdC50ZXh0Q29sb3I7XHJcbiAgICBsZXQgdGVtcGxhdGUgPSBzdGF0LmRpc3BsYXlfdGVtcGxhdGU7XHJcbiAgICBpZiAobWF0Y2hpbmdfY29uZGl0aW9uKSB7XHJcbiAgICAgIGJnQ29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvciB8fCBzdGF0LmJnQ29sb3I7XHJcbiAgICAgIHRleHRDb2xvciA9IG1hdGNoaW5nX2NvbmRpdGlvbi50ZXh0Q29sb3IgfHwgc3RhdC50ZXh0Q29sb3I7XHJcbiAgICAgIHRlbXBsYXRlID0gbWF0Y2hpbmdfY29uZGl0aW9uLmRpc3BsYXlfdGVtcGxhdGUgfHwgc3RhdC5kaXNwbGF5X3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgbGV0IG91dHN0YXQgPSBnZXRTdGF0RnJvbVN0YXRzR3JvdXAoXHJcbiAgICAgIHN0YXRzR3JvdXAsXHJcbiAgICAgIHN0YXQuZGlzcGxheV90ZW1wbGF0ZSxcclxuICAgICAgc3RhdC5mb3JtYXQsXHJcbiAgICAgIHN0YXQuZGVjaW1hbHNcclxuICAgICk7XHJcbiAgICBpZiAob3V0c3RhdCAhPT0gXCJOb3QgYSB2YWxpZCBzdGF0XCIpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBiZ0NvbG9yOiBiZ0NvbG9yLFxyXG4gICAgICAgIG91dHB1dDogb3V0c3RhdCArIFwiXCIsXHJcbiAgICAgICAgdGV4dENvbG9yOiB0ZXh0Q29sb3JcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGxldCBvdXRwdXQgPSB0ZW1wbGF0ZTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9kZWZhdWx0XFx9L2dpLFxyXG4gICAgICBzdGF0LmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIlxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT92YWx1ZVxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5maXJzdClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmZpcnN0LCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/Zmlyc3RcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2NvdW50XFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLmNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5jb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9sZW5ndGhcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3VuaXF1ZWNvdW50XFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLnVuaXF1ZWNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC51bmlxdWVjb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAudW5pcXVlY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT91bmlxdWVsZW5ndGhcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAudW5pcXVlY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnVuaXF1ZWNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC51bmlxdWVjb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3N1bVxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5zdW0pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnN1bVxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuc3VtLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/dG90YWxcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuc3VtKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5zdW1cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnN1bSwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP21lYW5cXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2F2ZXJhZ2VcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2F2Z1xcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5tZWFuKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tZWFuXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/bWluXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLm1pbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWluXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5taW4sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9tYXhcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWF4KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tYXhcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1heCwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/dGl0bGVcXH0vZ2ksIHN0YXQudGl0bGUpO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/ZmllbGRcXH0vZ2ksIHN0YXQuZmllbGQpO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/YmdDb2xvclxcfS9naSwgc3RhdC5iZ0NvbG9yKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP3RleHRDb2xvclxcfS9naSwgc3RhdC50ZXh0Q29sb3IpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYmdDb2xvcixcclxuICAgICAgb3V0cHV0LFxyXG4gICAgICB0ZXh0Q29sb3JcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG4iXX0=