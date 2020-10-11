import _ from 'lodash'

export function search(nums: number[], target: number): number {
    return _.sortedIndexOf(nums, target);
}

export function findMinArrowShots(points: number[][]): number {
    const pts = _.sortBy(points, [([start]) => start, ([_, end]) => end]);

    function munch(points: number[][], i: number) {
        function intersect(itvl1: number[], itvl2: number[]): [boolean, number[]] {
            const start = Math.max(itvl1[0], itvl2[0]), end = Math.min(itvl1[1], itvl2[1]);
            return [end >= start, [start, end]];
        }
        let itvl = points[i];
        while (i < points.length) {
            const currItvl = points[i];
            const [success, value] = intersect(itvl, currItvl);
            if (success) {
                itvl = value;
                ++i;
            } else {
                break;
            }
        }
        return i;
    }

    let k = 0;
    let i = 0;
    while (i < points.length) {
        i = munch(pts, i);
        ++k;
    }

    return k;
};
