import _ from "lodash";

export let isMatch = function(
  original_value,
  operator,
  compare_value1,
  compare_value2
): boolean {
  let returnvalue = false;
  operator = operator
    .toLowerCase()
    .replace(/\ /g, "")
    .trim();
  if (operator.includes("ignorecase")) {
    operator = operator.replace("ignorecase", "").trim();
    original_value = (original_value || "").toLowerCase();
    compare_value1 = (compare_value1 || "").toLowerCase();
    compare_value2 = (compare_value2 || "").toLowerCase();
  }
  if (operator.includes("ignorespace")) {
    operator = operator.replace("ignorespace", "").trim();
    original_value = original_value.replace(/\ /g, "");
    compare_value1 = compare_value1.replace(/\ /g, "");
    compare_value2 = compare_value2.replace(/\ /g, "");
  }
  switch (operator.trim()) {
    case "equals":
    case "is":
      returnvalue =
        +compare_value1 === +original_value ||
        compare_value1 === original_value;
      break;
    case "notequals":
    case "isnotequals":
    case "not":
    case "isnot":
      returnvalue = compare_value1 !== original_value;
      break;
    case "contains":
    case "has":
      returnvalue = original_value.includes(compare_value1);
      break;
    case "notcontains":
    case "nothas":
    case "nothave":
      returnvalue = !original_value.includes(compare_value1);
      break;
    case "startswith":
    case "beginswith":
    case "beginwith":
      returnvalue = original_value.startsWith(compare_value1);
      break;
    case "endswith":
    case "endwith":
      returnvalue = original_value.endsWith(compare_value1);
      break;
    case "in":
      returnvalue =
        compare_value1.split(compare_value2 || " ").indexOf(original_value) >
        -1;
      break;
    case "===":
    case "==":
    case "=":
      returnvalue =
        +original_value === +compare_value1 &&
        !isNaN(original_value) &&
        !isNaN(compare_value1);
      break;
    case "!==":
    case "!=":
    case "<>":
      returnvalue =
        +original_value !== +compare_value1 &&
        !isNaN(original_value) &&
        !isNaN(compare_value1);
      break;
    case "<":
    case "lessthan":
    case "below":
      returnvalue =
        +original_value < +compare_value1 &&
        !isNaN(original_value) &&
        !isNaN(compare_value1);
      break;
    case ">":
    case "greaterthan":
    case "above":
      returnvalue =
        +original_value > +compare_value1 &&
        !isNaN(original_value) &&
        !isNaN(compare_value1);
      break;
    case ">=":
    case "greaterthanorequalto":
      returnvalue =
        +original_value >= +compare_value1 &&
        !isNaN(original_value) &&
        !isNaN(compare_value1);
      break;
    case "<=":
    case "lessthanorequalto":
      returnvalue =
        +original_value <= +compare_value1 &&
        !isNaN(original_value) &&
        !isNaN(compare_value1);
      break;
    case "insiderange":
      returnvalue =
        +original_value > _.min([+compare_value1, +compare_value2]) &&
        +original_value < _.max([+compare_value1, +compare_value2]) &&
        !isNaN(original_value) &&
        !isNaN(compare_value1) &&
        !isNaN(compare_value2);
      break;
    case "outsiderange":
      returnvalue =
        ((+original_value < _.min([+compare_value1, +compare_value2]) &&
          +original_value > _.max([+compare_value1, +compare_value2])) ||
          (+original_value < +compare_value1 &&
            +original_value < +compare_value2) ||
          (+original_value > +compare_value1 &&
            +original_value > +compare_value2)) &&
        !isNaN(original_value) &&
        !isNaN(compare_value1) &&
        !isNaN(compare_value2);
      break;
    default:
      returnvalue = false;
      break;
  }
  return returnvalue;
};
