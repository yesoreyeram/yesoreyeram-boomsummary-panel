System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./BoomSummaryGroup", "./DataHandler", "./Config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomSummaryGroup_1, DataHandler_1, Config_1, BoomSummaryCtl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (BoomSummaryGroup_1_1) {
                BoomSummaryGroup_1 = BoomSummaryGroup_1_1;
            },
            function (DataHandler_1_1) {
                DataHandler_1 = DataHandler_1_1;
            },
            function (Config_1_1) {
                Config_1 = Config_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss(Config_1.config.cssThemes);
            BoomSummaryCtl = (function (_super) {
                __extends(BoomSummaryCtl, _super);
                function BoomSummaryCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.activeStatIndex = 0;
                    _this.masterdata = [];
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.statTypes = Config_1.config.statTypes;
                    _this.compareOperators = Config_1.config.compareOperators;
                    _this.decimalValues = Config_1.config.decimalValues;
                    _this.format_as = Config_1.config.format_as;
                    _this.templateTypes = Config_1.config.templateTypes;
                    _this.ctrl_width = Config_1.config.ctrl_width;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats_groups = _this.panel.stats_groups || [];
                    _this.updatePrototypes();
                    _this.events.on(Config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    _this.events.on(Config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats_groups.map(function (stats_group) {
                        Object.setPrototypeOf(stats_group, BoomSummaryGroup_1.BoomSummaryGroup.prototype);
                        stats_group.stats.map(function (stat) {
                            Object.setPrototypeOf(stat, BoomSummaryGroup_1.BoomStat.prototype);
                        });
                        return stats_group;
                    });
                };
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(Config_1.config.editorTabs, function (editorTab) {
                        _this.addEditorTab(editorTab.title, editorTab.templatePath, editorTab.position);
                    });
                };
                BoomSummaryCtl.prototype.onDataReceived = function (data) {
                    var _this = this;
                    this.masterdata = DataHandler_1.buildMasterData(data);
                    this.colnames = [];
                    lodash_1.default.each(this.masterdata, function (group) {
                        lodash_1.default.each(group, function (item) {
                            _this.colnames.push(item.colname);
                        });
                    });
                    this.colnames = lodash_1.default.uniq(this.colnames);
                    this.render();
                };
                BoomSummaryCtl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                BoomSummaryCtl.prototype.addSummaryGroup = function (statgroupType) {
                    this.panel.stats_groups = this.panel.stats_groups || [];
                    var templateType = "auto";
                    if (statgroupType && statgroupType.toUpperCase() === "JUMBO") {
                        templateType = "jumbo";
                    }
                    else if (statgroupType && statgroupType.toUpperCase() === "JUMBO_WITHOUT_TITLE") {
                        templateType = "jumbo_without_title";
                    }
                    var stats = [];
                    if (this.masterdata && this.masterdata.length > 0) {
                        if (this.masterdata[0].length > this.panel.stats_groups.length && this.masterdata[0][this.panel.stats_groups.length].colname) {
                            stats.push(new BoomSummaryGroup_1.BoomStat({
                                field: this.masterdata[0][this.panel.stats_groups.length].colname,
                                stat_type: "count",
                                title: "Total rows"
                            }));
                        }
                    }
                    this.panel.stats_groups.push(new BoomSummaryGroup_1.BoomSummaryGroup({
                        bgColor: "green",
                        stats: stats,
                        templateType: templateType || "auto",
                        textColor: "white",
                        title: "Summary " + (this.panel.stats_groups.length + 1)
                    }));
                    this.activeStatIndex = this.panel.stats_groups.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeSummaryGroup = function (index) {
                    this.panel.stats_groups.splice(index, 1);
                    this.activeStatIndex = this.panel.stats_groups && this.panel.stats_groups.length > 0 ? this.panel.stats_groups.length - 1 : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveSummaryGroup = function (direction, index) {
                    var tempElement = this.panel.stats_groups[Number(index)];
                    if (direction === "UP") {
                        this.panel.stats_groups[Number(index)] = this.panel.stats_groups[Number(index) - 1];
                        this.panel.stats_groups[Number(index) - 1] = tempElement;
                        this.activeStatIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.stats_groups[Number(index)] = this.panel.stats_groups[Number(index) + 1];
                        this.panel.stats_groups[Number(index) + 1] = tempElement;
                        this.activeStatIndex = Number(index) + 1;
                    }
                    this.render();
                };
                BoomSummaryCtl.prototype.removeAllSummaryGroups = function () {
                    this.panel.stats_groups = [];
                    this.render();
                };
                BoomSummaryCtl.prototype.limitText = function (text, maxlength) {
                    if (text.split("").length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + "...";
                    }
                    return text;
                };
                BoomSummaryCtl.templateUrl = Config_1.config.default_templateURL;
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "";
                output += "<style>" + (this.ctrl.panel.custom_css || "") + "</style>";
                output += "<div class=\"container-fluid\"><div class=\"row\">";
                if (this.ctrl.panel.enable_repeater) {
                    var cols = lodash_1.default.uniq(lodash_1.default.flatMap(this.masterdata).filter(function (t) { return t.colname === _this.ctrl.panel.repeater_column; }).map(function (t) { return t.value; }));
                    lodash_1.default.each(cols, function (col) {
                        output += "<div class=\"col-md-" + lodash_1.default.min([+(_this.ctrl.panel.repeater_width), 12]) + "\" style=\"margin-bottom:" + (_this.ctrl.panel.repeater_margin_bottom || "20") + "px;\">";
                        var mycoldata = _this.masterdata.filter(function (t) { return t.filter(function (t1) { return t1.value === col && t1.colname === _this.ctrl.panel.repeater_column; }).length === 1; });
                        lodash_1.default.each(_this.ctrl.panel.stats_groups, function (stats_group) {
                            output += stats_group.getoutput(mycoldata);
                        });
                        output += "</div>";
                    });
                }
                else {
                    output += "<div class=\"col-md-12\">";
                    lodash_1.default.each(this.ctrl.panel.stats_groups, function (stats_group) {
                        output += stats_group.getoutput(_this.masterdata);
                    });
                    output += "</div>";
                }
                output += "</div></div>";
                this.elem.find("#boomsummary-panel").html(output);
                if (this.ctrl && this.ctrl.elem[0]) {
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.ctrl.elem[0].clientHeight - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQWV6Qyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDSSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWTNCO29CQXZCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBRXJCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGVBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGdCQUFVLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFHbEMsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDM0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO29CQUN4RCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ1YsZUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQ2xDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUNqQyxDQUFDO29CQUNGLEtBQUks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QUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFBLFdBQVc7d0JBQzVDLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxJQUFJLFFBQVEsQ0FBQztpQkFDdEI7Z0JBQ0QsTUFBTSxJQUFJLGNBQWMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDckQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUMzRCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzNEO1lBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgTWV0cmljc1BhbmVsQ3RybCwgbG9hZFBsdWdpbkNzcyB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IGtibiBmcm9tIFwiYXBwL2NvcmUvdXRpbHMva2JuXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5R3JvdXAsIEJvb21TdGF0IH0gZnJvbSBcIi4vQm9vbVN1bW1hcnlHcm91cFwiO1xyXG5pbXBvcnQgeyBidWlsZE1hc3RlckRhdGEgfSBmcm9tIFwiLi9EYXRhSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBJQm9vbVN1bW1hcnlDdGwgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcclxuXHJcbmxvYWRQbHVnaW5Dc3MoY29uZmlnLmNzc1RoZW1lcyk7XHJcblxyXG5jbGFzcyBCb29tU3VtbWFyeUN0bCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwgaW1wbGVtZW50cyBJQm9vbVN1bW1hcnlDdGwge1xyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IGNvbmZpZy5kZWZhdWx0X3RlbXBsYXRlVVJMO1xyXG4gICAgcHVibGljIGN0cmw6IGFueTtcclxuICAgIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICAgIHB1YmxpYyBhY3RpdmVTdGF0SW5kZXggPSAwO1xyXG4gICAgcHVibGljIG1hc3RlcmRhdGE6IGFueSA9IFtdO1xyXG4gICAgcHVibGljIGNvbG5hbWVzO1xyXG4gICAgcHVibGljIHVuaXRGb3JtYXRzID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgICBwdWJsaWMgc3RhdFR5cGVzID0gY29uZmlnLnN0YXRUeXBlcztcclxuICAgIHB1YmxpYyBjb21wYXJlT3BlcmF0b3JzID0gY29uZmlnLmNvbXBhcmVPcGVyYXRvcnM7XHJcbiAgICBwdWJsaWMgZGVjaW1hbFZhbHVlcyA9IGNvbmZpZy5kZWNpbWFsVmFsdWVzO1xyXG4gICAgcHVibGljIGZvcm1hdF9hcyA9IGNvbmZpZy5mb3JtYXRfYXM7XHJcbiAgICBwdWJsaWMgdGVtcGxhdGVUeXBlcyA9IGNvbmZpZy50ZW1wbGF0ZVR5cGVzO1xyXG4gICAgcHVibGljIGN0cmxfd2lkdGggPSBjb25maWcuY3RybF93aWR0aDtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgfHwgW107XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5pbml0RWRpdE1vZGUsXHJcbiAgICAgICAgICAgIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5kYXRhUmVjZWl2ZWQsXHJcbiAgICAgICAgICAgIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubWFwKHN0YXRzX2dyb3VwID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0YXRzX2dyb3VwLCBCb29tU3VtbWFyeUdyb3VwLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIHN0YXRzX2dyb3VwLnN0YXRzLm1hcChzdGF0ID0+IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdGF0LCBCb29tU3RhdC5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRzX2dyb3VwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY29uZmlnLmVkaXRvclRhYnMsIGVkaXRvclRhYiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yVGFiLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yVGFiLnRlbXBsYXRlUGF0aCxcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi5wb3NpdGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGEgPSBidWlsZE1hc3RlckRhdGEoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jb2xuYW1lcyA9IFtdO1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLm1hc3RlcmRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKGdyb3VwLCBpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbmFtZXMucHVzaChpdGVtLmNvbG5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbG5hbWVzID0gXy51bmlxKHRoaXMuY29sbmFtZXMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgICAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFN1bW1hcnlHcm91cChzdGF0Z3JvdXBUeXBlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyB8fCBbXTtcclxuICAgICAgICBsZXQgdGVtcGxhdGVUeXBlID0gXCJhdXRvXCI7XHJcbiAgICAgICAgaWYgKHN0YXRncm91cFR5cGUgJiYgc3RhdGdyb3VwVHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIkpVTUJPXCIpIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVUeXBlID0gXCJqdW1ib1wiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGdyb3VwVHlwZSAmJiBzdGF0Z3JvdXBUeXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiSlVNQk9fV0lUSE9VVF9USVRMRVwiKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZSA9IFwianVtYm9fd2l0aG91dF90aXRsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhdHM6IGFueVtdID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YSAmJiB0aGlzLm1hc3RlcmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXN0ZXJkYXRhWzBdLmxlbmd0aCA+IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCAmJiB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoXS5jb2xuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5wdXNoKG5ldyBCb29tU3RhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdF90eXBlOiBcImNvdW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVG90YWwgcm93c1wiXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMucHVzaChuZXcgQm9vbVN1bW1hcnlHcm91cCh7XHJcbiAgICAgICAgICAgIGJnQ29sb3I6IFwiZ3JlZW5cIixcclxuICAgICAgICAgICAgc3RhdHMsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZTogdGVtcGxhdGVUeXBlIHx8IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwid2hpdGVcIixcclxuICAgICAgICAgICAgdGl0bGU6IGBTdW1tYXJ5ICR7dGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoICsgMX1gXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVN1bW1hcnlHcm91cChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzICYmIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCA+IDAgPyB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggLSAxIDogLTE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtb3ZlU3VtbWFyeUdyb3VwKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV07XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpIC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZUFsbFN1bW1hcnlHcm91cHMoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBvdXRwdXQgPSBgYDtcclxuICAgIG91dHB1dCArPSBgPHN0eWxlPiR7dGhpcy5jdHJsLnBhbmVsLmN1c3RvbV9jc3MgfHwgXCJcIn08L3N0eWxlPmA7XHJcbiAgICBvdXRwdXQgKz0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj48ZGl2IGNsYXNzPVwicm93XCI+YDtcclxuICAgIGlmICh0aGlzLmN0cmwucGFuZWwuZW5hYmxlX3JlcGVhdGVyKSB7XHJcbiAgICAgICAgbGV0IGNvbHMgPSBfLnVuaXEoXy5mbGF0TWFwKHRoaXMubWFzdGVyZGF0YSkuZmlsdGVyKHQgPT4gdC5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5tYXAodCA9PiB0LnZhbHVlKSk7XHJcbiAgICAgICAgXy5lYWNoKGNvbHMsIGNvbCA9PiB7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0ke18ubWluKFsrKHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl93aWR0aCksIDEyXSl9XCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiR7dGhpcy5jdHJsLnBhbmVsLnJlcGVhdGVyX21hcmdpbl9ib3R0b20gfHwgXCIyMFwifXB4O1wiPmA7XHJcbiAgICAgICAgICAgIGxldCBteWNvbGRhdGEgPSB0aGlzLm1hc3RlcmRhdGEuZmlsdGVyKHQgPT4gdC5maWx0ZXIodDEgPT4gdDEudmFsdWUgPT09IGNvbCAmJiB0MS5jb2xuYW1lID09PSB0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfY29sdW1uKS5sZW5ndGggPT09IDEpO1xyXG4gICAgICAgICAgICBfLmVhY2godGhpcy5jdHJsLnBhbmVsLnN0YXRzX2dyb3Vwcywgc3RhdHNfZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHN0YXRzX2dyb3VwLmdldG91dHB1dChteWNvbGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPmA7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMuY3RybC5wYW5lbC5zdGF0c19ncm91cHMsIHN0YXRzX2dyb3VwID0+IHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IHN0YXRzX2dyb3VwLmdldG91dHB1dCh0aGlzLm1hc3RlcmRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dCArPSBgPC9kaXY+YDtcclxuICAgIH1cclxuICAgIG91dHB1dCArPSBgPC9kaXY+PC9kaXY+YDtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcclxuICAgIGlmICh0aGlzLmN0cmwgJiYgdGhpcy5jdHJsLmVsZW1bMF0pIHtcclxuICAgICAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5jdHJsLmVsZW1bMF0uY2xpZW50SGVpZ2h0IC0gMzE7XHJcbiAgICAgICAgcm9vdEVsZW0uY3NzKHsgJ21heC1oZWlnaHQnOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgQm9vbVN1bW1hcnlDdGwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==