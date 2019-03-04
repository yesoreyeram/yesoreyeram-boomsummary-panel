System.register(["lodash", "./GrafanaUtils", "./MatchUtils"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, GrafanaUtils_1, MatchUtils_1, replaceTokens, getStatFromStatsGroup, buildMasterData, buildOutput, didSatisfyFilters, getStatsGroup, getValues, getMatchingCondition, getOutputValue;
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
            exports_1("buildMasterData", buildMasterData = function (data) {
                var distributed_masterdata = [];
                lodash_1.default.each(data, function (d) {
                    if (d.type === "table") {
                        var refId_1 = d.refId;
                        lodash_1.default.each(d.rows, function (row, i) {
                            lodash_1.default.each(row, function (col, j) {
                                var mydata = {
                                    colname: d.columns[j].text,
                                    group_id: refId_1 + "###" + i,
                                    refId: refId_1,
                                    rowid: i,
                                    value: col
                                };
                                distributed_masterdata.push(mydata);
                            });
                        });
                    }
                });
                return lodash_1.default.groupBy(distributed_masterdata, "group_id");
            });
            exports_1("buildOutput", buildOutput = function (statWidth, output, bgColor, textColor) {
                return "<div style=\"width:" + (statWidth ||
                    "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\">\n    " + output + "\n  </div>";
            });
            exports_1("didSatisfyFilters", didSatisfyFilters = function (group, filters) {
                if (filters && filters.length > 0) {
                    var matches_1 = 0;
                    lodash_1.default.each(filters, function (filter) {
                        var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === filter.field; });
                        if (matching_field && matching_field.length > 0) {
                            matches_1 +=
                                MatchUtils_1.isMatch(matching_field[0].value, filter.operator, filter.value, filter.value2) === true
                                    ? 1
                                    : 0;
                        }
                    });
                    return matches_1 === filters.length;
                }
                else {
                    return true;
                }
            });
            exports_1("getStatsGroup", getStatsGroup = function (mystats) {
                var statsgroup = {};
                statsgroup.count = mystats.length;
                statsgroup.uniquecount = lodash_1.default.uniq(mystats).length;
                statsgroup.sum = lodash_1.default.sum(mystats.map(function (s) { return +s; }));
                statsgroup.mean = lodash_1.default.mean(mystats.map(function (s) { return +s; }));
                statsgroup.min = lodash_1.default.min(mystats.map(function (s) { return +s; }));
                statsgroup.max = lodash_1.default.max(mystats.map(function (s) { return +s; }));
                statsgroup.first = lodash_1.default.first(mystats);
                return statsgroup;
            });
            exports_1("getValues", getValues = function (masterdata, stat) {
                var mystats = [];
                lodash_1.default.each(masterdata, function (group) {
                    var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === stat.field; });
                    if (matching_field.length > 0 && didSatisfyFilters(group, stat.filters)) {
                        mystats.push(lodash_1.default.first(matching_field).value);
                    }
                });
                return mystats;
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
                    var mystats = getValues(masterdata, stat);
                    var statsGroup = getStatsGroup(mystats);
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
                    output = output.replace(/\$\{[^}]?default\}/gi, isNaN(statsGroup.first)
                        ? statsGroup.first
                        : GrafanaUtils_1.getFormattedOutput(statsGroup.first, stat.format, stat.decimals));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQSwyQkFBVyxhQUFhLEdBQUcsVUFBUyxLQUFLO2dCQUN2QyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQzlCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7Z0JBQzNCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FB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QztvQkFDRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDckIsa0JBQWtCLEVBQ2xCLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO3dCQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUc7d0JBQ2hCLENBQUMsQ0FBQyxpQ0FBa0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNuRSxDQUFDO29CQUNGLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbEUsT0FBTzt3QkFDTCxPQUFPLFNBQUE7d0JBQ1AsTUFBTSxRQUFBO3dCQUNOLFNBQVMsV0FBQTtxQkFDVixDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBnZXRGb3JtYXR0ZWRPdXRwdXQgfSBmcm9tIFwiLi9HcmFmYW5hVXRpbHNcIjtcclxuaW1wb3J0IHsgaXNNYXRjaCB9IGZyb20gXCIuL01hdGNoVXRpbHNcIjtcclxuXHJcbmV4cG9ydCBsZXQgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgbGV0IEZBX1RPS0VOX1BSRUZJWCA9IFwiJHtmYS1cIjtcclxuICBsZXQgRkFfVE9LRU5fU1VGRklYID0gXCJ9XCI7XHJcbiAgbGV0IEZBX0RFTElNSVRFUiA9IFwiLFwiO1xyXG4gIGxldCBJTUdfVE9LRU5fUFJFRklYID0gXCIke2ltZy1cIjtcclxuICBsZXQgSU1HX1RPS0VOX1NVRkZJWCA9IFwifVwiO1xyXG4gIGxldCBJTUdfREVMSU1JVEVSID0gXCIsXCI7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICB2YWx1ZSA9IHZhbHVlXHJcbiAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAubWFwKGEgPT4ge1xyXG4gICAgICBpZiAoYS5zdGFydHNXaXRoKEZBX1RPS0VOX1BSRUZJWCkgJiYgYS5lbmRzV2l0aChGQV9UT0tFTl9TVUZGSVgpKSB7XHJcbiAgICAgICAgbGV0IG15dG9rZW4gPSBhXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFwkL2csIFwiXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFx7L2csIFwiXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFx9L2csIFwiXCIpO1xyXG4gICAgICAgIGxldCBpY29uID0gbXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzBdO1xyXG4gICAgICAgIGxldCBjb2xvciA9XHJcbiAgICAgICAgICBhLmluZGV4T2YoRkFfREVMSU1JVEVSKSA+IC0xXHJcbiAgICAgICAgICAgID8gYCBzdHlsZT1cImNvbG9yOiR7bXl0b2tlbi5zcGxpdChJTUdfREVMSU1JVEVSKVsxXX1cIiBgXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgICAgICBsZXQgcmVwZWF0Q291bnQgPVxyXG4gICAgICAgICAgYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDJcclxuICAgICAgICAgICAgPyArbXl0b2tlbi5zcGxpdChJTUdfREVMSU1JVEVSKVsyXVxyXG4gICAgICAgICAgICA6IDE7XHJcbiAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICBhLnN0YXJ0c1dpdGgoSU1HX1RPS0VOX1BSRUZJWCkgJiZcclxuICAgICAgICBhLmVuZHNXaXRoKElNR19UT0tFTl9TVUZGSVgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGEgPSBhLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzBdO1xyXG4gICAgICAgIGxldCBpbWdXaWR0aCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgPyBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMV1cclxuICAgICAgICAgICAgOiBcIjIwcHhcIjtcclxuICAgICAgICBsZXQgaW1nSGVpZ2h0ID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gMlxyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsyXVxyXG4gICAgICAgICAgICA6IFwiMjBweFwiO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDNcclxuICAgICAgICAgICAgPyArYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzNdXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChcclxuICAgICAgICAgIHJlcGVhdENvdW50XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRTdGF0RnJvbVN0YXRzR3JvdXAgPSBmdW5jdGlvbihcclxuICBzdGF0c0dyb3VwLFxyXG4gIHN0YXQsXHJcbiAgZm9ybWF0LFxyXG4gIGRlY2ltYWxzXHJcbikge1xyXG4gIHN3aXRjaCAoc3RhdC50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICBjYXNlIFwiZmlyc3RcIjpcclxuICAgIGNhc2UgXCJkZWZhdWx0XCI6XHJcbiAgICBjYXNlIFwidmFsdWVcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgICBjYXNlIFwiY291bnRcIjpcclxuICAgIGNhc2UgXCJsZW5ndGhcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAuY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCwgXCJub25lXCIsIFwiMFwiKTtcclxuICAgIGNhc2UgXCJ1bmlxdWVjb3VudFwiOlxyXG4gICAgY2FzZSBcInVuaXF1ZWxlbmd0aFwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC51bmlxdWVjb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnVuaXF1ZWNvdW50LCBcIm5vbmVcIiwgXCIwXCIpO1xyXG4gICAgY2FzZSBcInN1bVwiOlxyXG4gICAgY2FzZSBcInRvdGFsXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLnN1bSlcclxuICAgICAgICA/IHN0YXRzR3JvdXAuc3VtXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5zdW0sIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gICAgY2FzZSBcIm1lYW5cIjpcclxuICAgIGNhc2UgXCJhdmdcIjpcclxuICAgIGNhc2UgXCJhdmVyYWdlXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLm1lYW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1lYW4sIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gICAgY2FzZSBcIm1pblwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5taW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1pblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWluLCBmb3JtYXQsIGRlY2ltYWxzKTtcclxuICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAubWF4KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tYXhcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1heCwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgfVxyXG4gIHJldHVybiBcIk5vdCBhIHZhbGlkIHN0YXRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgYnVpbGRNYXN0ZXJEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gIGxldCBkaXN0cmlidXRlZF9tYXN0ZXJkYXRhOiBhbnkgPSBbXTtcclxuICBfLmVhY2goZGF0YSwgZCA9PiB7XHJcbiAgICBpZiAoZC50eXBlID09PSBcInRhYmxlXCIpIHtcclxuICAgICAgbGV0IHJlZklkID0gZC5yZWZJZDtcclxuICAgICAgXy5lYWNoKGQucm93cywgKHJvdywgaSkgPT4ge1xyXG4gICAgICAgIF8uZWFjaChyb3csIChjb2wsIGopID0+IHtcclxuICAgICAgICAgIGxldCBteWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGNvbG5hbWU6IGQuY29sdW1uc1tqXS50ZXh0LFxyXG4gICAgICAgICAgICBncm91cF9pZDogcmVmSWQgKyBcIiMjI1wiICsgaSxcclxuICAgICAgICAgICAgcmVmSWQsXHJcbiAgICAgICAgICAgIHJvd2lkOiBpLFxyXG4gICAgICAgICAgICB2YWx1ZTogY29sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgZGlzdHJpYnV0ZWRfbWFzdGVyZGF0YS5wdXNoKG15ZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBfLmdyb3VwQnkoZGlzdHJpYnV0ZWRfbWFzdGVyZGF0YSwgXCJncm91cF9pZFwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgYnVpbGRPdXRwdXQgPSBmdW5jdGlvbihzdGF0V2lkdGgsIG91dHB1dCwgYmdDb2xvciwgdGV4dENvbG9yKSB7XHJcbiAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6JHtzdGF0V2lkdGggfHxcclxuICAgIFwiMTAwXCJ9JTtmbG9hdDpsZWZ0O2JhY2tncm91bmQ6JHtiZ0NvbG9yfTtjb2xvcjoke3RleHRDb2xvcn07XCI+XHJcbiAgICAke291dHB1dH1cclxuICA8L2Rpdj5gO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBkaWRTYXRpc2Z5RmlsdGVycyA9IGZ1bmN0aW9uKGdyb3VwLCBmaWx0ZXJzKSB7XHJcbiAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICBsZXQgbWF0Y2hlcyA9IDA7XHJcbiAgICBfLmVhY2goZmlsdGVycywgZmlsdGVyID0+IHtcclxuICAgICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBmaWx0ZXIuZmllbGQpO1xyXG4gICAgICBpZiAobWF0Y2hpbmdfZmllbGQgJiYgbWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIG1hdGNoZXMgKz1cclxuICAgICAgICAgIGlzTWF0Y2goXHJcbiAgICAgICAgICAgIG1hdGNoaW5nX2ZpZWxkWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICBmaWx0ZXIub3BlcmF0b3IsXHJcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSxcclxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlMlxyXG4gICAgICAgICAgKSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICA/IDFcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaGVzID09PSBmaWx0ZXJzLmxlbmd0aDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRTdGF0c0dyb3VwID0gZnVuY3Rpb24obXlzdGF0cykge1xyXG4gIGxldCBzdGF0c2dyb3VwOiBhbnkgPSB7fTtcclxuICBzdGF0c2dyb3VwLmNvdW50ID0gbXlzdGF0cy5sZW5ndGg7XHJcbiAgc3RhdHNncm91cC51bmlxdWVjb3VudCA9IF8udW5pcShteXN0YXRzKS5sZW5ndGg7XHJcbiAgc3RhdHNncm91cC5zdW0gPSBfLnN1bShteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5tZWFuID0gXy5tZWFuKG15c3RhdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLm1pbiA9IF8ubWluKG15c3RhdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLm1heCA9IF8ubWF4KG15c3RhdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLmZpcnN0ID0gXy5maXJzdChteXN0YXRzKTtcclxuICByZXR1cm4gc3RhdHNncm91cDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0VmFsdWVzID0gZnVuY3Rpb24obWFzdGVyZGF0YSwgc3RhdCkge1xyXG4gIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICBfLmVhY2gobWFzdGVyZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBzdGF0LmZpZWxkKTtcclxuICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwICYmIGRpZFNhdGlzZnlGaWx0ZXJzKGdyb3VwLCBzdGF0LmZpbHRlcnMpKSB7XHJcbiAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG15c3RhdHM7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGdldE1hdGNoaW5nQ29uZGl0aW9uID0gZnVuY3Rpb24oc3RhdHNHcm91cCwgc3RhdCkge1xyXG4gIGxldCBtYXRjaGluZ19jb25kaXRpb24gPSBfLmZpcnN0KFxyXG4gICAgc3RhdC5jb25kaXRpb25hbF9mb3JtYXRzLmZpbHRlcihjb25kaXRpb24gPT4ge1xyXG4gICAgICBsZXQgb3JpZ2luYWxfdmFsdWUgPSBnZXRTdGF0RnJvbVN0YXRzR3JvdXAoXHJcbiAgICAgICAgc3RhdHNHcm91cCxcclxuICAgICAgICAoY29uZGl0aW9uLmZpZWxkIHx8IFwiJHt2YWx1ZX1cIikucmVwbGFjZShcIiR7XCIsIFwiXCIpLnJlcGxhY2UoXCJ9XCIsIFwiXCIpLFxyXG4gICAgICAgIHN0YXQuZm9ybWF0LFxyXG4gICAgICAgIHN0YXQuZGVjaW1hbHNcclxuICAgICAgKTtcclxuICAgICAgbGV0IG9wZXJhdG9yID0gY29uZGl0aW9uLm9wZXJhdG9yO1xyXG4gICAgICBsZXQgY29tcGFyZV92YWx1ZTEgPSBjb25kaXRpb24udmFsdWU7XHJcbiAgICAgIGxldCBjb21wYXJlX3ZhbHVlMiA9IGNvbmRpdGlvbi52YWx1ZTI7XHJcbiAgICAgIHJldHVybiBpc01hdGNoKG9yaWdpbmFsX3ZhbHVlLCBvcGVyYXRvciwgY29tcGFyZV92YWx1ZTEsIGNvbXBhcmVfdmFsdWUyKTtcclxuICAgIH0pXHJcbiAgKTtcclxuICByZXR1cm4gbWF0Y2hpbmdfY29uZGl0aW9uO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRPdXRwdXRWYWx1ZSA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEsIHN0YXQpIHtcclxuICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJnQ29sb3I6IFwiXCIsXHJcbiAgICAgIG91dHB1dDogXCJObyBkYXRhXCIsXHJcbiAgICAgIHRleHRDb2xvcjogXCJyZWRcIlxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IG15c3RhdHM6IGFueSA9IGdldFZhbHVlcyhtYXN0ZXJkYXRhLCBzdGF0KTtcclxuICAgIGxldCBzdGF0c0dyb3VwID0gZ2V0U3RhdHNHcm91cChteXN0YXRzKTtcclxuICAgIGxldCBtYXRjaGluZ19jb25kaXRpb24gPSBnZXRNYXRjaGluZ0NvbmRpdGlvbihzdGF0c0dyb3VwLCBzdGF0KTtcclxuICAgIGxldCBiZ0NvbG9yID0gc3RhdC5iZ0NvbG9yO1xyXG4gICAgbGV0IHRleHRDb2xvciA9IHN0YXQudGV4dENvbG9yO1xyXG4gICAgbGV0IHRlbXBsYXRlID0gc3RhdC5kaXNwbGF5X3RlbXBsYXRlO1xyXG4gICAgaWYgKG1hdGNoaW5nX2NvbmRpdGlvbikge1xyXG4gICAgICBiZ0NvbG9yID0gbWF0Y2hpbmdfY29uZGl0aW9uLmJnQ29sb3IgfHwgc3RhdC5iZ0NvbG9yO1xyXG4gICAgICB0ZXh0Q29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24udGV4dENvbG9yIHx8IHN0YXQudGV4dENvbG9yO1xyXG4gICAgICB0ZW1wbGF0ZSA9IG1hdGNoaW5nX2NvbmRpdGlvbi5kaXNwbGF5X3RlbXBsYXRlIHx8IHN0YXQuZGlzcGxheV90ZW1wbGF0ZTtcclxuICAgIH1cclxuICAgIGxldCBvdXRzdGF0ID0gZ2V0U3RhdEZyb21TdGF0c0dyb3VwKFxyXG4gICAgICBzdGF0c0dyb3VwLFxyXG4gICAgICBzdGF0LmRpc3BsYXlfdGVtcGxhdGUsXHJcbiAgICAgIHN0YXQuZm9ybWF0LFxyXG4gICAgICBzdGF0LmRlY2ltYWxzXHJcbiAgICApO1xyXG4gICAgaWYgKG91dHN0YXQgIT09IFwiTm90IGEgdmFsaWQgc3RhdFwiKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYmdDb2xvcjogYmdDb2xvcixcclxuICAgICAgICBvdXRwdXQ6IG91dHN0YXQgKyBcIlwiLFxyXG4gICAgICAgIHRleHRDb2xvcjogdGV4dENvbG9yXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBsZXQgb3V0cHV0ID0gdGVtcGxhdGU7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/ZGVmYXVsdFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5maXJzdClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmZpcnN0LCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/dmFsdWVcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2ZpcnN0XFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLmZpcnN0KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5maXJzdFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuZmlyc3QsIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9jb3VudFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5jb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmNvdW50IHx8IDAsIFwibm9uZVwiLCBcIjBcIilcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/bGVuZ3RoXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLmNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5jb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT91bmlxdWVjb3VudFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC51bmlxdWVjb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnVuaXF1ZWNvdW50IHx8IDAsIFwibm9uZVwiLCBcIjBcIilcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/dW5pcXVlbGVuZ3RoXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLnVuaXF1ZWNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC51bmlxdWVjb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAudW5pcXVlY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9zdW1cXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuc3VtKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5zdW1cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnN1bSwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3RvdGFsXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLnN1bSlcclxuICAgICAgICA/IHN0YXRzR3JvdXAuc3VtXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5zdW0sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9tZWFuXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLm1lYW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1lYW4sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9hdmVyYWdlXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLm1lYW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1lYW4sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9hdmdcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP21pblxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5taW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1pblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWluLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/bWF4XFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLm1heClcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWF4XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tYXgsIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP3RpdGxlXFx9L2dpLCBzdGF0LnRpdGxlKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP2ZpZWxkXFx9L2dpLCBzdGF0LmZpZWxkKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP2JnQ29sb3JcXH0vZ2ksIHN0YXQuYmdDb2xvcik7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT90ZXh0Q29sb3JcXH0vZ2ksIHN0YXQudGV4dENvbG9yKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJnQ29sb3IsXHJcbiAgICAgIG91dHB1dCxcclxuICAgICAgdGV4dENvbG9yXHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuIl19