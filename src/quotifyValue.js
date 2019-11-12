export default value => {
    if(typeof value === 'string')
        return `"${value}"`;
    else
        return value;
}