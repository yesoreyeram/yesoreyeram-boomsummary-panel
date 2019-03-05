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
    var Filter_1, BoomSummaryConditionalFormats;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Filter_1_1) {
                Filter_1 = Filter_1_1;
            }
        ],
        execute: function () {
            BoomSummaryConditionalFormats = (function (_super) {
                __extends(BoomSummaryConditionalFormats, _super);
                function BoomSummaryConditionalFormats(options) {
                    var _this = _super.call(this, options) || this;
                    _this.bgColor = options.bgColor || "";
                    _this.textColor = options.textColor || "";
                    _this.display_template = options.display_template || "";
                    return _this;
                }
                return BoomSummaryConditionalFormats;
            }(Filter_1.BoomFilter));
            exports_1("BoomSummaryConditionalFormats", BoomSummaryConditionalFormats);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbUNvbmRpdGlvbmFsRm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9GaWx0ZXJzL0Jvb21Db25kaXRpb25hbEZvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHQTtnQkFBbUQsaURBQVU7Z0JBSzNELHVDQUFZLE9BQU87b0JBQW5CLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBSWY7b0JBSEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztvQkFDekMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7O2dCQUN6RCxDQUFDO2dCQUNILG9DQUFDO1lBQUQsQ0FBQyxBQVhELENBQW1ELG1CQUFVLEdBVzVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJvb21GaWx0ZXIsIElCb29tU3VtbWFyeUNvbmRpdGlvbmFsRm9ybWF0cyB9IGZyb20gXCIuLi8uLi9kZWZpbml0aW9ucy90eXBlc1wiO1xyXG5pbXBvcnQgeyBCb29tRmlsdGVyIH0gZnJvbSBcIi4vRmlsdGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbVN1bW1hcnlDb25kaXRpb25hbEZvcm1hdHMgZXh0ZW5kcyBCb29tRmlsdGVyXHJcbiAgaW1wbGVtZW50cyBJQm9vbUZpbHRlciwgSUJvb21TdW1tYXJ5Q29uZGl0aW9uYWxGb3JtYXRzIHtcclxuICBwdWJsaWMgYmdDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgZGlzcGxheV90ZW1wbGF0ZTogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5iZ0NvbG9yID0gb3B0aW9ucy5iZ0NvbG9yIHx8IFwiXCI7XHJcbiAgICB0aGlzLnRleHRDb2xvciA9IG9wdGlvbnMudGV4dENvbG9yIHx8IFwiXCI7XHJcbiAgICB0aGlzLmRpc3BsYXlfdGVtcGxhdGUgPSBvcHRpb25zLmRpc3BsYXlfdGVtcGxhdGUgfHwgXCJcIjtcclxuICB9XHJcbn1cclxuIl19