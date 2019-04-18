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
    var lodash_1, AppUtils_1, BoomUtils_1, GrafanaUtils_1, BoomUtils_2, buildMasterData, BoomFilter, BoomSummaryFilter, BoomSummaryConditionalFormats, BoomStat, BoomStatsGroup, replaceStatsFromTemplate, replaceFATokens, getMatchingCondition;
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
            BoomStatsGroup = (function () {
                function BoomStatsGroup(options) {
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
                return BoomStatsGroup;
            }());
            exports_1("BoomStatsGroup", BoomStatsGroup);
            BoomStatsGroup.prototype.addStat = function () {
                var newMetric = new BoomStat({});
                this.stats = this.stats || [];
                this.stats.push(newMetric);
            };
            BoomStatsGroup.prototype.removeStat = function (index) {
                if (this.stats.length > 0) {
                    this.stats.splice(Number(index), 1);
                }
            };
            BoomStatsGroup.prototype.addFilter = function () {
                var newfilter = new BoomSummaryFilter({
                    field: "Sample",
                    operator: "equals"
                });
                this.filters = this.filters || [];
                this.filters.push(newfilter);
            };
            BoomStatsGroup.prototype.removeFilter = function (index) {
                if (this.filters.length > 0) {
                    this.filters.splice(Number(index), 1);
                }
            };
            BoomStatsGroup.prototype.addConditonalFormat = function () {
                var new_conditional_formatter = new BoomSummaryConditionalFormats({
                    operator: "equals",
                    stat_type: "first"
                });
                this.conditional_formats = this.conditional_formats || [];
                this.conditional_formats.push(new_conditional_formatter);
            };
            BoomStatsGroup.prototype.removeConditionalFormat = function (index) {
                if (this.conditional_formats.length > 0) {
                    this.conditional_formats.splice(Number(index), 1);
                }
            };
            BoomStatsGroup.prototype.moveConditionalFormat = function (direction, index) {
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
            BoomStatsGroup.prototype.getoutput = function (masterdata) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN0YXRzR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQm9vbVN0YXRzR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BLDZCQUFXLGVBQWUsR0FBRyxVQUFVLElBQUk7Z0JBQ3ZDLElBQUksVUFBVSxHQUFvQixFQUFFLENBQUM7Z0JBQ3JDLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLENBQUM7b0JBQ1YsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTt3QkFDcEIsSUFBSSxPQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDcEIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUNsQixJQUFJLEtBQUssR0FBa0IsRUFBRSxDQUFDOzRCQUM5QixnQkFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDZixJQUFJLE1BQU0sR0FBZ0I7b0NBQ3RCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0NBQzFCLEtBQUssU0FBQTtvQ0FDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDO29DQUNULEtBQUssRUFBRSxHQUFHO2lDQUNiLENBQUM7Z0NBQ0YsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDdkIsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUM7cUJBQ047eUJBQU07d0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO3FCQUNwRTtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLFVBQVUsQ0FBQztZQUN0QixDQUFD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Z0IsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO29CQUMxSSxJQUFJLGdCQUFnQixLQUFLLGdCQUFnQixFQUFFO3dCQUN2QyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7d0JBQzNCLFNBQVMsR0FBRSxnQkFBZ0IsQ0FBQztxQkFDL0I7b0JBQ0QsSUFBSSx5QkFBeUIsR0FBRyx3QkFBd0IsQ0FBQyxhQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDaEcsSUFBSSwwQkFBMEIsR0FBRyxlQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDNUUsT0FBTyx5QkFBcUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLGlDQUEyQixPQUFPLGVBQVUsU0FBUyxvQkFBYSxnQkFBZ0IsaUNBQ3ZILDBCQUEwQiw2QkFDekIsQ0FBQztpQkFDbkI7WUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IElNYXN0ZXJEYXRhLCBJQm9vbUZpbHRlciwgSUJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzLCBJQm9vbVN0YXRzR3JvdXAgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBnZXRGaWx0ZXJlZERhdGFGcm9tTWFzdGVyRGF0YSB9IGZyb20gXCIuL0FwcFV0aWxzXCI7XHJcbmltcG9ydCB7IGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzLCBpc01hdGNoIH0gZnJvbSBcIi4vQm9vbVV0aWxzXCI7XHJcbmltcG9ydCB7IGdldEZvcm1hdHRlZE91dHB1dCB9IGZyb20gXCIuL0dyYWZhbmFVdGlsc1wiO1xyXG5pbXBvcnQgeyByZXBsYWNlVG9rZW5zIH0gZnJvbSBcIi4vQm9vbVV0aWxzXCI7XHJcblxyXG5leHBvcnQgbGV0IGJ1aWxkTWFzdGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICBsZXQgbWFzdGVyZGF0YTogSU1hc3RlckRhdGFbXVtdID0gW107XHJcbiAgICBfLmVhY2goZGF0YSwgZCA9PiB7XHJcbiAgICAgICAgaWYgKGQudHlwZSA9PT0gXCJ0YWJsZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCByZWZJZCA9IGQucmVmSWQ7XHJcbiAgICAgICAgICAgIF8uZWFjaChkLnJvd3MsIChyb3csIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBncm91cDogSU1hc3RlckRhdGFbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHJvdywgKGNvbCwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBteWRhdGE6IElNYXN0ZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xuYW1lOiBkLmNvbHVtbnNbal0udGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd2lkOiAraSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHVzaChteWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJkYXRhLnB1c2goZ3JvdXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJST1I6IE9ubHkgdGFibGUgZm9ybWF0IGlzIGN1cnJlbnRseSBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWFzdGVyZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIge1xyXG4gICAgcHVibGljIGZpZWxkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3BlcmF0b3I6IHN0cmluZztcclxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHZhbHVlMjogc3RyaW5nO1xyXG4gICAgcHVibGljIENhblNob3dWYWx1ZTI7XHJcbiAgICBwdWJsaWMgR2V0VmFsdWUySGVscGVyO1xyXG4gICAgcHVibGljIEdldFZhbHVlMUhlbHBlcjtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmZpZWxkID0gb3B0aW9ucy5maWVsZCB8fCBcIlNhbXBsZVwiO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yIHx8IFwiZXF1YWxzXCI7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgXCJTb21ldGhpbmdcIjtcclxuICAgICAgICB0aGlzLnZhbHVlMiA9IG9wdGlvbnMudmFsdWUyIHx8IFwiXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgbGV0IENhblNob3dWYWx1ZTIgPSBmYWxzZTtcclxuICAgICAgICBsZXQgVmFsdWUxSGVscGVyID0gXCJWYWx1ZVwiO1xyXG4gICAgICAgIGxldCBWYWx1ZTJIZWxwZXIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAob3BlcmF0b3IucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJiZXR3ZWVuXCI6XHJcbiAgICAgICAgICAgICAgICBDYW5TaG93VmFsdWUyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFZhbHVlMUhlbHBlciA9IFwiRnJvbVwiO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUySGVscGVyID0gXCJUb1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbnNpZGVyYW5nZVwiOlxyXG4gICAgICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTFIZWxwZXIgPSBcIkZyb21cIjtcclxuICAgICAgICAgICAgICAgIFZhbHVlMkhlbHBlciA9IFwiVG9cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwib3V0c2lkZXJhbmdlXCI6XHJcbiAgICAgICAgICAgICAgICBDYW5TaG93VmFsdWUyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFZhbHVlMUhlbHBlciA9IFwiRnJvbVwiO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUySGVscGVyID0gXCJUb1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpblwiOlxyXG4gICAgICAgICAgICAgICAgQ2FuU2hvd1ZhbHVlMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZTFIZWxwZXIgPSBcIlZhbHVlc1wiO1xyXG4gICAgICAgICAgICAgICAgVmFsdWUySGVscGVyID0gXCJTZXBlcmF0b3JcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIENhblNob3dWYWx1ZTIsXHJcbiAgICAgICAgICAgIFZhbHVlMUhlbHBlcixcclxuICAgICAgICAgICAgVmFsdWUySGVscGVyXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTFIZWxwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRTZWNvbmRhcnlGaWVsZERldGFpbHModGhpcy5vcGVyYXRvcikuVmFsdWUxSGVscGVyO1xyXG59O1xyXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5HZXRWYWx1ZTJIZWxwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRTZWNvbmRhcnlGaWVsZERldGFpbHModGhpcy5vcGVyYXRvcikuVmFsdWUySGVscGVyO1xyXG59O1xyXG5Cb29tRmlsdGVyLnByb3RvdHlwZS5DYW5TaG93VmFsdWUyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kYXJ5RmllbGREZXRhaWxzKHRoaXMub3BlcmF0b3IpLkNhblNob3dWYWx1ZTI7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlGaWx0ZXIgZXh0ZW5kcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgZXh0ZW5kcyBCb29tRmlsdGVyIGltcGxlbWVudHMgSUJvb21GaWx0ZXIsIElCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyB7XHJcbiAgICBwdWJsaWMgc3RhdF90eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1c3RvbV9jc3NfY2xhc3M6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmN1c3RvbV9jc3NfY2xhc3MgPSBvcHRpb25zLmN1c3RvbV9jc3NfY2xhc3MgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnN0YXRfdHlwZSA9IG9wdGlvbnMuc3RhdF90eXBlIHx8IFwiZmlyc3RcIjtcclxuICAgICAgICB0aGlzLmJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3IgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb29tU3RhdCB7XHJcbiAgICBwdWJsaWMgZmllbGQ7XHJcbiAgICBwdWJsaWMgc3RhdF90eXBlO1xyXG4gICAgcHVibGljIGZvcm1hdF9hcztcclxuICAgIHB1YmxpYyBkZWNpbWFscztcclxuICAgIHB1YmxpYyB1bml0O1xyXG4gICAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgICBwdWJsaWMgdGl0bGU7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgICAgICB0aGlzLnN0YXRfdHlwZSA9IG9wdGlvbnMuc3RhdF90eXBlIHx8IFwiZmlyc3RcIjtcclxuICAgICAgICB0aGlzLmZvcm1hdF9hcyA9IG9wdGlvbnMuZm9ybWF0X2FzIHx8IFwic3RyaW5nXCI7XHJcbiAgICAgICAgdGhpcy5kZWNpbWFscyA9IG9wdGlvbnMuZGVjaW1hbHMgfHwgXCIwXCI7XHJcbiAgICAgICAgdGhpcy51bml0ID0gb3B0aW9ucy51bml0IHx8IFwibm9uZVwiO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuc3RhdF90eXBlICsgXCIgb2YgXCIgKyB0aGlzLmZpZWxkIHx8IFwiRGV0YWlsXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJvb21TdGF0LnByb3RvdHlwZS5zZXRVbml0Rm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnVuaXQgPSBmb3JtYXQgJiYgZm9ybWF0LnZhbHVlID8gZm9ybWF0LnZhbHVlIDogXCJub25lXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN0YXRzR3JvdXAge1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3RhdHM6IEJvb21TdGF0W107XHJcbiAgICBwdWJsaWMgc3RhdFdpZHRoOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHRlbXBsYXRlVHlwZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGN1c3RvbVRlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICAgIHB1YmxpYyBjb25kaXRpb25hbF9mb3JtYXRzOiBCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0c1tdO1xyXG4gICAgcHVibGljIGFkZFN0YXQ7XHJcbiAgICBwdWJsaWMgcmVtb3ZlU3RhdDtcclxuICAgIHB1YmxpYyBhZGRGaWx0ZXI7XHJcbiAgICBwdWJsaWMgcmVtb3ZlRmlsdGVyO1xyXG4gICAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgICBwdWJsaWMgcmVtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgICBwdWJsaWMgbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gICAgcHVibGljIGdldG91dHB1dDtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3RhdHMgPSBvcHRpb25zLnN0YXRzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgICAgICB0aGlzLmJnQ29sb3IgPSBvcHRpb25zLmJnQ29sb3IgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVR5cGUgPSBvcHRpb25zLnRlbXBsYXRlVHlwZSB8fCBcImRlZmF1bHRcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbVRlbXBsYXRlID0gb3B0aW9ucy5jdXN0b21UZW1wbGF0ZSB8fCBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPlRvdGFsIFJlY29yZHM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjUwJTtmbG9hdDpsZWZ0O3BhZGRpbmc6MTBweDtcIj4je2NvdW50fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IG9wdGlvbnMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcclxuICAgIH1cclxufVxyXG5cclxuQm9vbVN0YXRzR3JvdXAucHJvdG90eXBlLmFkZFN0YXQgPSBmdW5jdGlvbiAoKTogdm9pZCB7XHJcbiAgICBsZXQgbmV3TWV0cmljID0gbmV3IEJvb21TdGF0KHt9KTtcclxuICAgIHRoaXMuc3RhdHMgPSB0aGlzLnN0YXRzIHx8IFtdO1xyXG4gICAgdGhpcy5zdGF0cy5wdXNoKG5ld01ldHJpYyk7XHJcbn07XHJcblxyXG5Cb29tU3RhdHNHcm91cC5wcm90b3R5cGUucmVtb3ZlU3RhdCA9IGZ1bmN0aW9uIChpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdGF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Cb29tU3RhdHNHcm91cC5wcm90b3R5cGUuYWRkRmlsdGVyID0gZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgbGV0IG5ld2ZpbHRlciA9IG5ldyBCb29tU3VtbWFyeUZpbHRlcih7XHJcbiAgICAgICAgZmllbGQ6IFwiU2FtcGxlXCIsXHJcbiAgICAgICAgb3BlcmF0b3I6IFwiZXF1YWxzXCJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gdGhpcy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5maWx0ZXJzLnB1c2gobmV3ZmlsdGVyKTtcclxufTtcclxuXHJcbkJvb21TdGF0c0dyb3VwLnByb3RvdHlwZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbiAoaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLnNwbGljZShOdW1iZXIoaW5kZXgpLCAxKTtcclxuICAgIH1cclxufTtcclxuXHJcbkJvb21TdGF0c0dyb3VwLnByb3RvdHlwZS5hZGRDb25kaXRvbmFsRm9ybWF0ID0gZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgbGV0IG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIgPSBuZXcgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMoe1xyXG4gICAgICAgIG9wZXJhdG9yOiBcImVxdWFsc1wiLFxyXG4gICAgICAgIHN0YXRfdHlwZTogXCJmaXJzdFwiXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cyB8fCBbXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5wdXNoKG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN0YXRzR3JvdXAucHJvdG90eXBlLnJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24gKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Cb29tU3RhdHNHcm91cC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24gKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgICAgICAgIE51bWJlcihpbmRleCkgLSAxXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcclxuICAgICAgICAgICAgTnVtYmVyKGluZGV4KSArIDFcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgIH1cclxufTtcclxuXHJcbmxldCByZXBsYWNlU3RhdHNGcm9tVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHN0YXRzLCBkYXRhKTogc3RyaW5nIHtcclxuICAgIGxldCBvdXRwdXQgPSB0ZW1wbGF0ZTtcclxuICAgIF8uZWFjaChzdGF0cywgKHN0YXQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3RhdHNHcm91cCA9IHtcclxuICAgICAgICAgICAgY291bnQ6IE5hTixcclxuICAgICAgICAgICAgZmlyc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIG1heDogTmFOLFxyXG4gICAgICAgICAgICBtZWFuOiBOYU4sXHJcbiAgICAgICAgICAgIG1pbjogTmFOLFxyXG4gICAgICAgICAgICBzdW06IE5hTixcclxuICAgICAgICAgICAgdW5pcXVlY291bnQ6IE5hTixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gc3RhdC5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteXN0YXRzT2JqZWN0ID0gZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMobXlzdGF0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tjb3VudH1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5jb3VudCk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3VuaXF1ZWNvdW50fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnVuaXF1ZWNvdW50KTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7c3VtfVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW59XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWVhbik7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21pbn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5taW4pO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttYXh9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Zmlyc3R9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuZmlyc3QpO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t0aXRsZX1cIiwgXCJnaVwiKSwgc3RhdC50aXRsZSB8fCBgJHtzdGF0LnN0YXRfdHlwZX0gb2YgJHtzdGF0LmZpZWxkfWApO1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tkZWZhdWx0fVwiLCBcImdpXCIpLCBnZXRGb3JtYXR0ZWRPdXRwdXQobXlzdGF0c09iamVjdFtzdGF0LnN0YXRfdHlwZV0sIHN0YXQudW5pdCwgc3RhdC5kZWNpbWFscykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tcIiArIHN0YXQuc3RhdF90eXBlICsgXCIsXCIgKyBzdGF0LmZpZWxkICsgXCJ9XCIsIFwiZ2lcIiksIGdldEZvcm1hdHRlZE91dHB1dChteXN0YXRzT2JqZWN0W3N0YXQuc3RhdF90eXBlXSwgc3RhdC51bml0LCBzdGF0LmRlY2ltYWxzKSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7XCIgKyBzdGF0LnN0YXRfdHlwZSArIFwiLFwiICsgc3RhdC5maWVsZCArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdFtzdGF0LmRlZmF1bHRTdGF0XSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7XCIgKyBzdGF0LnN0YXRfdHlwZSArIFwiLFwiICsgc3RhdC5maWVsZCArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBzdGF0LnRpdGxlKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGNvbG5hbWVzOiBhbnlbXSA9IFtdO1xyXG4gICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICBfLmVhY2goZ3JvdXAsIGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb2xuYW1lcy5wdXNoKGl0ZW0uY29sbmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGNvbG5hbWVzID0gXy51bmlxKGNvbG5hbWVzKTtcclxuICAgIF8uZWFjaChjb2xuYW1lcywgKGNvbG5hbWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3RhdHNHcm91cCA9IHtcclxuICAgICAgICAgICAgY291bnQ6IE5hTixcclxuICAgICAgICAgICAgZmlyc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIG1heDogTmFOLFxyXG4gICAgICAgICAgICBtZWFuOiBOYU4sXHJcbiAgICAgICAgICAgIG1pbjogTmFOLFxyXG4gICAgICAgICAgICBzdW06IE5hTixcclxuICAgICAgICAgICAgdW5pcXVlY291bnQ6IE5hTixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gY29sbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteXN0YXRzT2JqZWN0ID0gZ2V0U3RhdHNGcm9tQXJyYXlPZk9iamVjdHMobXlzdGF0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3t0aXRsZX1cIiwgXCJnaVwiKSwgYCR7Y29sbmFtZX1gKTtcclxuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7ZGVmYXVsdH1cIiwgXCJnaVwiKSwgZ2V0Rm9ybWF0dGVkT3V0cHV0KG15c3RhdHNPYmplY3QuZmlyc3QsIFwibm9uZVwiLCBcIjBcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tjb3VudCxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5jb3VudCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dW5pcXVlY291bnQsXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QudW5pcXVlY291bnQpO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3N1bSxcIiArIGNvbG5hbWUgKyBcIn1cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5zdW0pO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW4sXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWVhbik7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWluLFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1pbik7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWF4LFwiICsgY29sbmFtZSArIFwifVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0Lm1heCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Zmlyc3QsXCIgKyBjb2xuYW1lICsgXCJ9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuZmlyc3QpO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2NvdW50LFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5jb3VudCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7dW5pcXVlY291bnQsXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnVuaXF1ZWNvdW50KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tzdW0sXCIgKyBjb2xuYW1lICsgXCIscmF3fVwiLCBcImdpXCIpLCBteXN0YXRzT2JqZWN0LnN1bSk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWVhbixcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWVhbik7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7bWluLFwiICsgY29sbmFtZSArIFwiLHJhd31cIiwgXCJnaVwiKSwgbXlzdGF0c09iamVjdC5taW4pO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21heCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QubWF4KTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tmaXJzdCxcIiArIGNvbG5hbWUgKyBcIixyYXd9XCIsIFwiZ2lcIiksIG15c3RhdHNPYmplY3QuZmlyc3QpO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje2NvdW50LFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgQ291bnQgb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje3VuaXF1ZWNvdW50LFwiICsgY29sbmFtZSArIFwiLHRpdGxlfVwiLCBcImdpXCIpLCBgVW5pcXVlIENvdW50IG9mICR7Y29sbmFtZX1gKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3tzdW0sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBTdW0gb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21lYW4sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBNZWFuIG9mICR7Y29sbmFtZX1gKTtcclxuICAgICAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKFwiI3ttaW4sXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBtaW4gb2YgJHtjb2xuYW1lfWApO1xyXG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIje21heCxcIiArIGNvbG5hbWUgKyBcIix0aXRsZX1cIiwgXCJnaVwiKSwgYE1heCBvZiAke2NvbG5hbWV9YCk7XHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cChcIiN7Zmlyc3QsXCIgKyBjb2xuYW1lICsgXCIsdGl0bGV9XCIsIFwiZ2lcIiksIGBGaXJzdCAke2NvbG5hbWV9YCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbn07XHJcblxyXG5sZXQgcmVwbGFjZUZBVG9rZW5zID0gZnVuY3Rpb24gKHRlbXBsYXRlKTogc3RyaW5nIHtcclxuICAgIHJldHVybiByZXBsYWNlVG9rZW5zKHRlbXBsYXRlKTtcclxufTtcclxuXHJcbmxldCBnZXRNYXRjaGluZ0NvbmRpdGlvbiA9IGZ1bmN0aW9uIChkYXRhLCBjb25kaXRpb25hbF9mb3JtYXRzKSB7XHJcbiAgICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9ucyA9IGNvbmRpdGlvbmFsX2Zvcm1hdHMuZmlsdGVyKGNvbmRpdGlvbiA9PiB7XHJcbiAgICAgICAgbGV0IG15c3RhdHNPYmplY3Q6IElCb29tU3RhdHNHcm91cCA9IHtcclxuICAgICAgICAgICAgY291bnQ6IE5hTixcclxuICAgICAgICAgICAgZmlyc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIG1heDogTmFOLFxyXG4gICAgICAgICAgICBtZWFuOiBOYU4sXHJcbiAgICAgICAgICAgIG1pbjogTmFOLFxyXG4gICAgICAgICAgICBzdW06IE5hTixcclxuICAgICAgICAgICAgdW5pcXVlY291bnQ6IE5hTixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gY29uZGl0aW9uLmZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlzdGF0cy5wdXNoKF8uZmlyc3QobWF0Y2hpbmdfZmllbGQpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15c3RhdHNPYmplY3QgPSBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyhteXN0YXRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzTWF0Y2gobXlzdGF0c09iamVjdFtjb25kaXRpb24uc3RhdF90eXBlXSwgY29uZGl0aW9uLm9wZXJhdG9yLCBjb25kaXRpb24udmFsdWUsIGNvbmRpdGlvbi52YWx1ZTIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hpbmdfY29uZGl0aW9ucyAmJiBtYXRjaGluZ19jb25kaXRpb25zLmxlbmd0aCA+IDAgPyBfLmZpcnN0KG1hdGNoaW5nX2NvbmRpdGlvbnMpIDogbnVsbDtcclxufTtcclxuXHJcbkJvb21TdGF0c0dyb3VwLnByb3RvdHlwZS5nZXRvdXRwdXQgPSBmdW5jdGlvbiAobWFzdGVyZGF0YSk6IHN0cmluZyB7XHJcbiAgICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gXCI8ZGl2IHN0eWxlPSd0ZXh0LWFsaWduOmNlbnRlcjsnPk5vIERhdGE8L2Rpdj5cIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhKG1hc3RlcmRhdGEsIHRoaXMuZmlsdGVycyk7XHJcbiAgICAgICAgbGV0IG91dFRlbXBsYXRlID0gZmlsdGVyZWREYXRhLmxlbmd0aCArIFwiIHJlY29yZHMgZm91bmRcIjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudGVtcGxhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aXRsZW9ubHlcIjpcclxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+I3tkZWZhdWx0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1dG9cIjpcclxuICAgICAgICAgICAgICAgIG91dFRlbXBsYXRlID0gYGA7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zdGF0cywgc3RhdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgKz0gYDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2Zsb2F0OmxlZnQ7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7JHtzdGF0LnN0YXRfdHlwZX0sJHtzdGF0LmZpZWxkfSx0aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NTAlO2Zsb2F0OmxlZnQ7cGFkZGluZzoxMHB4O1wiPiN7JHtzdGF0LnN0YXRfdHlwZX0sJHtzdGF0LmZpZWxkfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImp1bWJvXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtmbG9hdDpsZWZ0O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlcjoxcHggc29saWQgYmxhY2s7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5cXCN7dGl0bGV9PC9oNT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxPlxcI3tkZWZhdWx0fTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwianVtYm9fd2l0aG91dF90aXRsZVwiOlxyXG4gICAgICAgICAgICAgICAgb3V0VGVtcGxhdGUgPSBgPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7ZmxvYXQ6bGVmdDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+XFwje2RlZmF1bHR9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvdXRUZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IGdldE1hdGNoaW5nQ29uZGl0aW9uKGZpbHRlcmVkRGF0YSwgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzKTtcclxuICAgICAgICBsZXQgYmdDb2xvciA9IG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvciA/IG1hdGNoaW5nX2NvbmRpdGlvbi5iZ0NvbG9yIDogdGhpcy5iZ0NvbG9yO1xyXG4gICAgICAgIGxldCB0ZXh0Q29sb3IgPSBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvciA/IG1hdGNoaW5nX2NvbmRpdGlvbi50ZXh0Q29sb3IgOiB0aGlzLnRleHRDb2xvcjtcclxuICAgICAgICBsZXQgY3VzdG9tX2Nzc19jbGFzcyA9IG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uY3VzdG9tX2Nzc19jbGFzcyA/IG1hdGNoaW5nX2NvbmRpdGlvbi5jdXN0b21fY3NzX2NsYXNzIDogXCJub3RfYXBwbGljYWJsZVwiO1xyXG4gICAgICAgIGlmIChjdXN0b21fY3NzX2NsYXNzICE9PSBcIm5vdF9hcHBsaWNhYmxlXCIpIHtcclxuICAgICAgICAgICAgYmdDb2xvciA9IFwibm90X2FwcGxpY2FibGVcIjtcclxuICAgICAgICAgICAgdGV4dENvbG9yPSBcIm5vdF9hcHBsaWNhYmxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvdXRwdXRfd2l0aF9zdGF0c1JlcGxhY2VkID0gcmVwbGFjZVN0YXRzRnJvbVRlbXBsYXRlKG91dFRlbXBsYXRlLCB0aGlzLnN0YXRzLCBmaWx0ZXJlZERhdGEpO1xyXG4gICAgICAgIGxldCBvdXRwdXRfd2l0aF90b2tlbnNyZXBsYWNlZCA9IHJlcGxhY2VGQVRva2VucyhvdXRwdXRfd2l0aF9zdGF0c1JlcGxhY2VkKTtcclxuICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJ3aWR0aDoke3RoaXMuc3RhdFdpZHRoIHx8IFwiMTAwXCJ9JTtmbG9hdDpsZWZ0O2JhY2tncm91bmQ6JHtiZ0NvbG9yfTtjb2xvcjoke3RleHRDb2xvcn07XCIgY2xhc3M9XCIke2N1c3RvbV9jc3NfY2xhc3N9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtvdXRwdXRfd2l0aF90b2tlbnNyZXBsYWNlZH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==