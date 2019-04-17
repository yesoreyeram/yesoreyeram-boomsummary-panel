System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./app/BoomStatsGroup", "./app/DataHandler", "./config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomStatsGroup_1, DataHandler_1, config_1, BoomSummaryCtl;
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
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss(config_1.config.cssThemes);
            BoomSummaryCtl = (function (_super) {
                __extends(BoomSummaryCtl, _super);
                function BoomSummaryCtl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.activeStatIndex = 0;
                    _this.masterdata = [];
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.statTypes = config_1.config.statTypes;
                    _this.compareOperators = config_1.config.compareOperators;
                    _this.decimalValues = config_1.config.decimalValues;
                    _this.format_as = config_1.config.format_as;
                    _this.templateTypes = config_1.config.templateTypes;
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats_groups = _this.panel.stats_groups || [];
                    _this.updatePrototypes();
                    _this.events.on(config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    _this.events.on(config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
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
                    lodash_1.default.each(config_1.config.editorTabs, function (editorTab) {
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
                        title: "Summary " + (this.panel.stats_groups.length + 1),
                        bgColor: "green",
                        templateType: templateType || "default",
                        textColor: "white",
                        stats: stats
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
                BoomSummaryCtl.templateUrl = config_1.config.default_templateURL;
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "<div class=\"container-fluid\"><div class=\"row\">";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQWN6Qyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDSSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWTNCO29CQXRCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBRXJCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLGVBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO29CQUM3QixtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBR3hDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztvQkFDeEQsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNWLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FDakMsQ0FBQztvQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDVixlQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFDbEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQ2pDLENBQUM7O2dCQUNOLENBQUM7Z0JBQ08seUNBQWdCLEdBQXhCO29CQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7d0JBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLCtCQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzdELFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTs0QkFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUseUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEQsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsT0FBTyxXQUFXLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ08sdUNBQWMsR0FBdEI7b0JBQUEsaUJBUUM7b0JBUEcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFBLFNBQVM7d0JBQy9CLEtBQUksQ0FBQyxZQUFZLENBQ2IsU0FBUyxDQUFDLEtBQUssRUFDZixTQUFTLENBQUMsWUFBWSxFQUN0QixTQUFTLENBQUMsUUFBUSxDQUNyQixDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ08sdUNBQWMsR0FBdEIsVUFBdUIsSUFBUztvQkFBaEMsaUJBVUM7b0JBVEcsSUFBSSxDQUFDLFVBQVUsR0FBRyw2QkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDbkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLEtBQUs7d0JBQ3pCLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFBLElBQUk7NEJBQ2QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNyQyxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixDQUFDO2dCQUNNLDZCQUFJLEdBQVgsVUFBWSxLQUFVLEVBQUUsSUFBUyxFQUFFLEtBQVUsRUFBRSxJQUFTO29CQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFDTSxzQ0FBYSxHQUFwQixVQUFxQixhQUFhO29CQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7b0JBQ3hELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQztvQkFDMUIsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTt3QkFDMUQsWUFBWSxHQUFHLE9BQU8sQ0FBQztxQkFDMUI7eUJBQ0ksSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLHFCQUFxQixFQUFFO3dCQUM3RSxZQUFZLEdBQUcscUJBQXFCLENBQUM7cUJBQ3hDO29CQUNELElBQUksS0FBSyxHQUFVLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDL0MsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUU7NEJBQzFILEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBUSxDQUFDO2dDQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPO2dDQUNqRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzZCQUNwRSxDQUFDLENBQUMsQ0FBQzt5QkFDUDtxQkFDSjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBYyxDQUFDO3dCQUM1QyxLQUFLLEVBQUUsY0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFO3dCQUN0RCxPQUFPLEVBQUUsT0FBTzt3QkFDaEIsWUFBWSxFQUFFLFlBQVksSUFBSSxTQUFTO3dCQUN2QyxTQUFTLEVBQUUsT0FBTzt3QkFDbEIsS0FBSyxPQUFBO3FCQUNSLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixDQUFDO2dCQUNNLHlDQUFnQixHQUF2QixVQUF3QixLQUFhO29CQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ00sdUNBQWMsR0FBckIsVUFBc0IsU0FBaUIsRUFBRSxLQUFhO29CQUNsRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDekQsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO3dCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3BGLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7d0JBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDNUM7b0JBQ0QsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO3dCQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3BGLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7d0JBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDNUM7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixDQUFDO2dCQUNNLDZDQUFvQixHQUEzQjtvQkFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQztnQkFDTSxrQ0FBUyxHQUFoQixVQUFpQixJQUFZLEVBQUUsU0FBaUI7b0JBQzVDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFO3dCQUNuQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDM0Q7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBdEhhLDBCQUFXLEdBQUcsZUFBTSxDQUFDLG1CQUFtQixDQUFDO2dCQXVIM0QscUJBQUM7YUFBQSxBQXhIRCxDQUE2QixzQkFBZ0I7O1lBMEg3QyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztnQkFBQSxpQkEwQmpDO2dCQXpCRyxJQUFJLE1BQU0sR0FBRyxvREFBZ0QsQ0FBQztnQkFDOUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQ2pDLElBQUksSUFBSSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDM0gsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUEsR0FBRzt3QkFDWixNQUFNLElBQUkseUJBQXNCLGdCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGtDQUEwQixLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLFlBQU8sQ0FBQzt3QkFDOUosSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQWxFLENBQWtFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUEvRixDQUErRixDQUFDLENBQUM7d0JBQzdJLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFBLFdBQVc7NEJBQzVDLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMvQyxDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLElBQUksUUFBUSxDQUFDO29CQUN2QixDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxNQUFNLElBQUksMkJBQXlCLENBQUM7b0JBQ3BDLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFBLFdBQVc7d0JBQzVDLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxJQUFJLFFBQVEsQ0FBQztpQkFDdEI7Z0JBQ0QsTUFBTSxJQUFJLGNBQWMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDckQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUMzRCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzNEO1lBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgTWV0cmljc1BhbmVsQ3RybCwgbG9hZFBsdWdpbkNzcyB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IGtibiBmcm9tIFwiYXBwL2NvcmUvdXRpbHMva2JuXCI7XHJcbmltcG9ydCB7IEJvb21TdGF0c0dyb3VwLCBCb29tU3RhdCB9IGZyb20gXCIuL2FwcC9Cb29tU3RhdHNHcm91cFwiO1xyXG5pbXBvcnQgeyBidWlsZE1hc3RlckRhdGEgfSBmcm9tIFwiLi9hcHAvRGF0YUhhbmRsZXJcIjtcclxuaW1wb3J0IHsgSUJvb21TdW1tYXJ5Q3RsIH0gZnJvbSBcIi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKGNvbmZpZy5jc3NUaGVtZXMpO1xyXG5cclxuY2xhc3MgQm9vbVN1bW1hcnlDdGwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIGltcGxlbWVudHMgSUJvb21TdW1tYXJ5Q3RsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBjb25maWcuZGVmYXVsdF90ZW1wbGF0ZVVSTDtcclxuICAgIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgICBwdWJsaWMgZWxlbTogYW55O1xyXG4gICAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgICBwdWJsaWMgYWN0aXZlU3RhdEluZGV4ID0gMDtcclxuICAgIHB1YmxpYyBtYXN0ZXJkYXRhOiBhbnkgPSBbXTtcclxuICAgIHB1YmxpYyBjb2xuYW1lcztcclxuICAgIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gICAgcHVibGljIHN0YXRUeXBlcyA9IGNvbmZpZy5zdGF0VHlwZXM7XHJcbiAgICBwdWJsaWMgY29tcGFyZU9wZXJhdG9ycyA9IGNvbmZpZy5jb21wYXJlT3BlcmF0b3JzO1xyXG4gICAgcHVibGljIGRlY2ltYWxWYWx1ZXMgPSBjb25maWcuZGVjaW1hbFZhbHVlcztcclxuICAgIHB1YmxpYyBmb3JtYXRfYXMgPSBjb25maWcuZm9ybWF0X2FzO1xyXG4gICAgcHVibGljIHRlbXBsYXRlVHlwZXMgPSBjb25maWcudGVtcGxhdGVUeXBlcztcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgfHwgW107XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5pbml0RWRpdE1vZGUsXHJcbiAgICAgICAgICAgIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgICAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5kYXRhUmVjZWl2ZWQsXHJcbiAgICAgICAgICAgIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubWFwKHN0YXRzX2dyb3VwID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHN0YXRzX2dyb3VwLCBCb29tU3RhdHNHcm91cC5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBzdGF0c19ncm91cC5zdGF0cy5tYXAoc3RhdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN0YXQucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRzX2dyb3VwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgICAgICBfLmVhY2goY29uZmlnLmVkaXRvclRhYnMsIGVkaXRvclRhYiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yVGFiLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yVGFiLnRlbXBsYXRlUGF0aCxcclxuICAgICAgICAgICAgICAgIGVkaXRvclRhYi5wb3NpdGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGEgPSBidWlsZE1hc3RlckRhdGEoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jb2xuYW1lcyA9IFtdO1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLm1hc3RlcmRhdGEsIGdyb3VwID0+IHtcclxuICAgICAgICAgICAgXy5lYWNoKGdyb3VwLCBpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbmFtZXMucHVzaChpdGVtLmNvbG5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbG5hbWVzID0gXy51bmlxKHRoaXMuY29sbmFtZXMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgICAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFN0YXRzR3JvdXAoc3RhdGdyb3VwVHlwZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgfHwgW107XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlVHlwZSA9IFwiYXV0b1wiO1xyXG4gICAgICAgIGlmIChzdGF0Z3JvdXBUeXBlICYmIHN0YXRncm91cFR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJKVU1CT1wiKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZSA9IFwianVtYm9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RhdGdyb3VwVHlwZSAmJiBzdGF0Z3JvdXBUeXBlLnRvVXBwZXJDYXNlKCkgPT09IFwiSlVNQk9fV0lUSE9VVF9USVRMRVwiKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVHlwZSA9IFwianVtYm9fd2l0aG91dF90aXRsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RhdHM6IGFueVtdID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YSAmJiB0aGlzLm1hc3RlcmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXN0ZXJkYXRhWzBdLmxlbmd0aCA+IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCAmJiB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoXS5jb2xuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5wdXNoKG5ldyBCb29tU3RhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGhdLmNvbG5hbWVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5wdXNoKG5ldyBCb29tU3RhdHNHcm91cCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBgU3VtbWFyeSAke3RoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLmxlbmd0aCArIDF9YCxcclxuICAgICAgICAgICAgYmdDb2xvcjogXCJncmVlblwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVR5cGU6IHRlbXBsYXRlVHlwZSB8fCBcImRlZmF1bHRcIixcclxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgICAgICAgIHN0YXRzXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVN0YXRzR3JvdXAoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdGF0SW5kZXggPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3VwcyAmJiB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwcy5sZW5ndGggPiAwID8gdGhpcy5wYW5lbC5zdGF0c19ncm91cHMubGVuZ3RoIC0gMSA6IC0xO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbW92ZVN0YXRzR3JvdXAoZGlyZWN0aW9uOiBzdHJpbmcsIGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpXTtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IE51bWJlcihpbmRleCkgLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzX2dyb3Vwc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwuc3RhdHNfZ3JvdXBzW051bWJlcihpbmRleCkgKyAxXTtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsU3RhdHNHcm91cHMoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdGF0c19ncm91cHMgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBvdXRwdXQgPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPjxkaXYgY2xhc3M9XCJyb3dcIj5gO1xyXG4gICAgaWYgKHRoaXMuY3RybC5wYW5lbC5lbmFibGVfcmVwZWF0ZXIpIHtcclxuICAgICAgICBsZXQgY29scyA9IF8udW5pcShfLmZsYXRNYXAodGhpcy5tYXN0ZXJkYXRhKS5maWx0ZXIodCA9PiB0LmNvbG5hbWUgPT09IHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl9jb2x1bW4pLm1hcCh0ID0+IHQudmFsdWUpKTtcclxuICAgICAgICBfLmVhY2goY29scywgY29sID0+IHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGA8ZGl2IGNsYXNzPVwiY29sLW1kLSR7Xy5taW4oWysodGhpcy5jdHJsLnBhbmVsLnJlcGVhdGVyX3dpZHRoKSwgMTJdKX1cIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206JHt0aGlzLmN0cmwucGFuZWwucmVwZWF0ZXJfbWFyZ2luX2JvdHRvbSB8fCBcIjIwXCJ9cHg7XCI+YDtcclxuICAgICAgICAgICAgbGV0IG15Y29sZGF0YSA9IHRoaXMubWFzdGVyZGF0YS5maWx0ZXIodCA9PiB0LmZpbHRlcih0MSA9PiB0MS52YWx1ZSA9PT0gY29sICYmIHQxLmNvbG5hbWUgPT09IHRoaXMuY3RybC5wYW5lbC5yZXBlYXRlcl9jb2x1bW4pLmxlbmd0aCA9PT0gMSk7XHJcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLmN0cmwucGFuZWwuc3RhdHNfZ3JvdXBzLCBzdGF0c19ncm91cCA9PiB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gc3RhdHNfZ3JvdXAuZ2V0b3V0cHV0KG15Y29sZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3V0cHV0ICs9IGA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+YDtcclxuICAgICAgICBfLmVhY2godGhpcy5jdHJsLnBhbmVsLnN0YXRzX2dyb3Vwcywgc3RhdHNfZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gc3RhdHNfZ3JvdXAuZ2V0b3V0cHV0KHRoaXMubWFzdGVyZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3V0cHV0ICs9IGA8L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgb3V0cHV0ICs9IGA8L2Rpdj48L2Rpdj5gO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXN1bW1hcnktcGFuZWxcIikuaHRtbChvdXRwdXQpO1xyXG4gICAgaWYgKHRoaXMuY3RybCAmJiB0aGlzLmN0cmwuZWxlbVswXSkge1xyXG4gICAgICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICAgICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQgLSAzMTtcclxuICAgICAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBCb29tU3VtbWFyeUN0bCBhcyBQYW5lbEN0cmwgfTtcclxuIl19