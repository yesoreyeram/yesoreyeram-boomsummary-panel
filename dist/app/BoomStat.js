System.register(["lodash", "./Filters/BoomFilter", "./Filters/BoomConditionalFormat", "../utils/BoomUtils", "./../utils/AppUtils", "./../utils/GrafanaUtils", "../config"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomFilter_1, BoomConditionalFormat_1, BoomUtils_1, AppUtils_1, GrafanaUtils_1, config_1, BoomSummaryStat;
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
            function (BoomUtils_1_1) {
                BoomUtils_1 = BoomUtils_1_1;
            },
            function (AppUtils_1_1) {
                AppUtils_1 = AppUtils_1_1;
            },
            function (GrafanaUtils_1_1) {
                GrafanaUtils_1 = GrafanaUtils_1_1;
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
            BoomSummaryStat.prototype.getValues = function (masterdata) {
                var _this = this;
                var filteredMasterData = AppUtils_1.getFilteredDataFromMasterData(masterdata, this.filters);
                var mystats = [];
                lodash_1.default.each(filteredMasterData, function (group) {
                    var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === _this.field; });
                    if (matching_field.length > 0) {
                        mystats.push(lodash_1.default.first(matching_field).value);
                    }
                });
                return BoomUtils_1.getStatsFromArrayOfObjects(mystats);
            };
            BoomSummaryStat.prototype.getTemplateWithTokensReplaced = function (template, statsGroup) {
                var output = template;
                output = output.replace(new RegExp(/\$\{[^}]?default\}/, "gi"), this.defaultStat || "${first}");
                output = output.replace(new RegExp(/\$\{[^}]?default_raw\}/, "gi"), (this.defaultStat || "${first}").replace("}", "_raw}"));
                output = output.replace(new RegExp(/\$\{[^}]?first\}/, "gi"), isNaN(statsGroup.first)
                    ? statsGroup.first
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.first, this.format, this.decimals));
                output = output.replace(new RegExp(/\$\{[^}]?first_raw\}/, "gi"), statsGroup.first);
                output = output.replace(new RegExp(/\$\{[^}]?min\}/, "gi"), isNaN(statsGroup.min)
                    ? statsGroup.min
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.min, this.format, this.decimals));
                output = output.replace(new RegExp(/\$\{[^}]?min_raw\}/, "gi"), statsGroup.min);
                output = output.replace(new RegExp(/\$\{[^}]?max\}/, "gi"), isNaN(statsGroup.max)
                    ? statsGroup.max
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.max, this.format, this.decimals));
                output = output.replace(new RegExp(/\$\{[^}]?max_raw\}/, "gi"), statsGroup.max);
                output = output.replace(new RegExp(/\$\{[^}]?mean\}/, "gi"), isNaN(statsGroup.mean)
                    ? statsGroup.mean
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.mean, this.format, this.decimals));
                output = output.replace(new RegExp(/\$\{[^}]?mean_raw\}/, "gi"), statsGroup.mean);
                output = output.replace(new RegExp(/\$\{[^}]?sum\}/, "gi"), isNaN(statsGroup.sum)
                    ? statsGroup.sum
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.sum, this.format, this.decimals));
                output = output.replace(new RegExp(/\$\{[^}]?sum_raw\}/, "gi"), statsGroup.sum);
                output = output.replace(new RegExp(/\$\{[^}]?count\}/, "gi"), isNaN(statsGroup.count)
                    ? statsGroup.count
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.count || 0, "none", "0"));
                output = output.replace(new RegExp(/\$\{[^}]?count_raw\}/, "gi"), statsGroup.count);
                output = output.replace(new RegExp(/\$\{[^}]?uniquecount\}/, "gi"), isNaN(statsGroup.uniquecount)
                    ? statsGroup.uniquecount
                    : GrafanaUtils_1.getFormattedOutput(statsGroup.uniquecount || 0, "none", "0"));
                output = output.replace(new RegExp(/\$\{[^}]?uniquecount_raw\}/, "gi"), statsGroup.uniquecount);
                output = output.replace(new RegExp(/\$\{[^}]?title\}/, "gi"), this.title);
                output = output.replace(new RegExp(/\$\{[^}]?field\}/, "gi"), this.field);
                output = output.replace(new RegExp(/\$\{[^}]?bgColor\}/, "gi"), this.bgColor);
                output = output.replace(new RegExp(/\$\{[^}]?textColor\}/, "gi"), this.textColor);
                return output;
            };
            BoomSummaryStat.prototype.getMatchingCondition = function (statsGroup) {
                var matching_condition = lodash_1.default.first(this.conditional_formats.filter(function (condition) {
                    var original_statName = (condition.field || "${value}")
                        .replace("${", "")
                        .replace("}", "");
                    var original_value = BoomUtils_1.getStatFromStatsGroup(statsGroup, original_statName);
                    return BoomUtils_1.isMatch(original_value, condition.operator, condition.value, condition.value2);
                }));
                return matching_condition;
            };
            BoomSummaryStat.prototype.getOutputValue = function (masterdata) {
                if (masterdata.length === 0) {
                    return "<div style='text-align:center;'>No Data</div>";
                }
                else {
                    var statsGroup = this.getValues(masterdata);
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
                    var template_replaced = BoomUtils_1.replaceTokens(this.getTemplateWithTokensReplaced(template, statsGroup));
                    return "<div style=\"width:" + (this.statWidth ||
                        "100") + "%;float:left;background:" + bgColor + ";color:" + textColor + ";\">\n      " + template_replaced + "\n    </div>";
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN0YXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0Jvb21TdGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBY0E7Z0JBdUJFLHlCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO29CQUNyRCxJQUFJLENBQUMsZ0JBQWdCO3dCQUNuQixPQUFPLENBQUMsZ0JBQWdCLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7b0JBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDO2dCQUMvRCxDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FBQyxBQXJDRCxJQXFDQzs7WUFFRCxlQUFlLENBQUMsU0FBUyxD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Q0FBQyxPQUFPO3dCQUM5QyxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTzt3QkFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ25CLElBQUksU0FBUyxHQUNYLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFNBQVM7d0JBQ2hELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO3dCQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDckIsSUFBSSxRQUFRLEdBQ1Ysa0JBQWtCLElBQUksa0JBQWtCLENBQUMsZ0JBQWdCO3dCQUN2RCxDQUFDLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCO3dCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO29CQUM1QixJQUFJLGlCQUFpQixHQUFHLHlCQUFhLENBQ25DLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQ3pELENBQUM7b0JBQ0YsT0FBTyx5QkFBcUIsSUFBSSxDQUFDLFNBQVM7d0JBQ3hDLEtBQUssaUNBQTJCLE9BQU8sZUFBVSxTQUFTLG9CQUN4RCxpQkFBaUIsaUJBQ2QsQ0FBQztpQkFDVDtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlGaWx0ZXIgfSBmcm9tIFwiLi9GaWx0ZXJzL0Jvb21GaWx0ZXJcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgfSBmcm9tIFwiLi9GaWx0ZXJzL0Jvb21Db25kaXRpb25hbEZvcm1hdFwiO1xyXG5pbXBvcnQge1xyXG4gIGdldFN0YXRGcm9tU3RhdHNHcm91cCxcclxuICByZXBsYWNlVG9rZW5zLFxyXG4gIGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzLFxyXG4gIGlzTWF0Y2hcclxufSBmcm9tIFwiLi4vdXRpbHMvQm9vbVV0aWxzXCI7XHJcbmltcG9ydCB7IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhIH0gZnJvbSBcIi4vLi4vdXRpbHMvQXBwVXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0Rm9ybWF0dGVkT3V0cHV0IH0gZnJvbSBcIi4vLi4vdXRpbHMvR3JhZmFuYVV0aWxzXCI7XHJcbmltcG9ydCB7IElCb29tU3VtbWFyeVN0YXQgfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5U3RhdCBpbXBsZW1lbnRzIElCb29tU3VtbWFyeVN0YXQge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkZWZhdWx0U3RhdDogc3RyaW5nO1xyXG4gIHB1YmxpYyBkaXNwbGF5X3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgcHVibGljIHN0YXRXaWR0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtYXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGVjaW1hbHM6IHN0cmluZztcclxuICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICBwdWJsaWMgY29uZGl0aW9uYWxfZm9ybWF0czogQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHNbXTtcclxuICBwdWJsaWMgYWRkRmlsdGVyO1xyXG4gIHB1YmxpYyByZW1vdmVGaWx0ZXI7XHJcbiAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgcHVibGljIGdldFN0YXRzO1xyXG4gIHB1YmxpYyBnZXRWYWx1ZXM7XHJcbiAgcHVibGljIGdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkO1xyXG4gIHB1YmxpYyBnZXRPdXRwdXRWYWx1ZTtcclxuICBwdWJsaWMgZ2V0TWF0Y2hpbmdDb25kaXRpb247XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmRlZmF1bHRTdGF0ID0gb3B0aW9ucy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCI7XHJcbiAgICB0aGlzLmRpc3BsYXlfdGVtcGxhdGUgPVxyXG4gICAgICBvcHRpb25zLmRpc3BsYXlfdGVtcGxhdGUgfHwgY29uZmlnLnRlbXBsYXRlcy5kZWZhdWx0X25vcm1hbDtcclxuICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5mb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcIm5vbmVcIjtcclxuICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zLmRlY2ltYWxzIHx8IFwiMFwiO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gb3B0aW9ucy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHtcclxuICAgIGZpZWxkOiB0aGlzLmZpZWxkIHx8IFwiU2FtcGxlXCIsXHJcbiAgICBvcGVyYXRvcjogXCJlcXVhbHNcIlxyXG4gIH0pO1xyXG4gIHRoaXMuZmlsdGVycyA9IHRoaXMuZmlsdGVycyB8fCBbXTtcclxuICB0aGlzLmZpbHRlcnMucHVzaChuZXdmaWx0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuYWRkQ29uZGl0b25hbEZvcm1hdCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xyXG4gIGxldCBuZXdfY29uZGl0aW9uYWxfZm9ybWF0dGVyID0gbmV3IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzKHtcclxuICAgIGZpZWxkOiB0aGlzLmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIixcclxuICAgIG9wZXJhdG9yOiBcImVxdWFsc1wiXHJcbiAgfSk7XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5wdXNoKG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uKFxyXG4gIGluZGV4OiBOdW1iZXJcclxuKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgZGlyZWN0aW9uOiBzdHJpbmcsXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgLSAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxuICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW1xyXG4gICAgICBOdW1iZXIoaW5kZXgpICsgMVxyXG4gICAgXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnNldFVuaXRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQ6IGFueSk6IHZvaWQge1xyXG4gIHRoaXMuZm9ybWF0ID0gZm9ybWF0ICYmIGZvcm1hdC52YWx1ZSA/IGZvcm1hdC52YWx1ZSA6IFwibm9uZVwiO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbihtYXN0ZXJkYXRhKTogYW55IHtcclxuICBsZXQgZmlsdGVyZWRNYXN0ZXJEYXRhID0gZ2V0RmlsdGVyZWREYXRhRnJvbU1hc3RlckRhdGEoXHJcbiAgICBtYXN0ZXJkYXRhLFxyXG4gICAgdGhpcy5maWx0ZXJzXHJcbiAgKTtcclxuICBsZXQgbXlzdGF0czogYW55ID0gW107XHJcbiAgXy5lYWNoKGZpbHRlcmVkTWFzdGVyRGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSB0aGlzLmZpZWxkKTtcclxuICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzKG15c3RhdHMpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5nZXRUZW1wbGF0ZVdpdGhUb2tlbnNSZXBsYWNlZCA9IGZ1bmN0aW9uKFxyXG4gIHRlbXBsYXRlLFxyXG4gIHN0YXRzR3JvdXBcclxuKSB7XHJcbiAgbGV0IG91dHB1dCA9IHRlbXBsYXRlO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT9kZWZhdWx0XFx9LywgXCJnaVwiKSxcclxuICAgIHRoaXMuZGVmYXVsdFN0YXQgfHwgXCIke2ZpcnN0fVwiXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/ZGVmYXVsdF9yYXdcXH0vLCBcImdpXCIpLFxyXG4gICAgKHRoaXMuZGVmYXVsdFN0YXQgfHwgXCIke2ZpcnN0fVwiKS5yZXBsYWNlKFwifVwiLCBcIl9yYXd9XCIpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/Zmlyc3RcXH0vLCBcImdpXCIpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5maXJzdClcclxuICAgICAgPyBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuZmlyc3QsIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP2ZpcnN0X3Jhd1xcfS8sIFwiZ2lcIiksXHJcbiAgICBzdGF0c0dyb3VwLmZpcnN0XHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/bWluXFx9LywgXCJnaVwiKSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAubWluKVxyXG4gICAgICA/IHN0YXRzR3JvdXAubWluXHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWluLCB0aGlzLmZvcm1hdCwgdGhpcy5kZWNpbWFscylcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT9taW5fcmF3XFx9LywgXCJnaVwiKSxcclxuICAgIHN0YXRzR3JvdXAubWluXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/bWF4XFx9LywgXCJnaVwiKSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAubWF4KVxyXG4gICAgICA/IHN0YXRzR3JvdXAubWF4XHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWF4LCB0aGlzLmZvcm1hdCwgdGhpcy5kZWNpbWFscylcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT9tYXhfcmF3XFx9LywgXCJnaVwiKSxcclxuICAgIHN0YXRzR3JvdXAubWF4XHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/bWVhblxcfS8sIFwiZ2lcIiksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLm1lYW4pXHJcbiAgICAgID8gc3RhdHNHcm91cC5tZWFuXHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAubWVhbiwgdGhpcy5mb3JtYXQsIHRoaXMuZGVjaW1hbHMpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/bWVhbl9yYXdcXH0vLCBcImdpXCIpLFxyXG4gICAgc3RhdHNHcm91cC5tZWFuXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/c3VtXFx9LywgXCJnaVwiKSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAuc3VtKVxyXG4gICAgICA/IHN0YXRzR3JvdXAuc3VtXHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuc3VtLCB0aGlzLmZvcm1hdCwgdGhpcy5kZWNpbWFscylcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT9zdW1fcmF3XFx9LywgXCJnaVwiKSxcclxuICAgIHN0YXRzR3JvdXAuc3VtXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/Y291bnRcXH0vLCBcImdpXCIpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5jb3VudClcclxuICAgICAgPyBzdGF0c0dyb3VwLmNvdW50XHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAuY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP2NvdW50X3Jhd1xcfS8sIFwiZ2lcIiksXHJcbiAgICBzdGF0c0dyb3VwLmNvdW50XHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/dW5pcXVlY291bnRcXH0vLCBcImdpXCIpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC51bmlxdWVjb3VudClcclxuICAgICAgPyBzdGF0c0dyb3VwLnVuaXF1ZWNvdW50XHJcbiAgICAgIDogZ2V0Rm9ybWF0dGVkT3V0cHV0KHN0YXRzR3JvdXAudW5pcXVlY291bnQgfHwgMCwgXCJub25lXCIsIFwiMFwiKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP3VuaXF1ZWNvdW50X3Jhd1xcfS8sIFwiZ2lcIiksXHJcbiAgICBzdGF0c0dyb3VwLnVuaXF1ZWNvdW50XHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP3RpdGxlXFx9LywgXCJnaVwiKSwgdGhpcy50aXRsZSk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cCgvXFwkXFx7W159XT9maWVsZFxcfS8sIFwiZ2lcIiksIHRoaXMuZmllbGQpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoL1xcJFxce1tefV0/YmdDb2xvclxcfS8sIFwiZ2lcIiksIHRoaXMuYmdDb2xvcik7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP3RleHRDb2xvclxcfS8sIFwiZ2lcIiksXHJcbiAgICB0aGlzLnRleHRDb2xvclxyXG4gICk7XHJcbiAgcmV0dXJuIG91dHB1dDtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuZ2V0TWF0Y2hpbmdDb25kaXRpb24gPSBmdW5jdGlvbihzdGF0c0dyb3VwKSB7XHJcbiAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IF8uZmlyc3QoXHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMuZmlsdGVyKGNvbmRpdGlvbiA9PiB7XHJcbiAgICAgIGxldCBvcmlnaW5hbF9zdGF0TmFtZSA9IChjb25kaXRpb24uZmllbGQgfHwgXCIke3ZhbHVlfVwiKVxyXG4gICAgICAgIC5yZXBsYWNlKFwiJHtcIiwgXCJcIilcclxuICAgICAgICAucmVwbGFjZShcIn1cIiwgXCJcIik7XHJcbiAgICAgIGxldCBvcmlnaW5hbF92YWx1ZSA9IGdldFN0YXRGcm9tU3RhdHNHcm91cChzdGF0c0dyb3VwLCBvcmlnaW5hbF9zdGF0TmFtZSk7XHJcbiAgICAgIHJldHVybiBpc01hdGNoKFxyXG4gICAgICAgIG9yaWdpbmFsX3ZhbHVlLFxyXG4gICAgICAgIGNvbmRpdGlvbi5vcGVyYXRvcixcclxuICAgICAgICBjb25kaXRpb24udmFsdWUsXHJcbiAgICAgICAgY29uZGl0aW9uLnZhbHVlMlxyXG4gICAgICApO1xyXG4gICAgfSlcclxuICApO1xyXG4gIHJldHVybiBtYXRjaGluZ19jb25kaXRpb247XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldE91dHB1dFZhbHVlID0gZnVuY3Rpb24obWFzdGVyZGF0YSkge1xyXG4gIGlmIChtYXN0ZXJkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIFwiPGRpdiBzdHlsZT0ndGV4dC1hbGlnbjpjZW50ZXI7Jz5ObyBEYXRhPC9kaXY+XCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBzdGF0c0dyb3VwID0gdGhpcy5nZXRWYWx1ZXMobWFzdGVyZGF0YSk7XHJcbiAgICBsZXQgbWF0Y2hpbmdfY29uZGl0aW9uID0gdGhpcy5nZXRNYXRjaGluZ0NvbmRpdGlvbihzdGF0c0dyb3VwKTtcclxuICAgIGxldCBiZ0NvbG9yID1cclxuICAgICAgbWF0Y2hpbmdfY29uZGl0aW9uICYmIG1hdGNoaW5nX2NvbmRpdGlvbi5iZ0NvbG9yXHJcbiAgICAgICAgPyBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvclxyXG4gICAgICAgIDogdGhpcy5iZ0NvbG9yO1xyXG4gICAgbGV0IHRleHRDb2xvciA9XHJcbiAgICAgIG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24udGV4dENvbG9yXHJcbiAgICAgICAgPyBtYXRjaGluZ19jb25kaXRpb24udGV4dENvbG9yXHJcbiAgICAgICAgOiB0aGlzLnRleHRDb2xvcjtcclxuICAgIGxldCB0ZW1wbGF0ZSA9XHJcbiAgICAgIG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uZGlzcGxheV90ZW1wbGF0ZVxyXG4gICAgICAgID8gbWF0Y2hpbmdfY29uZGl0aW9uLmRpc3BsYXlfdGVtcGxhdGVcclxuICAgICAgICA6IHRoaXMuZGlzcGxheV90ZW1wbGF0ZTtcclxuICAgIGxldCB0ZW1wbGF0ZV9yZXBsYWNlZCA9IHJlcGxhY2VUb2tlbnMoXHJcbiAgICAgIHRoaXMuZ2V0VGVtcGxhdGVXaXRoVG9rZW5zUmVwbGFjZWQodGVtcGxhdGUsIHN0YXRzR3JvdXApXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6JHt0aGlzLnN0YXRXaWR0aCB8fFxyXG4gICAgICBcIjEwMFwifSU7ZmxvYXQ6bGVmdDtiYWNrZ3JvdW5kOiR7YmdDb2xvcn07Y29sb3I6JHt0ZXh0Q29sb3J9O1wiPlxyXG4gICAgICAke3RlbXBsYXRlX3JlcGxhY2VkfVxyXG4gICAgPC9kaXY+YDtcclxuICB9XHJcbn07XHJcbiJdfQ==