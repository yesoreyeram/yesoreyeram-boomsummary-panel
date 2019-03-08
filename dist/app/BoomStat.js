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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN0YXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0Jvb21TdGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBY0E7Z0JBdUJFLHlCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO29CQUNyRCxJQUFJLENBQUMsZ0JBQWdCO3dCQUNuQixPQUFPLENBQUMsZ0JBQWdCLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7b0JBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDO2dCQUMvRCxDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FBQyxBQXJDRCxJQXFDQzs7WUFFRCxlQUFlLENBQUMsU0FBUyxD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Q0FBQyxPQUFPO3dCQUM5QyxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTzt3QkFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ25CLElBQUksU0FBUyxHQUNYLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFNBQVM7d0JBQ2hELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO3dCQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDckIsSUFBSSxRQUFRLEdBQ1Ysa0JBQWtCLElBQUksa0JBQWtCLENBQUMsZ0JBQWdCO3dCQUN2RCxDQUFDLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCO3dCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO29CQUM1QixJQUFJLGlCQUFpQixHQUFHLHlCQUFhLENBQ25DLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQ3pELENBQUM7b0JBQ0YsT0FBTyx5QkFBcUIsSUFBSSxDQUFDLFNBQVM7d0JBQ3hDLEtBQUssaUNBQTJCLE9BQU8sZUFBVSxTQUFTLG9CQUN4RCxpQkFBaUIsaUJBQ2QsQ0FBQztpQkFDVDtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlGaWx0ZXIgfSBmcm9tIFwiLi9GaWx0ZXJzL0Jvb21GaWx0ZXJcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgfSBmcm9tIFwiLi9GaWx0ZXJzL0Jvb21Db25kaXRpb25hbEZvcm1hdFwiO1xyXG5pbXBvcnQge1xyXG4gIGdldFN0YXRGcm9tU3RhdHNHcm91cCxcclxuICByZXBsYWNlVG9rZW5zLFxyXG4gIGdldFN0YXRzRnJvbUFycmF5T2ZPYmplY3RzLFxyXG4gIGlzTWF0Y2hcclxufSBmcm9tIFwiLi4vdXRpbHMvQm9vbVV0aWxzXCI7XHJcbmltcG9ydCB7IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhIH0gZnJvbSBcIi4vLi4vdXRpbHMvQXBwVXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0Rm9ybWF0dGVkT3V0cHV0IH0gZnJvbSBcIi4vLi4vdXRpbHMvR3JhZmFuYVV0aWxzXCI7XHJcbmltcG9ydCB7IElCb29tU3VtbWFyeVN0YXQgfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5U3RhdCBpbXBsZW1lbnRzIElCb29tU3VtbWFyeVN0YXQge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkZWZhdWx0U3RhdDogc3RyaW5nO1xyXG4gIHB1YmxpYyBkaXNwbGF5X3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgcHVibGljIHN0YXRXaWR0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtYXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGVjaW1hbHM6IHN0cmluZztcclxuICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICBwdWJsaWMgY29uZGl0aW9uYWxfZm9ybWF0czogQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHNbXTtcclxuICBwdWJsaWMgYWRkRmlsdGVyO1xyXG4gIHB1YmxpYyByZW1vdmVGaWx0ZXI7XHJcbiAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgcHVibGljIGdldFN0YXRzO1xyXG4gIHB1YmxpYyBnZXRWYWx1ZXM7XHJcbiAgcHVibGljIGdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkO1xyXG4gIHB1YmxpYyBnZXRPdXRwdXRWYWx1ZTtcclxuICBwdWJsaWMgZ2V0TWF0Y2hpbmdDb25kaXRpb247XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmRlZmF1bHRTdGF0ID0gb3B0aW9ucy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCI7XHJcbiAgICB0aGlzLmRpc3BsYXlfdGVtcGxhdGUgPVxyXG4gICAgICBvcHRpb25zLmRpc3BsYXlfdGVtcGxhdGUgfHwgY29uZmlnLnRlbXBsYXRlcy5kZWZhdWx0X25vcm1hbDtcclxuICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5mb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcIm5vbmVcIjtcclxuICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zLmRlY2ltYWxzIHx8IFwiMFwiO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gb3B0aW9ucy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHtcclxuICAgIGZpZWxkOiB0aGlzLmZpZWxkIHx8IFwiU2FtcGxlXCIsXHJcbiAgICBvcGVyYXRvcjogXCJlcXVhbHNcIlxyXG4gIH0pO1xyXG4gIHRoaXMuZmlsdGVycyA9IHRoaXMuZmlsdGVycyB8fCBbXTtcclxuICB0aGlzLmZpbHRlcnMucHVzaChuZXdmaWx0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuYWRkQ29uZGl0b25hbEZvcm1hdCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xyXG4gIGxldCBuZXdfY29uZGl0aW9uYWxfZm9ybWF0dGVyID0gbmV3IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzKHtcclxuICAgIGZpZWxkOiB0aGlzLmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIixcclxuICAgIG9wZXJhdG9yOiBcImVxdWFsc1wiXHJcbiAgfSk7XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5wdXNoKG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uKFxyXG4gIGluZGV4OiBOdW1iZXJcclxuKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgZGlyZWN0aW9uOiBzdHJpbmcsXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgLSAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxuICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW1xyXG4gICAgICBOdW1iZXIoaW5kZXgpICsgMVxyXG4gICAgXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnNldFVuaXRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQ6IGFueSk6IHZvaWQge1xyXG4gIHRoaXMuZm9ybWF0ID0gZm9ybWF0ICYmIGZvcm1hdC52YWx1ZSA/IGZvcm1hdC52YWx1ZSA6IFwibm9uZVwiO1xyXG59O1xyXG5cclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24obWFzdGVyZGF0YSk6IGFueSB7XHJcbiAgbGV0IGZpbHRlcmVkTWFzdGVyRGF0YSA9IGdldEZpbHRlcmVkRGF0YUZyb21NYXN0ZXJEYXRhKFxyXG4gICAgbWFzdGVyZGF0YSxcclxuICAgIHRoaXMuZmlsdGVyc1xyXG4gICk7XHJcbiAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xyXG4gIF8uZWFjaChmaWx0ZXJlZE1hc3RlckRhdGEsIGdyb3VwID0+IHtcclxuICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gdGhpcy5maWVsZCk7XHJcbiAgICBpZiAobWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICBteXN0YXRzLnB1c2goXy5maXJzdChtYXRjaGluZ19maWVsZCkudmFsdWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyhteXN0YXRzKTtcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuZ2V0VGVtcGxhdGVXaXRoVG9rZW5zUmVwbGFjZWQgPSBmdW5jdGlvbihcclxuICB0ZW1wbGF0ZSxcclxuICBzdGF0c0dyb3VwXHJcbikge1xyXG4gIGxldCBvdXRwdXQgPSB0ZW1wbGF0ZTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/ZGVmYXVsdFxcfS8sIFwiZ2lcIiksXHJcbiAgICB0aGlzLmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIlxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP2RlZmF1bHRfcmF3XFx9LywgXCJnaVwiKSxcclxuICAgICh0aGlzLmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIikucmVwbGFjZShcIn1cIiwgXCJfcmF3fVwiKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP2ZpcnN0XFx9LywgXCJnaVwiKSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAuZmlyc3QpXHJcbiAgICAgID8gc3RhdHNHcm91cC5maXJzdFxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmZpcnN0LCB0aGlzLmZvcm1hdCwgdGhpcy5kZWNpbWFscylcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT9maXJzdF9yYXdcXH0vLCBcImdpXCIpLFxyXG4gICAgc3RhdHNHcm91cC5maXJzdFxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP21pblxcfS8sIFwiZ2lcIiksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLm1pbilcclxuICAgICAgPyBzdGF0c0dyb3VwLm1pblxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1pbiwgdGhpcy5mb3JtYXQsIHRoaXMuZGVjaW1hbHMpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/bWluX3Jhd1xcfS8sIFwiZ2lcIiksXHJcbiAgICBzdGF0c0dyb3VwLm1pblxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP21heFxcfS8sIFwiZ2lcIiksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLm1heClcclxuICAgICAgPyBzdGF0c0dyb3VwLm1heFxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1heCwgdGhpcy5mb3JtYXQsIHRoaXMuZGVjaW1hbHMpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/bWF4X3Jhd1xcfS8sIFwiZ2lcIiksXHJcbiAgICBzdGF0c0dyb3VwLm1heFxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP21lYW5cXH0vLCBcImdpXCIpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5tZWFuKVxyXG4gICAgICA/IHN0YXRzR3JvdXAubWVhblxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLm1lYW4sIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP21lYW5fcmF3XFx9LywgXCJnaVwiKSxcclxuICAgIHN0YXRzR3JvdXAubWVhblxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP3N1bVxcfS8sIFwiZ2lcIiksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLnN1bSlcclxuICAgICAgPyBzdGF0c0dyb3VwLnN1bVxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnN1bSwgdGhpcy5mb3JtYXQsIHRoaXMuZGVjaW1hbHMpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIG5ldyBSZWdFeHAoL1xcJFxce1tefV0/c3VtX3Jhd1xcfS8sIFwiZ2lcIiksXHJcbiAgICBzdGF0c0dyb3VwLnN1bVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP2NvdW50XFx9LywgXCJnaVwiKSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAuY291bnQpXHJcbiAgICAgID8gc3RhdHNHcm91cC5jb3VudFxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLmNvdW50IHx8IDAsIFwibm9uZVwiLCBcIjBcIilcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT9jb3VudF9yYXdcXH0vLCBcImdpXCIpLFxyXG4gICAgc3RhdHNHcm91cC5jb3VudFxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICBuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP3VuaXF1ZWNvdW50XFx9LywgXCJnaVwiKSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAudW5pcXVlY291bnQpXHJcbiAgICAgID8gc3RhdHNHcm91cC51bmlxdWVjb3VudFxyXG4gICAgICA6IGdldEZvcm1hdHRlZE91dHB1dChzdGF0c0dyb3VwLnVuaXF1ZWNvdW50IHx8IDAsIFwibm9uZVwiLCBcIjBcIilcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT91bmlxdWVjb3VudF9yYXdcXH0vLCBcImdpXCIpLFxyXG4gICAgc3RhdHNHcm91cC51bmlxdWVjb3VudFxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UobmV3IFJlZ0V4cCgvXFwkXFx7W159XT90aXRsZVxcfS8sIFwiZ2lcIiksIHRoaXMudGl0bGUpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoL1xcJFxce1tefV0/ZmllbGRcXH0vLCBcImdpXCIpLCB0aGlzLmZpZWxkKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShuZXcgUmVnRXhwKC9cXCRcXHtbXn1dP2JnQ29sb3JcXH0vLCBcImdpXCIpLCB0aGlzLmJnQ29sb3IpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgbmV3IFJlZ0V4cCgvXFwkXFx7W159XT90ZXh0Q29sb3JcXH0vLCBcImdpXCIpLFxyXG4gICAgdGhpcy50ZXh0Q29sb3JcclxuICApO1xyXG4gIHJldHVybiBvdXRwdXQ7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldE1hdGNoaW5nQ29uZGl0aW9uID0gZnVuY3Rpb24oc3RhdHNHcm91cCkge1xyXG4gIGxldCBtYXRjaGluZ19jb25kaXRpb24gPSBfLmZpcnN0KFxyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmZpbHRlcihjb25kaXRpb24gPT4ge1xyXG4gICAgICBsZXQgb3JpZ2luYWxfc3RhdE5hbWUgPSAoY29uZGl0aW9uLmZpZWxkIHx8IFwiJHt2YWx1ZX1cIilcclxuICAgICAgICAucmVwbGFjZShcIiR7XCIsIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoXCJ9XCIsIFwiXCIpO1xyXG4gICAgICBsZXQgb3JpZ2luYWxfdmFsdWUgPSBnZXRTdGF0RnJvbVN0YXRzR3JvdXAoc3RhdHNHcm91cCwgb3JpZ2luYWxfc3RhdE5hbWUpO1xyXG4gICAgICByZXR1cm4gaXNNYXRjaChcclxuICAgICAgICBvcmlnaW5hbF92YWx1ZSxcclxuICAgICAgICBjb25kaXRpb24ub3BlcmF0b3IsXHJcbiAgICAgICAgY29uZGl0aW9uLnZhbHVlLFxyXG4gICAgICAgIGNvbmRpdGlvbi52YWx1ZTJcclxuICAgICAgKTtcclxuICAgIH0pXHJcbiAgKTtcclxuICByZXR1cm4gbWF0Y2hpbmdfY29uZGl0aW9uO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5nZXRPdXRwdXRWYWx1ZSA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEpIHtcclxuICBpZiAobWFzdGVyZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBcIjxkaXYgc3R5bGU9J3RleHQtYWxpZ246Y2VudGVyOyc+Tm8gRGF0YTwvZGl2PlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgc3RhdHNHcm91cCA9IHRoaXMuZ2V0VmFsdWVzKG1hc3RlcmRhdGEpO1xyXG4gICAgbGV0IG1hdGNoaW5nX2NvbmRpdGlvbiA9IHRoaXMuZ2V0TWF0Y2hpbmdDb25kaXRpb24oc3RhdHNHcm91cCk7XHJcbiAgICBsZXQgYmdDb2xvciA9XHJcbiAgICAgIG1hdGNoaW5nX2NvbmRpdGlvbiAmJiBtYXRjaGluZ19jb25kaXRpb24uYmdDb2xvclxyXG4gICAgICAgID8gbWF0Y2hpbmdfY29uZGl0aW9uLmJnQ29sb3JcclxuICAgICAgICA6IHRoaXMuYmdDb2xvcjtcclxuICAgIGxldCB0ZXh0Q29sb3IgPVxyXG4gICAgICBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvclxyXG4gICAgICAgID8gbWF0Y2hpbmdfY29uZGl0aW9uLnRleHRDb2xvclxyXG4gICAgICAgIDogdGhpcy50ZXh0Q29sb3I7XHJcbiAgICBsZXQgdGVtcGxhdGUgPVxyXG4gICAgICBtYXRjaGluZ19jb25kaXRpb24gJiYgbWF0Y2hpbmdfY29uZGl0aW9uLmRpc3BsYXlfdGVtcGxhdGVcclxuICAgICAgICA/IG1hdGNoaW5nX2NvbmRpdGlvbi5kaXNwbGF5X3RlbXBsYXRlXHJcbiAgICAgICAgOiB0aGlzLmRpc3BsYXlfdGVtcGxhdGU7XHJcbiAgICBsZXQgdGVtcGxhdGVfcmVwbGFjZWQgPSByZXBsYWNlVG9rZW5zKFxyXG4gICAgICB0aGlzLmdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkKHRlbXBsYXRlLCBzdGF0c0dyb3VwKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBgPGRpdiBzdHlsZT1cIndpZHRoOiR7dGhpcy5zdGF0V2lkdGggfHxcclxuICAgICAgXCIxMDBcIn0lO2Zsb2F0OmxlZnQ7YmFja2dyb3VuZDoke2JnQ29sb3J9O2NvbG9yOiR7dGV4dENvbG9yfTtcIj5cclxuICAgICAgJHt0ZW1wbGF0ZV9yZXBsYWNlZH1cclxuICAgIDwvZGl2PmA7XHJcbiAgfVxyXG59O1xyXG4iXX0=