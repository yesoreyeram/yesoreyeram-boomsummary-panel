System.register(["lodash", "./MatchUtils"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, MatchUtils_1, replaceTokens, getStatFromStatsGroup, buildOutput, getMatchingCondition, getOutputValue;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
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
            exports_1("getStatFromStatsGroup", getStatFromStatsGroup = function (statsGroup, statName) {
                statName = statName
                    .toLowerCase()
                    .trim()
                    .replace("${", "")
                    .replace("}", "");
                return statsGroup[statName] || null;
            });
            exports_1("buildOutput", buildOutput = function (statWidth, output, bgColor, textColor) {
                return "<div style=\"width:" + (statWidth ||
                    "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\">\n    " + output + "\n  </div>";
            });
            exports_1("getMatchingCondition", getMatchingCondition = function (statsGroup, stat) {
                var matching_condition = lodash_1.default.first(stat.conditional_formats.filter(function (condition) {
                    var original_statName = (condition.field || "${value}")
                        .replace("${", "")
                        .replace("}", "");
                    var original_value = getStatFromStatsGroup(statsGroup, original_statName);
                    return MatchUtils_1.isMatch(original_value, condition.operator, condition.value, condition.valu2);
                }));
                return matching_condition;
            });
            exports_1("getOutputValue", getOutputValue = function (masterdata, stat) {
                if (masterdata.length === 0) {
                    return "<div style='text-align:center;'>No Data</div>";
                }
                else {
                    var mystats = stat.getValues(masterdata);
                    var statsGroup = stat.getStats(mystats);
                    var matching_condition = getMatchingCondition(statsGroup, stat);
                    var bgColor = matching_condition && matching_condition.bgColor
                        ? matching_condition.bgColor
                        : stat.bgColor;
                    var textColor = matching_condition && matching_condition.textColor
                        ? matching_condition.textColor
                        : stat.textColor;
                    var template = matching_condition && matching_condition.display_template
                        ? matching_condition.display_template
                        : stat.display_template;
                    var template_replaced1 = replaceTokens(stat.getTemplateWithTokensReplaced(template, statsGroup));
                    return buildOutput(stat.statWidth, template_replaced1, bgColor, textColor);
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJQSwyQkFBVyxhQUFhLEdBQUcsVUFBUyxLQUFLO2dCQUN2QyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQzlCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7Z0JBQzNCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxvQkFBaUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBSTs0QkFDdEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLFdBQVcsR0FDYixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUM5QixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0MsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5QyxRQUFRLFFBQVEsRUFBRTtnQ0FDaEIsS0FBSyxNQUFNO29DQUNULFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO29DQUNuQyxNQUFNO2dDQUNSLEtBQUssT0FBTztvQ0FDVixXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQztvQ0FDbkMsTUFBTTtnQ0FDUixLQUFLLFVBQVU7b0NBQ2IsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29DQUMvQyxNQUFNO2dDQUNSLEtBQUssVUFBVTtvQ0FDYixXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7b0NBQy9DLE1BQU07Z0NBQ1IsS0FBSyxLQUFLO29DQUNSLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDdkQsTUFBTTtnQ0FDUixLQUFLLEtBQUs7b0NBQ1IsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN2RCxNQUFNO2dDQUNSLEtBQUssTUFBTTtvQ0FDVCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3hELE1BQU07NkJBQ1Q7eUJBQ0Y7d0JBQ0QsQ0FBQyxHQUFHLENBQUEsbUJBQWdCLElBQUksV0FBSyxLQUFLLFdBQVEsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDaEU7eUJBQU0sSUFDTCxDQUFDLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO3dCQUM5QixDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQzVCO3dCQUNBLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckUsSUFBSSxRQUFRLEdBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs0QkFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekQsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDYixJQUFJLFNBQVMsR0FDWCxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUMvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6RCxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUNiLElBQUksV0FBVyxHQUNiLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7NEJBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDUixDQUFDLEdBQUcsQ0FBQSxrQkFBZSxRQUFRLG9CQUFhLFNBQVMsaUJBQVUsTUFBTSxTQUFLLENBQUEsQ0FBQyxNQUFNLENBQzNFLFdBQVcsQ0FDWixDQUFDO3FCQUNIO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLEVBQUM7WUFFRixtQ0FBVyxxQkFBcUIsR0FBRyxVQUFTLFVBQVUsRUFBRSxRQUFRO2dCQUM5RCxRQUFRLEdBQUcsUUFBUTtxQkFDaEIsV0FBVyxFQUFFO3FCQUNiLElBQUksRUFBRTtxQkFDTixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztxQkFDakIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDO1lBQ3RDLENBQUMsRUFBQztZQUVGLHlCQUFXLFdBQVcsR0FBRyxVQUFTLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVM7Z0JBQ3JFLE9BQU8seUJBQXFCLFNBQVM7b0JBQ25DLEtBQUssaUNBQTJCLE9BQU8sZUFBVSxTQUFTLGtCQUN4RCxNQUFNLGVBQ0gsQ0FBQztZQUNWLENBQUMsRUFBQztZQUVGLGtDQUFXLG9CQUFvQixHQUFHLFVBQVMsVUFBVSxFQUFFLElBQUk7Z0JBQ3pELElBQUksa0JBQWtCLEdBQUcsZ0JBQUMsQ0FBQyxLQUFLLENBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTO29CQUN2QyxJQUFJLGlCQUFpQixHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUM7eUJBQ3BELE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO3lCQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwQixJQUFJLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDMUUsT0FBTyxvQkFBTyxDQUNaLGNBQWMsRUFDZCxTQUFTLENBQUMsUUFBUSxFQUNsQixTQUFTLENBQUMsS0FBSyxFQUNmLFNBQVMsQ0FBQyxLQUFLLENBQ2hCLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztnQkFDRixPQUFPLGtCQUFrQixDQUFDO1lBQzVCLENBQUMsRUFBQztZQUVGLDRCQUFXLGNBQWMsR0FBRyxVQUFTLFVBQVUsRUFBRSxJQUFxQjtnQkFDcEUsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDM0IsT0FBTywrQ0FBK0MsQ0FBQztpQkFDeEQ7cUJBQU07b0JBQ0wsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hFLElBQUksT0FBTyxHQUNULGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLE9BQU87d0JBQzlDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPO3dCQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDbkIsSUFBSSxTQUFTLEdBQ1gsa0JBQWtCLElBQUksa0JBQWtCLENBQUMsU0FBUzt3QkFDaEQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFNBQVM7d0JBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNyQixJQUFJLFFBQVEsR0FDVixrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxnQkFBZ0I7d0JBQ3ZELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0I7d0JBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7b0JBQzVCLElBQUksa0JBQWtCLEdBQUcsYUFBYSxDQUNwQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUN6RCxDQUFDO29CQUNGLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUM1RTtZQUNILENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgaXNNYXRjaCB9IGZyb20gXCIuL01hdGNoVXRpbHNcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlTdGF0IH0gZnJvbSBcIi4uL2FwcC9Cb29tU3RhdFwiO1xyXG5cclxuZXhwb3J0IGxldCByZXBsYWNlVG9rZW5zID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICBsZXQgRkFfVE9LRU5fUFJFRklYID0gXCIke2ZhLVwiO1xyXG4gIGxldCBGQV9UT0tFTl9TVUZGSVggPSBcIn1cIjtcclxuICBsZXQgRkFfREVMSU1JVEVSID0gXCIsXCI7XHJcbiAgbGV0IElNR19UT0tFTl9QUkVGSVggPSBcIiR7aW1nLVwiO1xyXG4gIGxldCBJTUdfVE9LRU5fU1VGRklYID0gXCJ9XCI7XHJcbiAgbGV0IElNR19ERUxJTUlURVIgPSBcIixcIjtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gIHZhbHVlID0gdmFsdWVcclxuICAgIC5zcGxpdChcIiBcIilcclxuICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgIGlmIChhLnN0YXJ0c1dpdGgoRkFfVE9LRU5fUFJFRklYKSAmJiBhLmVuZHNXaXRoKEZBX1RPS0VOX1NVRkZJWCkpIHtcclxuICAgICAgICBsZXQgbXl0b2tlbiA9IGFcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXCQvZywgXCJcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXHsvZywgXCJcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXH0vZywgXCJcIik7XHJcbiAgICAgICAgbGV0IGljb24gPSBteXRva2VuLnNwbGl0KEZBX0RFTElNSVRFUilbMF07XHJcbiAgICAgICAgbGV0IGNvbG9yID1cclxuICAgICAgICAgIGEuaW5kZXhPZihGQV9ERUxJTUlURVIpID4gLTFcclxuICAgICAgICAgICAgPyBgIHN0eWxlPVwiY29sb3I6JHtteXRva2VuLnNwbGl0KElNR19ERUxJTUlURVIpWzFdfVwiIGBcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XHJcbiAgICAgICAgICBhLnNwbGl0KEZBX0RFTElNSVRFUikubGVuZ3RoID4gMlxyXG4gICAgICAgICAgICA/ICtteXRva2VuLnNwbGl0KElNR19ERUxJTUlURVIpWzJdXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBpZiAoYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgIGxldCBvcGVyYXRvciA9IG15dG9rZW4uc3BsaXQoSU1HX0RFTElNSVRFUilbM107XHJcbiAgICAgICAgICBsZXQgX3ZhbHVlID0gK215dG9rZW4uc3BsaXQoSU1HX0RFTElNSVRFUilbNF07XHJcbiAgICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbHVzXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCArIF92YWx1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pbnVzXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCAtIF92YWx1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm11bHRpcGx5XCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50ICogX3ZhbHVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRpdmlkZWJ5XCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50IC8gX3ZhbHVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pblwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1pbihbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1heFwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1heChbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1lYW5cIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5tZWFuKFtyZXBlYXRDb3VudCwgX3ZhbHVlXSkpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGEuc3RhcnRzV2l0aChJTUdfVE9LRU5fUFJFRklYKSAmJlxyXG4gICAgICAgIGEuZW5kc1dpdGgoSU1HX1RPS0VOX1NVRkZJWClcclxuICAgICAgKSB7XHJcbiAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMF07XHJcbiAgICAgICAgbGV0IGltZ1dpZHRoID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsxXVxyXG4gICAgICAgICAgICA6IFwiMjBweFwiO1xyXG4gICAgICAgIGxldCBpbWdIZWlnaHQgPVxyXG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAyXHJcbiAgICAgICAgICAgID8gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzJdXHJcbiAgICAgICAgICAgIDogXCIyMHB4XCI7XHJcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gM1xyXG4gICAgICAgICAgICA/ICthLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbM11cclxuICAgICAgICAgICAgOiAxO1xyXG4gICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KFxyXG4gICAgICAgICAgcmVwZWF0Q291bnRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGdldFN0YXRGcm9tU3RhdHNHcm91cCA9IGZ1bmN0aW9uKHN0YXRzR3JvdXAsIHN0YXROYW1lKSB7XHJcbiAgc3RhdE5hbWUgPSBzdGF0TmFtZVxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC50cmltKClcclxuICAgIC5yZXBsYWNlKFwiJHtcIiwgXCJcIilcclxuICAgIC5yZXBsYWNlKFwifVwiLCBcIlwiKTtcclxuICByZXR1cm4gc3RhdHNHcm91cFtzdGF0TmFtZV0gfHwgbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgYnVpbGRPdXRwdXQgPSBmdW5jdGlvbihzdGF0V2lkdGgsIG91dHB1dCwgYmdDb2xvciwgdGV4dENvbG9yKSB7XHJcbiAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6JHtzdGF0V2lkdGggfHxcclxuICAgIFwiMTAwXCJ9JTtmbG9hdDpsZWZ0O2JhY2tncm91bmQ6JHtiZ0NvbG9yfTtjb2xvcjoke3RleHRDb2xvcn07XCI+XHJcbiAgICAke291dHB1dH1cclxuICA8L2Rpdj5gO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRNYXRjaGluZ0NvbmRpdGlvbiA9IGZ1bmN0aW9uKHN0YXRzR3JvdXAsIHN0YXQpIHtcclxuICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9uID0gXy5maXJzdChcclxuICAgIHN0YXQuY29uZGl0aW9uYWxfZm9ybWF0cy5maWx0ZXIoY29uZGl0aW9uID0+IHtcclxuICAgICAgbGV0IG9yaWdpbmFsX3N0YXROYW1lID0gKGNvbmRpdGlvbi5maWVsZCB8fCBcIiR7dmFsdWV9XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoXCIke1wiLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlKFwifVwiLCBcIlwiKTtcclxuICAgICAgbGV0IG9yaWdpbmFsX3ZhbHVlID0gZ2V0U3RhdEZyb21TdGF0c0dyb3VwKHN0YXRzR3JvdXAsIG9yaWdpbmFsX3N0YXROYW1lKTtcclxuICAgICAgcmV0dXJuIGlzTWF0Y2goXHJcbiAgICAgICAgb3JpZ2luYWxfdmFsdWUsXHJcbiAgICAgICAgY29uZGl0aW9uLm9wZXJhdG9yLFxyXG4gICAgICAgIGNvbmRpdGlvbi52YWx1ZSxcclxuICAgICAgICBjb25kaXRpb24udmFsdTJcclxuICAgICAgKTtcclxuICAgIH0pXHJcbiAgKTtcclxuICByZXR1cm4gbWF0Y2hpbmdfY29uZGl0aW9uO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRPdXRwdXRWYWx1ZSA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEsIHN0YXQ6IEJvb21TdW1tYXJ5U3RhdCkge1xyXG4gIGlmIChtYXN0ZXJkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7Jz5ObyBEYXRhPC9kaXY+XCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBteXN0YXRzOiBhbnkgPSBzdGF0LmdldFZhbHVlcyhtYXN0ZXJkYXRhKTtcclxuICAgIGxldCBzdGF0c0dyb3VwID0gc3RhdC5nZXRTdGF0cyhteXN0YXRzKTtcclxuICAgIGxldCBtYXRjaGluZ19jb25kaXRpb24gPSBnZXRNYXRjaGluZ0NvbmRpdGlvbihzdGF0c0dyb3VwLCBzdGF0KTtcclxuICAgIGxldCBiZ0NvbG9yID1cclxuICAgICAgbWF0Y2hpbmdfY29uZGl0aW9uICYmIG1hdGNoaW5nX2NvbmRpdGlvbi5iZ0NvbG9yXHJcbiAgICAgICAgPyBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvclxyXG4gICAgICAgIDogc3RhdC5iZ0NvbG9yO1xyXG4gICAgbGV0IHRleHRDb2xvciA9XHJcbiAgICAgIG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24udGV4dENvbG9yXHJcbiAgICAgICAgPyBtYXRjaGluZ19jb25kaXRpb24udGV4dENvbG9yXHJcbiAgICAgICAgOiBzdGF0LnRleHRDb2xvcjtcclxuICAgIGxldCB0ZW1wbGF0ZSA9XHJcbiAgICAgIG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uZGlzcGxheV90ZW1wbGF0ZVxyXG4gICAgICAgID8gbWF0Y2hpbmdfY29uZGl0aW9uLmRpc3BsYXlfdGVtcGxhdGVcclxuICAgICAgICA6IHN0YXQuZGlzcGxheV90ZW1wbGF0ZTtcclxuICAgIGxldCB0ZW1wbGF0ZV9yZXBsYWNlZDEgPSByZXBsYWNlVG9rZW5zKFxyXG4gICAgICBzdGF0LmdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkKHRlbXBsYXRlLCBzdGF0c0dyb3VwKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBidWlsZE91dHB1dChzdGF0LnN0YXRXaWR0aCwgdGVtcGxhdGVfcmVwbGFjZWQxLCBiZ0NvbG9yLCB0ZXh0Q29sb3IpO1xyXG4gIH1cclxufTtcclxuIl19