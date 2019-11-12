
const stringify = item => {
    if(item == null) return '';
    // handle functions, NaN as well
    return item;
}

const wrapTextIn = (text, startStr, endStr) => {
    return startStr + stringify(text) + endStr; 
}

export  const wrapInSpace = text => {
    return wrapTextIn(text, ' ', ' ');
}

export const wrapInBrackets = text => {
    return wrapTextIn(text, '(', ')');
};

export const wrapeInSpacedBrackets = text => {
    return wrapTextIn(text, '( ', ' )');
};