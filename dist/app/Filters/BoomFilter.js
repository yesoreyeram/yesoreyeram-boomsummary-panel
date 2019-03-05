System.register(["./Filter"], function (exports_1, context_1) {
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
    var Filter_1, BoomSummaryFilter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Filter_1_1) {
                Filter_1 = Filter_1_1;
            }
        ],
        execute: function () {
            BoomSummaryFilter = (function (_super) {
                __extends(BoomSummaryFilter, _super);
                function BoomSummaryFilter(options) {
                    return _super.call(this, options) || this;
                }
                return BoomSummaryFilter;
            }(Filter_1.BoomFilter));
            exports_1("BoomSummaryFilter", BoomSummaryFilter);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbUZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvRmlsdGVycy9Cb29tRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUdBO2dCQUF1QyxxQ0FBVTtnQkFDL0MsMkJBQVksT0FBTzsyQkFDakIsa0JBQU0sT0FBTyxDQUFDO2dCQUNoQixDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0FBQyxBQUpELENBQXVDLG1CQUFVLEdBSWhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJvb21GaWx0ZXIgfSBmcm9tIFwiLi4vLi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgQm9vbUZpbHRlciB9IGZyb20gXCIuL0ZpbHRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21TdW1tYXJ5RmlsdGVyIGV4dGVuZHMgQm9vbUZpbHRlciBpbXBsZW1lbnRzIElCb29tRmlsdGVyIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcbn1cclxuIl19