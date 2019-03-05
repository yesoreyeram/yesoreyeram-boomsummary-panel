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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQSwyQkFBVyxhQUFhLEdBQUcsVUFBUyxLQUFLO2dCQUN2QyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQzlCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7Z0JBQzNCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FB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bEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRzt3QkFDaEIsQ0FBQyxDQUFDLGlDQUFrQixDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ25FLENBQUM7b0JBQ0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsRSxPQUFPO3dCQUNMLE9BQU8sU0FBQTt3QkFDUCxNQUFNLFFBQUE7d0JBQ04sU0FBUyxXQUFBO3FCQUNWLENBQUM7aUJBQ0g7WUFDSCxDQUFDLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IGdldEZvcm1hdHRlZE91dHB1dCB9IGZyb20gXCIuL0dyYWZhbmFVdGlsc1wiO1xyXG5pbXBvcnQgeyBpc01hdGNoIH0gZnJvbSBcIi4vTWF0Y2hVdGlsc1wiO1xyXG5cclxuZXhwb3J0IGxldCByZXBsYWNlVG9rZW5zID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICBsZXQgRkFfVE9LRU5fUFJFRklYID0gXCIke2ZhLVwiO1xyXG4gIGxldCBGQV9UT0tFTl9TVUZGSVggPSBcIn1cIjtcclxuICBsZXQgRkFfREVMSU1JVEVSID0gXCIsXCI7XHJcbiAgbGV0IElNR19UT0tFTl9QUkVGSVggPSBcIiR7aW1nLVwiO1xyXG4gIGxldCBJTUdfVE9LRU5fU1VGRklYID0gXCJ9XCI7XHJcbiAgbGV0IElNR19ERUxJTUlURVIgPSBcIixcIjtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gIHZhbHVlID0gdmFsdWVcclxuICAgIC5zcGxpdChcIiBcIilcclxuICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgIGlmIChhLnN0YXJ0c1dpdGgoRkFfVE9LRU5fUFJFRklYKSAmJiBhLmVuZHNXaXRoKEZBX1RPS0VOX1NVRkZJWCkpIHtcclxuICAgICAgICBsZXQgbXl0b2tlbiA9IGFcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXCQvZywgXCJcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXHsvZywgXCJcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXH0vZywgXCJcIik7XHJcbiAgICAgICAgbGV0IGljb24gPSBteXRva2VuLnNwbGl0KEZBX0RFTElNSVRFUilbMF07XHJcbiAgICAgICAgbGV0IGNvbG9yID1cclxuICAgICAgICAgIGEuaW5kZXhPZihGQV9ERUxJTUlURVIpID4gLTFcclxuICAgICAgICAgICAgPyBgIHN0eWxlPVwiY29sb3I6JHtteXRva2VuLnNwbGl0KElNR19ERUxJTUlURVIpWzFdfVwiIGBcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XHJcbiAgICAgICAgICBhLnNwbGl0KEZBX0RFTElNSVRFUikubGVuZ3RoID4gMlxyXG4gICAgICAgICAgICA/ICtteXRva2VuLnNwbGl0KElNR19ERUxJTUlURVIpWzJdXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBpZiAoYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgIGxldCBvcGVyYXRvciA9IG15dG9rZW4uc3BsaXQoSU1HX0RFTElNSVRFUilbM107XHJcbiAgICAgICAgICBsZXQgX3ZhbHVlID0gK215dG9rZW4uc3BsaXQoSU1HX0RFTElNSVRFUilbNF07XHJcbiAgICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbHVzXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCArIF92YWx1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pbnVzXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCAtIF92YWx1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm11bHRpcGx5XCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50ICogX3ZhbHVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRpdmlkZWJ5XCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50IC8gX3ZhbHVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pblwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1pbihbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1heFwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1heChbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1lYW5cIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5tZWFuKFtyZXBlYXRDb3VudCwgX3ZhbHVlXSkpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGEuc3RhcnRzV2l0aChJTUdfVE9LRU5fUFJFRklYKSAmJlxyXG4gICAgICAgIGEuZW5kc1dpdGgoSU1HX1RPS0VOX1NVRkZJWClcclxuICAgICAgKSB7XHJcbiAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMF07XHJcbiAgICAgICAgbGV0IGltZ1dpZHRoID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsxXVxyXG4gICAgICAgICAgICA6IFwiMjBweFwiO1xyXG4gICAgICAgIGxldCBpbWdIZWlnaHQgPVxyXG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAyXHJcbiAgICAgICAgICAgID8gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzJdXHJcbiAgICAgICAgICAgIDogXCIyMHB4XCI7XHJcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gM1xyXG4gICAgICAgICAgICA/ICthLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbM11cclxuICAgICAgICAgICAgOiAxO1xyXG4gICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KFxyXG4gICAgICAgICAgcmVwZWF0Q291bnRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGdldFN0YXRGcm9tU3RhdHNHcm91cCA9IGZ1bmN0aW9uKFxyXG4gIHN0YXRzR3JvdXAsXHJcbiAgc3RhdCxcclxuICBmb3JtYXQsXHJcbiAgZGVjaW1hbHNcclxuKSB7XHJcbiAgc3dpdGNoIChzdGF0LnRvTG93ZXJDYXNlKCkpIHtcclxuICAgIGNhc2UgXCJmaXJzdFwiOlxyXG4gICAgY2FzZSBcImRlZmF1bHRcIjpcclxuICAgIGNhc2UgXCJ2YWx1ZVwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5maXJzdClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmZpcnN0LCBmb3JtYXQsIGRlY2ltYWxzKTtcclxuICAgIGNhc2UgXCJjb3VudFwiOlxyXG4gICAgY2FzZSBcImxlbmd0aFwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5jb3VudClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuY291bnRcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmNvdW50LCBcIm5vbmVcIiwgXCIwXCIpO1xyXG4gICAgY2FzZSBcInVuaXF1ZWNvdW50XCI6XHJcbiAgICBjYXNlIFwidW5pcXVlbGVuZ3RoXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLnVuaXF1ZWNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC51bmlxdWVjb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAudW5pcXVlY291bnQsIFwibm9uZVwiLCBcIjBcIik7XHJcbiAgICBjYXNlIFwic3VtXCI6XHJcbiAgICBjYXNlIFwidG90YWxcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAuc3VtKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5zdW1cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnN1bSwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgICBjYXNlIFwibWVhblwiOlxyXG4gICAgY2FzZSBcImF2Z1wiOlxyXG4gICAgY2FzZSBcImF2ZXJhZ2VcIjpcclxuICAgICAgcmV0dXJuIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgZm9ybWF0LCBkZWNpbWFscyk7XHJcbiAgICBjYXNlIFwibWluXCI6XHJcbiAgICAgIHJldHVybiBpc05hTihzdGF0c0dyb3VwLm1pbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWluXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5taW4sIGZvcm1hdCwgZGVjaW1hbHMpO1xyXG4gICAgY2FzZSBcIm1heFwiOlxyXG4gICAgICByZXR1cm4gaXNOYU4oc3RhdHNHcm91cC5tYXgpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLm1heFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWF4LCBmb3JtYXQsIGRlY2ltYWxzKTtcclxuICB9XHJcbiAgcmV0dXJuIFwiTm90IGEgdmFsaWQgc3RhdFwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBidWlsZE1hc3RlckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgbGV0IG1hc3RlcmRhdGE6IGFueSA9IFtdO1xyXG4gIF8uZWFjaChkYXRhLCBkID0+IHtcclxuICAgIGlmIChkLnR5cGUgPT09IFwidGFibGVcIikge1xyXG4gICAgICBsZXQgcmVmSWQgPSBkLnJlZklkO1xyXG4gICAgICBfLmVhY2goZC5yb3dzLCAocm93LCBpKSA9PiB7XHJcbiAgICAgICAgbGV0IGdyb3VwOiBhbnkgPSBbXTtcclxuICAgICAgICBfLmVhY2gocm93LCAoY29sLCBqKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbXlkYXRhID0ge1xyXG4gICAgICAgICAgICBjb2xuYW1lOiBkLmNvbHVtbnNbal0udGV4dCxcclxuICAgICAgICAgICAgcmVmSWQsXHJcbiAgICAgICAgICAgIHJvd2lkOiBpLFxyXG4gICAgICAgICAgICB2YWx1ZTogY29sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgZ3JvdXAucHVzaChteWRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hc3RlcmRhdGEucHVzaChncm91cCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBPbmx5IHRhYmxlIGZvcm1hdCBpcyBjdXJyZW50bHkgc3VwcG9ydGVkXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBtYXN0ZXJkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBidWlsZE91dHB1dCA9IGZ1bmN0aW9uKHN0YXRXaWR0aCwgb3V0cHV0LCBiZ0NvbG9yLCB0ZXh0Q29sb3IpIHtcclxuICByZXR1cm4gYDxkaXYgc3R5bGU9XCJ3aWR0aDoke3N0YXRXaWR0aCB8fFxyXG4gICAgXCIxMDBcIn0lO2Zsb2F0OmxlZnQ7YmFja2dyb3VuZDoke2JnQ29sb3J9O2NvbG9yOiR7dGV4dENvbG9yfTtcIj5cclxuICAgICR7b3V0cHV0fVxyXG4gIDwvZGl2PmA7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGRpZFNhdGlzZnlGaWx0ZXJzID0gZnVuY3Rpb24oZ3JvdXAsIGZpbHRlcnMpIHtcclxuICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgIGxldCBtYXRjaGVzID0gMDtcclxuICAgIF8uZWFjaChmaWx0ZXJzLCBmaWx0ZXIgPT4ge1xyXG4gICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGZpbHRlci5maWVsZCk7XHJcbiAgICAgIGlmIChtYXRjaGluZ19maWVsZCAmJiBtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbWF0Y2hlcyArPVxyXG4gICAgICAgICAgaXNNYXRjaChcclxuICAgICAgICAgICAgbWF0Y2hpbmdfZmllbGRbMF0udmFsdWUsXHJcbiAgICAgICAgICAgIGZpbHRlci5vcGVyYXRvcixcclxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlLFxyXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUyXHJcbiAgICAgICAgICApID09PSB0cnVlXHJcbiAgICAgICAgICAgID8gMVxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZXMgPT09IGZpbHRlcnMubGVuZ3RoO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGdldFN0YXRzR3JvdXAgPSBmdW5jdGlvbihteXN0YXRzKSB7XHJcbiAgbGV0IHN0YXRzZ3JvdXA6IGFueSA9IHt9O1xyXG4gIHN0YXRzZ3JvdXAuY291bnQgPSBteXN0YXRzLmxlbmd0aDtcclxuICBzdGF0c2dyb3VwLnVuaXF1ZWNvdW50ID0gXy51bmlxKG15c3RhdHMpLmxlbmd0aDtcclxuICBzdGF0c2dyb3VwLnN1bSA9IF8uc3VtKG15c3RhdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLm1lYW4gPSBfLm1lYW4obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWluID0gXy5taW4obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWF4ID0gXy5tYXgobXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAuZmlyc3QgPSBfLmZpcnN0KG15c3RhdHMpO1xyXG4gIHJldHVybiBzdGF0c2dyb3VwO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRWYWx1ZXMgPSBmdW5jdGlvbihtYXN0ZXJkYXRhLCBzdGF0KSB7XHJcbiAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xyXG4gIF8uZWFjaChtYXN0ZXJkYXRhLCBncm91cCA9PiB7XHJcbiAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IHN0YXQuZmllbGQpO1xyXG4gICAgaWYgKG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDAgJiYgZGlkU2F0aXNmeUZpbHRlcnMoZ3JvdXAsIHN0YXQuZmlsdGVycykpIHtcclxuICAgICAgbXlzdGF0cy5wdXNoKF8uZmlyc3QobWF0Y2hpbmdfZmllbGQpLnZhbHVlKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gbXlzdGF0cztcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0TWF0Y2hpbmdDb25kaXRpb24gPSBmdW5jdGlvbihzdGF0c0dyb3VwLCBzdGF0KSB7XHJcbiAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IF8uZmlyc3QoXHJcbiAgICBzdGF0LmNvbmRpdGlvbmFsX2Zvcm1hdHMuZmlsdGVyKGNvbmRpdGlvbiA9PiB7XHJcbiAgICAgIGxldCBvcmlnaW5hbF92YWx1ZSA9IGdldFN0YXRGcm9tU3RhdHNHcm91cChcclxuICAgICAgICBzdGF0c0dyb3VwLFxyXG4gICAgICAgIChjb25kaXRpb24uZmllbGQgfHwgXCIke3ZhbHVlfVwiKS5yZXBsYWNlKFwiJHtcIiwgXCJcIikucmVwbGFjZShcIn1cIiwgXCJcIiksXHJcbiAgICAgICAgc3RhdC5mb3JtYXQsXHJcbiAgICAgICAgc3RhdC5kZWNpbWFsc1xyXG4gICAgICApO1xyXG4gICAgICBsZXQgb3BlcmF0b3IgPSBjb25kaXRpb24ub3BlcmF0b3I7XHJcbiAgICAgIGxldCBjb21wYXJlX3ZhbHVlMSA9IGNvbmRpdGlvbi52YWx1ZTtcclxuICAgICAgbGV0IGNvbXBhcmVfdmFsdWUyID0gY29uZGl0aW9uLnZhbHVlMjtcclxuICAgICAgcmV0dXJuIGlzTWF0Y2gob3JpZ2luYWxfdmFsdWUsIG9wZXJhdG9yLCBjb21wYXJlX3ZhbHVlMSwgY29tcGFyZV92YWx1ZTIpO1xyXG4gICAgfSlcclxuICApO1xyXG4gIHJldHVybiBtYXRjaGluZ19jb25kaXRpb247XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGdldE91dHB1dFZhbHVlID0gZnVuY3Rpb24obWFzdGVyZGF0YSwgc3RhdCkge1xyXG4gIGlmIChtYXN0ZXJkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYmdDb2xvcjogXCJcIixcclxuICAgICAgb3V0cHV0OiBcIk5vIGRhdGFcIixcclxuICAgICAgdGV4dENvbG9yOiBcInJlZFwiXHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgbXlzdGF0czogYW55ID0gZ2V0VmFsdWVzKG1hc3RlcmRhdGEsIHN0YXQpO1xyXG4gICAgbGV0IHN0YXRzR3JvdXAgPSBnZXRTdGF0c0dyb3VwKG15c3RhdHMpO1xyXG4gICAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IGdldE1hdGNoaW5nQ29uZGl0aW9uKHN0YXRzR3JvdXAsIHN0YXQpO1xyXG4gICAgbGV0IGJnQ29sb3IgPSBzdGF0LmJnQ29sb3I7XHJcbiAgICBsZXQgdGV4dENvbG9yID0gc3RhdC50ZXh0Q29sb3I7XHJcbiAgICBsZXQgdGVtcGxhdGUgPSBzdGF0LmRpc3BsYXlfdGVtcGxhdGU7XHJcbiAgICBpZiAobWF0Y2hpbmdfY29uZGl0aW9uKSB7XHJcbiAgICAgIGJnQ29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvciB8fCBzdGF0LmJnQ29sb3I7XHJcbiAgICAgIHRleHRDb2xvciA9IG1hdGNoaW5nX2NvbmRpdGlvbi50ZXh0Q29sb3IgfHwgc3RhdC50ZXh0Q29sb3I7XHJcbiAgICAgIHRlbXBsYXRlID0gbWF0Y2hpbmdfY29uZGl0aW9uLmRpc3BsYXlfdGVtcGxhdGUgfHwgc3RhdC5kaXNwbGF5X3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgbGV0IG91dHN0YXQgPSBnZXRTdGF0RnJvbVN0YXRzR3JvdXAoXHJcbiAgICAgIHN0YXRzR3JvdXAsXHJcbiAgICAgIHN0YXQuZGlzcGxheV90ZW1wbGF0ZSxcclxuICAgICAgc3RhdC5mb3JtYXQsXHJcbiAgICAgIHN0YXQuZGVjaW1hbHNcclxuICAgICk7XHJcbiAgICBpZiAob3V0c3RhdCAhPT0gXCJOb3QgYSB2YWxpZCBzdGF0XCIpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBiZ0NvbG9yOiBiZ0NvbG9yLFxyXG4gICAgICAgIG91dHB1dDogb3V0c3RhdCArIFwiXCIsXHJcbiAgICAgICAgdGV4dENvbG9yOiB0ZXh0Q29sb3JcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGxldCBvdXRwdXQgPSB0ZW1wbGF0ZTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9kZWZhdWx0XFx9L2dpLFxyXG4gICAgICBzdGF0LmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIlxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT92YWx1ZVxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5maXJzdClcclxuICAgICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmZpcnN0LCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/Zmlyc3RcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2NvdW50XFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLmNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5jb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9sZW5ndGhcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLmNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3VuaXF1ZWNvdW50XFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLnVuaXF1ZWNvdW50KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC51bmlxdWVjb3VudFxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAudW5pcXVlY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT91bmlxdWVsZW5ndGhcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAudW5pcXVlY291bnQpXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnVuaXF1ZWNvdW50XHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC51bmlxdWVjb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP3N1bVxcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5zdW0pXHJcbiAgICAgICAgPyBzdGF0c0dyb3VwLnN1bVxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuc3VtLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/dG90YWxcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAuc3VtKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5zdW1cclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnN1bSwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP21lYW5cXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2F2ZXJhZ2VcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAgIC9cXCRcXHtbXn1dP2F2Z1xcfS9naSxcclxuICAgICAgaXNOYU4oc3RhdHNHcm91cC5tZWFuKVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tZWFuXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCBzdGF0LmZvcm1hdCwgc3RhdC5kZWNpbWFscylcclxuICAgICk7XHJcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgICAgL1xcJFxce1tefV0/bWluXFx9L2dpLFxyXG4gICAgICBpc05hTihzdGF0c0dyb3VwLm1pbilcclxuICAgICAgICA/IHN0YXRzR3JvdXAubWluXHJcbiAgICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5taW4sIHN0YXQuZm9ybWF0LCBzdGF0LmRlY2ltYWxzKVxyXG4gICAgKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgICAvXFwkXFx7W159XT9tYXhcXH0vZ2ksXHJcbiAgICAgIGlzTmFOKHN0YXRzR3JvdXAubWF4KVxyXG4gICAgICAgID8gc3RhdHNHcm91cC5tYXhcclxuICAgICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1heCwgc3RhdC5mb3JtYXQsIHN0YXQuZGVjaW1hbHMpXHJcbiAgICApO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/dGl0bGVcXH0vZ2ksIHN0YXQudGl0bGUpO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/ZmllbGRcXH0vZ2ksIHN0YXQuZmllbGQpO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/YmdDb2xvclxcfS9naSwgc3RhdC5iZ0NvbG9yKTtcclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP3RleHRDb2xvclxcfS9naSwgc3RhdC50ZXh0Q29sb3IpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYmdDb2xvcixcclxuICAgICAgb3V0cHV0LFxyXG4gICAgICB0ZXh0Q29sb3JcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG4iXX0=