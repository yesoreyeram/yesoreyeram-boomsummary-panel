import _ from "lodash";

export let replaceFontAwesomeTokens = function (value) {
  let FA_TOKEN_PREFIX = "#{fa-";
  let FA_TOKEN_SUFFIX = "}";
  let FA_DELIMITER = ",";
  if (!value) {
    return value;
  }
  value = value + "";
  value = value
    .split(" ")
    .map(a => {
      if (a.startsWith(FA_TOKEN_PREFIX) && a.endsWith(FA_TOKEN_SUFFIX)) {
        let mytoken = a
          .replace(/\#/g, "")
          .replace(/\{/g, "")
          .replace(/\}/g, "");
        let icon = mytoken.split(FA_DELIMITER)[0];
        let color =
          a.indexOf(FA_DELIMITER) > -1
            ? ` style="color:${mytoken.split(FA_DELIMITER)[1]}" `
            : "";
        let repeatCount =
          a.split(FA_DELIMITER).length > 2
            ? +mytoken.split(FA_DELIMITER)[2]
            : 1;
        if (a.split(FA_DELIMITER).length > 4) {
          let operator = mytoken.split(FA_DELIMITER)[3];
          let _value = +mytoken.split(FA_DELIMITER)[4];
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
      }
      return a;
    })
    .join(" ");
  return value;
};

export let replaceImageTokens = function (value) {
  let IMG_TOKEN_PREFIX = "#{img-";
  let IMG_TOKEN_SUFFIX = "}";
  let IMG_DELIMITER = ",";
  if (!value) {
    return value;
  }
  value = value + "";
  value = value
    .split(" ")
    .map(a => {
      if (a.startsWith(IMG_TOKEN_PREFIX) && a.endsWith(IMG_TOKEN_SUFFIX)) {
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

export let replaceTokens = function (value) {
  if (!value) {
    return value;
  }
  value = value + "";
  value = replaceFontAwesomeTokens(value);
  value = replaceImageTokens(value);
  return value;
};

export let getStatsFromArrayOfObjects = function (arrayOfObjects) {
  let statsgroup: any = {};
  statsgroup.count = arrayOfObjects.length;
  statsgroup.uniquecount = _.uniq(arrayOfObjects).length;
  statsgroup.sum = _.sum(arrayOfObjects.map(s => +s));
  statsgroup.mean = _.mean(arrayOfObjects.map(s => +s));
  statsgroup.min = _.min(arrayOfObjects.map(s => +s));
  statsgroup.max = _.max(arrayOfObjects.map(s => +s));
  statsgroup.random = _.first(arrayOfObjects);
  statsgroup.first = _.first(arrayOfObjects);
  return statsgroup;
};

export let getStatFromStatsGroup = function (statsGroup, statName) {
  statName = statName
    .toLowerCase()
    .trim()
    .replace("${", "")
    .replace("}", "");
  return statsGroup[statName] || null;
};

export let isMatch = function (ov, op, cv1, cv2): boolean {
  let returnvalue = false;
  op = op
    .toLowerCase()
    .replace(/\ /g, "")
    .trim();
  if (op.includes("ignorecase")) {
    op = op.replace("ignorecase", "").trim();
    ov = (ov || "").toLowerCase();
    cv1 = (cv1 || "").toLowerCase();
    cv2 = (cv2 || "").toLowerCase();
  }
  if (op.includes("ignorespace")) {
    op = op.replace("ignorespace", "").trim();
    ov = ov.replace(/\ /g, "");
    cv1 = cv1.replace(/\ /g, "");
    cv2 = cv2.replace(/\ /g, "");
  }
  switch (op.trim()) {
    case "equals":
    case "is":
      returnvalue = +cv1 === +ov || cv1 === ov;
      break;
    case "notequals":
    case "isnotequals":
    case "not":
    case "isnot":
      returnvalue = cv1 !== ov;
      break;
    case "contains":
    case "has":
      returnvalue = ov.includes(cv1);
      break;
    case "notcontains":
    case "nothas":
    case "nothave":
      returnvalue = !ov.includes(cv1);
      break;
    case "startswith":
    case "beginswith":
    case "beginwith":
      returnvalue = ov.startsWith(cv1);
      break;
    case "endswith":
    case "endwith":
      returnvalue = ov.endsWith(cv1);
      break;
    case "in":
      returnvalue = cv1.split(cv2 || " ").indexOf(ov) > -1;
      break;
    case "===":
    case "==":
    case "=":
      returnvalue = +ov === +cv1 && !isNaN(ov) && !isNaN(cv1);
      break;
    case "!==":
    case "!=":
    case "<>":
      returnvalue = +ov !== +cv1 && !isNaN(ov) && !isNaN(cv1);
      break;
    case "<":
    case "lessthan":
    case "below":
      returnvalue = +ov < +cv1 && !isNaN(ov) && !isNaN(cv1);
      break;
    case ">":
    case "greaterthan":
    case "above":
      returnvalue = +ov > +cv1 && !isNaN(ov) && !isNaN(cv1);
      break;
    case ">=":
    case "greaterthanorequalto":
      returnvalue = +ov >= +cv1 && !isNaN(ov) && !isNaN(cv1);
      break;
    case "<=":
    case "lessthanorequalto":
      returnvalue = +ov <= +cv1 && !isNaN(ov) && !isNaN(cv1);
      break;
    case "insiderange":
      returnvalue =
        +ov > _.min([+cv1, +cv2]) &&
        +ov < _.max([+cv1, +cv2]) &&
        !isNaN(ov) &&
        !isNaN(cv1) &&
        !isNaN(cv2);
      break;
    case "outsiderange":
      returnvalue =
        ((+ov < _.min([+cv1, +cv2]) && +ov > _.max([+cv1, +cv2])) ||
          (+ov < +cv1 && +ov < +cv2) ||
          (+ov > +cv1 && +ov > +cv2)) &&
        !isNaN(ov) &&
        !isNaN(cv1) &&
        !isNaN(cv2);
      break;
    default:
      returnvalue = false;
      break;
  }
  return returnvalue;
};
