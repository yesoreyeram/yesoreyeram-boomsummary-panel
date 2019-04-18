System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./BoomStatsGroup", "./DataHandler", "./Config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomStatsGroup_1, DataHandler_1, Config_1, BoomSummaryCtl;
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
            function (BoomStatsGroup_1_1) {
                BoomStatsGroup_1 = BoomStatsGroup_1_1;
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
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats_groups = _this.panel.stats_groups || [];
                    _this.updatePrototypes();
                    _this.events.on(Config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    _this.events.on(Config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats_groups.map(function (stats_group) {
                        Object.setPrototypeOf(stats_group, BoomStatsGroup_1.BoomStatsGroup.prototype);
                        stats_group.stats.map(function (stat) {
                            Object.setPrototypeOf(stat, BoomStatsGroup_1.BoomStat.prototype);
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
                BoomSummaryCtl.prototype.addStatsGroup = function (statgroupType) {
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
                            stats.push(new BoomStatsGroup_1.BoomStat({
                                field: this.masterdata[0][this.panel.stats_groups.length].colname,
                                title: this.masterdata[0][this.panel.stats_groups.length].colname
                            }));
                        }
                    }
                    this.panel.stats_groups.push(new BoomStatsGroup_1.BoomStatsGroup({
                        bgColor: "green",
                        stats: stats,
                        templateType: templateType || "auto",
                        textColor: "white",
                        title: "Summary " + (this.panel.stats_groups.length + 1)
                    }));
                    this.activeStatIndex = this.panel.stats_groups.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeStatsGroup = function (index) {
                    this.panel.stats_groups.splice(index, 1);
                    this.activeStatIndex = this.panel.stats_groups && this.panel.stats_groups.length > 0 ? this.panel.stats_groups.length - 1 : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveStatsGroup = function (direction, index) {
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
                BoomSummaryCtl.prototype.removeAllStatsGroups = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQWN6Qyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDSSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWTNCO29CQXRCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBRXJCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGVBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBR3hDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztvQkFDeEQsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNWLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FDakMsQ0FBQztvQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDVixlQUFNLENBQUMsY0FB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SUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQUEsV0FBVzt3QkFDNUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNyRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLElBQUksUUFBUSxDQUFDO2lCQUN0QjtnQkFDRCxNQUFNLElBQUksY0FBYyxDQUFDO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNoQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQzNELFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDM0Q7WUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsLCBsb2FkUGx1Z2luQ3NzIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgQm9vbVN0YXRzR3JvdXAsIEJvb21TdGF0IH0gZnJvbSBcIi4vQm9vbVN0YXRzR3JvdXBcIjtcclxuaW1wb3J0IHsgYnVpbGRNYXN0ZXJEYXRhIH0gZnJvbSBcIi4vRGF0YUhhbmRsZXJcIjtcclxuaW1wb3J0IHsgSUJvb21TdW1tYXJ5Q3RsIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKGNvbmZpZy5jc3NUaGVtZXMpO1xyXG5cclxuY2xhc3MgQm9vbVN1bW1hcnlDdGwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIGltcGxlbWVudHMgSUJvb21TdW1tYXJ5Q3RsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBjb25maWcuZGVmYXVsdF90ZW1wbGF0ZVVSTDtcclxuICAgIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgICBwdWJsaWMgZWxlbTogYW55O1xyXG4gICAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgICBwdWJsaWMgYWN0aXZlU3RhdEluZGV4ID0gMDtcclxuICAgIHB1YmxpYyBtYXN0ZXJkYXRhOiBhbnkgPSBbXTtcclxuICAgIHB1YmxpYyBjb2xuYW1lcztcclxuICAgIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gICAgcHVibGljIHN0YXRUeXBlcyA9IGNvbmZpZy5zdGF0VHlwZXM7XHJcbiAgICBwdWJsaWMgY29tcGFyZU9wZXJhdG9ycyA9IGNvbmZpZy5jb21wYXJlT3BlcmF0b3JzO1xyXG4gICAgcHVibGljIGRlY2ltYWxWYWx1ZXMgPSBjb25maWcuZGVjaW1hbFZhbHVlcztcclxuICAgIHB1YmxpYyBmb3JtYXRfYXMgPSBjb25maWcuZm9ybWF0X2FzO1xyXG4gICAgcHVibGljIHRlbXBsYXRlVHlwZXMgPSBjb25maWcudGVtcGxhdGVUeXBlcztcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgfHwgW107XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5pbml0RWRpdE1vZGUsXHJcbiAgICAgICAgICAgIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5kYXRhUmVjZWl2ZWQsXHJcbiAgICAgICAgICAgIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubWFwKHN0YXRzX2dyb3VwID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0YXRzX2dyb3VwLCBCb29tU3RhdHNHcm91cC5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBzdGF0c19ncm91cC5zdGF0cy5tYXAoc3RhdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN0YXQucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0c19ncm91cDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgXy5lYWNoKGNvbmZpZy5lZGl0b3JUYWJzLCBlZGl0b3JUYWIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVkaXRvclRhYihcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50aXRsZSxcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi50ZW1wbGF0ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3JUYWIucG9zaXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXN0ZXJkYXRhID0gYnVpbGRNYXN0ZXJEYXRhKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuY29sbmFtZXMgPSBbXTtcclxuICAgICAgICBfLmVhY2godGhpcy5tYXN0ZXJkYXRhLCBncm91cCA9PiB7XHJcbiAgICAgICAgICAgIF8uZWFjaChncm91cCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG5hbWVzLnB1c2goaXRlbS5jb2xuYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb2xuYW1lcyA9IF8udW5pcSh0aGlzLmNvbG5hbWVzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbmsoc2NvcGU6IGFueSwgZWxlbTogYW55LCBhdHRyczogYW55LCBjdHJsOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICAgICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRTdGF0c0dyb3VwKHN0YXRncm91cFR5cGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzIHx8IFtdO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZVR5cGUgPSBcImF1dG9cIjtcclxuICAgICAgICBpZiAoc3RhdGdyb3VwVHlwZSAmJiBzdGF0Z3JvdXBUeXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiSlVNQk9cIikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVR5cGUgPSBcImp1bWJvXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0Z3JvdXBUeXBlICYmIHN0YXRncm91cFR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJKVU1CT19XSVRIT1VUX1RJVExFXCIpIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVUeXBlID0gXCJqdW1ib193aXRob3V0X3RpdGxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdGF0czogYW55W10gPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5tYXN0ZXJkYXRhICYmIHRoaXMubWFzdGVyZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hc3RlcmRhdGFbMF0ubGVuZ3RoID4gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoICYmIHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRzLnB1c2gobmV3IEJvb21TdGF0KHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aF0uY29sbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5tYXN0ZXJkYXRhWzBdW3RoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aF0uY29sbmFtZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLnB1c2gobmV3IEJvb21TdGF0c0dyb3VwKHtcclxuICAgICAgICAgICAgYmdDb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgICAgICBzdGF0cyxcclxuICAgICAgICAgICAgdGVtcGxhdGVUeXBlOiB0ZW1wbGF0ZVR5cGUgfHwgXCJhdXRvXCIsXHJcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICB0aXRsZTogYFN1bW1hcnkgJHt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggKyAxfWBcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlU3RhdHNHcm91cChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzICYmIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCA+IDAgPyB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggLSAxIDogLTE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtb3ZlU3RhdHNHcm91cChkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldO1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSArIDFdO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSBOdW1iZXIoaW5kZXgpICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVBbGxTdGF0c0dyb3VwcygpIHtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGltaXRUZXh0KHRleHQ6IHN0cmluZywgbWF4bGVuZ3RoOiBOdW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0ZXh0LnNwbGl0KFwiXCIpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgTnVtYmVyKG1heGxlbmd0aCkgLSAzKSArIFwiLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5Cb29tU3VtbWFyeUN0bC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG91dHB1dCA9IGBgO1xyXG4gICAgb3V0cHV0ICs9IGA8c3R5bGU+JHt0aGlzLmN0cmwucGFuZWwuY3VzdG9tX2NzcyB8fCBcIlwifTwvc3R5bGU+YDtcclxuICAgIG91dHB1dCArPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPjxkaXYgY2xhc3M9XCJyb3dcIj5gO1xyXG4gICAgaWYgKHRoaXMuY3RybC5wYW5lbC5lbmFibGVfcmVwZWF0ZXIpIHtcclxuICAgICAgICBsZXQgY29scyA9IF8udW5pcShfLmZsYXRNYXAodGhpcy5tYXN0ZXJkYXRhKS5maWx0ZXIodCA9PiB0LmNvbG5hbWUgPT09IHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl9jb2x1bW4pLm1hcCh0ID0+IHQudmFsdWUpKTtcclxuICAgICAgICBfLmVhY2goY29scywgY29sID0+IHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGA8ZGl2IGNsYXNzPVwiY29sLW1kLSR7Xy5taW4oWysodGhpcy5jdHJsLnBhbmVsLnJlcGVhdGVyX3dpZHRoKSwgMTJdKX1cIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206JHt0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfbWFyZ2luX2JvdHRvbSB8fCBcIjIwXCJ9cHg7XCI+YDtcclxuICAgICAgICAgICAgbGV0IG15Y29sZGF0YSA9IHRoaXMubWFzdGVyZGF0YS5maWx0ZXIodCA9PiB0LmZpbHRlcih0MSA9PiB0MS52YWx1ZSA9PT0gY29sICYmIHQxLmNvbG5hbWUgPT09IHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl9jb2x1bW4pLmxlbmd0aCA9PT0gMSk7XHJcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLmN0cmwucGFuZWwuc3RhdHNfZ3JvdXBzLCBzdGF0c19ncm91cCA9PiB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gc3RhdHNfZ3JvdXAuZ2V0b3V0cHV0KG15Y29sZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3V0cHV0ICs9IGA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+YDtcclxuICAgICAgICBfLmVhY2godGhpcy5jdHJsLnBhbmVsLnN0YXRzX2dyb3Vwcywgc3RhdHNfZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gc3RhdHNfZ3JvdXAuZ2V0b3V0cHV0KHRoaXMubWFzdGVyZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3V0cHV0ICs9IGA8L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgb3V0cHV0ICs9IGA8L2Rpdj48L2Rpdj5gO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXN1bW1hcnktcGFuZWxcIikuaHRtbChvdXRwdXQpO1xyXG4gICAgaWYgKHRoaXMuY3RybCAmJiB0aGlzLmN0cmwuZWxlbVswXSkge1xyXG4gICAgICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICAgICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQgLSAzMTtcclxuICAgICAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBCb29tU3VtbWFyeUN0bCBhcyBQYW5lbEN0cmwgfTtcclxuIl19