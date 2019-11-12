import {addToArray, arrayJoin} from '../arrayUtils';
import deriveAggregateFields from './aggregation';

export default function projection({fields, groupBy, aggregate}) {
    const projectionList = [];
    
    // either set fields or groupby as a base
    if(fields.length) {
        addToArray(projectionList, fields);
    }
    else if(groupBy.length) {
        addToArray(projectionList, groupBy);
    }

    // now add aggregate fields
    addToArray(projectionList, deriveAggregateFields(aggregate));
    
    return arrayJoin(projectionList, ', ');
}
