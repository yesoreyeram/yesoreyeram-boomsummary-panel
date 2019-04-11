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
                return masterdata.filter(function (group) { return didSatisfyFilters(group, filters); });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQXBwVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFHQSwrQkFBVyxpQkFBaUIsR0FBRyxVQUFTLEtBQUssRUFBRSxPQUFPO2dCQUNwRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDakMsSUFBSSxTQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixnQkFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQSxNQUFNO3dCQUNwQixJQUFJLGNBQWMsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQTFCLENBQTBCLENBQUMsQ0FBQzt3QkFDdEUsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQy9DLFNBQU87Z0NBQ0wsbUJBQU8sQ0FDTCxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUN2QixNQUFNLENBQUMsUUFBUSxFQUNmLE1BQU0sQ0FBQyxLQUFLLEVBQ1osTUFBTSxDQUFDLE1BQU0sQ0FDZCxLQUFLLElBQUk7b0NBQ1IsQ0FBQyxDQUFDLENBQUM7b0NBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDVDtvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLFNBQU8sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNuQztxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQztpQkFDYjtZQUNILENBQUMsRUFBQztZQUVGLDJDQUFXLDZCQUE2QixHQUFHLFVBQVMsVUFBVSxFQUFFLE9BQU87Z0JBQ3JFLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLGlCQUFpQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgaXNNYXRjaCB9IGZyb20gXCIuL0Jvb21VdGlsc1wiO1xyXG5cclxuZXhwb3J0IGxldCBkaWRTYXRpc2Z5RmlsdGVycyA9IGZ1bmN0aW9uKGdyb3VwLCBmaWx0ZXJzKSB7XHJcbiAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICBsZXQgbWF0Y2hlcyA9IDA7XHJcbiAgICBfLmVhY2goZmlsdGVycywgZmlsdGVyID0+IHtcclxuICAgICAgbGV0IG1hdGNoaW5nX2ZpZWxkID0gXy5maWx0ZXIoZ3JvdXAsIGcgPT4gZy5jb2xuYW1lID09PSBmaWx0ZXIuZmllbGQpO1xyXG4gICAgICBpZiAobWF0Y2hpbmdfZmllbGQgJiYgbWF0Y2hpbmdfZmllbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIG1hdGNoZXMgKz1cclxuICAgICAgICAgIGlzTWF0Y2goXHJcbiAgICAgICAgICAgIG1hdGNoaW5nX2ZpZWxkWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICBmaWx0ZXIub3BlcmF0b3IsXHJcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSxcclxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlMlxyXG4gICAgICAgICAgKSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICA/IDFcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaGVzID09PSBmaWx0ZXJzLmxlbmd0aDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRGaWx0ZXJlZERhdGFGcm9tTWFzdGVyRGF0YSA9IGZ1bmN0aW9uKG1hc3RlcmRhdGEsIGZpbHRlcnMpIHtcclxuICByZXR1cm4gbWFzdGVyZGF0YS5maWx0ZXIoZ3JvdXAgPT4gZGlkU2F0aXNmeUZpbHRlcnMoZ3JvdXAsIGZpbHRlcnMpKTtcclxufTtcclxuIl19