import _ from "lodash";
import { IMasterData, IBoomFilter, IBoomSummaryConditionalFormats, IBoomStatsGroup } from "./types";
import { getFilteredDataFromMasterData } from "./AppUtils";
import { getStatsFromArrayOfObjects, isMatch } from "./BoomUtils";
import { getFormattedOutput } from "./GrafanaUtils";
import { replaceTokens } from "./BoomUtils";

export let buildMasterData = function (data) {
    let masterdata: IMasterData[][] = [];
    _.each(data, d => {
        if (d.type === "table") {
            let refId = d.refId;
            _.each(d.rows, (row, i) => {
                let group: IMasterData[] = [];
                _.each(row, (col, j) => {
                    let mydata: IMasterData = {
                        colname: d.columns[j].text,
                        refId,
                        rowid: +i,
                        value: col
                    };
                    group.push(mydata);
                });
                masterdata.push(group);
            });
        } else {
            console.error("ERROR: Only table format is currently supported");
        }
    });
    return masterdata;
};

export class BoomFilter implements IBoomFilter {
    public field: string;
    public operator: string;
    public value: string;
    public value2: string;
    public CanShowValue2;
    public GetValue2Helper;
    public GetValue1Helper;
    constructor(options) {
        this.field = options.field || "Sample";
        this.operator = options.operator || "equals";
        this.value = options.value || "Something";
        this.value2 = options.value2 || "";
    }
    public getSecondaryFieldDetails = function (operator) {
        let CanShowValue2 = false;
        let Value1Helper = "Value";
        let Value2Helper = "";
        switch (operator.replace("ignorecase", "").trim()) {
            case "between":
                CanShowValue2 = true;
                Value1Helper = "From";
                Value2Helper = "To";
                break;
            case "insiderange":
                CanShowValue2 = true;
                Value1Helper = "From";
                Value2Helper = "To";
                break;
            case "outsiderange":
                CanShowValue2 = true;
                Value1Helper = "From";
                Value2Helper = "To";
                break;
            case "in":
                CanShowValue2 = true;
                Value1Helper = "Values";
                Value2Helper = "Seperator";
                break;
            default:
                break;
        }
        return {
            CanShowValue2,
            Value1Helper,
            Value2Helper
        };
    };

}

BoomFilter.prototype.GetValue1Helper = function () {
    return this.getSecondaryFieldDetails(this.operator).Value1Helper;
};

BoomFilter.prototype.GetValue2Helper = function () {
    return this.getSecondaryFieldDetails(this.operator).Value2Helper;
};

BoomFilter.prototype.CanShowValue2 = function () {
    return this.getSecondaryFieldDetails(this.operator).CanShowValue2;
};

export class BoomSummaryFilter extends BoomFilter implements IBoomFilter {
    constructor(options) {
        super(options);
    }
}

export class BoomSummaryConditionalFormats extends BoomFilter implements IBoomFilter, IBoomSummaryConditionalFormats {
    public stat_type: string;
    public bgColor: string;
    public textColor: string;
    public custom_css_class: string;
    constructor(options) {
        super(options);
        this.custom_css_class = options.custom_css_class || "";
        this.stat_type = options.stat_type || "first";
        this.bgColor = options.bgColor || "";
        this.textColor = options.textColor || "";
    }
}

export class BoomStat {
    public field;
    public stat_type;
    public format_as;
    public decimals;
    public unit;
    public setUnitFormat;
    public title;
    constructor(options) {
        this.field = options.field || "Sample";
        this.stat_type = options.stat_type || "first";
        this.format_as = options.format_as || "string";
        this.decimals = options.decimals || "0";
        this.unit = options.unit || "none";
        this.title = options.title || this.stat_type + " of " + this.field || "Detail";
    }
}

BoomStat.prototype.setUnitFormat = function (format: any): void {
    this.unit = format && format.value ? format.value : "none";
};

export class BoomStatsGroup {
    public title: string;
    public stats: BoomStat[];
    public statWidth: String;
    public bgColor: string;
    public textColor: string;
    public templateType: string;
    public customTemplate: string;
    public filters: BoomSummaryFilter[];
    public conditional_formats: BoomSummaryConditionalFormats[];
    public addStat;
    public removeStat;
    public addFilter;
    public removeFilter;
    public addConditonalFormat;
    public removeConditionalFormat;
    public moveConditionalFormat;
    public getoutput;
    constructor(options) {
        this.title = options.title || "";
        this.stats = options.stats || [];
        this.statWidth = options.statWidth || "100";
        this.bgColor = options.bgColor || "";
        this.textColor = options.textColor || "";
        this.templateType = options.templateType || "default";
        this.customTemplate = options.customTemplate || `<div style="width:100%;float:left;border:1px solid black;">
            <div style="width:50%;float:left;padding:10px;">Total Records</div>
            <div style="width:50%;float:left;padding:10px;">#{count}</div>
        </div>`;
        this.filters = options.filters || [];
        this.conditional_formats = options.conditional_formats || [];
    }
}

BoomStatsGroup.prototype.addStat = function (): void {
    let newMetric = new BoomStat({});
    this.stats = this.stats || [];
    this.stats.push(newMetric);
};

BoomStatsGroup.prototype.removeStat = function (index: Number): void {
    if (this.stats.length > 0) {
        this.stats.splice(Number(index), 1);
    }
};

BoomStatsGroup.prototype.addFilter = function (): void {
    let newfilter = new BoomSummaryFilter({
        field: "Sample",
        operator: "equals"
    });
    this.filters = this.filters || [];
    this.filters.push(newfilter);
};

BoomStatsGroup.prototype.removeFilter = function (index: Number): void {
    if (this.filters.length > 0) {
        this.filters.splice(Number(index), 1);
    }
};

BoomStatsGroup.prototype.addConditonalFormat = function (): void {
    let new_conditional_formatter = new BoomSummaryConditionalFormats({
        operator: "equals",
        stat_type: "first"
    });
    this.conditional_formats = this.conditional_formats || [];
    this.conditional_formats.push(new_conditional_formatter);
};

BoomStatsGroup.prototype.removeConditionalFormat = function (index: Number): void {
    if (this.conditional_formats.length > 0) {
        this.conditional_formats.splice(Number(index), 1);
    }
};

BoomStatsGroup.prototype.moveConditionalFormat = function (direction: string, index: Number): void {
    let tempElement = this.conditional_formats[Number(index)];
    if (direction === "UP") {
        this.conditional_formats[Number(index)] = this.conditional_formats[
            Number(index) - 1
        ];
        this.conditional_formats[Number(index) - 1] = tempElement;
    }
    if (direction === "DOWN") {
        this.conditional_formats[Number(index)] = this.conditional_formats[
            Number(index) + 1
        ];
        this.conditional_formats[Number(index) + 1] = tempElement;
    }
};

let replaceStatsFromTemplate = function (template, stats, data): string {
    let output = template;
    _.each(stats, (stat, index) => {
        let mystatsObject: IBoomStatsGroup = {
            count: NaN,
            first: "",
            max: NaN,
            mean: NaN,
            min: NaN,
            sum: NaN,
            uniquecount: NaN,
        };
        if (data) {
            let mystats: any = [];
            _.each(data, group => {
                let matching_field = _.filter(group, g => g.colname === stat.field);
                if (matching_field.length > 0) {
                    mystats.push(_.first(matching_field).value);
                }
            });
            mystatsObject = getStatsFromArrayOfObjects(mystats);
        }
        if (index === 0) {
            output = output.replace(new RegExp("#{count}", "gi"), mystatsObject.count);
            output = output.replace(new RegExp("#{uniquecount}", "gi"), mystatsObject.uniquecount);
            output = output.replace(new RegExp("#{sum}", "gi"), mystatsObject.sum);
            output = output.replace(new RegExp("#{mean}", "gi"), mystatsObject.mean);
            output = output.replace(new RegExp("#{min}", "gi"), mystatsObject.min);
            output = output.replace(new RegExp("#{max}", "gi"), mystatsObject.max);
            output = output.replace(new RegExp("#{first}", "gi"), mystatsObject.first);
            output = output.replace(new RegExp("#{title}", "gi"), stat.title || `${stat.stat_type} of ${stat.field}`);
            output = output.replace(new RegExp("#{default}", "gi"), getFormattedOutput(mystatsObject[stat.stat_type], stat.unit, stat.decimals));
        }
        output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + "}", "gi"), getFormattedOutput(mystatsObject[stat.stat_type], stat.unit, stat.decimals));
        output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + ",raw}", "gi"), mystatsObject[stat.defaultStat]);
        output = output.replace(new RegExp("#{" + stat.stat_type + "," + stat.field + ",title}", "gi"), stat.title);
    });
    let colnames: any[] = [];
    _.each(data, group => {
        _.each(group, item => {
            colnames.push(item.colname);
        });
    });
    colnames = _.uniq(colnames);
    _.each(colnames, (colname, index) => {
        let mystatsObject: IBoomStatsGroup = {
            count: NaN,
            first: "",
            max: NaN,
            mean: NaN,
            min: NaN,
            sum: NaN,
            uniquecount: NaN,
        };
        if (data) {
            let mystats: any = [];
            _.each(data, group => {
                let matching_field = _.filter(group, g => g.colname === colname);
                if (matching_field.length > 0) {
                    mystats.push(_.first(matching_field).value);
                }
            });
            mystatsObject = getStatsFromArrayOfObjects(mystats);
        }
        if (index === 0) {
            output = output.replace(new RegExp("#{title}", "gi"), `${colname}`);
            output = output.replace(new RegExp("#{default}", "gi"), getFormattedOutput(mystatsObject.first, "none", "0"));
        }
        output = output.replace(new RegExp("#{count," + colname + "}", "gi"), mystatsObject.count);
        output = output.replace(new RegExp("#{uniquecount," + colname + "}", "gi"), mystatsObject.uniquecount);
        output = output.replace(new RegExp("#{sum," + colname + "}", "gi"), mystatsObject.sum);
        output = output.replace(new RegExp("#{mean," + colname + "}", "gi"), mystatsObject.mean);
        output = output.replace(new RegExp("#{min," + colname + "}", "gi"), mystatsObject.min);
        output = output.replace(new RegExp("#{max," + colname + "}", "gi"), mystatsObject.max);
        output = output.replace(new RegExp("#{first," + colname + "}", "gi"), mystatsObject.first);
        output = output.replace(new RegExp("#{count," + colname + ",raw}", "gi"), mystatsObject.count);
        output = output.replace(new RegExp("#{uniquecount," + colname + ",raw}", "gi"), mystatsObject.uniquecount);
        output = output.replace(new RegExp("#{sum," + colname + ",raw}", "gi"), mystatsObject.sum);
        output = output.replace(new RegExp("#{mean," + colname + ",raw}", "gi"), mystatsObject.mean);
        output = output.replace(new RegExp("#{min," + colname + ",raw}", "gi"), mystatsObject.min);
        output = output.replace(new RegExp("#{max," + colname + ",raw}", "gi"), mystatsObject.max);
        output = output.replace(new RegExp("#{first," + colname + ",raw}", "gi"), mystatsObject.first);
        output = output.replace(new RegExp("#{count," + colname + ",title}", "gi"), `Count of ${colname}`);
        output = output.replace(new RegExp("#{uniquecount," + colname + ",title}", "gi"), `Unique Count of ${colname}`);
        output = output.replace(new RegExp("#{sum," + colname + ",title}", "gi"), `Sum of ${colname}`);
        output = output.replace(new RegExp("#{mean," + colname + ",title}", "gi"), `Mean of ${colname}`);
        output = output.replace(new RegExp("#{min," + colname + ",title}", "gi"), `min of ${colname}`);
        output = output.replace(new RegExp("#{max," + colname + ",title}", "gi"), `Max of ${colname}`);
        output = output.replace(new RegExp("#{first," + colname + ",title}", "gi"), `First ${colname}`);
    });
    return output;
};

let replaceFATokens = function (template): string {
    return replaceTokens(template);
};

let getMatchingCondition = function (data, conditional_formats) {
    let matching_conditions = conditional_formats.filter(condition => {
        let mystatsObject: IBoomStatsGroup = {
            count: NaN,
            first: "",
            max: NaN,
            mean: NaN,
            min: NaN,
            sum: NaN,
            uniquecount: NaN,
        };
        if (data) {
            let mystats: any = [];
            _.each(data, group => {
                let matching_field = _.filter(group, g => g.colname === condition.field);
                if (matching_field.length > 0) {
                    mystats.push(_.first(matching_field).value);
                }
            });
            mystatsObject = getStatsFromArrayOfObjects(mystats);
        }
        return isMatch(mystatsObject[condition.stat_type], condition.operator, condition.value, condition.value2);
    });
    return matching_conditions && matching_conditions.length > 0 ? _.first(matching_conditions) : null;
};

BoomStatsGroup.prototype.getoutput = function (masterdata): string {
    if (masterdata.length === 0) {
        return "<div style='text-align:center;'>No Data</div>";
    } else {
        let filteredData = getFilteredDataFromMasterData(masterdata, this.filters);
        let outTemplate = filteredData.length + " records found";
        switch (this.templateType) {
            case "titleonly":
                outTemplate = `<div style="width:100%;float:left;border:1px solid black;">
                                    <div style="width:100%;float:left;padding:10px;text-align:center;">#{default}</div>
                                </div>`;
                break;
            case "auto":
                outTemplate = ``;
                _.each(this.stats, stat => {
                    outTemplate += `<div style="width:100%;float:left;border:1px solid black;">
                    <div style="width:50%;float:left;padding:10px;">#{${stat.stat_type},${stat.field},title}</div>
                    <div style="width:50%;float:left;padding:10px;">#{${stat.stat_type},${stat.field}}</div>
                </div>`;
                });
                break;
            case "custom":
                outTemplate = this.customTemplate;
                break;
            case "jumbo":
                outTemplate = `<div style="width:100%;float:left;text-align:center;border:1px solid black;">
                                    <br/>
                                    <h5>\#{title}</h5>
                                    <br/>
                                    <h1>\#{default}</h1>
                                    <br/>
                                </div>`;
                break;
            case "jumbo_without_title":
                outTemplate = `<div style="width:100%;float:left;text-align:center;border:1px solid black;">
                                    <br/>
                                    <h1>\#{default}</h1>
                                    <br/>
                                </div>`;
                break;
            default:
                outTemplate = this.customTemplate;
                break;
        }
        let matching_condition = getMatchingCondition(filteredData, this.conditional_formats);
        let bgColor = matching_condition && matching_condition.bgColor ? matching_condition.bgColor : this.bgColor;
        let textColor = matching_condition && matching_condition.textColor ? matching_condition.textColor : this.textColor;
        let custom_css_class = matching_condition && matching_condition.custom_css_class ? matching_condition.custom_css_class : "not_applicable";
        if (custom_css_class !== "not_applicable") {
            bgColor = "not_applicable";
            textColor= "not_applicable";
        }
        let output_with_statsReplaced = replaceStatsFromTemplate(outTemplate, this.stats, filteredData);
        let output_with_tokensreplaced = replaceFATokens(output_with_statsReplaced);
        return `<div style="width:${this.statWidth || "100"}%;float:left;background:${bgColor};color:${textColor};" class="${custom_css_class}">
                    ${output_with_tokensreplaced}
                </div>`;
    }
};
