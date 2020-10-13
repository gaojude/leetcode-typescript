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

export function removeDuplicateLetters(s: string): string {
    function getFirstPosition(chars: string[]): number {
        const last = new Map<string, number>();
        chars.slice().reverse().forEach((char, index) => {
            if (!last.has(char)) {
                last.set(char, chars.length - 1 - index);
            }
        })
        let result = chars[0];
        let resultIndex = 0;
        let minLeftLast = last.get(result)!;
        chars.forEach((char, index) => {
            if (minLeftLast >= index) {
                if (char.charCodeAt(0) < result.charCodeAt(0)) {
                    result = char;
                    resultIndex = index;
                }
            }
            minLeftLast = Math.min(minLeftLast, last.get(char)!);
        });
        return resultIndex;
    }

    let chars = [...s];
    const result: string[] = [];
    while (chars.length > 0) {
        const firstPosition = getFirstPosition(chars);
        const firstChar = chars[firstPosition];
        result.push(firstChar);
        chars = chars.slice(firstPosition).filter((char) => char !== firstChar);
        
    }
    return result.join('');
};

export function buddyStrings(A: string, B: string): boolean {
    const pairs = _.zip([...A], [...B]).filter(([a, b]) => a !== b);
    if (pairs.length === 2) {
        return pairs[0][0] === pairs[1][1] && pairs[0][1] === pairs[1][0];
    }
    return pairs.length === 0 && _.uniq([...A]).length !== A.length ;
};

 