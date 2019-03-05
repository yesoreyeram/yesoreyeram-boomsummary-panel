import _ from "lodash";

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
