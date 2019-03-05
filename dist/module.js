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
                BoomSummaryCtl.prototype.includeStat = function (statOptions) {
                    this.panel.stats.push(new BoomStat_1.BoomSummaryStat({
                        bgColor: statOptions.bgColor || "green",
                        display_template: statOptions.display_template || undefined,
                        field: statOptions.field,
                        textColor: statOptions.textColor || "white"
                    }));
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
                    this.includeStat({
                        bgColor: "green",
                        display_template: display_template,
                        field: field,
                        textColor: "white"
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRUgsa0NBQWdCO2dCQVkzQyx3QkFBWSxNQUFNLEVBQUUsU0FBUztvQkFBN0IsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBWXpCO29CQXBCTSxxQkFBZSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7b0JBQ3JCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxlQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDN0Isc0JBQWdCLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQyxtQkFBYSxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUM7b0JBSTFDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNaLGVBQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FDL0IsQ0FBQztvQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWixlQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFDbEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQy9CLENBQUM7O2dCQUNK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QixDQUFDO2dCQXBJYSwwQkFBVyxHQUFHLGVBQU0sQ0FBQyxtQkFBbUIsQ0FBQztnQkFxSXpELHFCQUFDO2FBQUEsQUF0SUQsQ0FBNkIsc0JBQWdCOztZQXdJN0MsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUc7Z0JBQUEsaUJBT2pDO2dCQU5DLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBQSxJQUFJO29CQUMzQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDN0MsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsLCBsb2FkUGx1Z2luQ3NzIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgSUJvb21TdW1tYXJ5Q3RsIH0gZnJvbSBcIi4vZGVmaW5pdGlvbnMvdHlwZXNcIjtcclxuaW1wb3J0IHsgQm9vbVN1bW1hcnlTdGF0IH0gZnJvbSBcIi4vYXBwL0Jvb21TdGF0XCI7XHJcbmltcG9ydCB7IGJ1aWxkTWFzdGVyRGF0YSB9IGZyb20gXCIuL2FwcC9EYXRhSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmxvYWRQbHVnaW5Dc3MoY29uZmlnLmNzc1RoZW1lcyk7XHJcblxyXG5jbGFzcyBCb29tU3VtbWFyeUN0bCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwgaW1wbGVtZW50cyBJQm9vbVN1bW1hcnlDdGwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBjb25maWcuZGVmYXVsdF90ZW1wbGF0ZVVSTDtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgcHVibGljIGFjdGl2ZVN0YXRJbmRleCA9IDA7XHJcbiAgcHVibGljIG1hc3RlcmRhdGE6IGFueSA9IFtdO1xyXG4gIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHB1YmxpYyBzdGF0VHlwZXMgPSBjb25maWcuc3RhdFR5cGVzO1xyXG4gIHB1YmxpYyBjb21wYXJlT3BlcmF0b3JzID0gY29uZmlnLmNvbXBhcmVPcGVyYXRvcnM7XHJcbiAgcHVibGljIGRlY2ltYWxWYWx1ZXMgPSBjb25maWcuZGVjaW1hbFZhbHVlcztcclxuXHJcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcclxuICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwge30pO1xyXG4gICAgdGhpcy5wYW5lbC5zdGF0cyA9IHRoaXMucGFuZWwuc3RhdHMgfHwgW107XHJcbiAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFxyXG4gICAgICBjb25maWcuZ3JhZmFuYV9ldmVudHMuZGF0YVJlY2VpdmVkLFxyXG4gICAgICB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcclxuICAgICAgY29uZmlnLmdyYWZhbmFfZXZlbnRzLmluaXRFZGl0TW9kZSxcclxuICAgICAgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYW5lbC5zdGF0cy5tYXAoc3RhdCA9PiB7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdGF0LCBCb29tU3VtbWFyeVN0YXQucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHN0YXQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm1hc3RlcmRhdGEgPSBidWlsZE1hc3RlckRhdGEoZGF0YSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgIF8uZWFjaChjb25maWcuZWRpdG9yVGFicywgZWRpdG9yVGFiID0+IHtcclxuICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoXHJcbiAgICAgICAgZWRpdG9yVGFiLnRpdGxlLFxyXG4gICAgICAgIGVkaXRvclRhYi50ZW1wbGF0ZVBhdGgsXHJcbiAgICAgICAgZWRpdG9yVGFiLnBvc2l0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdXRvR2VuZXJhdGVTdGF0cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBpZiAodGhpcy5tYXN0ZXJkYXRhICYmIHRoaXMubWFzdGVyZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgXy5lYWNoKHRoaXMubWFzdGVyZGF0YVswXSwgZGF0YSA9PiB7XHJcbiAgICAgICAgICBpZiAoZGF0YS5jb2xuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3RhdHMucHVzaChcclxuICAgICAgICAgICAgICBuZXcgQm9vbVN1bW1hcnlTdGF0KHtcclxuICAgICAgICAgICAgICAgIGJnQ29sb3I6IFwiZ3JlZW5cIixcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBkYXRhLmNvbG5hbWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6IFwid2hpdGVcIlxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5jbHVkZVN0YXQoc3RhdE9wdGlvbnMpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwuc3RhdHMucHVzaChcclxuICAgICAgbmV3IEJvb21TdW1tYXJ5U3RhdCh7XHJcbiAgICAgICAgYmdDb2xvcjogc3RhdE9wdGlvbnMuYmdDb2xvciB8fCBcImdyZWVuXCIsXHJcbiAgICAgICAgZGlzcGxheV90ZW1wbGF0ZTogc3RhdE9wdGlvbnMuZGlzcGxheV90ZW1wbGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgZmllbGQ6IHN0YXRPcHRpb25zLmZpZWxkLFxyXG4gICAgICAgIHRleHRDb2xvcjogc3RhdE9wdGlvbnMudGV4dENvbG9yIHx8IFwid2hpdGVcIlxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRTdGF0KHRlbXBsYXRlVHlwZSk6IHZvaWQge1xyXG4gICAgbGV0IGZpZWxkID0gXCJTYW1wbGVcIjtcclxuICAgIGlmICh0aGlzLm1hc3RlcmRhdGEgJiYgdGhpcy5tYXN0ZXJkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMubWFzdGVyZGF0YVswXS5sZW5ndGggPiB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAmJlxyXG4gICAgICAgIHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aF0uY29sbmFtZVxyXG4gICAgICApIHtcclxuICAgICAgICBmaWVsZCA9IHRoaXMubWFzdGVyZGF0YVswXVt0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aF0uY29sbmFtZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGRpc3BsYXlfdGVtcGxhdGU7XHJcbiAgICBpZiAodGVtcGxhdGVUeXBlICYmIHRlbXBsYXRlVHlwZS50b1VwcGVyQ2FzZSgpID09PSBcIkpVTUJPXCIpIHtcclxuICAgICAgZGlzcGxheV90ZW1wbGF0ZSA9IGNvbmZpZy50ZW1wbGF0ZXMuZGVmYXVsdF9qdW1ibztcclxuICAgIH1cclxuICAgIHRoaXMuaW5jbHVkZVN0YXQoe1xyXG4gICAgICBiZ0NvbG9yOiBcImdyZWVuXCIsXHJcbiAgICAgIGRpc3BsYXlfdGVtcGxhdGUsXHJcbiAgICAgIGZpZWxkLFxyXG4gICAgICB0ZXh0Q29sb3I6IFwid2hpdGVcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlU3RhdChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnN0YXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLmFjdGl2ZVN0YXRJbmRleCA9XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHMgJiYgdGhpcy5wYW5lbC5zdGF0cy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyB0aGlzLnBhbmVsLnN0YXRzLmxlbmd0aCAtIDFcclxuICAgICAgICA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlU3RhdChkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpXTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnN0YXRzW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5zdGF0c1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwuc3RhdHNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMuYWN0aXZlU3RhdEluZGV4ID0gTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxufVxyXG5cclxuQm9vbVN1bW1hcnlDdGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBvdXRwdXQgPSBgYDtcclxuICBfLmVhY2godGhpcy5wYW5lbC5zdGF0cywgc3RhdCA9PiB7XHJcbiAgICBsZXQgbyA9IHN0YXQuZ2V0T3V0cHV0VmFsdWUodGhpcy5tYXN0ZXJkYXRhKTtcclxuICAgIG91dHB1dCArPSBvO1xyXG4gIH0pO1xyXG4gIHRoaXMuZWxlbS5maW5kKFwiI2Jvb21zdW1tYXJ5LXBhbmVsXCIpLmh0bWwob3V0cHV0KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IEJvb21TdW1tYXJ5Q3RsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=