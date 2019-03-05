System.register(["lodash", "app/plugins/sdk", "app/core/utils/kbn", "./app/BoomStat", "./app/DataHandler", "./config"], function (exports_1, context_1) {
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
    var lodash_1, sdk_1, kbn_1, BoomStat_1, DataHandler_1, config_1, BoomSummaryCtl;
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
            function (BoomStat_1_1) {
                BoomStat_1 = BoomStat_1_1;
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
                    lodash_1.default.defaults(_this.panel, {});
                    _this.panel.stats = _this.panel.stats || [];
                    _this.updatePrototypes();
                    _this.events.on(config_1.config.grafana_events.dataReceived, _this.onDataReceived.bind(_this));
                    _this.events.on(config_1.config.grafana_events.initEditMode, _this.onInitEditMode.bind(_this));
                    return _this;
                }
                BoomSummaryCtl.prototype.updatePrototypes = function () {
                    this.panel.stats.map(function (stat) {
                        Object.setPrototypeOf(stat, BoomStat_1.BoomSummaryStat.prototype);
                        return stat;
                    });
                };
                BoomSummaryCtl.prototype.onDataReceived = function (data) {
                    this.masterdata = DataHandler_1.buildMasterData(data);
                    this.render();
                };
                BoomSummaryCtl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(config_1.config.editorTabs, function (editorTab) {
                        _this.addEditorTab(editorTab.title, editorTab.templatePath, editorTab.position);
                    });
                };
                BoomSummaryCtl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                BoomSummaryCtl.prototype.autoGenerateStats = function () {
                    var _this = this;
                    if (this.panel.stats.length === 0) {
                        if (this.masterdata && this.masterdata.length > 0) {
                            lodash_1.default.each(this.masterdata[0], function (data) {
                                if (data.colname) {
                                    _this.panel.stats.push(new BoomStat_1.BoomSummaryStat({
                                        bgColor: "green",
                                        field: data.colname,
                                        textColor: "white"
                                    }));
                                }
                            });
                        }
                    }
                    this.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.addStat = function (templateType) {
                    var field = "Sample";
                    if (this.masterdata && this.masterdata.length > 0) {
                        if (this.masterdata[0].length > this.panel.stats.length &&
                            this.masterdata[0][this.panel.stats.length].colname) {
                            field = this.masterdata[0][this.panel.stats.length].colname;
                        }
                    }
                    var display_template;
                    if (templateType && templateType.toUpperCase() === "JUMBO") {
                        display_template = config_1.config.templates.default_jumbo;
                    }
                    this.panel.stats.push(new BoomStat_1.BoomSummaryStat({
                        bgColor: "green",
                        display_template: display_template || undefined,
                        field: field,
                        textColor: "white"
                    }));
                    this.activeStatIndex = this.panel.stats.length - 1;
                    this.render();
                };
                BoomSummaryCtl.prototype.removeStat = function (index) {
                    this.panel.stats.splice(index, 1);
                    this.activeStatIndex =
                        this.panel.stats && this.panel.stats.length > 0
                            ? this.panel.stats.length - 1
                            : -1;
                    this.render();
                };
                BoomSummaryCtl.prototype.moveStat = function (direction, index) {
                    var tempElement = this.panel.stats[Number(index)];
                    if (direction === "UP") {
                        this.panel.stats[Number(index)] = this.panel.stats[Number(index) - 1];
                        this.panel.stats[Number(index) - 1] = tempElement;
                        this.activeStatIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.stats[Number(index)] = this.panel.stats[Number(index) + 1];
                        this.panel.stats[Number(index) + 1] = tempElement;
                        this.activeStatIndex = Number(index) + 1;
                    }
                    this.render();
                };
                BoomSummaryCtl.templateUrl = config_1.config.default_templateURL;
                return BoomSummaryCtl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", BoomSummaryCtl);
            BoomSummaryCtl.prototype.render = function () {
                var _this = this;
                var output = "";
                lodash_1.default.each(this.panel.stats, function (stat) {
                    var o = stat.getOutputValue(_this.masterdata);
                    output += o;
                });
                this.elem.find("#boomsummary-panel").html(output);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQVkzQyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWXpCO29CQXBCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBQ3JCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBSTFDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNaLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FDL0IsQ0FBQztvQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWixlQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFDbEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQy9CLENBQUM7O2dCQUNK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LFVBQUEsSUFBSTtvQkFDM0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdDLE1BQU0sSUFBSSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgTWV0cmljc1BhbmVsQ3RybCwgbG9hZFBsdWdpbkNzcyB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IGtibiBmcm9tIFwiYXBwL2NvcmUvdXRpbHMva2JuXCI7XHJcbmltcG9ydCB7IElCb29tU3VtbWFyeUN0bCB9IGZyb20gXCIuL2RlZmluaXRpb25zL3R5cGVzXCI7XHJcbmltcG9ydCB7IEJvb21TdW1tYXJ5U3RhdCB9IGZyb20gXCIuL2FwcC9Cb29tU3RhdFwiO1xyXG5pbXBvcnQgeyBidWlsZE1hc3RlckRhdGEgfSBmcm9tIFwiLi9hcHAvRGF0YUhhbmRsZXJcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKGNvbmZpZy5jc3NUaGVtZXMpO1xyXG5cclxuY2xhc3MgQm9vbVN1bW1hcnlDdGwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIGltcGxlbWVudHMgSUJvb21TdW1tYXJ5Q3RsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gY29uZmlnLmRlZmF1bHRfdGVtcGxhdGVVUkw7XHJcbiAgcHVibGljIGN0cmw6IGFueTtcclxuICBwdWJsaWMgZWxlbTogYW55O1xyXG4gIHB1YmxpYyBhdHRyczogYW55O1xyXG4gIHB1YmxpYyBhY3RpdmVTdGF0SW5kZXggPSAwO1xyXG4gIHB1YmxpYyBtYXN0ZXJkYXRhOiBhbnkgPSBbXTtcclxuICBwdWJsaWMgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgc3RhdFR5cGVzID0gY29uZmlnLnN0YXRUeXBlcztcclxuICBwdWJsaWMgY29tcGFyZU9wZXJhdG9ycyA9IGNvbmZpZy5jb21wYXJlT3BlcmF0b3JzO1xyXG4gIHB1YmxpYyBkZWNpbWFsVmFsdWVzID0gY29uZmlnLmRlY2ltYWxWYWx1ZXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIHt9KTtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMgPSB0aGlzLnBhbmVsLnN0YXRzIHx8IFtdO1xyXG4gICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcclxuICAgICAgY29uZmlnLmdyYWZhbmFfZXZlbnRzLmRhdGFSZWNlaXZlZCxcclxuICAgICAgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudHMub24oXHJcbiAgICAgIGNvbmZpZy5ncmFmYW5hX2V2ZW50cy5pbml0RWRpdE1vZGUsXHJcbiAgICAgIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMubWFwKHN0YXQgPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RhdCwgQm9vbVN1bW1hcnlTdGF0LnByb3RvdHlwZSk7XHJcbiAgICAgIHJldHVybiBzdGF0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXN0ZXJkYXRhID0gYnVpbGRNYXN0ZXJEYXRhKGRhdGEpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICBfLmVhY2goY29uZmlnLmVkaXRvclRhYnMsIGVkaXRvclRhYiA9PiB7XHJcbiAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKFxyXG4gICAgICAgIGVkaXRvclRhYi50aXRsZSxcclxuICAgICAgICBlZGl0b3JUYWIudGVtcGxhdGVQYXRoLFxyXG4gICAgICAgIGVkaXRvclRhYi5wb3NpdGlvblxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXV0b0dlbmVyYXRlU3RhdHMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgaWYgKHRoaXMubWFzdGVyZGF0YSAmJiB0aGlzLm1hc3RlcmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIF8uZWFjaCh0aGlzLm1hc3RlcmRhdGFbMF0sIGRhdGEgPT4ge1xyXG4gICAgICAgICAgaWYgKGRhdGEuY29sbmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0YXRzLnB1c2goXHJcbiAgICAgICAgICAgICAgbmV3IEJvb21TdW1tYXJ5U3RhdCh7XHJcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOiBcImdyZWVuXCIsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogZGF0YS5jb2xuYW1lLFxyXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiBcIndoaXRlXCJcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkU3RhdCh0ZW1wbGF0ZVR5cGUpOiB2b2lkIHtcclxuICAgIGxldCBmaWVsZCA9IFwiU2FtcGxlXCI7XHJcbiAgICBpZiAodGhpcy5tYXN0ZXJkYXRhICYmIHRoaXMubWFzdGVyZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGFbMF0ubGVuZ3RoID4gdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggJiZcclxuICAgICAgICB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGhdLmNvbG5hbWVcclxuICAgICAgKSB7XHJcbiAgICAgICAgZmllbGQgPSB0aGlzLm1hc3RlcmRhdGFbMF1bdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGhdLmNvbG5hbWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBkaXNwbGF5X3RlbXBsYXRlO1xyXG4gICAgaWYgKHRlbXBsYXRlVHlwZSAmJiB0ZW1wbGF0ZVR5cGUudG9VcHBlckNhc2UoKSA9PT0gXCJKVU1CT1wiKSB7XHJcbiAgICAgIGRpc3BsYXlfdGVtcGxhdGUgPSBjb25maWcudGVtcGxhdGVzLmRlZmF1bHRfanVtYm87XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzLnB1c2goXHJcbiAgICAgIG5ldyBCb29tU3VtbWFyeVN0YXQoe1xyXG4gICAgICAgIGJnQ29sb3I6IFwiZ3JlZW5cIixcclxuICAgICAgICBkaXNwbGF5X3RlbXBsYXRlOiBkaXNwbGF5X3RlbXBsYXRlIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBmaWVsZDogZmllbGQsXHJcbiAgICAgICAgdGV4dENvbG9yOiBcIndoaXRlXCJcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9IHRoaXMucGFuZWwuc3RhdHMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlU3RhdChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHMgJiYgdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDFcclxuICAgICAgICA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlU3RhdChkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpXTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBvdXRwdXQgPSBgYDtcclxuICBfLmVhY2godGhpcy5wYW5lbC5zdGF0cywgc3RhdCA9PiB7XHJcbiAgICBsZXQgbyA9IHN0YXQuZ2V0T3V0cHV0VmFsdWUodGhpcy5tYXN0ZXJkYXRhKTtcclxuICAgIG91dHB1dCArPSBvO1xyXG4gIH0pO1xyXG4gIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IEJvb21TdW1tYXJ5Q3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=