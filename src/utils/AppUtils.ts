import _ from "lodash";
import { isMatch } from "./MatchUtils";
import { BoomSummaryStat } from "../app/BoomStat";

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

export let getStatFromStatsGroup = function(statsGroup, statName) {
  statName = statName
    .toLowerCase()
    .trim()
    .replace("${", "")
    .replace("}", "");
  return statsGroup[statName] || null;
};

export let buildOutput = function(statWidth, output, bgColor, textColor) {
  return `<div style="width:${statWidth ||
    "100"}%;float:left;background:${bgColor};color:${textColor};">
    ${output}
  </div>`;
};

export let getMatchingCondition = function(statsGroup, stat) {
  let matching_condition = _.first(
    stat.conditional_formats.filter(condition => {
      let original_statName = (condition.field || "${value}")
        .replace("${", "")
        .replace("}", "");
      let original_value = getStatFromStatsGroup(statsGroup, original_statName);
      return isMatch(
        original_value,
        condition.operator,
        condition.value,
        condition.valu2
      );
    })
  );
  return matching_condition;
};

export let getOutputValue = function(masterdata, stat: BoomSummaryStat) {
  if (masterdata.length === 0) {
    return "<div style='text-align:center;'>No Data</div>";
  } else {
    let mystats: any = stat.getValues(masterdata);
    let statsGroup = stat.getStats(mystats);
    let matching_condition = getMatchingCondition(statsGroup, stat);
    let bgColor =
      matching_condition && matching_condition.bgColor
        ? matching_condition.bgColor
        : stat.bgColor;
    let textColor =
      matching_condition && matching_condition.textColor
        ? matching_condition.textColor
        : stat.textColor;
    let template =
      matching_condition && matching_condition.display_template
        ? matching_condition.display_template
        : stat.display_template;
    let template_replaced1 = replaceTokens(
      stat.getTemplateWithTokensReplaced(template, statsGroup)
    );
    return buildOutput(stat.statWidth, template_replaced1, bgColor, textColor);
  }
};
