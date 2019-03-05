System.register(["lodash", "./Filters/BoomFilter", "./Filters/BoomConditionalFormat", "../utils/MatchUtils", "./../utils/GrafanaUtils", "../config"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomFilter_1, BoomConditionalFormat_1, MatchUtils_1, GrafanaUtils_1, config_1, BoomSummaryStat, didSatisfyFilters;
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
            BoomSummaryStat.prototype.getStats = function (mystats) {
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN0YXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0Jvb21TdGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUUE7Z0JBcUJFLHlCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO29CQUNyRCxJQUFJLENBQUMsZ0JBQWdCO3dCQUNuQixPQUFPLENBQUMsZ0JBQWdCLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7b0JBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7b0JBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDO2dCQUMvRCxDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FBQyxBQW5DRCxJQW1DQzs7WUFFRCxlQUFlLENBQUMsU0FBUyxDQUFD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QUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5RmlsdGVyIH0gZnJvbSBcIi4vRmlsdGVycy9Cb29tRmlsdGVyXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIH0gZnJvbSBcIi4vRmlsdGVycy9Cb29tQ29uZGl0aW9uYWxGb3JtYXRcIjtcclxuaW1wb3J0IHsgaXNNYXRjaCB9IGZyb20gXCIuLi91dGlscy9NYXRjaFV0aWxzXCI7XHJcbmltcG9ydCB7IGdldEZvcm1hdHRlZE91dHB1dCB9IGZyb20gXCIuLy4uL3V0aWxzL0dyYWZhbmFVdGlsc1wiO1xyXG5pbXBvcnQgeyBJQm9vbVN1bW1hcnlTdGF0IH0gZnJvbSBcIi4uL2RlZmluaXRpb25zL3R5cGVzXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29tU3VtbWFyeVN0YXQgaW1wbGVtZW50cyBJQm9vbVN1bW1hcnlTdGF0IHtcclxuICBwdWJsaWMgZmllbGQ6IHN0cmluZztcclxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICBwdWJsaWMgZGVmYXVsdFN0YXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGlzcGxheV90ZW1wbGF0ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBzdGF0V2lkdGg6IHN0cmluZztcclxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgZm9ybWF0OiBzdHJpbmc7XHJcbiAgcHVibGljIGRlY2ltYWxzOiBzdHJpbmc7XHJcbiAgcHVibGljIGZpbHRlcnM6IEJvb21TdW1tYXJ5RmlsdGVyW107XHJcbiAgcHVibGljIGNvbmRpdGlvbmFsX2Zvcm1hdHM6IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzW107XHJcbiAgcHVibGljIGFkZEZpbHRlcjtcclxuICBwdWJsaWMgcmVtb3ZlRmlsdGVyO1xyXG4gIHB1YmxpYyBhZGRDb25kaXRvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyByZW1vdmVDb25kaXRpb25hbEZvcm1hdDtcclxuICBwdWJsaWMgbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBzZXRVbml0Rm9ybWF0O1xyXG4gIHB1YmxpYyBnZXRTdGF0cztcclxuICBwdWJsaWMgZ2V0VmFsdWVzO1xyXG4gIHB1YmxpYyBnZXRUZW1wbGF0ZVdpdGhUb2tlbnNSZXBsYWNlZDtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLmZpZWxkID0gb3B0aW9ucy5maWVsZCB8fCBcIlNhbXBsZVwiO1xyXG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGUgfHwgdGhpcy5maWVsZDtcclxuICAgIHRoaXMuZGVmYXVsdFN0YXQgPSBvcHRpb25zLmRlZmF1bHRTdGF0IHx8IFwiJHtmaXJzdH1cIjtcclxuICAgIHRoaXMuZGlzcGxheV90ZW1wbGF0ZSA9XHJcbiAgICAgIG9wdGlvbnMuZGlzcGxheV90ZW1wbGF0ZSB8fCBjb25maWcudGVtcGxhdGVzLmRlZmF1bHRfbm9ybWFsO1xyXG4gICAgdGhpcy5zdGF0V2lkdGggPSBvcHRpb25zLnN0YXRXaWR0aCB8fCBcIjEwMFwiO1xyXG4gICAgdGhpcy5iZ0NvbG9yID0gb3B0aW9ucy5iZ0NvbG9yIHx8IFwiXCI7XHJcbiAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICB0aGlzLmZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0IHx8IFwibm9uZVwiO1xyXG4gICAgdGhpcy5kZWNpbWFscyA9IG9wdGlvbnMuZGVjaW1hbHMgfHwgXCIwXCI7XHJcbiAgICB0aGlzLmZpbHRlcnMgPSBvcHRpb25zLmZpbHRlcnMgfHwgW107XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgPSBvcHRpb25zLmNvbmRpdGlvbmFsX2Zvcm1hdHMgfHwgW107XHJcbiAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKCk6IHZvaWQge1xyXG4gIGxldCBuZXdmaWx0ZXIgPSBuZXcgQm9vbVN1bW1hcnlGaWx0ZXIoe1xyXG4gICAgZmllbGQ6IHRoaXMuZmllbGQgfHwgXCJTYW1wbGVcIixcclxuICAgIG9wZXJhdG9yOiBcImVxdWFsc1wiXHJcbiAgfSk7XHJcbiAgdGhpcy5maWx0ZXJzID0gdGhpcy5maWx0ZXJzIHx8IFtdO1xyXG4gIHRoaXMuZmlsdGVycy5wdXNoKG5ld2ZpbHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICBpZiAodGhpcy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRDb25kaXRvbmFsRm9ybWF0ID0gZnVuY3Rpb24oKTogdm9pZCB7XHJcbiAgbGV0IG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIgPSBuZXcgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMoe1xyXG4gICAgZmllbGQ6IHRoaXMuZGVmYXVsdFN0YXQgfHwgXCIke2ZpcnN0fVwiLFxyXG4gICAgb3BlcmF0b3I6IFwiZXF1YWxzXCJcclxuICB9KTtcclxuICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMgfHwgW107XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLnB1c2gobmV3X2NvbmRpdGlvbmFsX2Zvcm1hdHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBpZiAodGhpcy5jb25kaXRpb25hbF9mb3JtYXRzLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5tb3ZlQ29uZGl0aW9uYWxGb3JtYXQgPSBmdW5jdGlvbihcclxuICBkaXJlY3Rpb246IHN0cmluZyxcclxuICBpbmRleDogTnVtYmVyXHJcbik6IHZvaWQge1xyXG4gIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXTtcclxuICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tcclxuICAgICAgTnVtYmVyKGluZGV4KSAtIDFcclxuICAgIF07XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgfVxyXG4gIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgKyAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuc2V0VW5pdEZvcm1hdCA9IGZ1bmN0aW9uKGZvcm1hdDogYW55KTogdm9pZCB7XHJcbiAgdGhpcy5mb3JtYXQgPSBmb3JtYXQgJiYgZm9ybWF0LnZhbHVlID8gZm9ybWF0LnZhbHVlIDogXCJub25lXCI7XHJcbn07XHJcblxyXG5sZXQgZGlkU2F0aXNmeUZpbHRlcnMgPSBmdW5jdGlvbihncm91cCwgZmlsdGVycykge1xyXG4gIGlmIChmaWx0ZXJzICYmIGZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgbGV0IG1hdGNoZXMgPSAwO1xyXG4gICAgXy5lYWNoKGZpbHRlcnMsIGZpbHRlciA9PiB7XHJcbiAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gZmlsdGVyLmZpZWxkKTtcclxuICAgICAgaWYgKG1hdGNoaW5nX2ZpZWxkICYmIG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtYXRjaGVzICs9XHJcbiAgICAgICAgICBpc01hdGNoKFxyXG4gICAgICAgICAgICBtYXRjaGluZ19maWVsZFswXS52YWx1ZSxcclxuICAgICAgICAgICAgZmlsdGVyLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUsXHJcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZTJcclxuICAgICAgICAgICkgPT09IHRydWVcclxuICAgICAgICAgICAgPyAxXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hlcyA9PT0gZmlsdGVycy5sZW5ndGg7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24obWFzdGVyZGF0YSk6IGFueSB7XHJcbiAgbGV0IG15c3RhdHM6IGFueSA9IFtdO1xyXG4gIF8uZWFjaChtYXN0ZXJkYXRhLCBncm91cCA9PiB7XHJcbiAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IHRoaXMuZmllbGQpO1xyXG4gICAgaWYgKG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDAgJiYgZGlkU2F0aXNmeUZpbHRlcnMoZ3JvdXAsIHRoaXMuZmlsdGVycykpIHtcclxuICAgICAgbXlzdGF0cy5wdXNoKF8uZmlyc3QobWF0Y2hpbmdfZmllbGQpLnZhbHVlKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gbXlzdGF0cztcclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihteXN0YXRzKTogYW55IHtcclxuICBsZXQgc3RhdHNncm91cDogYW55ID0ge307XHJcbiAgc3RhdHNncm91cC5jb3VudCA9IG15c3RhdHMubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAudW5pcXVlY291bnQgPSBfLnVuaXEobXlzdGF0cykubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAuc3VtID0gXy5zdW0obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWVhbiA9IF8ubWVhbihteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5taW4gPSBfLm1pbihteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5tYXggPSBfLm1heChteXN0YXRzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5maXJzdCA9IF8uZmlyc3QobXlzdGF0cyk7XHJcbiAgcmV0dXJuIHN0YXRzZ3JvdXA7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldFRlbXBsYXRlV2l0aFRva2Vuc1JlcGxhY2VkID0gZnVuY3Rpb24oXHJcbiAgdGVtcGxhdGUsXHJcbiAgc3RhdHNHcm91cFxyXG4pIHtcclxuICBsZXQgb3V0cHV0ID0gdGVtcGxhdGU7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXHJcbiAgICAvXFwkXFx7W159XT9kZWZhdWx0XFx9L2dpLFxyXG4gICAgdGhpcy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCJcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/ZGVmYXVsdF9yYXdcXH0vZ2ksXHJcbiAgICAodGhpcy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCIpLnJlcGxhY2UoXCJ9XCIsIFwiX3Jhd31cIilcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/Zmlyc3RcXH0vZ2ksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLmZpcnN0KVxyXG4gICAgICA/IHN0YXRzR3JvdXAuZmlyc3RcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5maXJzdCwgdGhpcy5mb3JtYXQsIHRoaXMuZGVjaW1hbHMpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9maXJzdF9yYXdcXH0vZ2ksIHN0YXRzR3JvdXAuZmlyc3QpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/bWluXFx9L2dpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5taW4pXHJcbiAgICAgID8gc3RhdHNHcm91cC5taW5cclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5taW4sIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/bWluX3Jhd1xcfS9naSwgc3RhdHNHcm91cC5taW4pO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/bWF4XFx9L2dpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5tYXgpXHJcbiAgICAgID8gc3RhdHNHcm91cC5tYXhcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tYXgsIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/bWF4X3Jhd1xcfS9naSwgc3RhdHNHcm91cC5tYXgpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/bWVhblxcfS9naSxcclxuICAgIGlzTmFOKHN0YXRzR3JvdXAubWVhbilcclxuICAgICAgPyBzdGF0c0dyb3VwLm1lYW5cclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5tZWFuLCB0aGlzLmZvcm1hdCwgdGhpcy5kZWNpbWFscylcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP21lYW5fcmF3XFx9L2dpLCBzdGF0c0dyb3VwLm1lYW4pO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/c3VtXFx9L2dpLFxyXG4gICAgaXNOYU4oc3RhdHNHcm91cC5zdW0pXHJcbiAgICAgID8gc3RhdHNHcm91cC5zdW1cclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5zdW0sIHRoaXMuZm9ybWF0LCB0aGlzLmRlY2ltYWxzKVxyXG4gICk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/c3VtX3Jhd1xcfS9naSwgc3RhdHNHcm91cC5zdW0pO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/Y291bnRcXH0vZ2ksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLmNvdW50KVxyXG4gICAgICA/IHN0YXRzR3JvdXAuY291bnRcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC5jb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9jb3VudF9yYXdcXH0vZ2ksIHN0YXRzR3JvdXAuY291bnQpO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKFxyXG4gICAgL1xcJFxce1tefV0/dW5pcXVlY291bnRcXH0vZ2ksXHJcbiAgICBpc05hTihzdGF0c0dyb3VwLnVuaXF1ZWNvdW50KVxyXG4gICAgICA/IHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICAgICAgOiBnZXRGb3JtYXR0ZWRPdXRwdXQoc3RhdHNHcm91cC51bmlxdWVjb3VudCB8fCAwLCBcIm5vbmVcIiwgXCIwXCIpXHJcbiAgKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShcclxuICAgIC9cXCRcXHtbXn1dP3VuaXF1ZWNvdW50X3Jhd1xcfS9naSxcclxuICAgIHN0YXRzR3JvdXAudW5pcXVlY291bnRcclxuICApO1xyXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXCRcXHtbXn1dP3RpdGxlXFx9L2dpLCB0aGlzLnRpdGxlKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT9maWVsZFxcfS9naSwgdGhpcy5maWVsZCk7XHJcbiAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcJFxce1tefV0/YmdDb2xvclxcfS9naSwgdGhpcy5iZ0NvbG9yKTtcclxuICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvXFwkXFx7W159XT90ZXh0Q29sb3JcXH0vZ2ksIHRoaXMudGV4dENvbG9yKTtcclxuICByZXR1cm4gb3V0cHV0O1xyXG59O1xyXG4iXX0=