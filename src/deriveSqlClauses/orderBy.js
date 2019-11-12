import { arrayJoinMap } from "../arrayUtils";
import jsonTemplating from '../jsonTemplating';

export default function orderBy(orderBy) {
    return arrayJoinMap(orderBy, item => {
        if(typeof item === 'string') {
            return item;
        }
        else {
            const {field, dir} = item;
            return jsonTemplating([
                {
                    tpl: field,
                },
                {
                    condition: dir,
                    tpl: dir
                }
            ], ' ');
        }
    }, ', ', true);
};