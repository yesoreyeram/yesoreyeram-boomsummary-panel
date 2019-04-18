System.register(["lodash", "./BoomUtils"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomUtils_1, didSatisfyFilters, getFilteredDataFromMasterData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (BoomUtils_1_1) {
                BoomUtils_1 = BoomUtils_1_1;
            }
        ],
        execute: function () {
            exports_1("didSatisfyFilters", didSatisfyFilters = function (group, filters) {
                if (filters && filters.length > 0) {
                    var matches_1 = 0;
                    lodash_1.default.each(filters, function (filter) {
                        var matching_field = lodash_1.default.filter(group, function (g) { return g.colname === filter.field; });
                        if (matching_field && matching_field.length > 0) {
                            matches_1 +=
                                BoomUtils_1.isMatch(matching_field[0].value, filter.operator, filter.value, filter.value2) === true
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
            exports_1("getFilteredDataFromMasterData", getFilteredDataFromMasterData = function (masterdata, filters) {
                var colnames = [];
                lodash_1.default.each(masterdata, function (group) {
                    lodash_1.default.each(group, function (item) {
                        colnames.push(item.colname);
                    });
                });
                colnames = lodash_1.default.uniq(colnames);
                var validFilters = filters.filter(function (filter) { return colnames.indexOf(filter.field) > -1; });
                return masterdata.filter(function (group) { return didSatisfyFilters(group, validFilters); });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFHQSwrQkFBVyxpQkFBaUIsR0FBRyxVQUFVLEtBQUssRUFBRSxPQUFPO2dCQUNyRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDakMsSUFBSSxTQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixnQkFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQSxNQUFNO3dCQUNwQixJQUFJLGNBQWMsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQTFCLENBQTBCLENBQUMsQ0FBQzt3QkFDdEUsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQy9DLFNBQU87Z0NBQ0wsbUJBQU8sQ0FDTCxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUN2QixNQUFNLENBQUMsUUFBUSxFQUNmLE1BQU0sQ0FBQyxLQUFLLEVBQ1osTUFBTSxDQUFDLE1BQU0sQ0FDZCxLQUFLLElBQUk7b0NBQ1IsQ0FBQyxDQUFDLENBQUM7b0NBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDVDtvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLFNBQU8sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNuQztxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQztpQkFDYjtZQUNILENBQUMsRUFBQztZQUVGLDJDQUFXLDZCQUE2QixHQUFHLFVBQVUsVUFBVSxFQUFFLE9BQU87Z0JBQ3RFLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQztnQkFDdkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQUEsS0FBSztvQkFDdEIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUEsSUFBSTt3QkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILFFBQVEsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7Z0JBQ2pGLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLGlCQUFpQixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1lBQzVFLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgaXNNYXRjaCB9IGZyb20gXCIuL0Jvb21VdGlsc1wiO1xyXG5cclxuZXhwb3J0IGxldCBkaWRTYXRpc2Z5RmlsdGVycyA9IGZ1bmN0aW9uIChncm91cCwgZmlsdGVycykge1xyXG4gIGlmIChmaWx0ZXJzICYmIGZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgbGV0IG1hdGNoZXMgPSAwO1xyXG4gICAgXy5lYWNoKGZpbHRlcnMsIGZpbHRlciA9PiB7XHJcbiAgICAgIGxldCBtYXRjaGluZ19maWVsZCA9IF8uZmlsdGVyKGdyb3VwLCBnID0+IGcuY29sbmFtZSA9PT0gZmlsdGVyLmZpZWxkKTtcclxuICAgICAgaWYgKG1hdGNoaW5nX2ZpZWxkICYmIG1hdGNoaW5nX2ZpZWxkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtYXRjaGVzICs9XHJcbiAgICAgICAgICBpc01hdGNoKFxyXG4gICAgICAgICAgICBtYXRjaGluZ19maWVsZFswXS52YWx1ZSxcclxuICAgICAgICAgICAgZmlsdGVyLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUsXHJcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZTJcclxuICAgICAgICAgICkgPT09IHRydWVcclxuICAgICAgICAgICAgPyAxXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hlcyA9PT0gZmlsdGVycy5sZW5ndGg7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0RmlsdGVyZWREYXRhRnJvbU1hc3RlckRhdGEgPSBmdW5jdGlvbiAobWFzdGVyZGF0YSwgZmlsdGVycykge1xyXG4gIGxldCBjb2xuYW1lczogYW55ID0gW107XHJcbiAgXy5lYWNoKG1hc3RlcmRhdGEsIGdyb3VwID0+IHtcclxuICAgIF8uZWFjaChncm91cCwgaXRlbSA9PiB7XHJcbiAgICAgIGNvbG5hbWVzLnB1c2goaXRlbS5jb2xuYW1lKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGNvbG5hbWVzID0gXy51bmlxKGNvbG5hbWVzKTtcclxuICBsZXQgdmFsaWRGaWx0ZXJzID0gZmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGNvbG5hbWVzLmluZGV4T2YoZmlsdGVyLmZpZWxkKSA+IC0xKTtcclxuICByZXR1cm4gbWFzdGVyZGF0YS5maWx0ZXIoZ3JvdXAgPT4gZGlkU2F0aXNmeUZpbHRlcnMoZ3JvdXAsIHZhbGlkRmlsdGVycykpO1xyXG59O1xyXG4iXX0=