System.register(["lodash", "./Filters/BoomFilter", "./Filters/BoomConditionalFormat", "../utils/MatchUtils", "./../utils/GrafanaUtils", "./../utils/AppUtils", "../config"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomFilter_1, BoomConditionalFormat_1, MatchUtils_1, GrafanaUtils_1, AppUtils_1, config_1, BoomSummaryStat, didSatisfyFilters, getStats, buildOutput;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (BoomFilter_1_1) {
                BoomFilter_1 = BoomFilter_1_1;
            },
            function (BoomConditionalFormat_1_1) {
                BoomConditionalFormat_1 = BoomConditionalFormat_1_1;
            },
            function (MatchUtils_1_1) {
                MatchUtils_1 = MatchUtils_1_1;
            },
            function (GrafanaUtils_1_1) {
                GrafanaUtils_1 = GrafanaUtils_1_1;
            },
            function (AppUtils_1_1) {
                AppUtils_1 = AppUtils_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            BoomSummaryStat = (function () {
                function BoomSummaryStat(options) {
                    this.field = options.field || "Sample";
                    this.title = options.title || this.field;
                    this.defaultStat = options.defaultStat || "${first}";
                    this.display_template =
                        options.display_template || config_1.config.templates.default_normal;
                    this.statWidth = options.statWidth || "100";
                    this.bgColor = options.bgColor || "";
                    this.textColor = options.textColor || "";
                    this.format = options.format || "none";
                    this.decimals = options.decimals || "0";
                    this.filters = options.filters || [];
                    this.conditional_formats = options.conditional_formats || [];
                }
                return BoomSummaryStat;
            }());
            exports_1("BoomSummaryStat", BoomSummaryStat);
            BoomSummaryStat.prototype.addFilter = function () {
                var newfilter = new BoomFilter_1.BoomSummaryFilter({
                    field: this.field || "Sample",
                    operator: "equals"
                });
                this.filters = this.filters || [];
                this.filters.push(newfilter);
            };
            BoomSummaryStat.prototype.removeFilter = function (index) {
                if (this.filters.length > 0) {
                    this.filters.splice(Number(index), 1);
                }
            };
            BoomSummaryStat.prototype.addConditonalFormat = function () {
                var new_conditional_formatter = new BoomConditionalFormat_1.BoomSummaryConditionalFormats({
                    field: this.defaultStat || "${first}",
                    operator: "equals"
                });
                this.conditional_formats = this.conditional_formats || [];
                this.conditional_formats.push(new_conditional_formatter);
            };
            BoomSummaryStat.prototype.removeConditionalFormat = function (index) {
                if (this.conditional_formats.length > 0) {
                    this.conditional_formats.splice(Number(index), 1);
                }
            };
            BoomSummaryStat.prototype.moveConditionalFormat = function (direction, index) {
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
            BoomSummaryStat.prototype.setUnitFormat = function (format) {
                this.format = format && format.value ? format.value : "none";
            };
            didSatisfyFilters = function (group, filters) {
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
            };
            BoomSummaryStat.prototype.getValues = function (masterdata) {
                var _this = this;
                var mystats = [];
                lodash_1.default.each(masterdata, function (group) {
                    var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === _this.field; });
                    if (matching_field.length > 0 && didSatisfyFilters(group, _this.filters)) {
                        mystats.push(lodash_1.default.first(matching_field).value);
                    }
                });
                return mystats;
            };
            getStats = function (mystats) {
                var statsgroup = {};
                statsgroup.count = mystats.length;
                statsgroup.uniquecount = lodash_1.default.uniq(mystats).length;
                statsgroup.sum = lodash_1.default.sum(mystats.map(function (s) { return +s; }));
                statsgroup.mean = lodash_1.default.mean(mystats.map(function (s) { return +s; }));
                statsgroup.min = lodash_1.default.min(mystats.map(function (s) { return +s; }));
                statsgroup.max = lodash_1.default.max(mystats.map(function (s) { return +s; }));
                statsgroup.first = lodash_1.default.first(mystats);
                return statsgroup;
            };
            BoomSummaryStat.prototype.getTemplateWithTokensReplaced = function (template, statsGroup) {
                var output = template;
                output = output.replace(/\$\{[^}]?default\}/gi, this.defaultStat || "${first}");
                output = output.replace(/\$\{[^}]?default_raw\}/gi, (this.defaultStat || "${first}").replace("}", "_raw}"));
                output = output.replace(/\$\{[^}]?first\}/gi, isNaN(statsGroup.first)
                    ? statsGroup.first
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.first, this.format, this.decimals));
                output = output.replace(/\$\{[^}]?first_raw\}/gi, statsGroup.first);
                output = output.replace(/\$\{[^}]?min\}/gi, isNaN(statsGroup.min)
                    ? statsGroup.min
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.min, this.format, this.decimals));
                output = output.replace(/\$\{[^}]?min_raw\}/gi, statsGroup.min);
                output = output.replace(/\$\{[^}]?max\}/gi, isNaN(statsGroup.max)
                    ? statsGroup.max
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.max, this.format, this.decimals));
                output = output.replace(/\$\{[^}]?max_raw\}/gi, statsGroup.max);
                output = output.replace(/\$\{[^}]?mean\}/gi, isNaN(statsGroup.mean)
                    ? statsGroup.mean
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.mean, this.format, this.decimals));
                output = output.replace(/\$\{[^}]?mean_raw\}/gi, statsGroup.mean);
                output = output.replace(/\$\{[^}]?sum\}/gi, isNaN(statsGroup.sum)
                    ? statsGroup.sum
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.sum, this.format, this.decimals));
                output = output.replace(/\$\{[^}]?sum_raw\}/gi, statsGroup.sum);
                output = output.replace(/\$\{[^}]?count\}/gi, isNaN(statsGroup.count)
                    ? statsGroup.count
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.count || 0, "none", "0"));
                output = output.replace(/\$\{[^}]?count_raw\}/gi, statsGroup.count);
                output = output.replace(/\$\{[^}]?uniquecount\}/gi, isNaN(statsGroup.uniquecount)
                    ? statsGroup.uniquecount
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.uniquecount || 0, "none", "0"));
                output = output.replace(/\$\{[^}]?uniquecount_raw\}/gi, statsGroup.uniquecount);
                output = output.replace(/\$\{[^}]?title\}/gi, this.title);
                output = output.replace(/\$\{[^}]?field\}/gi, this.field);
                output = output.replace(/\$\{[^}]?bgColor\}/gi, this.bgColor);
                output = output.replace(/\$\{[^}]?textColor\}/gi, this.textColor);
                return output;
            };
            buildOutput = function (statWidth, output, bgColor, textColor) {
                return "<div style=\"width:" + (statWidth ||
                    "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\">\n    " + output + "\n  </div>";
            };
            BoomSummaryStat.prototype.getMatchingCondition = function (statsGroup) {
                var matching_condition = lodash_1.default.first(this.conditional_formats.filter(function (condition) {
                    var original_statName = (condition.field || "${value}")
                        .replace("${", "")
                        .replace("}", "");
                    var original_value = AppUtils_1.getStatFromStatsGroup(statsGroup, original_statName);
                    return MatchUtils_1.isMatch(original_value, condition.operator, condition.value, condition.value2);
                }));
                return matching_condition;
            };
            BoomSummaryStat.prototype.getOutputValue = function (masterdata) {
                if (masterdata.length === 0) {
                    return "<div style='text-align:center;'>No Data</div>";
                }
                else {
                    var mystats = this.getValues(masterdata);
                    var statsGroup = getStats(mystats);
                    var matching_condition = this.getMatchingCondition(statsGroup);
                    var bgColor = matching_condition && matching_condition.bgColor
                        ? matching_condition.bgColor
                        : this.bgColor;
                    var textColor = matching_condition && matching_condition.textColor
                        ? matching_condition.textColor
                        : this.textColor;
                    var template = matching_condition && matching_condition.display_template
                        ? matching_condition.display_template
                        : this.display_template;
                    var template_replaced = AppUtils_1.replaceTokens(this.getTemplateWithTokensReplaced(template, statsGroup));
                    return buildOutput(this.statWidth, template_replaced, bgColor, textColor);
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN0YXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0Jvb21TdGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBU0E7Z0JBdUJFLHlCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO29CQUNyRCxJQUFJLENBQUMsZ0JBQWdCO3dCQUNuQixPQUFPLENBQUMsZ0JBQWdCLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7b0JBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDO2dCQUMvRCxDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FBQyxBQXJDRCxJQXFDQzs7WUFFRCxlQUFlLENBQUMsU0FBUyxD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QyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxPQUFPLEdBQ1Qsa0JBQWtCLElBQUksa0JBQWtCLENBQUMsT0FBTzt3QkFDOUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNuQixJQUFJLFNBQVMsR0FDWCxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTO3dCQUNoRCxDQUFDLENBQUMsa0JBQWtCLENBQUMsU0FBUzt3QkFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ3JCLElBQUksUUFBUSxHQUNWLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLGdCQUFnQjt3QkFDdkQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQjt3QkFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDNUIsSUFBSSxpQkFBaUIsR0FBRyx3QkFBYSxDQUNuQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUN6RCxDQUFDO29CQUNGLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUMzRTtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlGaWx0ZXIgfSBmcm9tIFwiLi9GaWx0ZXJzL0Jvb21GaWx0ZXJcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgfSBmcm9tIFwiLi9GaWx0ZXJzL0Jvb21Db25kaXRpb25hbEZvcm1hdFwiO1xyXG5pbXBvcnQgeyBpc01hdGNoIH0gZnJvbSBcIi4uL3V0aWxzL01hdGNoVXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0Rm9ybWF0dGVkT3V0cHV0IH0gZnJvbSBcIi4vLi4vdXRpbHMvR3JhZmFuYVV0aWxzXCI7XHJcbmltcG9ydCB7IGdldFN0YXRGcm9tU3RhdHNHcm91cCwgcmVwbGFjZVRva2VucyB9IGZyb20gXCIuLy4uL3V0aWxzL0FwcFV0aWxzXCI7XHJcbmltcG9ydCB7IElCb29tU3VtbWFyeVN0YXQgfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5U3RhdCBpbXBsZW1lbnRzIElCb29tU3VtbWFyeVN0YXQge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkZWZhdWx0U3RhdDogc3RyaW5nO1xyXG4gIHB1YmxpYyBkaXNwbGF5X3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgcHVibGljIHN0YXRXaWR0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtYXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGVjaW1hbHM6IHN0cmluZztcclxuICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICBwdWJsaWMgY29uZGl0aW9uYWxfZm9ybWF0czogQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHNbXTtcclxuICBwdWJsaWMgYWRkRmlsdGVyO1xyXG4gIHB1YmxpYyByZW1vdmVGaWx0ZXI7XHJcbiAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgcHVibGljIGdldFN0YXRzO1xyXG4gIHB1YmxpYyBnZXRWYWx1ZXM7XHJcbiAgcHVibGljIGdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkO1xyXG4gIHB1YmxpYyBnZXRPdXRwdXRWYWx1ZTtcclxuICBwdWJsaWMgZ2V0TWF0Y2hpbmdDb25kaXRpb247XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmRlZmF1bHRTdGF0ID0gb3B0aW9ucy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCI7XHJcbiAgICB0aGlzLmRpc3BsYXlfdGVtcGxhdGUgPVxyXG4gICAgICBvcHRpb25zLmRpc3BsYXlfdGVtcGxhdGUgfHwgY29uZmlnLnRlbXBsYXRlcy5kZWZhdWx0X25vcm1hbDtcclxuICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5mb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcIm5vbmVcIjtcclxuICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zLmRlY2ltYWxzIHx8IFwiMFwiO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gb3B0aW9ucy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHtcclxuICAgIGZpZWxkOiB0aGlzLmZpZWxkIHx8IFwiU2FtcGxlXCIsXHJcbiAgICBvcGVyYXRvcjogXCJlcXVhbHNcIlxyXG4gIH0pO1xyXG4gIHRoaXMuZmlsdGVycyA9IHRoaXMuZmlsdGVycyB8fCBbXTtcclxuICB0aGlzLmZpbHRlcnMucHVzaChuZXdmaWx0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuYWRkQ29uZGl0b25hbEZvcm1hdCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xyXG4gIGxldCBuZXdfY29uZGl0aW9uYWxfZm9ybWF0dGVyID0gbmV3IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzKHtcclxuICAgIGZpZWxkOiB0aGlzLmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIixcclxuICAgIG9wZXJhdG9yOiBcImVxdWFsc1wiXHJcbiAgfSk7XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5wdXNoKG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uKFxyXG4gIGluZGV4OiBOdW1iZXJcclxuKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgZGlyZWN0aW9uOiBzdHJpbmcsXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgLSAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxuICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW1xyXG4gICAgICBOdW1iZXIoaW5kZXgpICsgMVxyXG4gICAgXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnNldFVuaXRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQ6IGFueSk6IHZvaWQge1xyXG4gIHRoaXMuZm9ybWF0ID0gZm9ybWF0ICYmIGZvcm1hdC52YWx1ZSA/IGZvcm1hdC52YWx1ZSA6IFwibm9uZVwiO1xyXG59O1xyXG5cclxubGV0IGRpZFNhdGlzZnlGaWx0ZXJzID0gZnVuY3Rpb24oZ3JvdXAsIGZpbHRlcnMpIHtcclxuICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgIGxldCBtYXRjaGVzID0gMDtcclxuICAgIF8uZWFjaChmaWx0ZXJzLCBmaWx0ZXIgPT4ge1xyXG4gICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGZpbHRlci5maWVsZCk7XHJcbiAgICAgIGlmIChtYXRjaGluZ19maWVsZCAmJiBtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbWF0Y2hlcyArPVxyXG4gICAgICAgICAgaXNNYXRjaChcclxuICAgICAgICAgICAgbWF0Y2hpbmdfZmllbGRbMF0udmFsdWUsXHJcbiAgICAgICAgICAgIGZpbHRlci5vcGVyYXRvcixcclxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlLFxyXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUyXHJcbiAgICAgICAgICApID09PSB0cnVlXHJcbiAgICAgICAgICAgID8gMVxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZXMgPT09IGZpbHRlcnMubGVuZ3RoO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldFZhbHVlcyA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEpOiBhbnkge1xyXG4gIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICBfLmVhY2gobWFzdGVyZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSB0aGlzLmZpZWxkKTtcclxuICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwICYmIGRpZFNhdGlzZnlGaWx0ZXJzKGdyb3VwLCB0aGlzLmZpbHRlcnMpKSB7XHJcbiAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG15c3RhdHM7XHJcbn07XHJcblxyXG5sZXQgZ2V0U3RhdHMgPSBmdW5jdGlvbihteXN0YXRzKTogYW55IHtcclxuICBsZXQgc3RhdHNncm91cDogYW55ID0ge307XHJcbiAgc3RhdHNncm91cC5jb3VudCA9IG15c3RhdHMubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAudW5pcXVlY291bnQgPSBfLnVuaXEobXlzdGF0cykubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAuc3VtID0gXy5zdW0obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWVhbiA9IF8ubWVhbihteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5taW4gPSBfLm1pbihteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5tYXggPSBfLm1heChteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5maXJzdCA9IF8uZmlyc3QobXlzdGF0cyk7XHJcbiAgcmV0dXJuIHN0YXRzZ3JvdXA7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkID0gZnVuY3Rpb24oXHJcbiAgdGVtcGxhdGUsXHJcbiAgc3RhdHNHcm91cFxyXG4pIHtcclxuICBsZXQgb3V0cHV0ID0gdGVtcGxhdGU7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAvXFwkXFx7W159XT9kZWZhdWx0XFx9L2dpLFxyXG4gICAgdGhpcy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCJcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/ZGVmYXVsdF9yYXdcXH0vZ2ksXHJcbiAgICAodGhpcy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCIpLnJlcGxhY2UoXCJ9XCIsIFwiX3Jhd31cIilcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/Zmlyc3RcXH0vZ2ksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLmZpcnN0KVxyXG4gICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgdGhpcy5mb3JtYXQsIHRoaXMuZGVjaW1hbHMpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9maXJzdF9yYXdcXH0vZ2ksIHN0YXRzR3JvdXAuZmlyc3QpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/bWluXFx9L2dpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5taW4pXHJcbiAgICAgID8gc3RhdHNHcm91cC5taW5cclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5taW4sIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/bWluX3Jhd1xcfS9naSwgc3RhdHNHcm91cC5taW4pO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/bWF4XFx9L2dpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5tYXgpXHJcbiAgICAgID8gc3RhdHNHcm91cC5tYXhcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tYXgsIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/bWF4X3Jhd1xcfS9naSwgc3RhdHNHcm91cC5tYXgpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/bWVhblxcfS9naSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCB0aGlzLmZvcm1hdCwgdGhpcy5kZWNpbWFscylcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP21lYW5fcmF3XFx9L2dpLCBzdGF0c0dyb3VwLm1lYW4pO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/c3VtXFx9L2dpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5zdW0pXHJcbiAgICAgID8gc3RhdHNHcm91cC5zdW1cclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5zdW0sIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/c3VtX3Jhd1xcfS9naSwgc3RhdHNHcm91cC5zdW0pO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/Y291bnRcXH0vZ2ksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLmNvdW50KVxyXG4gICAgICA/IHN0YXRzR3JvdXAuY291bnRcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9jb3VudF9yYXdcXH0vZ2ksIHN0YXRzR3JvdXAuY291bnQpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/dW5pcXVlY291bnRcXH0vZ2ksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLnVuaXF1ZWNvdW50KVxyXG4gICAgICA/IHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC51bmlxdWVjb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIC9cXCRcXHtbXn1dP3VuaXF1ZWNvdW50X3Jhd1xcfS9naSxcclxuICAgIHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP3RpdGxlXFx9L2dpLCB0aGlzLnRpdGxlKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9maWVsZFxcfS9naSwgdGhpcy5maWVsZCk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/YmdDb2xvclxcfS9naSwgdGhpcy5iZ0NvbG9yKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT90ZXh0Q29sb3JcXH0vZ2ksIHRoaXMudGV4dENvbG9yKTtcclxuICByZXR1cm4gb3V0cHV0O1xyXG59O1xyXG5cclxubGV0IGJ1aWxkT3V0cHV0ID0gZnVuY3Rpb24oc3RhdFdpZHRoLCBvdXRwdXQsIGJnQ29sb3IsIHRleHRDb2xvcikge1xyXG4gIHJldHVybiBgPGRpdiBzdHlsZT1cIndpZHRoOiR7c3RhdFdpZHRoIHx8XHJcbiAgICBcIjEwMFwifSU7ZmxvYXQ6bGVmdDtiYWNrZ3JvdW5kOiR7YmdDb2xvcn07Y29sb3I6JHt0ZXh0Q29sb3J9O1wiPlxyXG4gICAgJHtvdXRwdXR9XHJcbiAgPC9kaXY+YDtcclxufTtcclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5nZXRNYXRjaGluZ0NvbmRpdGlvbiA9IGZ1bmN0aW9uKHN0YXRzR3JvdXApIHtcclxuICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9uID0gXy5maXJzdChcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5maWx0ZXIoY29uZGl0aW9uID0+IHtcclxuICAgICAgbGV0IG9yaWdpbmFsX3N0YXROYW1lID0gKGNvbmRpdGlvbi5maWVsZCB8fCBcIiR7dmFsdWV9XCIpXHJcbiAgICAgICAgLnJlcGxhY2UoXCIke1wiLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlKFwifVwiLCBcIlwiKTtcclxuICAgICAgbGV0IG9yaWdpbmFsX3ZhbHVlID0gZ2V0U3RhdEZyb21TdGF0c0dyb3VwKHN0YXRzR3JvdXAsIG9yaWdpbmFsX3N0YXROYW1lKTtcclxuICAgICAgcmV0dXJuIGlzTWF0Y2goXHJcbiAgICAgICAgb3JpZ2luYWxfdmFsdWUsXHJcbiAgICAgICAgY29uZGl0aW9uLm9wZXJhdG9yLFxyXG4gICAgICAgIGNvbmRpdGlvbi52YWx1ZSxcclxuICAgICAgICBjb25kaXRpb24udmFsdWUyXHJcbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICk7XHJcbiAgcmV0dXJuIG1hdGNoaW5nX2NvbmRpdGlvbjtcclxufTtcclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5nZXRPdXRwdXRWYWx1ZSA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEpIHtcclxuICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBcIjxkaXYgc3R5bGU9J3RleHQtYWxpZ246Y2VudGVyOyc+Tm8gRGF0YTwvZGl2PlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgbXlzdGF0czogYW55ID0gdGhpcy5nZXRWYWx1ZXMobWFzdGVyZGF0YSk7XHJcbiAgICBsZXQgc3RhdHNHcm91cCA9IGdldFN0YXRzKG15c3RhdHMpO1xyXG4gICAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IHRoaXMuZ2V0TWF0Y2hpbmdDb25kaXRpb24oc3RhdHNHcm91cCk7XHJcbiAgICBsZXQgYmdDb2xvciA9XHJcbiAgICAgIG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvclxyXG4gICAgICAgID8gbWF0Y2hpbmdfY29uZGl0aW9uLmJnQ29sb3JcclxuICAgICAgICA6IHRoaXMuYmdDb2xvcjtcclxuICAgIGxldCB0ZXh0Q29sb3IgPVxyXG4gICAgICBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvclxyXG4gICAgICAgID8gbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvclxyXG4gICAgICAgIDogdGhpcy50ZXh0Q29sb3I7XHJcbiAgICBsZXQgdGVtcGxhdGUgPVxyXG4gICAgICBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLmRpc3BsYXlfdGVtcGxhdGVcclxuICAgICAgICA/IG1hdGNoaW5nX2NvbmRpdGlvbi5kaXNwbGF5X3RlbXBsYXRlXHJcbiAgICAgICAgOiB0aGlzLmRpc3BsYXlfdGVtcGxhdGU7XHJcbiAgICBsZXQgdGVtcGxhdGVfcmVwbGFjZWQgPSByZXBsYWNlVG9rZW5zKFxyXG4gICAgICB0aGlzLmdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkKHRlbXBsYXRlLCBzdGF0c0dyb3VwKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBidWlsZE91dHB1dCh0aGlzLnN0YXRXaWR0aCwgdGVtcGxhdGVfcmVwbGFjZWQsIGJnQ29sb3IsIHRleHRDb2xvcik7XHJcbiAgfVxyXG59O1xyXG4iXX0=