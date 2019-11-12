import { arrayJoin } from "../arrayUtils";

export default function groupBy(groupBy) {
    return arrayJoin(groupBy, ', ');
}