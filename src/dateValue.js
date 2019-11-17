import isDate from 'is-date-object';
import dateFormat from 'date-format';

export default format => value => {
    if(isDate(value))
        return dateFormat(format, value);
    else
        return value;
}
