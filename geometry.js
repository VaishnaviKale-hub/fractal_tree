function fractalTree(generations, currentPattern = "0") {
    if (generations === 0) {
        return currentPattern;
    }

    let nextPattern = "";

    for (let i = 0; i < currentPattern.length; i++) {
        if (currentPattern[i] === "0") {
            nextPattern += "1[L0][R0]";
        }
        else if (currentPattern[i] === "1") {
            nextPattern += "11";
        }
        else if (currentPattern[i] === "[" || currentPattern[i] === "]" || currentPattern[i] === "L" ||
            currentPattern[i] === "R") {
            nextPattern += currentPattern[i];
        }
    }

    return fractalTree(generations - 1, nextPattern);
}

module.exports = {
    fractalTree,
};