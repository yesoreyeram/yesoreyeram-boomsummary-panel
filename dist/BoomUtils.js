System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, replaceFontAwesomeTokens, replaceImageTokens, replaceTokens, getStatsFromArrayOfObjects, getStatFromStatsGroup, isMatch;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("replaceFontAwesomeTokens", replaceFontAwesomeTokens = function (value) {
                var FA_TOKEN_PREFIX = "#{fa-";
                var FA_TOKEN_SUFFIX = "}";
                var FA_DELIMITER = ",";
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith(FA_TOKEN_PREFIX) && a.endsWith(FA_TOKEN_SUFFIX)) {
                        var mytoken = a
                            .replace(/\#/g, "")
                            .replace(/\{/g, "")
                            .replace(/\}/g, "");
                        var icon = mytoken.split(FA_DELIMITER)[0];
                        var color = a.indexOf(FA_DELIMITER) > -1
                            ? " style=\"color:" + mytoken.split(FA_DELIMITER)[1] + "\" "
                            : "";
                        var repeatCount = a.split(FA_DELIMITER).length > 2
                            ? +mytoken.split(FA_DELIMITER)[2]
                            : 1;
                        if (a.split(FA_DELIMITER).length > 4) {
                            var operator = mytoken.split(FA_DELIMITER)[3];
                            var _value = +mytoken.split(FA_DELIMITER)[4];
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
                                    repeatCount = Math.round(lodash_1.default.min([repeatCount, _value]));
                                    break;
                                case "max":
                                    repeatCount = Math.round(lodash_1.default.max([repeatCount, _value]));
                                    break;
                                case "mean":
                                    repeatCount = Math.round(lodash_1.default.mean([repeatCount, _value]));
                                    break;
                            }
                        }
                        a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
                return value;
            });
            exports_1("replaceImageTokens", replaceImageTokens = function (value) {
                var IMG_TOKEN_PREFIX = "#{img-";
                var IMG_TOKEN_SUFFIX = "}";
                var IMG_DELIMITER = ",";
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith(IMG_TOKEN_PREFIX) && a.endsWith(IMG_TOKEN_SUFFIX)) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[0];
                        var imgWidth = a.split(IMG_DELIMITER).length > 1
                            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[1]
                            : "20px";
                        var imgHeight = a.split(IMG_DELIMITER).length > 2
                            ? a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[2]
                            : "20px";
                        var repeatCount = a.split(IMG_DELIMITER).length > 3
                            ? +a.replace(IMG_TOKEN_PREFIX, "").split(IMG_DELIMITER)[3]
                            : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
                return value;
            });
            exports_1("replaceTokens", replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + "";
                value = replaceFontAwesomeTokens(value);
                value = replaceImageTokens(value);
                return value;
            });
            exports_1("getStatsFromArrayOfObjects", getStatsFromArrayOfObjects = function (arrayOfObjects) {
                var statsgroup = {};
                statsgroup.count = arrayOfObjects.length;
                statsgroup.uniquecount = lodash_1.default.uniq(arrayOfObjects).length;
                statsgroup.sum = lodash_1.default.sum(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.mean = lodash_1.default.mean(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.min = lodash_1.default.min(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.max = lodash_1.default.max(arrayOfObjects.map(function (s) { return +s; }));
                statsgroup.random = lodash_1.default.first(arrayOfObjects);
                statsgroup.first = lodash_1.default.first(arrayOfObjects);
                return statsgroup;
            });
            exports_1("getStatFromStatsGroup", getStatFromStatsGroup = function (statsGroup, statName) {
                statName = statName
                    .toLowerCase()
                    .trim()
                    .replace("${", "")
                    .replace("}", "");
                return statsGroup[statName] || null;
            });
            exports_1("isMatch", isMatch = function (ov, op, cv1, cv2) {
                var returnvalue = false;
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
                            +ov > lodash_1.default.min([+cv1, +cv2]) &&
                                +ov < lodash_1.default.max([+cv1, +cv2]) &&
                                !isNaN(ov) &&
                                !isNaN(cv1) &&
                                !isNaN(cv2);
                        break;
                    case "outsiderange":
                        returnvalue =
                            ((+ov < lodash_1.default.min([+cv1, +cv2]) && +ov > lodash_1.default.max([+cv1, +cv2])) ||
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
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUVBLHNDQUFXLHdCQUF3QixHQUFHLFVBQVUsS0FBSztnQkFDbkQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDO2dCQUM5QixJQUFJLGVBQWUsR0FBRyxHQUFHLENBQUM7Z0JBQzFCLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxvQkFBaUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBSTs0QkFDckQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLFdBQVcsR0FDYixDQUFD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RyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDO2dDQUMxQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzdCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQ0FDVixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0NBQ1gsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2QsTUFBTTtvQkFDUjt3QkFDRSxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixNQUFNO2lCQUNUO2dCQUNELE9BQU8sV0FBVyxDQUFDO1lBQ3JCLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmV4cG9ydCBsZXQgcmVwbGFjZUZvbnRBd2Vzb21lVG9rZW5zID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgbGV0IEZBX1RPS0VOX1BSRUZJWCA9IFwiI3tmYS1cIjtcclxuICBsZXQgRkFfVE9LRU5fU1VGRklYID0gXCJ9XCI7XHJcbiAgbGV0IEZBX0RFTElNSVRFUiA9IFwiLFwiO1xyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XHJcbiAgdmFsdWUgPSB2YWx1ZVxyXG4gICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgLm1hcChhID0+IHtcclxuICAgICAgaWYgKGEuc3RhcnRzV2l0aChGQV9UT0tFTl9QUkVGSVgpICYmIGEuZW5kc1dpdGgoRkFfVE9LRU5fU1VGRklYKSkge1xyXG4gICAgICAgIGxldCBteXRva2VuID0gYVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcIy9nLCBcIlwiKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcey9nLCBcIlwiKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcfS9nLCBcIlwiKTtcclxuICAgICAgICBsZXQgaWNvbiA9IG15dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVswXTtcclxuICAgICAgICBsZXQgY29sb3IgPVxyXG4gICAgICAgICAgYS5pbmRleE9mKEZBX0RFTElNSVRFUikgPiAtMVxyXG4gICAgICAgICAgICA/IGAgc3R5bGU9XCJjb2xvcjoke215dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVsxXX1cIiBgXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgICAgICBsZXQgcmVwZWF0Q291bnQgPVxyXG4gICAgICAgICAgYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDJcclxuICAgICAgICAgICAgPyArbXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzJdXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBpZiAoYS5zcGxpdChGQV9ERUxJTUlURVIpLmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgIGxldCBvcGVyYXRvciA9IG15dG9rZW4uc3BsaXQoRkFfREVMSU1JVEVSKVszXTtcclxuICAgICAgICAgIGxldCBfdmFsdWUgPSArbXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzRdO1xyXG4gICAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICAgICAgICBjYXNlIFwicGx1c1wiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gcmVwZWF0Q291bnQgKyBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtaW51c1wiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gcmVwZWF0Q291bnQgLSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aXBseVwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChyZXBlYXRDb3VudCAqIF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkaXZpZGVieVwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChyZXBlYXRDb3VudCAvIF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtaW5cIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5taW4oW3JlcGVhdENvdW50LCBfdmFsdWVdKSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5tYXgoW3JlcGVhdENvdW50LCBfdmFsdWVdKSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtZWFuXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKF8ubWVhbihbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCByZXBsYWNlSW1hZ2VUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICBsZXQgSU1HX1RPS0VOX1BSRUZJWCA9IFwiI3tpbWctXCI7XHJcbiAgbGV0IElNR19UT0tFTl9TVUZGSVggPSBcIn1cIjtcclxuICBsZXQgSU1HX0RFTElNSVRFUiA9IFwiLFwiO1xyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XHJcbiAgdmFsdWUgPSB2YWx1ZVxyXG4gICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgLm1hcChhID0+IHtcclxuICAgICAgaWYgKGEuc3RhcnRzV2l0aChJTUdfVE9LRU5fUFJFRklYKSAmJiBhLmVuZHNXaXRoKElNR19UT0tFTl9TVUZGSVgpKSB7XHJcbiAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMF07XHJcbiAgICAgICAgbGV0IGltZ1dpZHRoID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsxXVxyXG4gICAgICAgICAgICA6IFwiMjBweFwiO1xyXG4gICAgICAgIGxldCBpbWdIZWlnaHQgPVxyXG4gICAgICAgICAgYS5zcGxpdChJTUdfREVMSU1JVEVSKS5sZW5ndGggPiAyXHJcbiAgICAgICAgICAgID8gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzJdXHJcbiAgICAgICAgICAgIDogXCIyMHB4XCI7XHJcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gM1xyXG4gICAgICAgICAgICA/ICthLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbM11cclxuICAgICAgICAgICAgOiAxO1xyXG4gICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KFxyXG4gICAgICAgICAgcmVwZWF0Q291bnRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IHJlcGxhY2VUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gIHZhbHVlID0gcmVwbGFjZUZvbnRBd2Vzb21lVG9rZW5zKHZhbHVlKTtcclxuICB2YWx1ZSA9IHJlcGxhY2VJbWFnZVRva2Vucyh2YWx1ZSk7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyA9IGZ1bmN0aW9uIChhcnJheU9mT2JqZWN0cykge1xyXG4gIGxldCBzdGF0c2dyb3VwOiBhbnkgPSB7fTtcclxuICBzdGF0c2dyb3VwLmNvdW50ID0gYXJyYXlPZk9iamVjdHMubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAudW5pcXVlY291bnQgPSBfLnVuaXEoYXJyYXlPZk9iamVjdHMpLmxlbmd0aDtcclxuICBzdGF0c2dyb3VwLnN1bSA9IF8uc3VtKGFycmF5T2ZPYmplY3RzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5tZWFuID0gXy5tZWFuKGFycmF5T2ZPYmplY3RzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5taW4gPSBfLm1pbihhcnJheU9mT2JqZWN0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAubWF4ID0gXy5tYXgoYXJyYXlPZk9iamVjdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLnJhbmRvbSA9IF8uZmlyc3QoYXJyYXlPZk9iamVjdHMpO1xyXG4gIHN0YXRzZ3JvdXAuZmlyc3QgPSBfLmZpcnN0KGFycmF5T2ZPYmplY3RzKTtcclxuICByZXR1cm4gc3RhdHNncm91cDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0U3RhdEZyb21TdGF0c0dyb3VwID0gZnVuY3Rpb24gKHN0YXRzR3JvdXAsIHN0YXROYW1lKSB7XHJcbiAgc3RhdE5hbWUgPSBzdGF0TmFtZVxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC50cmltKClcclxuICAgIC5yZXBsYWNlKFwiJHtcIiwgXCJcIilcclxuICAgIC5yZXBsYWNlKFwifVwiLCBcIlwiKTtcclxuICByZXR1cm4gc3RhdHNHcm91cFtzdGF0TmFtZV0gfHwgbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgaXNNYXRjaCA9IGZ1bmN0aW9uIChvdiwgb3AsIGN2MSwgY3YyKTogYm9vbGVhbiB7XHJcbiAgbGV0IHJldHVybnZhbHVlID0gZmFsc2U7XHJcbiAgb3AgPSBvcFxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC5yZXBsYWNlKC9cXCAvZywgXCJcIilcclxuICAgIC50cmltKCk7XHJcbiAgaWYgKG9wLmluY2x1ZGVzKFwiaWdub3JlY2FzZVwiKSkge1xyXG4gICAgb3AgPSBvcC5yZXBsYWNlKFwiaWdub3JlY2FzZVwiLCBcIlwiKS50cmltKCk7XHJcbiAgICBvdiA9IChvdiB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY3YxID0gKGN2MSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY3YyID0gKGN2MiB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICBpZiAob3AuaW5jbHVkZXMoXCJpZ25vcmVzcGFjZVwiKSkge1xyXG4gICAgb3AgPSBvcC5yZXBsYWNlKFwiaWdub3Jlc3BhY2VcIiwgXCJcIikudHJpbSgpO1xyXG4gICAgb3YgPSBvdi5yZXBsYWNlKC9cXCAvZywgXCJcIik7XHJcbiAgICBjdjEgPSBjdjEucmVwbGFjZSgvXFwgL2csIFwiXCIpO1xyXG4gICAgY3YyID0gY3YyLnJlcGxhY2UoL1xcIC9nLCBcIlwiKTtcclxuICB9XHJcbiAgc3dpdGNoIChvcC50cmltKCkpIHtcclxuICAgIGNhc2UgXCJlcXVhbHNcIjpcclxuICAgIGNhc2UgXCJpc1wiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9ICtjdjEgPT09ICtvdiB8fCBjdjEgPT09IG92O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJub3RlcXVhbHNcIjpcclxuICAgIGNhc2UgXCJpc25vdGVxdWFsc1wiOlxyXG4gICAgY2FzZSBcIm5vdFwiOlxyXG4gICAgY2FzZSBcImlzbm90XCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gY3YxICE9PSBvdjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcclxuICAgIGNhc2UgXCJoYXNcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSBvdi5pbmNsdWRlcyhjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJub3Rjb250YWluc1wiOlxyXG4gICAgY2FzZSBcIm5vdGhhc1wiOlxyXG4gICAgY2FzZSBcIm5vdGhhdmVcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSAhb3YuaW5jbHVkZXMoY3YxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwic3RhcnRzd2l0aFwiOlxyXG4gICAgY2FzZSBcImJlZ2luc3dpdGhcIjpcclxuICAgIGNhc2UgXCJiZWdpbndpdGhcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSBvdi5zdGFydHNXaXRoKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImVuZHN3aXRoXCI6XHJcbiAgICBjYXNlIFwiZW5kd2l0aFwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9IG92LmVuZHNXaXRoKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gY3YxLnNwbGl0KGN2MiB8fCBcIiBcIikuaW5kZXhPZihvdikgPiAtMTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiPT09XCI6XHJcbiAgICBjYXNlIFwiPT1cIjpcclxuICAgIGNhc2UgXCI9XCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gK292ID09PSArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIiE9PVwiOlxyXG4gICAgY2FzZSBcIiE9XCI6XHJcbiAgICBjYXNlIFwiPD5cIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSArb3YgIT09ICtjdjEgJiYgIWlzTmFOKG92KSAmJiAhaXNOYU4oY3YxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiPFwiOlxyXG4gICAgY2FzZSBcImxlc3N0aGFuXCI6XHJcbiAgICBjYXNlIFwiYmVsb3dcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSArb3YgPCArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIj5cIjpcclxuICAgIGNhc2UgXCJncmVhdGVydGhhblwiOlxyXG4gICAgY2FzZSBcImFib3ZlXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gK292ID4gK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCI+PVwiOlxyXG4gICAgY2FzZSBcImdyZWF0ZXJ0aGFub3JlcXVhbHRvXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gK292ID49ICtjdjEgJiYgIWlzTmFOKG92KSAmJiAhaXNOYU4oY3YxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiPD1cIjpcclxuICAgIGNhc2UgXCJsZXNzdGhhbm9yZXF1YWx0b1wiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9ICtvdiA8PSArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluc2lkZXJhbmdlXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID1cclxuICAgICAgICArb3YgPiBfLm1pbihbK2N2MSwgK2N2Ml0pICYmXHJcbiAgICAgICAgK292IDwgXy5tYXgoWytjdjEsICtjdjJdKSAmJlxyXG4gICAgICAgICFpc05hTihvdikgJiZcclxuICAgICAgICAhaXNOYU4oY3YxKSAmJlxyXG4gICAgICAgICFpc05hTihjdjIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJvdXRzaWRlcmFuZ2VcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPVxyXG4gICAgICAgICgoK292IDwgXy5taW4oWytjdjEsICtjdjJdKSAmJiArb3YgPiBfLm1heChbK2N2MSwgK2N2Ml0pKSB8fFxyXG4gICAgICAgICAgKCtvdiA8ICtjdjEgJiYgK292IDwgK2N2MikgfHxcclxuICAgICAgICAgICgrb3YgPiArY3YxICYmICtvdiA+ICtjdjIpKSAmJlxyXG4gICAgICAgICFpc05hTihvdikgJiZcclxuICAgICAgICAhaXNOYU4oY3YxKSAmJlxyXG4gICAgICAgICFpc05hTihjdjIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybnZhbHVlID0gZmFsc2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gcmV0dXJudmFsdWU7XHJcbn07XHJcbiJdfQ==