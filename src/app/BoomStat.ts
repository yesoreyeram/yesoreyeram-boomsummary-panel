import _ from "lodash";
import { BoomSummaryFilter } from "./Filters/BoomFilter";
import { BoomSummaryConditionalFormats } from "./Filters/BoomConditionalFormat";
import {
  getStatFromStatsGroup,
  replaceTokens,
  getStatsFromArrayOfObjects,
  isMatch
} from "../utils/BoomUtils";
import { getFilteredDataFromMasterData } from "./../utils/AppUtils";
import { getFormattedOutput } from "./../utils/GrafanaUtils";
import { IBoomSummaryStat } from "../definitions/types";
import { config } from "../config";

export class BoomSummaryStat implements IBoomSummaryStat {
  public field: string;
  public title: string;
  public defaultStat: string;
  public display_template: string;
  public statWidth: string;
  public bgColor: string;
  public textColor: string;
  public format: string;
  public decimals: string;
  public filters: BoomSummaryFilter[];
  public conditional_formats: BoomSummaryConditionalFormats[];
  public addFilter;
  public removeFilter;
  public addConditonalFormat;
  public removeConditionalFormat;
  public moveConditionalFormat;
  public setUnitFormat;
  public getStats;
  public getValues;
  public getTemplateWithTokensReplaced;
  public getOutputValue;
  public getMatchingCondition;
  constructor(options) {
    this.field = options.field || "Sample";
    this.title = options.title || this.field;
    this.defaultStat = options.defaultStat || "${first}";
    this.display_template =
      options.display_template || config.templates.default_normal;
    this.statWidth = options.statWidth || "100";
    this.bgColor = options.bgColor || "";
    this.textColor = options.textColor || "";
    this.format = options.format || "none";
    this.decimals = options.decimals || "0";
    this.filters = options.filters || [];
    this.conditional_formats = options.conditional_formats || [];
  }
}

BoomSummaryStat.prototype.addFilter = function(): void {
  let newfilter = new BoomSummaryFilter({
    field: this.field || "Sample",
    operator: "equals"
  });
  this.filters = this.filters || [];
  this.filters.push(newfilter);
};

BoomSummaryStat.prototype.removeFilter = function(index: Number): void {
  if (this.filters.length > 0) {
    this.filters.splice(Number(index), 1);
  }
};

BoomSummaryStat.prototype.addConditonalFormat = function(): void {
  let new_conditional_formatter = new BoomSummaryConditionalFormats({
    field: this.defaultStat || "${first}",
    operator: "equals"
  });
  this.conditional_formats = this.conditional_formats || [];
  this.conditional_formats.push(new_conditional_formatter);
};

BoomSummaryStat.prototype.removeConditionalFormat = function(
  index: Number
): void {
  if (this.conditional_formats.length > 0) {
    this.conditional_formats.splice(Number(index), 1);
  }
};

BoomSummaryStat.prototype.moveConditionalFormat = function(
  direction: string,
  index: Number
): void {
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

BoomSummaryStat.prototype.setUnitFormat = function(format: any): void {
  this.format = format && format.value ? format.value : "none";
};

BoomSummaryStat.prototype.getValues = function(masterdata): any {
  let filteredMasterData = getFilteredDataFromMasterData(
    masterdata,
    this.filters
  );
  let mystats: any = [];
  _.each(filteredMasterData, group => {
    let matching_field = _.filter(group, g => g.colname === this.field);
    if (matching_field.length > 0) {
      mystats.push(_.first(matching_field).value);
    }
  });
  return getStatsFromArrayOfObjects(mystats);
};

BoomSummaryStat.prototype.getTemplateWithTokensReplaced = function(
  template,
  statsGroup
) {
  let output = template;
  output = output.replace(
    new RegExp(/\$\{[^}]?default\}/, "gi"),
    this.defaultStat || "${first}"
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?default_raw\}/, "gi"),
    (this.defaultStat || "${first}").replace("}", "_raw}")
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?first\}/, "gi"),
    isNaN(statsGroup.first)
      ? statsGroup.first
      : getFormattedOutput(statsGroup.first, this.format, this.decimals)
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?first_raw\}/, "gi"),
    statsGroup.first
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?min\}/, "gi"),
    isNaN(statsGroup.min)
      ? statsGroup.min
      : getFormattedOutput(statsGroup.min, this.format, this.decimals)
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?min_raw\}/, "gi"),
    statsGroup.min
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?max\}/, "gi"),
    isNaN(statsGroup.max)
      ? statsGroup.max
      : getFormattedOutput(statsGroup.max, this.format, this.decimals)
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?max_raw\}/, "gi"),
    statsGroup.max
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?mean\}/, "gi"),
    isNaN(statsGroup.mean)
      ? statsGroup.mean
      : getFormattedOutput(statsGroup.mean, this.format, this.decimals)
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?mean_raw\}/, "gi"),
    statsGroup.mean
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?sum\}/, "gi"),
    isNaN(statsGroup.sum)
      ? statsGroup.sum
      : getFormattedOutput(statsGroup.sum, this.format, this.decimals)
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?sum_raw\}/, "gi"),
    statsGroup.sum
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?count\}/, "gi"),
    isNaN(statsGroup.count)
      ? statsGroup.count
      : getFormattedOutput(statsGroup.count || 0, "none", "0")
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?count_raw\}/, "gi"),
    statsGroup.count
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?uniquecount\}/, "gi"),
    isNaN(statsGroup.uniquecount)
      ? statsGroup.uniquecount
      : getFormattedOutput(statsGroup.uniquecount || 0, "none", "0")
  );
  output = output.replace(
    new RegExp(/\$\{[^}]?uniquecount_raw\}/, "gi"),
    statsGroup.uniquecount
  );
  output = output.replace(new RegExp(/\$\{[^}]?title\}/, "gi"), this.title);
  output = output.replace(new RegExp(/\$\{[^}]?field\}/, "gi"), this.field);
  output = output.replace(new RegExp(/\$\{[^}]?bgColor\}/, "gi"), this.bgColor);
  output = output.replace(
    new RegExp(/\$\{[^}]?textColor\}/, "gi"),
    this.textColor
  );
  return output;
};

BoomSummaryStat.prototype.getMatchingCondition = function(statsGroup) {
  let matching_condition = _.first(
    this.conditional_formats.filter(condition => {
      let original_statName = (condition.field || "${value}")
        .replace("${", "")
        .replace("}", "");
      let original_value = getStatFromStatsGroup(statsGroup, original_statName);
      return isMatch(
        original_value,
        condition.operator,
        condition.value,
        condition.value2
      );
    })
  );
  return matching_condition;
};

BoomSummaryStat.prototype.getOutputValue = function(masterdata) {
  if (masterdata.length === 0) {
    return "<div style='text-align:center;'>No Data</div>";
  } else {
    let statsGroup = this.getValues(masterdata);
    let matching_condition = this.getMatchingCondition(statsGroup);
    let bgColor =
      matching_condition && matching_condition.bgColor
        ? matching_condition.bgColor
        : this.bgColor;
    let textColor =
      matching_condition && matching_condition.textColor
        ? matching_condition.textColor
        : this.textColor;
    let template =
      matching_condition && matching_condition.display_template
        ? matching_condition.display_template
        : this.display_template;
    let template_replaced = replaceTokens(
      this.getTemplateWithTokensReplaced(template, statsGroup)
    );
    return `<div style="width:${this.statWidth ||
      "100"}%;float:left;background:${bgColor};color:${textColor};">
      ${template_replaced}
    </div>`;
  }
};
