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
                var FA_TOKEN_PREFIX = "${fa-";
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
                            .replace(/\$/g, "")
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
                var IMG_TOKEN_PREFIX = "${img-";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUVBLHNDQUFXLHdCQUF3QixHQUFHLFVBQVMsS0FBSztnQkFDbEQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDO2dCQUM5QixJQUFJLGVBQWUsR0FBRyxHQUFHLENBQUM7Z0JBQzFCLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUs7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNKLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLE9BQU8sR0FBRyxDQUFDOzZCQUNaLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzZCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs2QkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxLQUFLLEdBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxvQkFBaUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBSTs0QkFDckQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLFdBQVcsR0FDYixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUM5QixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM3QyxRQUFRLFFBQVEsRUFBRTtnQ0FDaEIsS0FBSyxNQUFNO29DQUNULFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO29DQUNuQyxNQUFNO2dDQUNSLEtBQUssT0FBTztvQ0FDVixXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQztvQ0FDbkMsTUFBTTtnQ0FDUixLQUFLLFVBQVU7b0NBQ2IsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29DQUMvQyxNQUFNO2dDQUNSLEtBQUssVUFBVTtvQ0FDYixXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7b0NBQy9DLE1BQU07Z0NBQ1IsS0FBSyxLQUFLO29DQUNSLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDdkQsTUFBTTtnQ0FDUixLQUFLLEtBQUs7b0NBQ1IsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN2RCxNQUFNO2dDQUNSLEtBQUssTUFBTTtvQ0FDVCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3hELE1BQU07NkJBQ1Q7eUJBQ0Y7d0JBQ0QsQ0FBQyxHQUFHLENBQUEsbUJBQWdCLElBQUksV0FBSyxLQUFLLFdBQVEsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDaEU7b0JBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDYixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsRUFBQztZQUVGLGdDQUFXLGtCQUFrQixHQUFHLFVBQVMsS0FBSztnQkFDNUMsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7Z0JBQ2hDLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO2dCQUMzQixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7Z0JBQ0QsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssR0FBRyxLQUFLO3FCQUNWLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ1YsR0FBRyxDQUFDLFVBQUEsQ0FBQztvQkFDSixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7d0JBQ2xFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckUsSUFBSSxRQUFRLEdBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs0QkFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekQsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDYixJQUFJLFNBQVMsR0FDWCxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUMvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6RCxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUNiLElBQUksV0FBVyxHQUNiLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7NEJBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDUixDQUFDLEdBQUcsQ0FBQSxrQkFBZSxRQUFRLG9CQUFhLFNBQVMsaUJBQVUsTUFBTSxTQUFLLENBQUEsQ0FBQyxNQUFNLENBQzNFLFdBQVcsQ0FDWixDQUFDO3FCQUNIO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLEVBQUM7WUFFRiwyQkFBVyxhQUFhLEdBQUcsVUFBUyxLQUFLO2dCQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixLQUFLLEdBQUcsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLEVBQUM7WUFFRix3Q0FBVywwQkFBMEIsR0FBRyxVQUFTLGNBQWM7Z0JBQzdELElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztnQkFDekIsVUFBVSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO2dCQUN6QyxVQUFVLENBQUMsV0FBVyxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDdkQsVUFBVSxDQUFDLEdBQUcsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUYsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLElBQUksR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUYsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsVUFBVSxDQUFDLEdBQUcsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUYsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLEdBQUcsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUYsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLEtBQUssR0FBRyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxVQUFVLENBQUM7WUFDcEIsQ0FBQyxFQUFDO1lBRUYsbUNBQVcscUJBQXFCLEdBQUcsVUFBUyxVQUFVLEVBQUUsUUFBUTtnQkFDOUQsUUFBUSxHQUFHLFFBQVE7cUJBQ2hCLFdBQVcsRUFBRTtxQkFDYixJQUFJLEVBQUU7cUJBQ04sT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7cUJBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUN0QyxDQUFDLEVBQUM7WUFFRixxQkFBVyxPQUFPLEdBQUcsVUFBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUM1QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLEVBQUUsR0FBRyxFQUFFO3FCQUNKLFdBQVcsRUFBRTtxQkFDYixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztxQkFDbEIsSUFBSSxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUM3QixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3pDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDOUIsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNoQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ2pDO2dCQUNELElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMxQyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDN0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM5QjtnQkFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDakIsS0FBSyxRQUFRLENBQUM7b0JBQ2QsS0FBSyxJQUFJO3dCQUNQLFdBQVcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDO3dCQUN6QyxNQUFNO29CQUNSLEtBQUssV0FBVyxDQUFDO29CQUNqQixLQUFLLGFBQWEsQ0FBQztvQkFDbkIsS0FBSyxLQUFLLENBQUM7b0JBQ1gsS0FBSyxPQUFPO3dCQUNWLFdBQVcsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDO3dCQUN6QixNQUFNO29CQUNSLEtBQUssVUFBVSxDQUFDO29CQUNoQixLQUFLLEtBQUs7d0JBQ1IsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQy9CLE1BQU07b0JBQ1IsS0FBSyxhQUFhLENBQUM7b0JBQ25CLEtBQUssUUFBUSxDQUFDO29CQUNkLEtBQUssU0FBUzt3QkFDWixXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO29CQUNSLEtBQUssWUFBWSxDQUFDO29CQUNsQixLQUFLLFlBQVksQ0FBQztvQkFDbEIsS0FBSyxXQUFXO3dCQUNkLFdBQVcsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQyxNQUFNO29CQUNSLEtBQUssVUFBVSxDQUFDO29CQUNoQixLQUFLLFNBQVM7d0JBQ1osV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQy9CLE1BQU07b0JBQ1IsS0FBSyxJQUFJO3dCQUNQLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3JELE1BQU07b0JBQ1IsS0FBSyxLQUFLLENBQUM7b0JBQ1gsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxHQUFHO3dCQUNOLFdBQVcsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDeEQsTUFBTTtvQkFDUixLQUFLLEtBQUssQ0FBQztvQkFDWCxLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUk7d0JBQ1AsV0FBVyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN4RCxNQUFNO29CQUNSLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssVUFBVSxDQUFDO29CQUNoQixLQUFLLE9BQU87d0JBQ1YsV0FBVyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO29CQUNSLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssYUFBYSxDQUFDO29CQUNuQixLQUFLLE9BQU87d0JBQ1YsV0FBVyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO29CQUNSLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssc0JBQXNCO3dCQUN6QixXQUFXLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3ZELE1BQU07b0JBQ1IsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxtQkFBbUI7d0JBQ3RCLFdBQVcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkQsTUFBTTtvQkFDUixLQUFLLGFBQWE7d0JBQ2hCLFdBQVc7NEJBQ1QsQ0FBQyxFQUFFLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUN6QixDQUFDLEVBQUUsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3pCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQ0FDVixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0NBQ1gsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2QsTUFBTTtvQkFDUixLQUFLLGNBQWM7d0JBQ2pCLFdBQVc7NEJBQ1QsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLGdCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLGdCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUN2RCxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDO2dDQUMxQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzdCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQ0FDVixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0NBQ1gsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2QsTUFBTTtvQkFDUjt3QkFDRSxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixNQUFNO2lCQUNUO2dCQUNELE9BQU8sV0FBVyxDQUFDO1lBQ3JCLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmV4cG9ydCBsZXQgcmVwbGFjZUZvbnRBd2Vzb21lVG9rZW5zID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICBsZXQgRkFfVE9LRU5fUFJFRklYID0gXCIke2ZhLVwiO1xyXG4gIGxldCBGQV9UT0tFTl9TVUZGSVggPSBcIn1cIjtcclxuICBsZXQgRkFfREVMSU1JVEVSID0gXCIsXCI7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICB2YWx1ZSA9IHZhbHVlXHJcbiAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAubWFwKGEgPT4ge1xyXG4gICAgICBpZiAoYS5zdGFydHNXaXRoKEZBX1RPS0VOX1BSRUZJWCkgJiYgYS5lbmRzV2l0aChGQV9UT0tFTl9TVUZGSVgpKSB7XHJcbiAgICAgICAgbGV0IG15dG9rZW4gPSBhXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFwkL2csIFwiXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFx7L2csIFwiXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFx9L2csIFwiXCIpO1xyXG4gICAgICAgIGxldCBpY29uID0gbXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzBdO1xyXG4gICAgICAgIGxldCBjb2xvciA9XHJcbiAgICAgICAgICBhLmluZGV4T2YoRkFfREVMSU1JVEVSKSA+IC0xXHJcbiAgICAgICAgICAgID8gYCBzdHlsZT1cImNvbG9yOiR7bXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzFdfVwiIGBcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XHJcbiAgICAgICAgICBhLnNwbGl0KEZBX0RFTElNSVRFUikubGVuZ3RoID4gMlxyXG4gICAgICAgICAgICA/ICtteXRva2VuLnNwbGl0KEZBX0RFTElNSVRFUilbMl1cclxuICAgICAgICAgICAgOiAxO1xyXG4gICAgICAgIGlmIChhLnNwbGl0KEZBX0RFTElNSVRFUikubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgbGV0IG9wZXJhdG9yID0gbXl0b2tlbi5zcGxpdChGQV9ERUxJTUlURVIpWzNdO1xyXG4gICAgICAgICAgbGV0IF92YWx1ZSA9ICtteXRva2VuLnNwbGl0KEZBX0RFTElNSVRFUilbNF07XHJcbiAgICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbHVzXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCArIF92YWx1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pbnVzXCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudCAtIF92YWx1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm11bHRpcGx5XCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50ICogX3ZhbHVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRpdmlkZWJ5XCI6XHJcbiAgICAgICAgICAgICAgcmVwZWF0Q291bnQgPSBNYXRoLnJvdW5kKHJlcGVhdENvdW50IC8gX3ZhbHVlKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pblwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1pbihbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1heFwiOlxyXG4gICAgICAgICAgICAgIHJlcGVhdENvdW50ID0gTWF0aC5yb3VuZChfLm1heChbcmVwZWF0Q291bnQsIF92YWx1ZV0pKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1lYW5cIjpcclxuICAgICAgICAgICAgICByZXBlYXRDb3VudCA9IE1hdGgucm91bmQoXy5tZWFuKFtyZXBlYXRDb3VudCwgX3ZhbHVlXSkpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfSlcclxuICAgIC5qb2luKFwiIFwiKTtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IHJlcGxhY2VJbWFnZVRva2VucyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgbGV0IElNR19UT0tFTl9QUkVGSVggPSBcIiR7aW1nLVwiO1xyXG4gIGxldCBJTUdfVE9LRU5fU1VGRklYID0gXCJ9XCI7XHJcbiAgbGV0IElNR19ERUxJTUlURVIgPSBcIixcIjtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gIHZhbHVlID0gdmFsdWVcclxuICAgIC5zcGxpdChcIiBcIilcclxuICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgIGlmIChhLnN0YXJ0c1dpdGgoSU1HX1RPS0VOX1BSRUZJWCkgJiYgYS5lbmRzV2l0aChJTUdfVE9LRU5fU1VGRklYKSkge1xyXG4gICAgICAgIGEgPSBhLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzBdO1xyXG4gICAgICAgIGxldCBpbWdXaWR0aCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgPyBhLnJlcGxhY2UoSU1HX1RPS0VOX1BSRUZJWCwgXCJcIikuc3BsaXQoSU1HX0RFTElNSVRFUilbMV1cclxuICAgICAgICAgICAgOiBcIjIwcHhcIjtcclxuICAgICAgICBsZXQgaW1nSGVpZ2h0ID1cclxuICAgICAgICAgIGEuc3BsaXQoSU1HX0RFTElNSVRFUikubGVuZ3RoID4gMlxyXG4gICAgICAgICAgICA/IGEucmVwbGFjZShJTUdfVE9LRU5fUFJFRklYLCBcIlwiKS5zcGxpdChJTUdfREVMSU1JVEVSKVsyXVxyXG4gICAgICAgICAgICA6IFwiMjBweFwiO1xyXG4gICAgICAgIGxldCByZXBlYXRDb3VudCA9XHJcbiAgICAgICAgICBhLnNwbGl0KElNR19ERUxJTUlURVIpLmxlbmd0aCA+IDNcclxuICAgICAgICAgICAgPyArYS5yZXBsYWNlKElNR19UT0tFTl9QUkVGSVgsIFwiXCIpLnNwbGl0KElNR19ERUxJTUlURVIpWzNdXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChcclxuICAgICAgICAgIHJlcGVhdENvdW50XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH0pXHJcbiAgICAuam9pbihcIiBcIik7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCByZXBsYWNlVG9rZW5zID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gIHZhbHVlID0gcmVwbGFjZUZvbnRBd2Vzb21lVG9rZW5zKHZhbHVlKTtcclxuICB2YWx1ZSA9IHJlcGxhY2VJbWFnZVRva2Vucyh2YWx1ZSk7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBnZXRTdGF0c0Zyb21BcnJheU9mT2JqZWN0cyA9IGZ1bmN0aW9uKGFycmF5T2ZPYmplY3RzKSB7XHJcbiAgbGV0IHN0YXRzZ3JvdXA6IGFueSA9IHt9O1xyXG4gIHN0YXRzZ3JvdXAuY291bnQgPSBhcnJheU9mT2JqZWN0cy5sZW5ndGg7XHJcbiAgc3RhdHNncm91cC51bmlxdWVjb3VudCA9IF8udW5pcShhcnJheU9mT2JqZWN0cykubGVuZ3RoO1xyXG4gIHN0YXRzZ3JvdXAuc3VtID0gXy5zdW0oYXJyYXlPZk9iamVjdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLm1lYW4gPSBfLm1lYW4oYXJyYXlPZk9iamVjdHMubWFwKHMgPT4gK3MpKTtcclxuICBzdGF0c2dyb3VwLm1pbiA9IF8ubWluKGFycmF5T2ZPYmplY3RzLm1hcChzID0+ICtzKSk7XHJcbiAgc3RhdHNncm91cC5tYXggPSBfLm1heChhcnJheU9mT2JqZWN0cy5tYXAocyA9PiArcykpO1xyXG4gIHN0YXRzZ3JvdXAuZmlyc3QgPSBfLmZpcnN0KGFycmF5T2ZPYmplY3RzKTtcclxuICByZXR1cm4gc3RhdHNncm91cDtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgZ2V0U3RhdEZyb21TdGF0c0dyb3VwID0gZnVuY3Rpb24oc3RhdHNHcm91cCwgc3RhdE5hbWUpIHtcclxuICBzdGF0TmFtZSA9IHN0YXROYW1lXHJcbiAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgLnRyaW0oKVxyXG4gICAgLnJlcGxhY2UoXCIke1wiLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoXCJ9XCIsIFwiXCIpO1xyXG4gIHJldHVybiBzdGF0c0dyb3VwW3N0YXROYW1lXSB8fCBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBpc01hdGNoID0gZnVuY3Rpb24ob3YsIG9wLCBjdjEsIGN2Mik6IGJvb2xlYW4ge1xyXG4gIGxldCByZXR1cm52YWx1ZSA9IGZhbHNlO1xyXG4gIG9wID0gb3BcclxuICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAucmVwbGFjZSgvXFwgL2csIFwiXCIpXHJcbiAgICAudHJpbSgpO1xyXG4gIGlmIChvcC5pbmNsdWRlcyhcImlnbm9yZWNhc2VcIikpIHtcclxuICAgIG9wID0gb3AucmVwbGFjZShcImlnbm9yZWNhc2VcIiwgXCJcIikudHJpbSgpO1xyXG4gICAgb3YgPSAob3YgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgIGN2MSA9IChjdjEgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgIGN2MiA9IChjdjIgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgaWYgKG9wLmluY2x1ZGVzKFwiaWdub3Jlc3BhY2VcIikpIHtcclxuICAgIG9wID0gb3AucmVwbGFjZShcImlnbm9yZXNwYWNlXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIG92ID0gb3YucmVwbGFjZSgvXFwgL2csIFwiXCIpO1xyXG4gICAgY3YxID0gY3YxLnJlcGxhY2UoL1xcIC9nLCBcIlwiKTtcclxuICAgIGN2MiA9IGN2Mi5yZXBsYWNlKC9cXCAvZywgXCJcIik7XHJcbiAgfVxyXG4gIHN3aXRjaCAob3AudHJpbSgpKSB7XHJcbiAgICBjYXNlIFwiZXF1YWxzXCI6XHJcbiAgICBjYXNlIFwiaXNcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSArY3YxID09PSArb3YgfHwgY3YxID09PSBvdjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwibm90ZXF1YWxzXCI6XHJcbiAgICBjYXNlIFwiaXNub3RlcXVhbHNcIjpcclxuICAgIGNhc2UgXCJub3RcIjpcclxuICAgIGNhc2UgXCJpc25vdFwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9IGN2MSAhPT0gb3Y7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImNvbnRhaW5zXCI6XHJcbiAgICBjYXNlIFwiaGFzXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gb3YuaW5jbHVkZXMoY3YxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwibm90Y29udGFpbnNcIjpcclxuICAgIGNhc2UgXCJub3RoYXNcIjpcclxuICAgIGNhc2UgXCJub3RoYXZlXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gIW92LmluY2x1ZGVzKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInN0YXJ0c3dpdGhcIjpcclxuICAgIGNhc2UgXCJiZWdpbnN3aXRoXCI6XHJcbiAgICBjYXNlIFwiYmVnaW53aXRoXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gb3Yuc3RhcnRzV2l0aChjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJlbmRzd2l0aFwiOlxyXG4gICAgY2FzZSBcImVuZHdpdGhcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSBvdi5lbmRzV2l0aChjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJpblwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9IGN2MS5zcGxpdChjdjIgfHwgXCIgXCIpLmluZGV4T2Yob3YpID4gLTE7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIj09PVwiOlxyXG4gICAgY2FzZSBcIj09XCI6XHJcbiAgICBjYXNlIFwiPVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9ICtvdiA9PT0gK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCIhPT1cIjpcclxuICAgIGNhc2UgXCIhPVwiOlxyXG4gICAgY2FzZSBcIjw+XCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gK292ICE9PSArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIjxcIjpcclxuICAgIGNhc2UgXCJsZXNzdGhhblwiOlxyXG4gICAgY2FzZSBcImJlbG93XCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gK292IDwgK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCI+XCI6XHJcbiAgICBjYXNlIFwiZ3JlYXRlcnRoYW5cIjpcclxuICAgIGNhc2UgXCJhYm92ZVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9ICtvdiA+ICtjdjEgJiYgIWlzTmFOKG92KSAmJiAhaXNOYU4oY3YxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiPj1cIjpcclxuICAgIGNhc2UgXCJncmVhdGVydGhhbm9yZXF1YWx0b1wiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9ICtvdiA+PSArY3YxICYmICFpc05hTihvdikgJiYgIWlzTmFOKGN2MSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIjw9XCI6XHJcbiAgICBjYXNlIFwibGVzc3RoYW5vcmVxdWFsdG9cIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSArb3YgPD0gK2N2MSAmJiAhaXNOYU4ob3YpICYmICFpc05hTihjdjEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJpbnNpZGVyYW5nZVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9XHJcbiAgICAgICAgK292ID4gXy5taW4oWytjdjEsICtjdjJdKSAmJlxyXG4gICAgICAgICtvdiA8IF8ubWF4KFsrY3YxLCArY3YyXSkgJiZcclxuICAgICAgICAhaXNOYU4ob3YpICYmXHJcbiAgICAgICAgIWlzTmFOKGN2MSkgJiZcclxuICAgICAgICAhaXNOYU4oY3YyKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwib3V0c2lkZXJhbmdlXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID1cclxuICAgICAgICAoKCtvdiA8IF8ubWluKFsrY3YxLCArY3YyXSkgJiYgK292ID4gXy5tYXgoWytjdjEsICtjdjJdKSkgfHxcclxuICAgICAgICAgICgrb3YgPCArY3YxICYmICtvdiA8ICtjdjIpIHx8XHJcbiAgICAgICAgICAoK292ID4gK2N2MSAmJiArb3YgPiArY3YyKSkgJiZcclxuICAgICAgICAhaXNOYU4ob3YpICYmXHJcbiAgICAgICAgIWlzTmFOKGN2MSkgJiZcclxuICAgICAgICAhaXNOYU4oY3YyKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm52YWx1ZSA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG59O1xyXG4iXX0=