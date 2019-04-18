///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { MetricsPanelCtrl, loadPluginCss } from "app/plugins/sdk";
import kbn from "app/core/utils/kbn";
import { BoomSummaryGroup, BoomStat } from "./BoomSummaryGroup";
import { buildMasterData } from "./DataHandler";
import { IBoomSummaryCtl } from "./types";
import { config } from "./Config";

loadPluginCss(config.cssThemes);

class BoomSummaryCtl extends MetricsPanelCtrl implements IBoomSummaryCtl {
    public static templateUrl = config.default_templateURL;
    public ctrl: any;
    public elem: any;
    public attrs: any;
    public activeStatIndex = 0;
    public masterdata: any = [];
    public colnames;
    public unitFormats = kbn.getUnitFormats();
    public statTypes = config.statTypes;
    public compareOperators = config.compareOperators;
    public decimalValues = config.decimalValues;
    public format_as = config.format_as;
    public templateTypes = config.templateTypes;
    public ctrl_width = config.ctrl_width;
    constructor($scope, $injector) {
        super($scope, $injector);
        _.defaults(this.panel, {});
        this.panel.stats_groups = this.panel.stats_groups || [];
        this.updatePrototypes();
        this.events.on(
            config.grafana_events.initEditMode,
            this.onInitEditMode.bind(this)
        );
        this.events.on(
            config.grafana_events.dataReceived,
            this.onDataReceived.bind(this)
        );
    }
    private updatePrototypes(): void {
        this.panel.stats_groups.map(stats_group => {
            Object.setPrototypeOf(stats_group, BoomSummaryGroup.prototype);
            stats_group.stats.map(stat => {
                Object.setPrototypeOf(stat, BoomStat.prototype);
            });
            return stats_group;
        });
    }
    private onInitEditMode(): void {
        _.each(config.editorTabs, editorTab => {
            this.addEditorTab(
                editorTab.title,
                editorTab.templatePath,
                editorTab.position
            );
        });
    }
    private onDataReceived(data: any): void {
        this.masterdata = buildMasterData(data);
        this.colnames = [];
        _.each(this.masterdata, group => {
            _.each(group, item => {
                this.colnames.push(item.colname);
            });
        });
        this.colnames = _.uniq(this.colnames);
        this.render();
    }
    public link(scope: any, elem: any, attrs: any, ctrl: any): void {
        this.scope = scope;
        this.elem = elem;
        this.attrs = attrs;
        this.ctrl = ctrl;
    }
    public addSummaryGroup(statgroupType): void {
        this.panel.stats_groups = this.panel.stats_groups || [];
        let templateType = "auto";
        if (statgroupType && statgroupType.toUpperCase() === "JUMBO") {
            templateType = "jumbo";
        } else if (statgroupType && statgroupType.toUpperCase() === "JUMBO_WITHOUT_TITLE") {
            templateType = "jumbo_without_title";
        }
        let stats: any[] = [];
        if (this.masterdata && this.masterdata.length > 0) {
            if (this.masterdata[0].length > this.panel.stats_groups.length && this.masterdata[0][this.panel.stats_groups.length].colname) {
                stats.push(new BoomStat({
                    field: this.masterdata[0][this.panel.stats_groups.length].colname,
                    stat_type: "count",
                    title: "Total rows"
                }));
            }
        }
        this.panel.stats_groups.push(new BoomSummaryGroup({
            bgColor: "green",
            stats,
            templateType: templateType || "auto",
            textColor: "white",
            title: `Summary ${this.panel.stats_groups.length + 1}`
        }));
        this.activeStatIndex = this.panel.stats_groups.length - 1;
        this.render();
    }
    public removeSummaryGroup(index: number): void {
        this.panel.stats_groups.splice(index, 1);
        this.activeStatIndex = this.panel.stats_groups && this.panel.stats_groups.length > 0 ? this.panel.stats_groups.length - 1 : -1;
        this.render();
    }
    public moveSummaryGroup(direction: string, index: Number): void {
        let tempElement = this.panel.stats_groups[Number(index)];
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
    }
    public removeAllSummaryGroups() {
        this.panel.stats_groups = [];
        this.render();
    }
    public limitText(text: string, maxlength: Number): string {
        if (text.split("").length > maxlength) {
            text = text.substring(0, Number(maxlength) - 3) + "...";
        }
        return text;
    }
}

BoomSummaryCtl.prototype.render = function () {
    let output = ``;
    output += `<style>${this.ctrl.panel.custom_css || ""}</style>`;
    output += `<div class="container-fluid"><div class="row">`;
    if (this.ctrl.panel.enable_repeater) {
        if (this.ctrl.panel.stats_groups && this.ctrl.panel.stats_groups.length > 0) {
            let cols = _.uniq(_.flatMap(this.masterdata).filter(t => t.colname === this.ctrl.panel.repeater_column).map(t => t.value));
            _.each(cols, col => {
                output += `<div class="col-md-${_.min([+(this.ctrl.panel.repeater_width), 12])}" style="margin-bottom:${this.ctrl.panel.repeater_margin_bottom || "20"}px;">`;
                let mycoldata = this.masterdata.filter(t => t.filter(t1 => t1.value === col && t1.colname === this.ctrl.panel.repeater_column).length === 1);
                _.each(this.ctrl.panel.stats_groups, stats_group => {
                    output += stats_group.getoutput(mycoldata);
                });
                output += "</div>";
            });
        }
    } else {
        output += `<div class="col-md-12">`;
        _.each(this.ctrl.panel.stats_groups, stats_group => {
            output += stats_group.getoutput(this.masterdata);
        });
        output += `</div>`;
    }
    output += `</div></div>`;
    this.elem.find("#boomsummary-panel").html(output);
    if (this.ctrl && this.ctrl.elem[0]) {
        let rootElem = this.elem.find('.table-panel-scroll');
        let maxheightofpanel = this.ctrl.elem[0].clientHeight - 31;
        rootElem.css({ 'max-height': maxheightofpanel + "px" });
    }
};

export { BoomSummaryCtl as PanelCtrl };
