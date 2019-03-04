System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, isMatch;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("isMatch", isMatch = function (original_value, operator, compare_value1, compare_value2) {
                var returnvalue = false;
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
                        returnvalue = compare_value1 === original_value;
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
                            +original_value > lodash_1.default.min([+compare_value1, +compare_value2]) &&
                                +original_value < lodash_1.default.max([+compare_value1, +compare_value2]) &&
                                !isNaN(original_value) &&
                                !isNaN(compare_value1) &&
                                !isNaN(compare_value2);
                        break;
                    case "outsiderange":
                        returnvalue =
                            ((+original_value < lodash_1.default.min([+compare_value1, +compare_value2]) &&
                                +original_value > lodash_1.default.max([+compare_value1, +compare_value2])) ||
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
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0Y2hVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9NYXRjaFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRUEscUJBQVcsT0FBTyxHQUFHLFVBQ25CLGNBQWMsRUFDZCxRQUFRLEVBQ1IsY0FBYyxFQUNkLGNBQWM7Z0JBRWQsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixRQUFRLEdBQUcsUUFBUTtxQkFDaEIsV0FBVyxFQUFFO3FCQUNiLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO3FCQUNsQixJQUFJLEVBQUUsQ0FBQztnQkFDVixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDckQsY0FBYyxHQUFHLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN0RCxjQUFjLEdBQUcsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3RELGNBQWMsR0FBRyxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkQ7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUNwQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3RELGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDbkQsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxjQUFjLEdBQUcs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LENBQUM7d0JBQ3pCLE1BQU07b0JBQ1I7d0JBQ0UsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFDcEIsTUFBTTtpQkFDVDtnQkFDRCxPQUFPLFdBQVcsQ0FBQztZQUNyQixDQUFDLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgbGV0IGlzTWF0Y2ggPSBmdW5jdGlvbihcclxuICBvcmlnaW5hbF92YWx1ZSxcclxuICBvcGVyYXRvcixcclxuICBjb21wYXJlX3ZhbHVlMSxcclxuICBjb21wYXJlX3ZhbHVlMlxyXG4pOiBib29sZWFuIHtcclxuICBsZXQgcmV0dXJudmFsdWUgPSBmYWxzZTtcclxuICBvcGVyYXRvciA9IG9wZXJhdG9yXHJcbiAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgLnJlcGxhY2UoL1xcIC9nLCBcIlwiKVxyXG4gICAgLnRyaW0oKTtcclxuICBpZiAob3BlcmF0b3IuaW5jbHVkZXMoXCJpZ25vcmVjYXNlXCIpKSB7XHJcbiAgICBvcGVyYXRvciA9IG9wZXJhdG9yLnJlcGxhY2UoXCJpZ25vcmVjYXNlXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIG9yaWdpbmFsX3ZhbHVlID0gKG9yaWdpbmFsX3ZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb21wYXJlX3ZhbHVlMSA9IChjb21wYXJlX3ZhbHVlMSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29tcGFyZV92YWx1ZTIgPSAoY29tcGFyZV92YWx1ZTIgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgaWYgKG9wZXJhdG9yLmluY2x1ZGVzKFwiaWdub3Jlc3BhY2VcIikpIHtcclxuICAgIG9wZXJhdG9yID0gb3BlcmF0b3IucmVwbGFjZShcImlnbm9yZXNwYWNlXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgIG9yaWdpbmFsX3ZhbHVlID0gb3JpZ2luYWxfdmFsdWUucmVwbGFjZSgvXFwgL2csIFwiXCIpO1xyXG4gICAgY29tcGFyZV92YWx1ZTEgPSBjb21wYXJlX3ZhbHVlMS5yZXBsYWNlKC9cXCAvZywgXCJcIik7XHJcbiAgICBjb21wYXJlX3ZhbHVlMiA9IGNvbXBhcmVfdmFsdWUyLnJlcGxhY2UoL1xcIC9nLCBcIlwiKTtcclxuICB9XHJcbiAgc3dpdGNoIChvcGVyYXRvci50cmltKCkpIHtcclxuICAgIGNhc2UgXCJlcXVhbHNcIjpcclxuICAgIGNhc2UgXCJpc1wiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9IGNvbXBhcmVfdmFsdWUxID09PSBvcmlnaW5hbF92YWx1ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwibm90ZXF1YWxzXCI6XHJcbiAgICBjYXNlIFwiaXNub3RlcXVhbHNcIjpcclxuICAgIGNhc2UgXCJub3RcIjpcclxuICAgIGNhc2UgXCJpc25vdFwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9IGNvbXBhcmVfdmFsdWUxICE9PSBvcmlnaW5hbF92YWx1ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiY29udGFpbnNcIjpcclxuICAgIGNhc2UgXCJoYXNcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPSBvcmlnaW5hbF92YWx1ZS5pbmNsdWRlcyhjb21wYXJlX3ZhbHVlMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIm5vdGNvbnRhaW5zXCI6XHJcbiAgICBjYXNlIFwibm90aGFzXCI6XHJcbiAgICBjYXNlIFwibm90aGF2ZVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9ICFvcmlnaW5hbF92YWx1ZS5pbmNsdWRlcyhjb21wYXJlX3ZhbHVlMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInN0YXJ0c3dpdGhcIjpcclxuICAgIGNhc2UgXCJiZWdpbnN3aXRoXCI6XHJcbiAgICBjYXNlIFwiYmVnaW53aXRoXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID0gb3JpZ2luYWxfdmFsdWUuc3RhcnRzV2l0aChjb21wYXJlX3ZhbHVlMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImVuZHN3aXRoXCI6XHJcbiAgICBjYXNlIFwiZW5kd2l0aFwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9IG9yaWdpbmFsX3ZhbHVlLmVuZHNXaXRoKGNvbXBhcmVfdmFsdWUxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaW5cIjpcclxuICAgICAgcmV0dXJudmFsdWUgPVxyXG4gICAgICAgIGNvbXBhcmVfdmFsdWUxLnNwbGl0KGNvbXBhcmVfdmFsdWUyIHx8IFwiIFwiKS5pbmRleE9mKG9yaWdpbmFsX3ZhbHVlKSA+XHJcbiAgICAgICAgLTE7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIj09PVwiOlxyXG4gICAgY2FzZSBcIj09XCI6XHJcbiAgICBjYXNlIFwiPVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9XHJcbiAgICAgICAgK29yaWdpbmFsX3ZhbHVlID09PSArY29tcGFyZV92YWx1ZTEgJiZcclxuICAgICAgICAhaXNOYU4ob3JpZ2luYWxfdmFsdWUpICYmXHJcbiAgICAgICAgIWlzTmFOKGNvbXBhcmVfdmFsdWUxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiIT09XCI6XHJcbiAgICBjYXNlIFwiIT1cIjpcclxuICAgIGNhc2UgXCI8PlwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9XHJcbiAgICAgICAgK29yaWdpbmFsX3ZhbHVlICE9PSArY29tcGFyZV92YWx1ZTEgJiZcclxuICAgICAgICAhaXNOYU4ob3JpZ2luYWxfdmFsdWUpICYmXHJcbiAgICAgICAgIWlzTmFOKGNvbXBhcmVfdmFsdWUxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiPFwiOlxyXG4gICAgY2FzZSBcImxlc3N0aGFuXCI6XHJcbiAgICBjYXNlIFwiYmVsb3dcIjpcclxuICAgICAgcmV0dXJudmFsdWUgPVxyXG4gICAgICAgICtvcmlnaW5hbF92YWx1ZSA8ICtjb21wYXJlX3ZhbHVlMSAmJlxyXG4gICAgICAgICFpc05hTihvcmlnaW5hbF92YWx1ZSkgJiZcclxuICAgICAgICAhaXNOYU4oY29tcGFyZV92YWx1ZTEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCI+XCI6XHJcbiAgICBjYXNlIFwiZ3JlYXRlcnRoYW5cIjpcclxuICAgIGNhc2UgXCJhYm92ZVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9XHJcbiAgICAgICAgK29yaWdpbmFsX3ZhbHVlID4gK2NvbXBhcmVfdmFsdWUxICYmXHJcbiAgICAgICAgIWlzTmFOKG9yaWdpbmFsX3ZhbHVlKSAmJlxyXG4gICAgICAgICFpc05hTihjb21wYXJlX3ZhbHVlMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIj49XCI6XHJcbiAgICBjYXNlIFwiZ3JlYXRlcnRoYW5vcmVxdWFsdG9cIjpcclxuICAgICAgcmV0dXJudmFsdWUgPVxyXG4gICAgICAgICtvcmlnaW5hbF92YWx1ZSA+PSArY29tcGFyZV92YWx1ZTEgJiZcclxuICAgICAgICAhaXNOYU4ob3JpZ2luYWxfdmFsdWUpICYmXHJcbiAgICAgICAgIWlzTmFOKGNvbXBhcmVfdmFsdWUxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiPD1cIjpcclxuICAgIGNhc2UgXCJsZXNzdGhhbm9yZXF1YWx0b1wiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9XHJcbiAgICAgICAgK29yaWdpbmFsX3ZhbHVlIDw9ICtjb21wYXJlX3ZhbHVlMSAmJlxyXG4gICAgICAgICFpc05hTihvcmlnaW5hbF92YWx1ZSkgJiZcclxuICAgICAgICAhaXNOYU4oY29tcGFyZV92YWx1ZTEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJpbnNpZGVyYW5nZVwiOlxyXG4gICAgICByZXR1cm52YWx1ZSA9XHJcbiAgICAgICAgK29yaWdpbmFsX3ZhbHVlID4gXy5taW4oWytjb21wYXJlX3ZhbHVlMSwgK2NvbXBhcmVfdmFsdWUyXSkgJiZcclxuICAgICAgICArb3JpZ2luYWxfdmFsdWUgPCBfLm1heChbK2NvbXBhcmVfdmFsdWUxLCArY29tcGFyZV92YWx1ZTJdKSAmJlxyXG4gICAgICAgICFpc05hTihvcmlnaW5hbF92YWx1ZSkgJiZcclxuICAgICAgICAhaXNOYU4oY29tcGFyZV92YWx1ZTEpICYmXHJcbiAgICAgICAgIWlzTmFOKGNvbXBhcmVfdmFsdWUyKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwib3V0c2lkZXJhbmdlXCI6XHJcbiAgICAgIHJldHVybnZhbHVlID1cclxuICAgICAgICAoKCtvcmlnaW5hbF92YWx1ZSA8IF8ubWluKFsrY29tcGFyZV92YWx1ZTEsICtjb21wYXJlX3ZhbHVlMl0pICYmXHJcbiAgICAgICAgICArb3JpZ2luYWxfdmFsdWUgPiBfLm1heChbK2NvbXBhcmVfdmFsdWUxLCArY29tcGFyZV92YWx1ZTJdKSkgfHxcclxuICAgICAgICAgICgrb3JpZ2luYWxfdmFsdWUgPCArY29tcGFyZV92YWx1ZTEgJiZcclxuICAgICAgICAgICAgK29yaWdpbmFsX3ZhbHVlIDwgK2NvbXBhcmVfdmFsdWUyKSB8fFxyXG4gICAgICAgICAgKCtvcmlnaW5hbF92YWx1ZSA+ICtjb21wYXJlX3ZhbHVlMSAmJlxyXG4gICAgICAgICAgICArb3JpZ2luYWxfdmFsdWUgPiArY29tcGFyZV92YWx1ZTIpKSAmJlxyXG4gICAgICAgICFpc05hTihvcmlnaW5hbF92YWx1ZSkgJiZcclxuICAgICAgICAhaXNOYU4oY29tcGFyZV92YWx1ZTEpICYmXHJcbiAgICAgICAgIWlzTmFOKGNvbXBhcmVfdmFsdWUyKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm52YWx1ZSA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG59O1xyXG4iXX0=