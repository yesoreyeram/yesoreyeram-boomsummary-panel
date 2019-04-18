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
                    _this.stat_type = options.stat_type || "first";
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
                    this.stat_type = options.stat_type || "first";
                    this.format_as = options.format_as || "string";
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
                var stat_type = "first";
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
                        first: "",
                        max: NaN,
                        mean: NaN,
                        min: NaN,
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
                        output = output.replace(new RegExp("#{first}", "gi"), mystatsObject.first);
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
                        first: "",
                        max: NaN,
                        mean: NaN,
                        min: NaN,
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
                        output = output.replace(new RegExp("#{default}", "gi"), GrafanaUtils_1.getFormattedOutput(mystatsObject.first, "none", "0"));
                    }
                    output = output.replace(new RegExp("#{count," + colname + "}", "gi"), mystatsObject.count);
                    output = output.replace(new RegExp("#{uniquecount," + colname + "}", "gi"), mystatsObject.uniquecount);
                    output = output.replace(new RegExp("#{sum," + colname + "}", "gi"), mystatsObject.sum);
                    output = output.replace(new RegExp("#{mean," + colname + "}", "gi"), mystatsObject.mean);
                    output = output.replace(new RegExp("#{min," + colname + "}", "gi"), mystatsObject.min);
                    output = output.replace(new RegExp("#{max," + colname + "}", "gi"), mystatsObject.max);
                    output = output.replace(new RegExp("#{first," + colname + "}", "gi"), mystatsObject.first);
                    output = output.replace(new RegExp("#{count," + colname + ",raw}", "gi"), mystatsObject.count);
                    output = output.replace(new RegExp("#{uniquecount," + colname + ",raw}", "gi"), mystatsObject.uniquecount);
                    output = output.replace(new RegExp("#{sum," + colname + ",raw}", "gi"), mystatsObject.sum);
                    output = output.replace(new RegExp("#{mean," + colname + ",raw}", "gi"), mystatsObject.mean);
                    output = output.replace(new RegExp("#{min," + colname + ",raw}", "gi"), mystatsObject.min);
                    output = output.replace(new RegExp("#{max," + colname + ",raw}", "gi"), mystatsObject.max);
                    output = output.replace(new RegExp("#{first," + colname + ",raw}", "gi"), mystatsObject.first);
                    output = output.replace(new RegExp("#{count," + colname + ",title}", "gi"), "Count of " + colname);
                    output = output.replace(new RegExp("#{uniquecount," + colname + ",title}", "gi"), "Unique Count of " + colname);
                    output = output.replace(new RegExp("#{sum," + colname + ",title}", "gi"), "Sum of " + colname);
                    output = output.replace(new RegExp("#{mean," + colname + ",title}", "gi"), "Mean of " + colname);
                    output = output.replace(new RegExp("#{min," + colname + ",title}", "gi"), "min of " + colname);
                    output = output.replace(new RegExp("#{max," + colname + ",title}", "gi"), "Max of " + colname);
                    output = output.replace(new RegExp("#{first," + colname + ",title}", "gi"), "First " + colname);
                });
                return output;
            };
            replaceFATokens = function (template) {
                return BoomUtils_2.replaceTokens(template);
            };
            getMatchingCondition = function (data, conditional_formats) {
                var matching_conditions = conditional_formats.filter(function (condition) {
                    var mystatsObject = {
                        count: NaN,
                        first: "",
                        max: NaN,
                        mean: NaN,
                        min: NaN,
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
                    var matching_condition = getMatchingCondition(filteredData, this.conditional_formats);
                    var bgColor = matching_condition && matching_condition.bgColor ? matching_condition.bgColor : this.bgColor;
                    var textColor = matching_condition && matching_condition.textColor ? matching_condition.textColor : this.textColor;
                    var custom_css_class = matching_condition && matching_condition.custom_css_class ? matching_condition.custom_css_class : "not_applicable";
                    if (custom_css_class !== "not_applicable") {
                        bgColor = "not_applicable";
                        textColor = "not_applicable";
                    }
                    var output_with_statsReplaced = replaceStatsFromTemplate(outTemplate_1, this.stats, filteredData);
                    var output_with_tokensreplaced = replaceFATokens(output_with_statsReplaced);
                    return "<div style=\"width:" + (this.statWidth || "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\" class=\"" + custom_css_class + "\">\n                    " + output_with_tokensreplaced + "\n                </div>";
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN1bW1hcnlHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb29tU3VtbWFyeUdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQSw2QkFBVyxlQUFlLEdBQUcsVUFBVSxJQUFJO2dCQUN2QyxJQUFJLFVBQVUsR0FBb0IsRUFBRSxDQUFDO2dCQUNyQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO29CQUNWLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQ3BCLElBQUksT0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3BCLGdCQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDbEIsSUFBSSxLQUFLLEdBQWtCLEVBQUUsQ0FBQzs0QkFDOUIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ2YsSUFBSSxNQUFNLEdBQWdCO29DQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29DQUMxQixLQUFLLFNBQUE7b0NBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQztvQ0FDVCxLQUFLLEVBQUUsR0FBRztpQ0FDYixDQUFDO2dDQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3ZCLENBQUMsQ0FBQyxDQUFDOzRCQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztxQkFDcEU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxVQUFVLENBQUM7WUFDdEIs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QyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7b0JBQzFJLElBQUksZ0JBQWdCLEtBQUssZ0JBQWdCLEVBQUU7d0JBQ3ZDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQzt3QkFDM0IsU0FBUyxHQUFHLGdCQUFnQixDQUFDO3FCQUNoQztvQkFDRCxJQUFJLHlCQUF5QixHQUFHLHdCQUF3QixDQUFDLGFBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNoRyxJQUFJLDBCQUEwQixHQUFHLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO29CQUM1RSxPQUFPLHlCQUFxQixJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssaUNBQTJCLE9BQU8sZUFBVSxTQUFTLG9CQUFhLGdCQUFnQixpQ0FDdkgsMEJBQTBCLDZCQUN6QixDQUFDO2lCQUNuQjtZQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgSU1hc3RlckRhdGEsIElCb29tRmlsdGVyLCBJQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMsIElCb29tU3VtbWFyeUdyb3VwIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgZ2V0RmlsdGVyZWREYXRhRnJvbU1hc3RlckRhdGEgfSBmcm9tIFwiLi9BcHBVdGlsc1wiO1xyXG5pbXBvcnQgeyBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cywgaXNNYXRjaCB9IGZyb20gXCIuL0Jvb21VdGlsc1wiO1xyXG5pbXBvcnQgeyBnZXRGb3JtYXR0ZWRPdXRwdXQgfSBmcm9tIFwiLi9HcmFmYW5hVXRpbHNcIjtcclxuaW1wb3J0IHsgcmVwbGFjZVRva2VucyB9IGZyb20gXCIuL0Jvb21VdGlsc1wiO1xyXG5cclxuZXhwb3J0IGxldCBidWlsZE1hc3RlckRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgbGV0IG1hc3RlcmRhdGE6IElNYXN0ZXJEYXRhW11bXSA9IFtdO1xyXG4gICAgXy5lYWNoKGRhdGEsIGQgPT4ge1xyXG4gICAgICAgIGlmIChkLnR5cGUgPT09IFwidGFibGVcIikge1xyXG4gICAgICAgICAgICBsZXQgcmVmSWQgPSBkLnJlZklkO1xyXG4gICAgICAgICAgICBfLmVhY2goZC5yb3dzLCAocm93LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXA6IElNYXN0ZXJEYXRhW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIF8uZWFjaChyb3csIChjb2wsIGopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXlkYXRhOiBJTWFzdGVyRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbmFtZTogZC5jb2x1bW5zW2pdLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dpZDogK2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb2xcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnB1c2gobXlkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyZGF0YS5wdXNoKGdyb3VwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBPbmx5IHRhYmxlIGZvcm1hdCBpcyBjdXJyZW50bHkgc3VwcG9ydGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hc3RlcmRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyIHtcclxuICAgIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gICAgcHVibGljIG9wZXJhdG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZztcclxuICAgIHB1YmxpYyB2YWx1ZTI6IHN0cmluZztcclxuICAgIHB1YmxpYyBDYW5TaG93VmFsdWUyO1xyXG4gICAgcHVibGljIEdldFZhbHVlMkhlbHBlcjtcclxuICAgIHB1YmxpYyBHZXRWYWx1ZTFIZWxwZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvciB8fCBcImVxdWFsc1wiO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBvcHRpb25zLnZhbHVlIHx8IFwiU29tZXRoaW5nXCI7XHJcbiAgICAgICAgdGhpcy52YWx1ZTIgPSBvcHRpb25zLnZhbHVlMiB8fCBcIlwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFNlY29uZGFyeUZpZWxkRGV0YWlscyA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xyXG4gICAgICAgIGxldCBDYW5TaG93VmFsdWUyID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IFZhbHVlMUhlbHBlciA9IFwiVmFsdWVcIjtcclxuICAgICAgICBsZXQgVmFsdWUySGVscGVyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYmV0d2VlblwiOlxyXG4gICAgICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTFIZWxwZXIgPSBcIkZyb21cIjtcclxuICAgICAgICAgICAgICAgIFZhbHVlMkhlbHBlciA9IFwiVG9cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5zaWRlcmFuZ2VcIjpcclxuICAgICAgICAgICAgICAgIENhblNob3dWYWx1ZTIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUxSGVscGVyID0gXCJGcm9tXCI7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTJIZWxwZXIgPSBcIlRvXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm91dHNpZGVyYW5nZVwiOlxyXG4gICAgICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTFIZWxwZXIgPSBcIkZyb21cIjtcclxuICAgICAgICAgICAgICAgIFZhbHVlMkhlbHBlciA9IFwiVG9cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5cIjpcclxuICAgICAgICAgICAgICAgIENhblNob3dWYWx1ZTIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUxSGVscGVyID0gXCJWYWx1ZXNcIjtcclxuICAgICAgICAgICAgICAgIFZhbHVlMkhlbHBlciA9IFwiU2VwZXJhdG9yXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBDYW5TaG93VmFsdWUyLFxyXG4gICAgICAgICAgICBWYWx1ZTFIZWxwZXIsXHJcbiAgICAgICAgICAgIFZhbHVlMkhlbHBlclxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuQm9vbUZpbHRlci5wcm90b3R5cGUuR2V0VmFsdWUxSGVscGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLlZhbHVlMUhlbHBlcjtcclxufTtcclxuXHJcbkJvb21GaWx0ZXIucHJvdG90eXBlLkdldFZhbHVlMkhlbHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFNlY29uZGFyeUZpZWxkRGV0YWlscyh0aGlzLm9wZXJhdG9yKS5WYWx1ZTJIZWxwZXI7XHJcbn07XHJcblxyXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5DYW5TaG93VmFsdWUyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLkNhblNob3dWYWx1ZTI7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlGaWx0ZXIgZXh0ZW5kcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgZXh0ZW5kcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIsIElCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyB7XHJcbiAgICBwdWJsaWMgc3RhdF90eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1c3RvbV9jc3NfY2xhc3M6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmN1c3RvbV9jc3NfY2xhc3MgPSBvcHRpb25zLmN1c3RvbV9jc3NfY2xhc3MgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnN0YXRfdHlwZSA9IG9wdGlvbnMuc3RhdF90eXBlIHx8IFwiZmlyc3RcIjtcclxuICAgICAgICB0aGlzLmJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3IgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb29tU3RhdCB7XHJcbiAgICBwdWJsaWMgZmllbGQ7XHJcbiAgICBwdWJsaWMgc3RhdF90eXBlO1xyXG4gICAgcHVibGljIGZvcm1hdF9hcztcclxuICAgIHB1YmxpYyBkZWNpbWFscztcclxuICAgIHB1YmxpYyB1bml0O1xyXG4gICAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgICBwdWJsaWMgdGl0bGU7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgICAgICB0aGlzLnN0YXRfdHlwZSA9IG9wdGlvbnMuc3RhdF90eXBlIHx8IFwiZmlyc3RcIjtcclxuICAgICAgICB0aGlzLmZvcm1hdF9hcyA9IG9wdGlvbnMuZm9ybWF0X2FzIHx8IFwic3RyaW5nXCI7XHJcbiAgICAgICAgdGhpcy5kZWNpbWFscyA9IG9wdGlvbnMuZGVjaW1hbHMgfHwgXCIwXCI7XHJcbiAgICAgICAgdGhpcy51bml0ID0gb3B0aW9ucy51bml0IHx8IFwibm9uZVwiO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuc3RhdF90eXBlICsgXCIgb2YgXCIgKyB0aGlzLmZpZWxkIHx8IFwiRGV0YWlsXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJvb21TdGF0LnByb3RvdHlwZS5zZXRVbml0Rm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnVuaXQgPSBmb3JtYXQgJiYgZm9ybWF0LnZhbHVlID8gZm9ybWF0LnZhbHVlIDogXCJub25lXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlHcm91cCB7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdGF0czogQm9vbVN0YXRbXTtcclxuICAgIHB1YmxpYyBzdGF0V2lkdGg6IFN0cmluZztcclxuICAgIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGVtcGxhdGVUeXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgY3VzdG9tVGVtcGxhdGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWx0ZXJzOiBCb29tU3VtbWFyeUZpbHRlcltdO1xyXG4gICAgcHVibGljIGNvbmRpdGlvbmFsX2Zvcm1hdHM6IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzW107XHJcbiAgICBwdWJsaWMgYWRkU3RhdDtcclxuICAgIHB1YmxpYyByZW1vdmVTdGF0O1xyXG4gICAgcHVibGljIGFkZEZpbHRlcjtcclxuICAgIHB1YmxpYyByZW1vdmVGaWx0ZXI7XHJcbiAgICBwdWJsaWMgYWRkQ29uZGl0b25hbEZvcm1hdDtcclxuICAgIHB1YmxpYyByZW1vdmVDb25kaXRpb25hbEZvcm1hdDtcclxuICAgIHB1YmxpYyBtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgICBwdWJsaWMgZ2V0b3V0cHV0O1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IG9wdGlvbnMuc3RhdHMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zdGF0V2lkdGggPSBvcHRpb25zLnN0YXRXaWR0aCB8fCBcIjEwMFwiO1xyXG4gICAgICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMudGV4dENvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3IgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlVHlwZSA9IG9wdGlvbnMudGVtcGxhdGVUeXBlIHx8IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tVGVtcGxhdGUgPSBvcHRpb25zLmN1c3RvbVRlbXBsYXRlIHx8IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtmbG9hdDpsZWZ0O2JvcmRlcjoxcHggc29saWQgYmxhY2s7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDo1MCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7XCI+VG90YWwgUmVjb3JkczwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7Y291bnR9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmZpbHRlcnMgfHwgW107XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gb3B0aW9ucy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5hZGRTdGF0ID0gZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgbGV0IG5ld01ldHJpYyA9IG5ldyBCb29tU3RhdCh7fSk7XHJcbiAgICB0aGlzLnN0YXRzID0gdGhpcy5zdGF0cyB8fCBbXTtcclxuICAgIHRoaXMuc3RhdHMucHVzaChuZXdNZXRyaWMpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUucmVtb3ZlU3RhdCA9IGZ1bmN0aW9uIChpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdGF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbiAoKTogdm9pZCB7XHJcbiAgICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHtcclxuICAgICAgICBmaWVsZDogXCJTYW1wbGVcIixcclxuICAgICAgICBvcGVyYXRvcjogXCJlcXVhbHNcIlxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZpbHRlcnMgPSB0aGlzLmZpbHRlcnMgfHwgW107XHJcbiAgICB0aGlzLmZpbHRlcnMucHVzaChuZXdmaWx0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUucmVtb3ZlRmlsdGVyID0gZnVuY3Rpb24gKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5hZGRDb25kaXRvbmFsRm9ybWF0ID0gZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgbGV0IG9wZXJhdG9yID0gXCJlcXVhbHNcIjtcclxuICAgIGxldCBzdGF0X3R5cGUgPSBcImZpcnN0XCI7XHJcbiAgICBsZXQgZmllbGQgPSBcIlNhbXBsZVwiO1xyXG4gICAgbGV0IHZhbHVlID0gXCJTb21ldGhpbmdcIjtcclxuICAgIGlmICh0aGlzLnN0YXRzICYmIHRoaXMuc3RhdHMubGVuZ3RoID4gMCAmJiB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgb3BlcmF0b3IgPSBcIjw9XCI7XHJcbiAgICAgICAgc3RhdF90eXBlID0gXCJjb3VudFwiO1xyXG4gICAgICAgIGZpZWxkID0gdGhpcy5zdGF0c1swXS5maWVsZCB8fCBcIlNhbXBsZVwiO1xyXG4gICAgICAgIHZhbHVlID0gXCIwXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgb3BlcmF0b3IgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCAtIDFdLm9wZXJhdG9yO1xyXG4gICAgICAgIHN0YXRfdHlwZSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1t0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoIC0gMV0uc3RhdF90eXBlO1xyXG4gICAgICAgIGZpZWxkID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW3RoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggLSAxXS5maWVsZDtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1t0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoIC0gMV0udmFsdWU7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlciA9IG5ldyBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyh7XHJcbiAgICAgICAgZmllbGQsXHJcbiAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgc3RhdF90eXBlLFxyXG4gICAgICAgIHZhbHVlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5wdXNoKG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlHcm91cC5wcm90b3R5cGUucmVtb3ZlQ29uZGl0aW9uYWxGb3JtYXQgPSBmdW5jdGlvbiAoaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnNwbGljZShOdW1iZXIoaW5kZXgpLCAxKTtcclxuICAgIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5R3JvdXAucHJvdG90eXBlLm1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uIChkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW1xyXG4gICAgICAgICAgICBOdW1iZXIoaW5kZXgpIC0gMVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgICAgICAgIE51bWJlcihpbmRleCkgKyAxXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5sZXQgcmVwbGFjZVN0YXRzRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBzdGF0cywgZGF0YSk6IHN0cmluZyB7XHJcbiAgICBsZXQgb3V0cHV0ID0gdGVtcGxhdGU7XHJcbiAgICBfLmVhY2goc3RhdHMsIChzdGF0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBteXN0YXRzT2JqZWN0OiBJQm9vbVN1bW1hcnlHcm91cCA9IHtcclxuICAgICAgICAgICAgY291bnQ6IE5hTixcclxuICAgICAgICAgICAgZmlyc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIG1heDogTmFOLFxyXG4gICAgICAgICAgICBtZWFuOiBOYU4sXHJcbiAgICAgICAgICAgIG1pbjogTmFOLFxyXG4gICAgICAgICAgICBzdW06IE5hTixcclxuICAgICAgICAgICAgdW5pcXVlY291bnQ6IE5hTixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gc3RhdC5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteXN0YXRzT2JqZWN0ID0gZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMobXlzdGF0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tjb3VudH1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5jb3VudCk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3VuaXF1ZWNvdW50fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnVuaXF1ZWNvdW50KTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7c3VtfVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW59XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWVhbik7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21pbn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5taW4pO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttYXh9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Zmlyc3R9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuZmlyc3QpO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t0aXRsZX1cIiwgXCJnaVwiKSwgc3RhdC50aXRsZSB8fCBgJHtzdGF0LnN0YXRfdHlwZX0gb2YgJHtzdGF0LmZpZWxkfWApO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tkZWZhdWx0fVwiLCBcImdpXCIpLCBnZXRGb3JtYXR0ZWRPdXRwdXQobXlzdGF0c09iamVjdFtzdGF0LnN0YXRfdHlwZV0sIHN0YXQudW5pdCwgc3RhdC5kZWNpbWFscykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tcIiArIHN0YXQuc3RhdF90eXBlICsgXCIsXCIgKyBzdGF0LmZpZWxkICsgXCJ9XCIsIFwiZ2lcIiksIGdldEZvcm1hdHRlZE91dHB1dChteXN0YXRzT2JqZWN0W3N0YXQuc3RhdF90eXBlXSwgc3RhdC51bml0LCBzdGF0LmRlY2ltYWxzKSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7XCIgKyBzdGF0LnN0YXRfdHlwZSArIFwiLFwiICsgc3RhdC5maWVsZCArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdFtzdGF0LmRlZmF1bHRTdGF0XSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7XCIgKyBzdGF0LnN0YXRfdHlwZSArIFwiLFwiICsgc3RhdC5maWVsZCArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBzdGF0LnRpdGxlKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGNvbG5hbWVzOiBhbnlbXSA9IFtdO1xyXG4gICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICBfLmVhY2goZ3JvdXAsIGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb2xuYW1lcy5wdXNoKGl0ZW0uY29sbmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGNvbG5hbWVzID0gXy51bmlxKGNvbG5hbWVzKTtcclxuICAgIF8uZWFjaChjb2xuYW1lcywgKGNvbG5hbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3VtbWFyeUdyb3VwID0ge1xyXG4gICAgICAgICAgICBjb3VudDogTmFOLFxyXG4gICAgICAgICAgICBmaXJzdDogXCJcIixcclxuICAgICAgICAgICAgbWF4OiBOYU4sXHJcbiAgICAgICAgICAgIG1lYW46IE5hTixcclxuICAgICAgICAgICAgbWluOiBOYU4sXHJcbiAgICAgICAgICAgIHN1bTogTmFOLFxyXG4gICAgICAgICAgICB1bmlxdWVjb3VudDogTmFOLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICBfLmVhY2goZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBjb2xuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlzdGF0cy5wdXNoKF8uZmlyc3QobWF0Y2hpbmdfZmllbGQpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15c3RhdHNPYmplY3QgPSBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyhteXN0YXRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3RpdGxlfVwiLCBcImdpXCIpLCBgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tkZWZhdWx0fVwiLCBcImdpXCIpLCBnZXRGb3JtYXR0ZWRPdXRwdXQobXlzdGF0c09iamVjdC5maXJzdCwgXCJub25lXCIsIFwiMFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2NvdW50LFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LmNvdW50KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t1bmlxdWVjb3VudCxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC51bmlxdWVjb3VudCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7c3VtLFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWVhbixcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5tZWFuKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWluKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttYXgsXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tmaXJzdCxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5maXJzdCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Y291bnQsXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LmNvdW50KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t1bmlxdWVjb3VudCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QudW5pcXVlY291bnQpO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3N1bSxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3Quc3VtKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttZWFuLFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5tZWFuKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1pbik7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWF4LFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5tYXgpO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2ZpcnN0LFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5maXJzdCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Y291bnQsXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBDb3VudCBvZiAke2NvbG5hbWV9YCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dW5pcXVlY291bnQsXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBVbmlxdWUgQ291bnQgb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3N1bSxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYFN1bSBvZiAke2NvbG5hbWV9YCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWVhbixcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYE1lYW4gb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21pbixcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYG1pbiBvZiAke2NvbG5hbWV9YCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWF4LFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgTWF4IG9mICR7Y29sbmFtZX1gKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tmaXJzdCxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYEZpcnN0ICR7Y29sbmFtZX1gKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG91dHB1dDtcclxufTtcclxuXHJcbmxldCByZXBsYWNlRkFUb2tlbnMgPSBmdW5jdGlvbiAodGVtcGxhdGUpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHJlcGxhY2VUb2tlbnModGVtcGxhdGUpO1xyXG59O1xyXG5cclxubGV0IGdldE1hdGNoaW5nQ29uZGl0aW9uID0gZnVuY3Rpb24gKGRhdGEsIGNvbmRpdGlvbmFsX2Zvcm1hdHMpIHtcclxuICAgIGxldCBtYXRjaGluZ19jb25kaXRpb25zID0gY29uZGl0aW9uYWxfZm9ybWF0cy5maWx0ZXIoY29uZGl0aW9uID0+IHtcclxuICAgICAgICBsZXQgbXlzdGF0c09iamVjdDogSUJvb21TdW1tYXJ5R3JvdXAgPSB7XHJcbiAgICAgICAgICAgIGNvdW50OiBOYU4sXHJcbiAgICAgICAgICAgIGZpcnN0OiBcIlwiLFxyXG4gICAgICAgICAgICBtYXg6IE5hTixcclxuICAgICAgICAgICAgbWVhbjogTmFOLFxyXG4gICAgICAgICAgICBtaW46IE5hTixcclxuICAgICAgICAgICAgc3VtOiBOYU4sXHJcbiAgICAgICAgICAgIHVuaXF1ZWNvdW50OiBOYU4sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXlzdGF0czogYW55ID0gW107XHJcbiAgICAgICAgICAgIF8uZWFjaChkYXRhLCBncm91cCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGNvbmRpdGlvbi5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteXN0YXRzT2JqZWN0ID0gZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMobXlzdGF0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc01hdGNoKG15c3RhdHNPYmplY3RbY29uZGl0aW9uLnN0YXRfdHlwZV0sIGNvbmRpdGlvbi5vcGVyYXRvciwgY29uZGl0aW9uLnZhbHVlLCBjb25kaXRpb24udmFsdWUyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoaW5nX2NvbmRpdGlvbnMgJiYgbWF0Y2hpbmdfY29uZGl0aW9ucy5sZW5ndGggPiAwID8gXy5maXJzdChtYXRjaGluZ19jb25kaXRpb25zKSA6IG51bGw7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZS5nZXRvdXRwdXQgPSBmdW5jdGlvbiAobWFzdGVyZGF0YSk6IHN0cmluZyB7XHJcbiAgICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gXCI8ZGl2IHN0eWxlPSd0ZXh0LWFsaWduOmNlbnRlcjsnPk5vIERhdGE8L2Rpdj5cIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhKG1hc3RlcmRhdGEsIHRoaXMuZmlsdGVycyk7XHJcbiAgICAgICAgbGV0IG91dFRlbXBsYXRlID0gZmlsdGVyZWREYXRhLmxlbmd0aCArIFwiIHJlY29yZHMgZm91bmRcIjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudGVtcGxhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aXRsZW9ubHlcIjpcclxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+I3tkZWZhdWx0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcclxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYGA7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zdGF0cywgc3RhdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgKz0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7JHtzdGF0LnN0YXRfdHlwZX0sJHtzdGF0LmZpZWxkfSx0aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7JHtzdGF0LnN0YXRfdHlwZX0sJHtzdGF0LmZpZWxkfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImp1bWJvXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtmbG9hdDpsZWZ0O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlcjoxcHggc29saWQgYmxhY2s7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5cXCN7dGl0bGV9PC9oNT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxPlxcI3tkZWZhdWx0fTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwianVtYm9fd2l0aG91dF90aXRsZVwiOlxyXG4gICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgPSBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+XFwje2RlZmF1bHR9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IGdldE1hdGNoaW5nQ29uZGl0aW9uKGZpbHRlcmVkRGF0YSwgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzKTtcclxuICAgICAgICBsZXQgYmdDb2xvciA9IG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvciA/IG1hdGNoaW5nX2NvbmRpdGlvbi5iZ0NvbG9yIDogdGhpcy5iZ0NvbG9yO1xyXG4gICAgICAgIGxldCB0ZXh0Q29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvciA/IG1hdGNoaW5nX2NvbmRpdGlvbi50ZXh0Q29sb3IgOiB0aGlzLnRleHRDb2xvcjtcclxuICAgICAgICBsZXQgY3VzdG9tX2Nzc19jbGFzcyA9IG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uY3VzdG9tX2Nzc19jbGFzcyA/IG1hdGNoaW5nX2NvbmRpdGlvbi5jdXN0b21fY3NzX2NsYXNzIDogXCJub3RfYXBwbGljYWJsZVwiO1xyXG4gICAgICAgIGlmIChjdXN0b21fY3NzX2NsYXNzICE9PSBcIm5vdF9hcHBsaWNhYmxlXCIpIHtcclxuICAgICAgICAgICAgYmdDb2xvciA9IFwibm90X2FwcGxpY2FibGVcIjtcclxuICAgICAgICAgICAgdGV4dENvbG9yID0gXCJub3RfYXBwbGljYWJsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3V0cHV0X3dpdGhfc3RhdHNSZXBsYWNlZCA9IHJlcGxhY2VTdGF0c0Zyb21UZW1wbGF0ZShvdXRUZW1wbGF0ZSwgdGhpcy5zdGF0cywgZmlsdGVyZWREYXRhKTtcclxuICAgICAgICBsZXQgb3V0cHV0X3dpdGhfdG9rZW5zcmVwbGFjZWQgPSByZXBsYWNlRkFUb2tlbnMob3V0cHV0X3dpdGhfc3RhdHNSZXBsYWNlZCk7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6JHt0aGlzLnN0YXRXaWR0aCB8fCBcIjEwMFwifSU7ZmxvYXQ6bGVmdDtiYWNrZ3JvdW5kOiR7YmdDb2xvcn07Y29sb3I6JHt0ZXh0Q29sb3J9O1wiIGNsYXNzPVwiJHtjdXN0b21fY3NzX2NsYXNzfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICR7b3V0cHV0X3dpdGhfdG9rZW5zcmVwbGFjZWR9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=