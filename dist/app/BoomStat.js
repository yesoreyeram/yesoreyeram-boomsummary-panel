System.register(["lodash", "./Filters/BoomFilter", "./Filters/BoomConditionalFormat", "../utils/MatchUtils", "../config"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomFilter_1, BoomConditionalFormat_1, MatchUtils_1, config_1, BoomSummaryStat, didSatisfyFilters;
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
                        options.display_template ||
                            config_1.config.templates.default_normal;
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVN0YXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0Jvb21TdGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Z0JBb0JFLHlCQUFZLE9BQU87b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO29CQUNyRCxJQUFJLENBQUMsZ0JBQWdCO3dCQUNuQixPQUFPLENBQUMsZ0JBQWdCOzRCQUN4QixlQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7Z0JBQy9ELENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQUFDLEFBbkNELElBbUNDOztZQUVELGVBQWUsQ0FBQyxTQUFTLENBQUMs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S0FBSyxHQUFHLGdCQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLFVBQVUsQ0FBQztZQUNwQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5RmlsdGVyIH0gZnJvbSBcIi4vRmlsdGVycy9Cb29tRmlsdGVyXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIH0gZnJvbSBcIi4vRmlsdGVycy9Cb29tQ29uZGl0aW9uYWxGb3JtYXRcIjtcclxuaW1wb3J0IHsgaXNNYXRjaCB9IGZyb20gXCIuLi91dGlscy9NYXRjaFV0aWxzXCI7XHJcbmltcG9ydCB7IElCb29tU3VtbWFyeVN0YXQgfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5U3RhdCBpbXBsZW1lbnRzIElCb29tU3VtbWFyeVN0YXQge1xyXG4gIHB1YmxpYyBmaWVsZDogc3RyaW5nO1xyXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkZWZhdWx0U3RhdDogc3RyaW5nO1xyXG4gIHB1YmxpYyBkaXNwbGF5X3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgcHVibGljIHN0YXRXaWR0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtYXQ6IHN0cmluZztcclxuICBwdWJsaWMgZGVjaW1hbHM6IHN0cmluZztcclxuICBwdWJsaWMgZmlsdGVyczogQm9vbVN1bW1hcnlGaWx0ZXJbXTtcclxuICBwdWJsaWMgY29uZGl0aW9uYWxfZm9ybWF0czogQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHNbXTtcclxuICBwdWJsaWMgYWRkRmlsdGVyO1xyXG4gIHB1YmxpYyByZW1vdmVGaWx0ZXI7XHJcbiAgcHVibGljIGFkZENvbmRpdG9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHJlbW92ZUNvbmRpdGlvbmFsRm9ybWF0O1xyXG4gIHB1YmxpYyBtb3ZlQ29uZGl0aW9uYWxGb3JtYXQ7XHJcbiAgcHVibGljIHNldFVuaXRGb3JtYXQ7XHJcbiAgcHVibGljIGdldFN0YXRzO1xyXG4gIHB1YmxpYyBnZXRWYWx1ZXM7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5maWVsZCA9IG9wdGlvbnMuZmllbGQgfHwgXCJTYW1wbGVcIjtcclxuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IHRoaXMuZmllbGQ7XHJcbiAgICB0aGlzLmRlZmF1bHRTdGF0ID0gb3B0aW9ucy5kZWZhdWx0U3RhdCB8fCBcIiR7Zmlyc3R9XCI7XHJcbiAgICB0aGlzLmRpc3BsYXlfdGVtcGxhdGUgPVxyXG4gICAgICBvcHRpb25zLmRpc3BsYXlfdGVtcGxhdGUgfHxcclxuICAgICAgY29uZmlnLnRlbXBsYXRlcy5kZWZhdWx0X25vcm1hbDtcclxuICAgIHRoaXMuc3RhdFdpZHRoID0gb3B0aW9ucy5zdGF0V2lkdGggfHwgXCIxMDBcIjtcclxuICAgIHRoaXMuYmdDb2xvciA9IG9wdGlvbnMuYmdDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSBvcHRpb25zLnRleHRDb2xvciB8fCBcIlwiO1xyXG4gICAgdGhpcy5mb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcIm5vbmVcIjtcclxuICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zLmRlY2ltYWxzIHx8IFwiMFwiO1xyXG4gICAgdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gb3B0aW9ucy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcclxuICBsZXQgbmV3ZmlsdGVyID0gbmV3IEJvb21TdW1tYXJ5RmlsdGVyKHtcclxuICAgIGZpZWxkIDogdGhpcy5maWVsZCB8fCBcIlNhbXBsZVwiLFxyXG4gICAgb3BlcmF0b3IgOiBcImVxdWFsc1wiXHJcbiAgfSk7XHJcbiAgdGhpcy5maWx0ZXJzID0gdGhpcy5maWx0ZXJzIHx8IFtdO1xyXG4gIHRoaXMuZmlsdGVycy5wdXNoKG5ld2ZpbHRlcik7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICBpZiAodGhpcy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5hZGRDb25kaXRvbmFsRm9ybWF0ID0gZnVuY3Rpb24oKTogdm9pZCB7XHJcbiAgbGV0IG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIgPSBuZXcgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMoe1xyXG4gICAgZmllbGQ6IHRoaXMuZGVmYXVsdFN0YXQgfHwgXCIke2ZpcnN0fVwiLFxyXG4gICAgb3BlcmF0b3IgOiBcImVxdWFsc1wiXHJcbiAgfSk7XHJcbiAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzIHx8IFtdO1xyXG4gIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5wdXNoKG5ld19jb25kaXRpb25hbF9mb3JtYXR0ZXIpO1xyXG59O1xyXG5cclxuQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZS5yZW1vdmVDb25kaXRpb25hbEZvcm1hdCA9IGZ1bmN0aW9uKFxyXG4gIGluZGV4OiBOdW1iZXJcclxuKTogdm9pZCB7XHJcbiAgaWYgKHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHMuc3BsaWNlKE51bWJlcihpbmRleCksIDEpO1xyXG4gIH1cclxufTtcclxuXHJcbkJvb21TdW1tYXJ5U3RhdC5wcm90b3R5cGUubW92ZUNvbmRpdGlvbmFsRm9ybWF0ID0gZnVuY3Rpb24oXHJcbiAgZGlyZWN0aW9uOiBzdHJpbmcsXHJcbiAgaW5kZXg6IE51bWJlclxyXG4pOiB2b2lkIHtcclxuICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV07XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLmNvbmRpdGlvbmFsX2Zvcm1hdHNbXHJcbiAgICAgIE51bWJlcihpbmRleCkgLSAxXHJcbiAgICBdO1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gIH1cclxuICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW051bWJlcihpbmRleCldID0gdGhpcy5jb25kaXRpb25hbF9mb3JtYXRzW1xyXG4gICAgICBOdW1iZXIoaW5kZXgpICsgMVxyXG4gICAgXTtcclxuICAgIHRoaXMuY29uZGl0aW9uYWxfZm9ybWF0c1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLnNldFVuaXRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQ6IGFueSk6IHZvaWQge1xyXG4gIHRoaXMuZm9ybWF0ID0gZm9ybWF0ICYmIGZvcm1hdC52YWx1ZSA/IGZvcm1hdC52YWx1ZSA6IFwibm9uZVwiO1xyXG59O1xyXG5cclxubGV0IGRpZFNhdGlzZnlGaWx0ZXJzID0gZnVuY3Rpb24oZ3JvdXAsIGZpbHRlcnMpIHtcclxuICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgIGxldCBtYXRjaGVzID0gMDtcclxuICAgIF8uZWFjaChmaWx0ZXJzLCBmaWx0ZXIgPT4ge1xyXG4gICAgICBsZXQgbWF0Y2hpbmdfZmllbGQgPSBfLmZpbHRlcihncm91cCwgZyA9PiBnLmNvbG5hbWUgPT09IGZpbHRlci5maWVsZCk7XHJcbiAgICAgIGlmIChtYXRjaGluZ19maWVsZCAmJiBtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbWF0Y2hlcyArPVxyXG4gICAgICAgICAgaXNNYXRjaChcclxuICAgICAgICAgICAgbWF0Y2hpbmdfZmllbGRbMF0udmFsdWUsXHJcbiAgICAgICAgICAgIGZpbHRlci5vcGVyYXRvcixcclxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlLFxyXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUyXHJcbiAgICAgICAgICApID09PSB0cnVlXHJcbiAgICAgICAgICAgID8gMVxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZXMgPT09IGZpbHRlcnMubGVuZ3RoO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldFZhbHVlcyA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEpOiBhbnkge1xyXG4gIGxldCBteXN0YXRzOiBhbnkgPSBbXTtcclxuICBfLmVhY2gobWFzdGVyZGF0YSwgZ3JvdXAgPT4ge1xyXG4gICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSB0aGlzLmZpZWxkKTtcclxuICAgIGlmIChtYXRjaGluZ19maWVsZC5sZW5ndGggPiAwICYmIGRpZFNhdGlzZnlGaWx0ZXJzKGdyb3VwLCB0aGlzLmZpbHRlcnMpKSB7XHJcbiAgICAgIG15c3RhdHMucHVzaChfLmZpcnN0KG1hdGNoaW5nX2ZpZWxkKS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG15c3RhdHM7XHJcbn07XHJcblxyXG5Cb29tU3VtbWFyeVN0YXQucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24obXlzdGF0cyk6IGFueSB7XHJcbiAgbGV0IHN0YXRzZ3JvdXA6IGFueSA9IHt9O1xyXG4gIHN0YXRzZ3JvdXAuY291bnQgPSBteXN0YXRzLmxlbmd0aDtcclxuICBzdGF0c2dyb3VwLnVuaXF1ZWNvdW50ID0gXy51bmlxKG15c3RhdHMpLmxlbmd0aDtcclxuICBzdGF0c2dyb3VwLnN1bSA9IF8uc3VtKG15c3RhdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLm1lYW4gPSBfLm1lYW4obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWluID0gXy5taW4obXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWF4ID0gXy5tYXgobXlzdGF0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAuZmlyc3QgPSBfLmZpcnN0KG15c3RhdHMpO1xyXG4gIHJldHVybiBzdGF0c2dyb3VwO1xyXG59O1xyXG4iXX0=