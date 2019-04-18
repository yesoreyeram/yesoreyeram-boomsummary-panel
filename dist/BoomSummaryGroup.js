System.register(["lodash", "./AppUtils", "./BoomUtils", "./GrafanaUtils"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, AppUtils_1, BoomUtils_1, GrafanaUtils_1, BoomUtils_2, buildMasterData, BoomFilter, BoomSummaryFilter, BoomSummaryConditionalFormats, BoomStat, BoomSummaryGroup, replaceStatsFromTemplate, replaceFATokens, getMatchingCondition;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (AppUtils_1_1) {
                AppUtils_1 = AppUtils_1_1;
            },
            function (BoomUtils_1_1) {
                BoomUtils_1 = BoomUtils_1_1;
                BoomUtils_2 = BoomUtils_1_1;
            },
            function (GrafanaUtils_1_1) {
                GrafanaUtils_1 = GrafanaUtils_1_1;
            }
        ],
        execute: function () {
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
                                    rowid: +i,
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
            BoomFilter = (function () {
                function BoomFilter(options) {
                    this.getSecondaryFieldDetails = function (operator) {
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
                    this.field = options.field || "Sample";
                    this.operator = options.operator || "equals";
                    this.value = options.value || "Something";
                    this.value2 = options.value2 || "";
                }
                return BoomFilter;
            }());
            exports_1("BoomFilter", BoomFilter);
            BoomFilter.prototype.GetValue1Helper = function () {
                return this.getSecondaryFieldDetails(this.operator).Value1Helper;
            };
            BoomFilter.prototype.GetValue2Helper = function () {
                return this.getSecondaryFieldDetails(this.operator).Value2Helper;
            };
            BoomFilter.prototype.CanShowValue2 = function () {
                return this.getSecondaryFieldDetails(this.operator).CanShowValue2;
            };
            BoomSummaryFilter = (function (_super) {
                __extends(BoomSummaryFilter, _super);
                function BoomSummaryFilter(options) {
                    return _super.call(this, options) || this;
                }
                return BoomSummaryFilter;
            }(BoomFilter));
            exports_1("BoomSummaryFilter", BoomSummaryFilter);
            BoomSummaryConditionalFormats = (function (_super) {
                __extends(BoomSummaryConditionalFormats, _super);
                function BoomSummaryConditionalFormats(options) {
                    var _this = _super.call(this, options) || this;
                    _this.custom_css_class = options.custom_css_class || "";
                    _this.stat_type = options.stat_type || "random";
                    _this.bgColor = options.bgColor || "";
                    _this.textColor = options.textColor || "";
                    return _this;
                }
                return BoomSummaryConditionalFormats;
            }(BoomFilter));
            exports_1("BoomSummaryConditionalFormats", BoomSummaryConditionalFormats);
            BoomStat = (function () {
                function BoomStat(options) {
                    this.field = options.field || "Sample";
                    this.stat_type = options.stat_type || "random";
                    this.decimals = options.decimals || "0";
                    this.unit = options.unit || "none";
                    this.title = options.title || this.stat_type + " of " + this.field || "Detail";
                }
                return BoomStat;
            }());
            exports_1("BoomStat", BoomStat);
            BoomStat.prototype.setUnitFormat = function (format) {
                this.unit = format && format.value ? format.value : "none";
            };
            BoomSummaryGroup = (function () {
                function BoomSummaryGroup(options) {
                    this.title = options.title || "";
                    this.stats = options.stats || [];
                    this.statWidth = options.statWidth || "100";
                    this.bgColor = options.bgColor || "";
                    this.textColor = options.textColor || "";
                    this.templateType = options.templateType || "default";
                    this.customTemplate = options.customTemplate || "<div style=\"width:100%;float:left;border:1px solid black;\">\n            <div style=\"width:50%;float:left;padding:10px;\">Total Records</div>\n            <div style=\"width:50%;float:left;padding:10px;\">#{count}</div>\n        </div>";
                    this.filters = options.filters || [];
                    this.conditional_formats = options.conditional_formats || [];
                }
                return BoomSummaryGroup;
            }());
            exports_1("BoomSummaryGroup", BoomSummaryGroup);
            BoomSummaryGroup.prototype.addStat = function () {
                var newMetric = new BoomStat({});
                this.stats = this.stats || [];
                this.stats.push(newMetric);
            };
            BoomSummaryGroup.prototype.removeStat = function (index) {
                if (this.stats.length > 0) {
                    this.stats.splice(Number(index), 1);
                }
            };
            BoomSummaryGroup.prototype.addFilter = function () {
                var newfilter = new BoomSummaryFilter({
                    field: "Sample",
                    operator: "equals"
                });
                this.filters = this.filters || [];
                this.filters.push(newfilter);
            };
            BoomSummaryGroup.prototype.removeFilter = function (index) {
                if (this.filters.length > 0) {
                    this.filters.splice(Number(index), 1);
                }
            };
            BoomSummaryGroup.prototype.addConditonalFormat = function () {
                var operator = "equals";
                var stat_type = "random";
                var field = "Sample";
                var value = "Something";
                if (this.stats && this.stats.length > 0 && this.conditional_formats.length === 0) {
                    operator = "<=";
                    stat_type = "count";
                    field = this.stats[0].field || "Sample";
                    value = "0";
                }
                else if (this.conditional_formats.length > 0) {
                    operator = this.conditional_formats[this.conditional_formats.length - 1].operator;
                    stat_type = this.conditional_formats[this.conditional_formats.length - 1].stat_type;
                    field = this.conditional_formats[this.conditional_formats.length - 1].field;
                    value = this.conditional_formats[this.conditional_formats.length - 1].value;
                }
                var new_conditional_formatter = new BoomSummaryConditionalFormats({
                    field: field,
                    operator: operator,
                    stat_type: stat_type,
                    value: value
                });
                this.conditional_formats = this.conditional_formats || [];
                this.conditional_formats.push(new_conditional_formatter);
            };
            BoomSummaryGroup.prototype.removeConditionalFormat = function (index) {
                if (this.conditional_formats.length > 0) {
                    this.conditional_formats.splice(Number(index), 1);
                }
            };
            BoomSummaryGroup.prototype.moveConditionalFormat = function (direction, index) {
                var tempElement = this.conditional_formats[Number(index)];
                if (direction === "UP") {
                    this.conditional_formats[Number(index)] = this.conditional_formats[Number(index) - 1];
                    this.conditional_formats[Number(index) - 1] = tempElement;
                }
                if (direction === "DOWN") {
                    this.conditional_formats[Number(index)] = this.conditional_formats[Number(index) + 1];
                    this.conditional_formats[Number(index) + 1] = tempElement;
                }
            };
            replaceStatsFromTemplate = function (template, stats, data) {
                var output = template;
                lodash_1.default.each(stats, function (stat, index) {
                    var mystatsObject = {
                        count: NaN,
                        max: NaN,
                        mean: NaN,
                        min: NaN,
                        random: "",
                        sum: NaN,
                        uniquecount: NaN,
                    };
                    if (data) {
                        var mystats_1 = [];
                        lodash_1.default.each(data, function (group) {
                            var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === stat.field; });
                            if (matching_field.length > 0) {
                                mystats_1.push(lodash_1.default.first(matching_field).value);
                            }
                        });
                        mystatsObject = BoomUtils_1.getStatsFromArrayOfObjects(mystats_1);
                    }
                    if (index === 0) {
                        output = output.replace(new RegExp("#{count}", "gi"), mystatsObject.count);
                        output = output.replace(new RegExp("#{uniquecount}", "gi"), mystatsObject.uniquecount);
                        output = output.replace(new RegExp("#{sum}", "gi"), mystatsObject.sum);
                        output = output.replace(new RegExp("#{mean}", "gi"), mystatsObject.mean);
                        output = output.replace(new RegExp("#{min}", "gi"), mystatsObject.min);
                        output = output.replace(new RegExp("#{max}", "gi"), mystatsObject.max);
                        output = output.replace(new RegExp("#{randmon}", "gi"), mystatsObject.random);
                        output = output.replace(new RegExp("#{title}", "gi"), stat.title || stat.stat_type + " of " + stat.field);
                        output = output.replace(new RegExp("#{default}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject[stat.stat_type], stat.unit, stat.decimals));
                    }
                    output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + "}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject[stat.stat_type], stat.unit, stat.decimals));
                    output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + ",raw}", "gi"), mystatsObject[stat.defaultStat]);
                    output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + ",title}", "gi"), stat.title);
                });
                var colnames = [];
                lodash_1.default.each(data, function (group) {
                    lodash_1.default.each(group, function (item) {
                        colnames.push(item.colname);
                    });
                });
                colnames = lodash_1.default.uniq(colnames);
                lodash_1.default.each(colnames, function (colname, index) {
                    var mystatsObject = {
                        count: NaN,
                        max: NaN,
                        mean: NaN,
                        min: NaN,
                        random: "",
                        sum: NaN,
                        uniquecount: NaN,
                    };
                    if (data) {
                        var mystats_2 = [];
                        lodash_1.default.each(data, function (group) {
                            var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === colname; });
                            if (matching_field.length > 0) {
                                mystats_2.push(lodash_1.default.first(matching_field).value);
                            }
                        });
                        mystatsObject = BoomUtils_1.getStatsFromArrayOfObjects(mystats_2);
                    }
                    if (index === 0) {
                        output = output.replace(new RegExp("#{title}", "gi"), "" + colname);
                        output = output.replace(new RegExp("#{default}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject.random, "none", "0"));
                    }
                    output = output.replace(new RegExp("#{count," + colname + "}", "gi"), mystatsObject.count);
                    output = output.replace(new RegExp("#{uniquecount," + colname + "}", "gi"), mystatsObject.uniquecount);
                    output = output.replace(new RegExp("#{sum," + colname + "}", "gi"), mystatsObject.sum);
                    output = output.replace(new RegExp("#{mean," + colname + "}", "gi"), mystatsObject.mean);
                    output = output.replace(new RegExp("#{min," + colname + "}", "gi"), mystatsObject.min);
                    output = output.replace(new RegExp("#{max," + colname + "}", "gi"), mystatsObject.max);
                    output = output.replace(new RegExp("#{random," + colname + "}", "gi"), mystatsObject.random);
                    output = output.replace(new RegExp("#{count," + colname + ",raw}", "gi"), mystatsObject.count);
                    output = output.replace(new RegExp("#{uniquecount," + colname + ",raw}", "gi"), mystatsObject.uniquecount);
                    output = output.replace(new RegExp("#{sum," + colname + ",raw}", "gi"), mystatsObject.sum);
                    output = output.replace(new RegExp("#{mean," + colname + ",raw}", "gi"), mystatsObject.mean);
                    output = output.replace(new RegExp("#{min," + colname + ",raw}", "gi"), mystatsObject.min);
                    output = output.replace(new RegExp("#{max," + colname + ",raw}", "gi"), mystatsObject.max);
                    output = output.replace(new RegExp("#{random," + colname + ",raw}", "gi"), mystatsObject.random);
                    output = output.replace(new RegExp("#{count," + colname + ",title}", "gi"), "Count of " + colname);
                    output = output.replace(new RegExp("#{uniquecount," + colname + ",title}", "gi"), "Unique Count of " + colname);
                    output = output.replace(new RegExp("#{sum," + colname + ",title}", "gi"), "Sum of " + colname);
                    output = output.replace(new RegExp("#{mean," + colname + ",title}", "gi"), "Mean of " + colname);
                    output = output.replace(new RegExp("#{min," + colname + ",title}", "gi"), "min of " + colname);
                    output = output.replace(new RegExp("#{max," + colname + ",title}", "gi"), "Max of " + colname);
                    output = output.replace(new RegExp("#{random," + colname + ",title}", "gi"), "Random " + colname);
                });
                output = output.replace(new RegExp("#{count}", "gi"), data.length);
                return output;
            };
            replaceFATokens = function (template) {
                return BoomUtils_2.replaceTokens(template);
            };
            getMatchingCondition = function (data, conditional_formats) {
                var matching_conditions = conditional_formats.filter(function (condition) {
                    var mystatsObject = {
                        count: NaN,
                        max: NaN,
                        mean: NaN,
                        min: NaN,
                        random: "",
                        sum: NaN,
                        uniquecount: NaN,
                    };
                    if (data) {
                        var mystats_3 = [];
                        lodash_1.default.each(data, function (group) {
                            var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === condition.field; });
                            if (matching_field.length > 0) {
                                mystats_3.push(lodash_1.default.first(matching_field).value);
                            }
                        });
                        mystatsObject = BoomUtils_1.getStatsFromArrayOfObjects(mystats_3);
                    }
                    return BoomUtils_1.isMatch(mystatsObject[condition.stat_type], condition.operator, condition.value, condition.value2);
                });
                return matching_conditions && matching_conditions.length > 0 ? lodash_1.default.first(matching_conditions) : null;
            };
            BoomSummaryGroup.prototype.getoutput = function (masterdata) {
                if (masterdata.length === 0) {
                    return "<div style='text-align:center;'>No Data</div>";
                }
                else {
                    var filteredData = AppUtils_1.getFilteredDataFromMasterData(masterdata, this.filters);
                    var matching_condition = getMatchingCondition(filteredData, this.conditional_formats);
                    var bgColor = matching_condition && matching_condition.bgColor ? matching_condition.bgColor : this.bgColor;
                    var textColor = matching_condition && matching_condition.textColor ? matching_condition.textColor : this.textColor;
                    var custom_css_class = matching_condition && matching_condition.custom_css_class ? matching_condition.custom_css_class : "not_applicable";
                    if (custom_css_class !== "not_applicable") {
                        bgColor = "not_applicable";
                        textColor = "not_applicable";
                    }
                    var outTemplate_1 = filteredData.length + " records found";
                    switch (this.templateType) {
                        case "titleonly":
                            outTemplate_1 = "<div style=\"width:100%;float:left;border:1px solid black;\">\n                                    <div style=\"width:100%;float:left;padding:10px;text-align:center;\">#{default}</div>\n                                </div>";
                            break;
                        case "auto":
                            outTemplate_1 = "";
                            lodash_1.default.each(this.stats, function (stat) {
                                outTemplate_1 += "<div style=\"width:100%;float:left;border:1px solid black;\">\n                    <div style=\"width:50%;float:left;padding:10px;\">#{" + stat.stat_type + "," + stat.field + ",title}</div>\n                    <div style=\"width:50%;float:left;padding:10px;\">#{" + stat.stat_type + "," + stat.field + "}</div>\n                </div>";
                            });
                            break;
                        case "custom":
                            outTemplate_1 = this.customTemplate;
                            break;
                        case "jumbo":
                            outTemplate_1 = "<div style=\"width:100%;float:left;text-align:center;border:1px solid black;\">\n                                    <br/>\n                                    <h5>#{title}</h5>\n                                    <br/>\n                                    <h1>#{default}</h1>\n                                    <br/>\n                                </div>";
                            break;
                        case "jumbo_without_title":
                            outTemplate_1 = "<div style=\"width:100%;float:left;text-align:center;border:1px solid black;\">\n                                    <br/>\n                                    <h1>#{default}</h1>\n                                    <br/>\n                                </div>";
                            break;
                        default:
                            outTemplate_1 = this.customTemplate;
                            break;
                    }
                    if ((this.templateType === "auto" || this.templateType === "jumbo" || this.templateType === "jumbo_without_title" || this.templateType === "titleonly") && this.stats.length === 0) {
                        outTemplate_1 = "<div style=\"background:red;\">Oops. You don't have any stats defined for this summary group</div>";
                    }
                    var output_with_statsReplaced = replaceStatsFromTemplate(outTemplate_1, this.stats, filteredData);
                    var output_with_tokensreplaced = replaceFATokens(output_with_statsReplaced);
                    if (output_with_tokensreplaced.trim().indexOf("<") !== 0) {
                        output_with_tokensreplaced = "" + output_with_tokensreplaced.replace(new RegExp("\n", "gi"), "<br/>");
                    }
                    return "<div style=\"width:" + (this.statWidth || "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\" class=\"" + custom_css_class + "\">\n                    " + output_with_tokensreplaced + "\n                </div>";
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN1bW1hcnlHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb29tU3VtbWFyeUdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQSw2QkFBVyxlQUFlLEdBQUcsVUFBVSxJQUFJO2dCQUN2QyxJQUFJLFVBQVUsR0FBb0IsRUFBRSxDQUFDO2dCQUNyQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO29CQUNWLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQ3BCLElBQUksT0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3BCLGdCQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDbEIsSUFBSSxLQUFLLEdBQWtCLEVBQUUsQ0FBQzs0QkFDOUIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ2YsSUFBSSxNQUFNLEdBQWdCO29DQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29DQUMxQixLQUFLLFNBQUE7b0NBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQztvQ0FDVCxLQUFLLEVBQUUsR0FBRztpQ0FDYixDQUFDO2dDQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3ZCLENBQUMsQ0FBQyxDQUFDOzRCQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztxQkFDcEU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxVQUFVLENBQUM7WUFDdEIs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cnQgeyBJTWFzdGVyRGF0YSwgSUJvb21GaWx0ZXIsIElCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cywgSUJvb21TdGF0cyB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhIH0gZnJvbSBcIi4vQXBwVXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMsIGlzTWF0Y2ggfSBmcm9tIFwiLi9Cb29tVXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0Rm9ybWF0dGVkT3V0cHV0IH0gZnJvbSBcIi4vR3JhZmFuYVV0aWxzXCI7XHJcbmltcG9ydCB7IHJlcGxhY2VUb2tlbnMgfSBmcm9tIFwiLi9Cb29tVXRpbHNcIjtcclxuXHJcbmV4cG9ydCBsZXQgYnVpbGRNYXN0ZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGxldCBtYXN0ZXJkYXRhOiBJTWFzdGVyRGF0YVtdW10gPSBbXTtcclxuICAgIF8uZWFjaChkYXRhLCBkID0+IHtcclxuICAgICAgICBpZiAoZC50eXBlID09PSBcInRhYmxlXCIpIHtcclxuICAgICAgICAgICAgbGV0IHJlZklkID0gZC5yZWZJZDtcclxuICAgICAgICAgICAgXy5lYWNoKGQucm93cywgKHJvdywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwOiBJTWFzdGVyRGF0YVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBfLmVhY2gocm93LCAoY29sLCBqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG15ZGF0YTogSU1hc3RlckRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG5hbWU6IGQuY29sdW1uc1tqXS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93aWQ6ICtpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY29sXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5wdXNoKG15ZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1hc3RlcmRhdGEucHVzaChncm91cCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogT25seSB0YWJsZSBmb3JtYXQgaXMgY3VycmVudGx5IHN1cHBvcnRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXN0ZXJkYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21GaWx0ZXIgaW1wbGVtZW50cyBJQm9vbUZpbHRlciB7XHJcbiAgICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBvcGVyYXRvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdmFsdWUyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgQ2FuU2hvd1ZhbHVlMjtcclxuICAgIHB1YmxpYyBHZXRWYWx1ZTJIZWxwZXI7XHJcbiAgICBwdWJsaWMgR2V0VmFsdWUxSGVscGVyO1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3IgfHwgXCJlcXVhbHNcIjtcclxuICAgICAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZSB8fCBcIlNvbWV0aGluZ1wiO1xyXG4gICAgICAgIHRoaXMudmFsdWUyID0gb3B0aW9ucy52YWx1ZTIgfHwgXCJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRTZWNvbmRhcnlGaWVsZERldGFpbHMgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcclxuICAgICAgICBsZXQgQ2FuU2hvd1ZhbHVlMiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBWYWx1ZTFIZWxwZXIgPSBcIlZhbHVlXCI7XHJcbiAgICAgICAgbGV0IFZhbHVlMkhlbHBlciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChvcGVyYXRvci5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLCBcIlwiKS50cmltKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBcImJldHdlZW5cIjpcclxuICAgICAgICAgICAgICAgIENhblNob3dWYWx1ZTIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUxSGVscGVyID0gXCJGcm9tXCI7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImluc2lkZXJhbmdlXCI6XHJcbiAgICAgICAgICAgICAgICBDYW5TaG93VmFsdWUyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFZhbHVlMUhlbHBlciA9IFwiRnJvbVwiO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUySGVscGVyID0gXCJUb1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJvdXRzaWRlcmFuZ2VcIjpcclxuICAgICAgICAgICAgICAgIENhblNob3dWYWx1ZTIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUxSGVscGVyID0gXCJGcm9tXCI7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImluXCI6XHJcbiAgICAgICAgICAgICAgICBDYW5TaG93VmFsdWUyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFZhbHVlMUhlbHBlciA9IFwiVmFsdWVzXCI7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlNlcGVyYXRvclwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMixcclxuICAgICAgICAgICAgVmFsdWUxSGVscGVyLFxyXG4gICAgICAgICAgICBWYWx1ZTJIZWxwZXJcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbkJvb21GaWx0ZXIucHJvdG90eXBlLkdldFZhbHVlMUhlbHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFNlY29uZGFyeUZpZWxkRGV0YWlscyh0aGlzLm9wZXJhdG9yKS5WYWx1ZTFIZWxwZXI7XHJcbn07XHJcblxyXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTJIZWxwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRTZWNvbmRhcnlGaWVsZERldGFpbHModGhpcy5vcGVyYXRvcikuVmFsdWUySGVscGVyO1xyXG59O1xyXG5cclxuQm9vbUZpbHRlci5wcm90b3R5cGUuQ2FuU2hvd1ZhbHVlMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFNlY29uZGFyeUZpZWxkRGV0YWlscyh0aGlzLm9wZXJhdG9yKS5DYW5TaG93VmFsdWUyO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5RmlsdGVyIGV4dGVuZHMgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIGV4dGVuZHMgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyLCBJQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMge1xyXG4gICAgcHVibGljIHN0YXRfdHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGJnQ29sb3I6IHN0cmluZztcclxuICAgIHB1YmxpYyB0ZXh0Q29sb3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBjdXN0b21fY3NzX2NsYXNzOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21fY3NzX2NsYXNzID0gb3B0aW9ucy5jdXN0b21fY3NzX2NsYXNzIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zdGF0X3R5cGUgPSBvcHRpb25zLnN0YXRfdHlwZSB8fCBcInJhbmRvbVwiO1xyXG4gICAgICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMudGV4dENvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3IgfHwgXCJcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdGF0IHtcclxuICAgIHB1YmxpYyBmaWVsZDtcclxuICAgIHB1YmxpYyBzdGF0X3R5cGU7XHJcbiAgICBwdWJsaWMgZGVjaW1hbHM7XHJcbiAgICBwdWJsaWMgdW5pdDtcclxuICAgIHB1YmxpYyBzZXRVbml0Rm9ybWF0O1xyXG4gICAgcHVibGljIHRpdGxlO1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZmllbGQgPSBvcHRpb25zLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICAgICAgdGhpcy5zdGF0X3R5cGUgPSBvcHRpb25zLnN0YXRfdHlwZSB8fCBcInJhbmRvbVwiO1xyXG4gICAgICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zLmRlY2ltYWxzIHx8IFwiMFwiO1xyXG4gICAgICAgIHRoaXMudW5pdCA9IG9wdGlvbnMudW5pdCB8fCBcIm5vbmVcIjtcclxuICAgICAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCB0aGlzLnN0YXRfdHlwZSArIFwiIG9mIFwiICsgdGhpcy5maWVsZCB8fCBcIkRldGFpbFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5Cb29tU3RhdC5wcm90b3R5cGUuc2V0VW5pdEZvcm1hdCA9IGZ1bmN0aW9uIChmb3JtYXQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy51bml0ID0gZm9ybWF0ICYmIGZvcm1hdC52YWx1ZSA/IGZvcm1hdC52YWx1ZSA6IFwibm9uZVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5R3JvdXAge1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3RhdHM6IEJvb21TdGF0W107XHJcbiAgICBwdWJsaWMgc3RhdFdpZHRoOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHRlbXBsYXRlVHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1c3RvbVRlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICAgIHB1YmxpYyBjb25kaXRpb25hbF9mb3JtYXRzOiBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0c1tdO1xyXG4gICAgcHVibGljIGFkZFN0YXQ7XHJcbiAgICBwdWJsaWMgcmVtb3ZlU3RhdDtcclxuICAgIHB1YmxpYyBhZGRGaWx0ZXI7XHJcbiAgICBwdWJsaWMgcmVtb3ZlRmlsdGVyO1xyXG4gICAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgICBwdWJsaWMgcmVtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgICBwdWJsaWMgbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gICAgcHVibGljIGdldG91dHB1dDtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3RhdHMgPSBvcHRpb25zLnN0YXRzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgICAgICB0aGlzLmJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3IgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGUgPSBvcHRpb25zLnRlbXBsYXRlVHlwZSB8fCBcImRlZmF1bHRcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbVRlbXBsYXRlID0gb3B0aW9ucy5jdXN0b21UZW1wbGF0ZSB8fCBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPlRvdGFsIFJlY29yZHM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjUwJTtmbG9hdDpsZWZ0O3BhZGRpbmc6MTBweDtcIj4je2NvdW50fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IG9wdGlvbnMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcclxuICAgIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUuYWRkU3RhdCA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgIGxldCBuZXdNZXRyaWMgPSBuZXcgQm9vbVN0YXQoe30pO1xyXG4gICAgdGhpcy5zdGF0cyA9IHRoaXMuc3RhdHMgfHwgW107XHJcbiAgICB0aGlzLnN0YXRzLnB1c2gobmV3TWV0cmljKTtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLnJlbW92ZVN0YXQgPSBmdW5jdGlvbiAoaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3RhdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUuYWRkRmlsdGVyID0gZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgbGV0IG5ld2ZpbHRlciA9IG5ldyBCb29tU3VtbWFyeUZpbHRlcih7XHJcbiAgICAgICAgZmllbGQ6IFwiU2FtcGxlXCIsXHJcbiAgICAgICAgb3BlcmF0b3I6IFwiZXF1YWxzXCJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gdGhpcy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5maWx0ZXJzLnB1c2gobmV3ZmlsdGVyKTtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uIChpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUuYWRkQ29uZGl0b25hbEZvcm1hdCA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgIGxldCBvcGVyYXRvciA9IFwiZXF1YWxzXCI7XHJcbiAgICBsZXQgc3RhdF90eXBlID0gXCJyYW5kb21cIjtcclxuICAgIGxldCBmaWVsZCA9IFwiU2FtcGxlXCI7XHJcbiAgICBsZXQgdmFsdWUgPSBcIlNvbWV0aGluZ1wiO1xyXG4gICAgaWYgKHRoaXMuc3RhdHMgJiYgdGhpcy5zdGF0cy5sZW5ndGggPiAwICYmIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBvcGVyYXRvciA9IFwiPD1cIjtcclxuICAgICAgICBzdGF0X3R5cGUgPSBcImNvdW50XCI7XHJcbiAgICAgICAgZmllbGQgPSB0aGlzLnN0YXRzWzBdLmZpZWxkIHx8IFwiU2FtcGxlXCI7XHJcbiAgICAgICAgdmFsdWUgPSBcIjBcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBvcGVyYXRvciA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1t0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoIC0gMV0ub3BlcmF0b3I7XHJcbiAgICAgICAgc3RhdF90eXBlID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW3RoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggLSAxXS5zdGF0X3R5cGU7XHJcbiAgICAgICAgZmllbGQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCAtIDFdLmZpZWxkO1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW3RoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggLSAxXS52YWx1ZTtcclxuICAgIH1cclxuICAgIGxldCBuZXdfY29uZGl0aW9uYWxfZm9ybWF0dGVyID0gbmV3IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzKHtcclxuICAgICAgICBmaWVsZCxcclxuICAgICAgICBvcGVyYXRvcixcclxuICAgICAgICBzdGF0X3R5cGUsXHJcbiAgICAgICAgdmFsdWVcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnB1c2gobmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5yZW1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uIChpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24gKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgICAgICAgIE51bWJlcihpbmRleCkgLSAxXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcclxuICAgICAgICAgICAgTnVtYmVyKGluZGV4KSArIDFcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgIH1cclxufTtcclxuXHJcbmxldCByZXBsYWNlU3RhdHNGcm9tVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHN0YXRzLCBkYXRhKTogc3RyaW5nIHtcclxuICAgIGxldCBvdXRwdXQgPSB0ZW1wbGF0ZTtcclxuICAgIF8uZWFjaChzdGF0cywgKHN0YXQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3RhdHMgPSB7XHJcbiAgICAgICAgICAgIGNvdW50OiBOYU4sXHJcbiAgICAgICAgICAgIG1heDogTmFOLFxyXG4gICAgICAgICAgICBtZWFuOiBOYU4sXHJcbiAgICAgICAgICAgIG1pbjogTmFOLFxyXG4gICAgICAgICAgICByYW5kb206IFwiXCIsXHJcbiAgICAgICAgICAgIHN1bTogTmFOLFxyXG4gICAgICAgICAgICB1bmlxdWVjb3VudDogTmFOLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICBfLmVhY2goZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBzdGF0LmZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlzdGF0cy5wdXNoKF8uZmlyc3QobWF0Y2hpbmdfZmllbGQpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15c3RhdHNPYmplY3QgPSBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyhteXN0YXRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2NvdW50fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LmNvdW50KTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dW5pcXVlY291bnR9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QudW5pcXVlY291bnQpO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tzdW19XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3Quc3VtKTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWVhbn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5tZWFuKTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWlufVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1pbik7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21heH1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5tYXgpO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tyYW5kbW9ufVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnJhbmRvbSk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3RpdGxlfVwiLCBcImdpXCIpLCBzdGF0LnRpdGxlIHx8IGAke3N0YXQuc3RhdF90eXBlfSBvZiAke3N0YXQuZmllbGR9YCk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2RlZmF1bHR9XCIsIFwiZ2lcIiksIGdldEZvcm1hdHRlZE91dHB1dChteXN0YXRzT2JqZWN0W3N0YXQuc3RhdF90eXBlXSwgc3RhdC51bml0LCBzdGF0LmRlY2ltYWxzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje1wiICsgc3RhdC5zdGF0X3R5cGUgKyBcIixcIiArIHN0YXQuZmllbGQgKyBcIn1cIiwgXCJnaVwiKSwgZ2V0Rm9ybWF0dGVkT3V0cHV0KG15c3RhdHNPYmplY3Rbc3RhdC5zdGF0X3R5cGVdLCBzdGF0LnVuaXQsIHN0YXQuZGVjaW1hbHMpKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tcIiArIHN0YXQuc3RhdF90eXBlICsgXCIsXCIgKyBzdGF0LmZpZWxkICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0W3N0YXQuZGVmYXVsdFN0YXRdKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tcIiArIHN0YXQuc3RhdF90eXBlICsgXCIsXCIgKyBzdGF0LmZpZWxkICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIHN0YXQudGl0bGUpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgY29sbmFtZXM6IGFueVtdID0gW107XHJcbiAgICBfLmVhY2goZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgICAgIF8uZWFjaChncm91cCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbG5hbWVzLnB1c2goaXRlbS5jb2xuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgY29sbmFtZXMgPSBfLnVuaXEoY29sbmFtZXMpO1xyXG4gICAgXy5lYWNoKGNvbG5hbWVzLCAoY29sbmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbXlzdGF0c09iamVjdDogSUJvb21TdGF0cyA9IHtcclxuICAgICAgICAgICAgY291bnQ6IE5hTixcclxuICAgICAgICAgICAgbWF4OiBOYU4sXHJcbiAgICAgICAgICAgIG1lYW46IE5hTixcclxuICAgICAgICAgICAgbWluOiBOYU4sXHJcbiAgICAgICAgICAgIHJhbmRvbTogXCJcIixcclxuICAgICAgICAgICAgc3VtOiBOYU4sXHJcbiAgICAgICAgICAgIHVuaXF1ZWNvdW50OiBOYU4sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXlzdGF0czogYW55ID0gW107XHJcbiAgICAgICAgICAgIF8uZWFjaChkYXRhLCBncm91cCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGNvbG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBteXN0YXRzLnB1c2goXy5maXJzdChtYXRjaGluZ19maWVsZCkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlzdGF0c09iamVjdCA9IGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzKG15c3RhdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dGl0bGV9XCIsIFwiZ2lcIiksIGAke2NvbG5hbWV9YCk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2RlZmF1bHR9XCIsIFwiZ2lcIiksIGdldEZvcm1hdHRlZE91dHB1dChteXN0YXRzT2JqZWN0LnJhbmRvbSwgXCJub25lXCIsIFwiMFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2NvdW50LFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LmNvdW50KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t1bmlxdWVjb3VudCxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC51bmlxdWVjb3VudCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7c3VtLFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWVhbixcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5tZWFuKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWluKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttYXgsXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tyYW5kb20sXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QucmFuZG9tKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tjb3VudCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuY291bnQpO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3VuaXF1ZWNvdW50LFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC51bmlxdWVjb3VudCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7c3VtLFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5zdW0pO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW4sXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1lYW4pO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21pbixcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWluKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttYXgsXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1heCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7cmFuZG9tLFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5yYW5kb20pO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2NvdW50LFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgQ291bnQgb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3VuaXF1ZWNvdW50LFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgVW5pcXVlIENvdW50IG9mICR7Y29sbmFtZX1gKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tzdW0sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBTdW0gb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW4sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBNZWFuIG9mICR7Y29sbmFtZX1gKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBtaW4gb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21heCxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYE1heCBvZiAke2NvbG5hbWV9YCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7cmFuZG9tLFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgUmFuZG9tICR7Y29sbmFtZX1gKTtcclxuICAgIH0pO1xyXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Y291bnR9XCIsIFwiZ2lcIiksIGRhdGEubGVuZ3RoKTtcclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbn07XHJcblxyXG5sZXQgcmVwbGFjZUZBVG9rZW5zID0gZnVuY3Rpb24gKHRlbXBsYXRlKTogc3RyaW5nIHtcclxuICAgIHJldHVybiByZXBsYWNlVG9rZW5zKHRlbXBsYXRlKTtcclxufTtcclxuXHJcbmxldCBnZXRNYXRjaGluZ0NvbmRpdGlvbiA9IGZ1bmN0aW9uIChkYXRhLCBjb25kaXRpb25hbF9mb3JtYXRzKSB7XHJcbiAgICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9ucyA9IGNvbmRpdGlvbmFsX2Zvcm1hdHMuZmlsdGVyKGNvbmRpdGlvbiA9PiB7XHJcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3RhdHMgPSB7XHJcbiAgICAgICAgICAgIGNvdW50OiBOYU4sXHJcbiAgICAgICAgICAgIG1heDogTmFOLFxyXG4gICAgICAgICAgICBtZWFuOiBOYU4sXHJcbiAgICAgICAgICAgIG1pbjogTmFOLFxyXG4gICAgICAgICAgICByYW5kb206IFwiXCIsXHJcbiAgICAgICAgICAgIHN1bTogTmFOLFxyXG4gICAgICAgICAgICB1bmlxdWVjb3VudDogTmFOLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICBfLmVhY2goZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBjb25kaXRpb24uZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBteXN0YXRzLnB1c2goXy5maXJzdChtYXRjaGluZ19maWVsZCkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlzdGF0c09iamVjdCA9IGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzKG15c3RhdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNNYXRjaChteXN0YXRzT2JqZWN0W2NvbmRpdGlvbi5zdGF0X3R5cGVdLCBjb25kaXRpb24ub3BlcmF0b3IsIGNvbmRpdGlvbi52YWx1ZSwgY29uZGl0aW9uLnZhbHVlMik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaGluZ19jb25kaXRpb25zICYmIG1hdGNoaW5nX2NvbmRpdGlvbnMubGVuZ3RoID4gMCA/IF8uZmlyc3QobWF0Y2hpbmdfY29uZGl0aW9ucykgOiBudWxsO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUuZ2V0b3V0cHV0ID0gZnVuY3Rpb24gKG1hc3RlcmRhdGEpOiBzdHJpbmcge1xyXG4gICAgaWYgKG1hc3RlcmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7Jz5ObyBEYXRhPC9kaXY+XCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBnZXRGaWx0ZXJlZERhdGFGcm9tTWFzdGVyRGF0YShtYXN0ZXJkYXRhLCB0aGlzLmZpbHRlcnMpO1xyXG4gICAgICAgIGxldCBtYXRjaGluZ19jb25kaXRpb24gPSBnZXRNYXRjaGluZ0NvbmRpdGlvbihmaWx0ZXJlZERhdGEsIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyk7XHJcbiAgICAgICAgbGV0IGJnQ29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLmJnQ29sb3IgPyBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvciA6IHRoaXMuYmdDb2xvcjtcclxuICAgICAgICBsZXQgdGV4dENvbG9yID0gbWF0Y2hpbmdfY29uZGl0aW9uICYmIG1hdGNoaW5nX2NvbmRpdGlvbi50ZXh0Q29sb3IgPyBtYXRjaGluZ19jb25kaXRpb24udGV4dENvbG9yIDogdGhpcy50ZXh0Q29sb3I7XHJcbiAgICAgICAgbGV0IGN1c3RvbV9jc3NfY2xhc3MgPSBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLmN1c3RvbV9jc3NfY2xhc3MgPyBtYXRjaGluZ19jb25kaXRpb24uY3VzdG9tX2Nzc19jbGFzcyA6IFwibm90X2FwcGxpY2FibGVcIjtcclxuICAgICAgICBpZiAoY3VzdG9tX2Nzc19jbGFzcyAhPT0gXCJub3RfYXBwbGljYWJsZVwiKSB7XHJcbiAgICAgICAgICAgIGJnQ29sb3IgPSBcIm5vdF9hcHBsaWNhYmxlXCI7XHJcbiAgICAgICAgICAgIHRleHRDb2xvciA9IFwibm90X2FwcGxpY2FibGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG91dFRlbXBsYXRlID0gZmlsdGVyZWREYXRhLmxlbmd0aCArIFwiIHJlY29yZHMgZm91bmRcIjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudGVtcGxhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aXRsZW9ubHlcIjpcclxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+I3tkZWZhdWx0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcclxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYGA7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zdGF0cywgc3RhdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgKz0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7JHtzdGF0LnN0YXRfdHlwZX0sJHtzdGF0LmZpZWxkfSx0aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7JHtzdGF0LnN0YXRfdHlwZX0sJHtzdGF0LmZpZWxkfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImp1bWJvXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtmbG9hdDpsZWZ0O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlcjoxcHggc29saWQgYmxhY2s7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5cXCN7dGl0bGV9PC9oNT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxPlxcI3tkZWZhdWx0fTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwianVtYm9fd2l0aG91dF90aXRsZVwiOlxyXG4gICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgPSBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+XFwje2RlZmF1bHR9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh0aGlzLnRlbXBsYXRlVHlwZSA9PT0gXCJhdXRvXCIgfHwgdGhpcy50ZW1wbGF0ZVR5cGUgPT09IFwianVtYm9cIiB8fCB0aGlzLnRlbXBsYXRlVHlwZSA9PT0gXCJqdW1ib193aXRob3V0X3RpdGxlXCIgfHwgdGhpcy50ZW1wbGF0ZVR5cGUgPT09IFwidGl0bGVvbmx5XCIpICYmIHRoaXMuc3RhdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOnJlZDtcIj5Pb3BzLiBZb3UgZG9uJ3QgaGF2ZSBhbnkgc3RhdHMgZGVmaW5lZCBmb3IgdGhpcyBzdW1tYXJ5IGdyb3VwPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG91dHB1dF93aXRoX3N0YXRzUmVwbGFjZWQgPSByZXBsYWNlU3RhdHNGcm9tVGVtcGxhdGUob3V0VGVtcGxhdGUsIHRoaXMuc3RhdHMsIGZpbHRlcmVkRGF0YSk7XHJcbiAgICAgICAgbGV0IG91dHB1dF93aXRoX3Rva2Vuc3JlcGxhY2VkID0gcmVwbGFjZUZBVG9rZW5zKG91dHB1dF93aXRoX3N0YXRzUmVwbGFjZWQpO1xyXG4gICAgICAgIGlmIChvdXRwdXRfd2l0aF90b2tlbnNyZXBsYWNlZC50cmltKCkuaW5kZXhPZihcIjxcIikgIT09IDApIHtcclxuICAgICAgICAgICAgb3V0cHV0X3dpdGhfdG9rZW5zcmVwbGFjZWQgPSBgJHtvdXRwdXRfd2l0aF90b2tlbnNyZXBsYWNlZC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXG5cIiwgXCJnaVwiKSwgXCI8YnIvPlwiKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJ3aWR0aDoke3RoaXMuc3RhdFdpZHRoIHx8IFwiMTAwXCJ9JTtmbG9hdDpsZWZ0O2JhY2tncm91bmQ6JHtiZ0NvbG9yfTtjb2xvcjoke3RleHRDb2xvcn07XCIgY2xhc3M9XCIke2N1c3RvbV9jc3NfY2xhc3N9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtvdXRwdXRfd2l0aF90b2tlbnNyZXBsYWNlZH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==