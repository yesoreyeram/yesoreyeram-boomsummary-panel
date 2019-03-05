import _ from "lodash";
import { BoomSummaryFilter } from "./Filters/BoomFilter";
import { BoomSummaryConditionalFormats } from "./Filters/BoomConditionalFormat";
import { isMatch } from "../utils/MatchUtils";
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
  constructor(options) {
    this.field = options.field || "Sample";
    this.title = options.title || this.field;
    this.defaultStat = options.defaultStat || "${first}";
    this.display_template =
      options.display_template ||
      config.templates.default_normal;
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
    field : this.field || "Sample",
    operator : "equals"
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
    operator : "equals"
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

let didSatisfyFilters = function(group, filters) {
  if (filters && filters.length > 0) {
    let matches = 0;
    _.each(filters, filter => {
      let matching_field = _.filter(group, g => g.colname === filter.field);
      if (matching_field && matching_field.length > 0) {
        matches +=
          isMatch(
            matching_field[0].value,
            filter.operator,
            filter.value,
            filter.value2
          ) === true
            ? 1
            : 0;
      }
    });
    return matches === filters.length;
  } else {
    return true;
  }
};

BoomSummaryStat.prototype.getValues = function(masterdata): any {
  let mystats: any = [];
  _.each(masterdata, group => {
    let matching_field = _.filter(group, g => g.colname === this.field);
    if (matching_field.length > 0 && didSatisfyFilters(group, this.filters)) {
      mystats.push(_.first(matching_field).value);
    }
  });
  return mystats;
};

BoomSummaryStat.prototype.getStats = function(mystats): any {
  let statsgroup: any = {};
  statsgroup.count = mystats.length;
  statsgroup.uniquecount = _.uniq(mystats).length;
  statsgroup.sum = _.sum(mystats.map(s => +s));
  statsgroup.mean = _.mean(mystats.map(s => +s));
  statsgroup.min = _.min(mystats.map(s => +s));
  statsgroup.max = _.max(mystats.map(s => +s));
  statsgroup.first = _.first(mystats);
  return statsgroup;
};
