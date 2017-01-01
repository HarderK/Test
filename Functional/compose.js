// 组合串联
function compose(...funcs) {
    return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}