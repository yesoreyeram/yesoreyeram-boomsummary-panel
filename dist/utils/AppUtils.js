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
                var masterdata = [];
                lodash_1.default.each(data, function (d) {
                    if (d.type === "table") {
                        var refId_1 = d.refId;
                        lodash_1.default.each(d.rows, function (row, i) {
                            var group = [];
                            lodash_1.default.each(row, function (col, j) {
                                var mydata = {
                                    colname: d.columns[j].text,
                                    refId: refId_1,
                                    rowid: i,
                                    value: col
                                };
                                group.push(mydata);
                            });
                            masterdata.push(group);
                        });
                    }
                    else {
                        console.error("ERROR: Only table format is currently supported");
                    }
                });
                return masterdata;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQSwyQkFBVyxhQUFhLEdBQUcsVUFBUyxLQUFLO2dCQUN2QyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQzlCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7Z0JBQzNCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FB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SSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ25FLENBQUM7b0JBQ0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLGtCQUFrQixFQUNsQixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHO3dCQUNoQixDQUFDLENBQUMsaUNBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDbkUsQ0FBQztvQkFDRixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2xFLE9BQU87d0JBQ0wsT0FBTyxTQUFBO3dCQUNQLE1BQU0sUUFBQTt3QkFDTixTQUFTLFdBQUE7cUJBQ1YsQ0FBQztpQkFDSDtZQUNILENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgZ2V0Rm9ybWF0dGVkT3V0cHV0IH0gZnJvbSBcIi4vR3JhZmFuYVV0aWxzXCI7XHJcbmltcG9ydCB7IGlzTWF0Y2ggfSBmcm9tIFwiLi9NYXRjaFV0aWxzXCI7XHJcblxyXG5leHBvcnQgbGV0IHJlcGxhY2VUb2tlbnMgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gIGxldCBGQV9UT0tFTl9QUkVGSVggPSBcIiR7ZmEtXCI7XHJcbiAgbGV0IEZBX1RPS0VOX1NVRkZJWCA9IFwifVwiO1xyXG4gIGxldCBGQV9ERUxJTUlURVIgPSBcIixcIjtcclxuICBsZXQgSU1HX1RPS0VOX1BSRUZJWCA9IFwiJHtpbWctXCI7XHJcbiAgbGV0IElNR19UT0tFTl9TVUZGSVggPSBcIn1cIjtcclxuICBsZXQgSU1HX0RFTElNSVRFUiA9IFwiLFwiO1xyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XHJcbiAgdmFsdWUgPSB2YWx1ZVxyXG4gICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgLm1hcChhID0+IHtcclxuICAgICAgaWYgKGEuc3RhcnRzV2l0aChGQV9UT0tFTl9QUkVGSVgpICYmIGEuZW5kc1dpdGgoRkFfVE9LRU5fU1VGRklYKSkge1xyXG4gICAgICAgIGxldCBteXRva2VuID0gYVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcJC9nLCBcIlwiKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcey9nLCBcIlwiKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcfS9nLCBcIlwiKTtcclxuICAgICAgICBsZXQgaWNvbiA9IG15dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVswXTtcclxuICAgICAgICBsZXQgY29sb3IgPVxyXG4gICAgICAgICAgYS5pbmRleE9mKEZBX0RFTElNSVRFUikgPiAtMVxyXG4gICAgICAgICAgICA/IGAgc3R5bGU9XCJjb2xvcjoke215dG9rZW4uc3BsaXQoSU1HX0RFTElNSVRFUilbMV19XCIgYFxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID1cclxuICAgICAgICAgIGEuc3BsaXQoRkFfREVMSU1JVEVSKS5sZW5ndGggPiAyXHJcbiAgICAgICAgICAgID8gK215dG9rZW4uc3BsaXQoSU1HX0RFTElNSVRFUilbMl1cclxuICAgICAgICAgICAgOiAxO1xyXG4gICAgICAgIGEgPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHtjb2xvcn0+PC9pPiBgLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgYS5zdGFydHNXaXRoKElNR19UT0tFTl9QUkVGSVgpICYmXHJcbiAgICAgICAgYS5lbmRzV2l0aChJTUdfVE9LRU5fU1VGRklYKVxyXG4gICAgICApIHtcclxuICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVswXTtcclxuICAgICAgICBsZXQgaW1nV2lkdGggPVxyXG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAxXHJcbiAgICAgICAgICAgID8gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzFdXHJcbiAgICAgICAgICAgIDogXCIyMHB4XCI7XHJcbiAgICAgICAgbGV0IGltZ0hlaWdodCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDJcclxuICAgICAgICAgICAgPyBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMl1cclxuICAgICAgICAgICAgOiBcIjIwcHhcIjtcclxuICAgICAgICBsZXQgcmVwZWF0Q291bnQgPVxyXG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAzXHJcbiAgICAgICAgICAgID8gK2EucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVszXVxyXG4gICAgICAgICAgICA6IDE7XHJcbiAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQoXHJcbiAgICAgICAgICByZXBlYXRDb3VudFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGE7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oXCIgXCIpO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0U3RhdEZyb21TdGF0c0dyb3VwID0gZnVuY3Rpb24oXHJcbiAgc3RhdHNHcm91cCxcclxuICBzdGF0LFxyXG4gIGZvcm1hdCxcclxuICBkZWNpbWFsc1xyXG4pIHtcclxuICBzd2l0Y2ggKHN0YXQudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgY2FzZSBcImZpcnN0XCI6XHJcbiAgICBjYXNlIFwiZGVmYXVsdFwiOlxyXG4gICAgY2FzZSBcInZhbHVlXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLmZpcnN0KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5maXJzdFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuZmlyc3QsIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gICAgY2FzZSBcImNvdW50XCI6XHJcbiAgICBjYXNlIFwibGVuZ3RoXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLmNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5jb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuY291bnQsIFwibm9uZVwiLCBcIjBcIik7XHJcbiAgICBjYXNlIFwidW5pcXVlY291bnRcIjpcclxuICAgIGNhc2UgXCJ1bmlxdWVsZW5ndGhcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAudW5pcXVlY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnVuaXF1ZWNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC51bmlxdWVjb3VudCwgXCJub25lXCIsIFwiMFwiKTtcclxuICAgIGNhc2UgXCJzdW1cIjpcclxuICAgIGNhc2UgXCJ0b3RhbFwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5zdW0pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnN1bVxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuc3VtLCBmb3JtYXQsIGRlY2ltYWxzKTtcclxuICAgIGNhc2UgXCJtZWFuXCI6XHJcbiAgICBjYXNlIFwiYXZnXCI6XHJcbiAgICBjYXNlIFwiYXZlcmFnZVwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5tZWFuKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tZWFuXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCBmb3JtYXQsIGRlY2ltYWxzKTtcclxuICAgIGNhc2UgXCJtaW5cIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAubWluKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5taW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1pbiwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgICBjYXNlIFwibWF4XCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLm1heClcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWF4XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tYXgsIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gIH1cclxuICByZXR1cm4gXCJOb3QgYSB2YWxpZCBzdGF0XCI7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGJ1aWxkTWFzdGVyRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICBsZXQgbWFzdGVyZGF0YTogYW55ID0gW107XHJcbiAgXy5lYWNoKGRhdGEsIGQgPT4ge1xyXG4gICAgaWYgKGQudHlwZSA9PT0gXCJ0YWJsZVwiKSB7XHJcbiAgICAgIGxldCByZWZJZCA9IGQucmVmSWQ7XHJcbiAgICAgIF8uZWFjaChkLnJvd3MsIChyb3csIGkpID0+IHtcclxuICAgICAgICBsZXQgZ3JvdXA6IGFueSA9IFtdO1xyXG4gICAgICAgIF8uZWFjaChyb3csIChjb2wsIGopID0+IHtcclxuICAgICAgICAgIGxldCBteWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGNvbG5hbWU6IGQuY29sdW1uc1tqXS50ZXh0LFxyXG4gICAgICAgICAgICByZWZJZCxcclxuICAgICAgICAgICAgcm93aWQ6IGksXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb2xcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBncm91cC5wdXNoKG15ZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFzdGVyZGF0YS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRVJST1I6IE9ubHkgdGFibGUgZm9ybWF0IGlzIGN1cnJlbnRseSBzdXBwb3J0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG1hc3RlcmRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGJ1aWxkT3V0cHV0ID0gZnVuY3Rpb24oc3RhdFdpZHRoLCBvdXRwdXQsIGJnQ29sb3IsIHRleHRDb2xvcikge1xyXG4gIHJldHVybiBgPGRpdiBzdHlsZT1cIndpZHRoOiR7c3RhdFdpZHRoIHx8XHJcbiAgICBcIjEwMFwifSU7ZmxvYXQ6bGVmdDtiYWNrZ3JvdW5kOiR7YmdDb2xvcn07Y29sb3I6JHt0ZXh0Q29sb3J9O1wiPlxyXG4gICAgJHtvdXRwdXR9XHJcbiAgPC9kaXY+YDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZGlkU2F0aXNmeUZpbHRlcnMgPSBmdW5jdGlvbihncm91cCwgZmlsdGVycykge1xyXG4gIGlmIChmaWx0ZXJzICYmIGZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgbGV0IG1hdGNoZXMgPSAwO1xyXG4gICAgXy5lYWNoKGZpbHRlcnMsIGZpbHRlciA9PiB7XHJcbiAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gZmlsdGVyLmZpZWxkKTtcclxuICAgICAgaWYgKG1hdGNoaW5nX2ZpZWxkICYmIG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtYXRjaGVzICs9XHJcbiAgICAgICAgICBpc01hdGNoKFxyXG4gICAgICAgICAgICBtYXRjaGluZ19maWVsZFswXS52YWx1ZSxcclxuICAgICAgICAgICAgZmlsdGVyLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUsXHJcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZTJcclxuICAgICAgICAgICkgPT09IHRydWVcclxuICAgICAgICAgICAgPyAxXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hlcyA9PT0gZmlsdGVycy5sZW5ndGg7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0U3RhdHNHcm91cCA9IGZ1bmN0aW9uKG15c3RhdHMpIHtcclxuICBsZXQgc3RhdHNncm91cDogYW55ID0ge307XHJcbiAgc3RhdHNncm91cC5jb3VudCA9IG15c3RhdHMubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAudW5pcXVlY291bnQgPSBfLnVuaXEobXlzdGF0cykubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAuc3VtID0gXy5zdW0obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWVhbiA9IF8ubWVhbihteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5taW4gPSBfLm1pbihteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5tYXggPSBfLm1heChteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5maXJzdCA9IF8uZmlyc3QobXlzdGF0cyk7XHJcbiAgcmV0dXJuIHN0YXRzZ3JvdXA7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGdldFZhbHVlcyA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEsIHN0YXQpIHtcclxuICBsZXQgbXlzdGF0czogYW55ID0gW107XHJcbiAgXy5lYWNoKG1hc3RlcmRhdGEsIGdyb3VwID0+IHtcclxuICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gc3RhdC5maWVsZCk7XHJcbiAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCAmJiBkaWRTYXRpc2Z5RmlsdGVycyhncm91cCwgc3RhdC5maWx0ZXJzKSkge1xyXG4gICAgICBteXN0YXRzLnB1c2goXy5maXJzdChtYXRjaGluZ19maWVsZCkudmFsdWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBteXN0YXRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRNYXRjaGluZ0NvbmRpdGlvbiA9IGZ1bmN0aW9uKHN0YXRzR3JvdXAsIHN0YXQpIHtcclxuICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9uID0gXy5maXJzdChcclxuICAgIHN0YXQuY29uZGl0aW9uYWxfZm9ybWF0cy5maWx0ZXIoY29uZGl0aW9uID0+IHtcclxuICAgICAgbGV0IG9yaWdpbmFsX3ZhbHVlID0gZ2V0U3RhdEZyb21TdGF0c0dyb3VwKFxyXG4gICAgICAgIHN0YXRzR3JvdXAsXHJcbiAgICAgICAgKGNvbmRpdGlvbi5maWVsZCB8fCBcIiR7dmFsdWV9XCIpLnJlcGxhY2UoXCIke1wiLCBcIlwiKS5yZXBsYWNlKFwifVwiLCBcIlwiKSxcclxuICAgICAgICBzdGF0LmZvcm1hdCxcclxuICAgICAgICBzdGF0LmRlY2ltYWxzXHJcbiAgICAgICk7XHJcbiAgICAgIGxldCBvcGVyYXRvciA9IGNvbmRpdGlvbi5vcGVyYXRvcjtcclxuICAgICAgbGV0IGNvbXBhcmVfdmFsdWUxID0gY29uZGl0aW9uLnZhbHVlO1xyXG4gICAgICBsZXQgY29tcGFyZV92YWx1ZTIgPSBjb25kaXRpb24udmFsdWUyO1xyXG4gICAgICByZXR1cm4gaXNNYXRjaChvcmlnaW5hbF92YWx1ZSwgb3BlcmF0b3IsIGNvbXBhcmVfdmFsdWUxLCBjb21wYXJlX3ZhbHVlMik7XHJcbiAgICB9KVxyXG4gICk7XHJcbiAgcmV0dXJuIG1hdGNoaW5nX2NvbmRpdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0T3V0cHV0VmFsdWUgPSBmdW5jdGlvbihtYXN0ZXJkYXRhLCBzdGF0KSB7XHJcbiAgaWYgKG1hc3RlcmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBiZ0NvbG9yOiBcIlwiLFxyXG4gICAgICBvdXRwdXQ6IFwiTm8gZGF0YVwiLFxyXG4gICAgICB0ZXh0Q29sb3I6IFwicmVkXCJcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBteXN0YXRzOiBhbnkgPSBnZXRWYWx1ZXMobWFzdGVyZGF0YSwgc3RhdCk7XHJcbiAgICBsZXQgc3RhdHNHcm91cCA9IGdldFN0YXRzR3JvdXAobXlzdGF0cyk7XHJcbiAgICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9uID0gZ2V0TWF0Y2hpbmdDb25kaXRpb24oc3RhdHNHcm91cCwgc3RhdCk7XHJcbiAgICBsZXQgYmdDb2xvciA9IHN0YXQuYmdDb2xvcjtcclxuICAgIGxldCB0ZXh0Q29sb3IgPSBzdGF0LnRleHRDb2xvcjtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IHN0YXQuZGlzcGxheV90ZW1wbGF0ZTtcclxuICAgIGlmIChtYXRjaGluZ19jb25kaXRpb24pIHtcclxuICAgICAgYmdDb2xvciA9IG1hdGNoaW5nX2NvbmRpdGlvbi5iZ0NvbG9yIHx8IHN0YXQuYmdDb2xvcjtcclxuICAgICAgdGV4dENvbG9yID0gbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvciB8fCBzdGF0LnRleHRDb2xvcjtcclxuICAgICAgdGVtcGxhdGUgPSBtYXRjaGluZ19jb25kaXRpb24uZGlzcGxheV90ZW1wbGF0ZSB8fCBzdGF0LmRpc3BsYXlfdGVtcGxhdGU7XHJcbiAgICB9XHJcbiAgICBsZXQgb3V0c3RhdCA9IGdldFN0YXRGcm9tU3RhdHNHcm91cChcclxuICAgICAgc3RhdHNHcm91cCxcclxuICAgICAgc3RhdC5kaXNwbGF5X3RlbXBsYXRlLFxyXG4gICAgICBzdGF0LmZvcm1hdCxcclxuICAgICAgc3RhdC5kZWNpbWFsc1xyXG4gICAgKTtcclxuICAgIGlmIChvdXRzdGF0ICE9PSBcIk5vdCBhIHZhbGlkIHN0YXRcIikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGJnQ29sb3I6IGJnQ29sb3IsXHJcbiAgICAgICAgb3V0cHV0OiBvdXRzdGF0ICsgXCJcIixcclxuICAgICAgICB0ZXh0Q29sb3I6IHRleHRDb2xvclxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgbGV0IG91dHB1dCA9IHRlbXBsYXRlO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2RlZmF1bHRcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3ZhbHVlXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLmZpcnN0KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5maXJzdFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuZmlyc3QsIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9maXJzdFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5maXJzdClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmZpcnN0LCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/Y291bnRcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2xlbmd0aFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5jb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmNvdW50IHx8IDAsIFwibm9uZVwiLCBcIjBcIilcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/dW5pcXVlY291bnRcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAudW5pcXVlY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnVuaXF1ZWNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC51bmlxdWVjb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3VuaXF1ZWxlbmd0aFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC51bmlxdWVjb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnVuaXF1ZWNvdW50IHx8IDAsIFwibm9uZVwiLCBcIjBcIilcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/c3VtXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLnN1bSlcclxuICAgICAgICA/IHN0YXRzR3JvdXAuc3VtXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5zdW0sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT90b3RhbFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5zdW0pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnN1bVxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuc3VtLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/bWVhblxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5tZWFuKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tZWFuXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/YXZlcmFnZVxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5tZWFuKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tZWFuXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/YXZnXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLm1lYW4pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1lYW4sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9taW5cXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWluKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5taW5cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1pbiwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP21heFxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5tYXgpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1heFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWF4LCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT90aXRsZVxcfS9naSwgc3RhdC50aXRsZSk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9maWVsZFxcfS9naSwgc3RhdC5maWVsZCk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9iZ0NvbG9yXFx9L2dpLCBzdGF0LmJnQ29sb3IpO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/dGV4dENvbG9yXFx9L2dpLCBzdGF0LnRleHRDb2xvcik7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBiZ0NvbG9yLFxyXG4gICAgICBvdXRwdXQsXHJcbiAgICAgIHRleHRDb2xvclxyXG4gICAgfTtcclxuICB9XHJcbn07XHJcbiJdfQ==