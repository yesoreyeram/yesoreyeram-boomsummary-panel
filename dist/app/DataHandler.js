System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, buildMasterData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL0RhdGFIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBR0EsNkJBQVcsZUFBZSxHQUFHLFVBQVMsSUFBSTtnQkFDeEMsSUFBSSxVQUFVLEdBQW9CLEVBQUUsQ0FBQztnQkFDckMsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUEsQ0FBQztvQkFDWixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO3dCQUN0QixJQUFJLE9BQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNwQixnQkFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ3BCLElBQUksS0FBSyxHQUFrQixFQUFFLENBQUM7NEJBQzlCLGdCQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUNqQixJQUFJLE1BQU0sR0FBZ0I7b0NBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0NBQzFCLEtBQUssU0FBQTtvQ0FDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDO29DQUNULEtBQUssRUFBRSxHQUFHO2lDQUNYLENBQUM7Z0NBQ0YsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDckIsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDekIsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO3FCQUNsRTtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLFVBQVUsQ0FBQztZQUNwQixDQUFDLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IElNYXN0ZXJEYXRhIH0gZnJvbSBcIi4uL2RlZmluaXRpb25zL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgbGV0IGJ1aWxkTWFzdGVyRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICBsZXQgbWFzdGVyZGF0YTogSU1hc3RlckRhdGFbXVtdID0gW107XHJcbiAgXy5lYWNoKGRhdGEsIGQgPT4ge1xyXG4gICAgaWYgKGQudHlwZSA9PT0gXCJ0YWJsZVwiKSB7XHJcbiAgICAgIGxldCByZWZJZCA9IGQucmVmSWQ7XHJcbiAgICAgIF8uZWFjaChkLnJvd3MsIChyb3csIGkpID0+IHtcclxuICAgICAgICBsZXQgZ3JvdXA6IElNYXN0ZXJEYXRhW10gPSBbXTtcclxuICAgICAgICBfLmVhY2gocm93LCAoY29sLCBqKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbXlkYXRhOiBJTWFzdGVyRGF0YSA9IHtcclxuICAgICAgICAgICAgY29sbmFtZTogZC5jb2x1bW5zW2pdLnRleHQsXHJcbiAgICAgICAgICAgIHJlZklkLFxyXG4gICAgICAgICAgICByb3dpZDogK2ksXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb2xcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBncm91cC5wdXNoKG15ZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFzdGVyZGF0YS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRVJST1I6IE9ubHkgdGFibGUgZm9ybWF0IGlzIGN1cnJlbnRseSBzdXBwb3J0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG1hc3RlcmRhdGE7XHJcbn07Il19