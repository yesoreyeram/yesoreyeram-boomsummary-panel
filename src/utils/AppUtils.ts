import _ from "lodash";
import { getFormattedOutput } from "./GrafanaUtils";
import { isMatch } from "./MatchUtils";

export let replaceTokens = function(value) {
  let FA_TOKEN_PREFIX = "${fa-";
  let FA_TOKEN_SUFFIX = "}";
  let FA_DELIMITER = ",";
  let IMG_TOKEN_PREFIX = "${img-";
  let IMG_TOKEN_SUFFIX = "}";
  let IMG_DELIMITER = ",";
  if (!value) {
    return value;
  }
  value = value + "";
  value = value
    .split(" ")
    .map(a => {
      if (a.startsWith(FA_TOKEN_PREFIX) && a.endsWith(FA_TOKEN_SUFFIX)) {
        let mytoken = a
          .replace(/\$/g, "")
          .replace(/\{/g, "")
          .replace(/\}/g, "");
        let icon = mytoken.split(FA_DELIMITER)[0];
        let color =
          a.indexOf(FA_DELIMITER) > -1
            ? ` style="color:${mytoken.split(IMG_DELIMITER)[1]}" `
            : "";
        let repeatCount =
          a.split(FA_DELIMITER).length > 2
            ? +mytoken.split(IMG_DELIMITER)[2]
            : 1;
        if (a.split(FA_DELIMITER).length > 4) {
          let operator = mytoken.split(IMG_DELIMITER)[3];
          let _value = +mytoken.split(IMG_DELIMITER)[4];
          switch (operator) {
            case "plus":
              repeatCount = repeatCount + _value;
              break;
            case "minus":
              repeatCount = repeatCount - _value;
              break;
            case "multiply":
              repeatCount = Math.round(repeatCount * _value);
              break;
            case "divideby":
              repeatCount = Math.round(repeatCount / _value);
              break;
            case "min":
              repeatCount = Math.round(_.min([repeatCount, _value]));
              break;
            case "max":
              repeatCount = Math.round(_.max([repeatCount, _value]));
              break;
            case "mean":
              repeatCount = Math.round(_.mean([repeatCount, _value]));
              break;
          }
        }
        a = `<i class="fa ${icon}" ${color}></i> `.repeat(repeatCount);
      } else if (
        a.startsWith(IMG_TOKEN_PREFIX) &&
        a.endsWith(IMG_TOKEN_SUFFIX)
      ) {
        a = a.slice(0, -1);
        let imgUrl = a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[0];
        let imgWidth =
          a.split(IMG_DELIMITER).length > 1
            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[1]
            : "20px";
        let imgHeight =
          a.split(IMG_DELIMITER).length > 2
            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[2]
            : "20px";
        let repeatCount =
          a.split(IMG_DELIMITER).length > 3
            ? +a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[3]
            : 1;
        a = `<img width="${imgWidth}" height="${imgHeight}" src="${imgUrl}"/>`.repeat(
          repeatCount
        );
      }
      return a;
    })
    .join(" ");
  return value;
};

export let getStatFromStatsGroup = function(
  statsGroup,
  stat,
  format,
  decimals
) {
  switch (stat.toLowerCase()) {
    case "first":
    case "default":
    case "value":
      return isNaN(statsGroup.first)
        ? statsGroup.first
        : getFormattedOutput(statsGroup.first, format, decimals);
    case "count":
    case "length":
      return isNaN(statsGroup.count)
        ? statsGroup.count
        : getFormattedOutput(statsGroup.count, "none", "0");
    case "uniquecount":
    case "uniquelength":
      return isNaN(statsGroup.uniquecount)
        ? statsGroup.uniquecount
        : getFormattedOutput(statsGroup.uniquecount, "none", "0");
    case "sum":
    case "total":
      return isNaN(statsGroup.sum)
        ? statsGroup.sum
        : getFormattedOutput(statsGroup.sum, format, decimals);
    case "mean":
    case "avg":
    case "average":
      return isNaN(statsGroup.mean)
        ? statsGroup.mean
        : getFormattedOutput(statsGroup.mean, format, decimals);
    case "min":
      return isNaN(statsGroup.min)
        ? statsGroup.min
        : getFormattedOutput(statsGroup.min, format, decimals);
    case "max":
      return isNaN(statsGroup.max)
        ? statsGroup.max
        : getFormattedOutput(statsGroup.max, format, decimals);
  }
  return "Not a valid stat";
};

export let buildMasterData = function(data) {
  let masterdata: any = [];
  _.each(data, d => {
    if (d.type === "table") {
      let refId = d.refId;
      _.each(d.rows, (row, i) => {
        let group: any = [];
        _.each(row, (col, j) => {
          let mydata = {
            colname: d.columns[j].text,
            refId,
            rowid: i,
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

export let buildOutput = function(statWidth, output, bgColor, textColor) {
  return `<div style="width:${statWidth ||
    "100"}%;float:left;background:${bgColor};color:${textColor};">
    ${output}
  </div>`;
};

export let didSatisfyFilters = function(group, filters) {
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

export let getStatsGroup = function(mystats) {
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

export let getValues = function(masterdata, stat) {
  let mystats: any = [];
  _.each(masterdata, group => {
    let matching_field = _.filter(group, g => g.colname === stat.field);
    if (matching_field.length > 0 && didSatisfyFilters(group, stat.filters)) {
      mystats.push(_.first(matching_field).value);
    }
  });
  return mystats;
};

export let getMatchingCondition = function(statsGroup, stat) {
  let matching_condition = _.first(
    stat.conditional_formats.filter(condition => {
      let original_value = getStatFromStatsGroup(
        statsGroup,
        (condition.field || "${value}").replace("${", "").replace("}", ""),
        stat.format,
        stat.decimals
      );
      let operator = condition.operator;
      let compare_value1 = condition.value;
      let compare_value2 = condition.value2;
      return isMatch(original_value, operator, compare_value1, compare_value2);
    })
  );
  return matching_condition;
};

export let getOutputValue = function(masterdata, stat) {
  if (masterdata.length === 0) {
    return {
      bgColor: "",
      output: "No data",
      textColor: "red"
    };
  } else {
    let mystats: any = getValues(masterdata, stat);
    let statsGroup = getStatsGroup(mystats);
    let matching_condition = getMatchingCondition(statsGroup, stat);
    let bgColor = stat.bgColor;
    let textColor = stat.textColor;
    let template = stat.display_template;
    if (matching_condition) {
      bgColor = matching_condition.bgColor || stat.bgColor;
      textColor = matching_condition.textColor || stat.textColor;
      template = matching_condition.display_template || stat.display_template;
    }
    let outstat = getStatFromStatsGroup(
      statsGroup,
      stat.display_template,
      stat.format,
      stat.decimals
    );
    if (outstat !== "Not a valid stat") {
      return {
        bgColor: bgColor,
        output: outstat + "",
        textColor: textColor
      };
    }
    let output = template;
    output = output.replace(
      /\$\{[^}]?default\}/gi,
      stat.defaultStat || "${first}"
    );
    output = output.replace(
      /\$\{[^}]?value\}/gi,
      isNaN(statsGroup.first)
        ? statsGroup.first
        : getFormattedOutput(statsGroup.first, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?first\}/gi,
      isNaN(statsGroup.first)
        ? statsGroup.first
        : getFormattedOutput(statsGroup.first, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?count\}/gi,
      isNaN(statsGroup.count)
        ? statsGroup.count
        : getFormattedOutput(statsGroup.count || 0, "none", "0")
    );
    output = output.replace(
      /\$\{[^}]?length\}/gi,
      isNaN(statsGroup.count)
        ? statsGroup.count
        : getFormattedOutput(statsGroup.count || 0, "none", "0")
    );
    output = output.replace(
      /\$\{[^}]?uniquecount\}/gi,
      isNaN(statsGroup.uniquecount)
        ? statsGroup.uniquecount
        : getFormattedOutput(statsGroup.uniquecount || 0, "none", "0")
    );
    output = output.replace(
      /\$\{[^}]?uniquelength\}/gi,
      isNaN(statsGroup.uniquecount)
        ? statsGroup.uniquecount
        : getFormattedOutput(statsGroup.uniquecount || 0, "none", "0")
    );
    output = output.replace(
      /\$\{[^}]?sum\}/gi,
      isNaN(statsGroup.sum)
        ? statsGroup.sum
        : getFormattedOutput(statsGroup.sum, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?total\}/gi,
      isNaN(statsGroup.sum)
        ? statsGroup.sum
        : getFormattedOutput(statsGroup.sum, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?mean\}/gi,
      isNaN(statsGroup.mean)
        ? statsGroup.mean
        : getFormattedOutput(statsGroup.mean, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?average\}/gi,
      isNaN(statsGroup.mean)
        ? statsGroup.mean
        : getFormattedOutput(statsGroup.mean, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?avg\}/gi,
      isNaN(statsGroup.mean)
        ? statsGroup.mean
        : getFormattedOutput(statsGroup.mean, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?min\}/gi,
      isNaN(statsGroup.min)
        ? statsGroup.min
        : getFormattedOutput(statsGroup.min, stat.format, stat.decimals)
    );
    output = output.replace(
      /\$\{[^}]?max\}/gi,
      isNaN(statsGroup.max)
        ? statsGroup.max
        : getFormattedOutput(statsGroup.max, stat.format, stat.decimals)
    );
    output = output.replace(/\$\{[^}]?title\}/gi, stat.title);
    output = output.replace(/\$\{[^}]?field\}/gi, stat.field);
    output = output.replace(/\$\{[^}]?bgColor\}/gi, stat.bgColor);
    output = output.replace(/\$\{[^}]?textColor\}/gi, stat.textColor);
    return {
      bgColor,
      output,
      textColor
    };
  }
};
