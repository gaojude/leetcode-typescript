import _ from 'lodash';

export class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

export function search(nums: number[], target: number): number {
    return _.sortedIndexOf(nums, target);
}

export function findMinArrowShots(points: number[][]): number {
    const pts = _.sortBy(points, [([start]) => start, ([_, end]) => end]);

    function munch(points: number[][], i: number) {
        function intersect(itvl1: number[], itvl2: number[]): [boolean, number[]] {
            const start = Math.max(itvl1[0], itvl2[0]),
                end = Math.min(itvl1[1], itvl2[1]);
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
}

export function removeDuplicateLetters(s: string): string {
    function getFirstPosition(chars: string[]): number {
        const last = new Map<string, number>();
        chars
            .slice()
            .reverse()
            .forEach((char, index) => {
                if (!last.has(char)) {
                    last.set(char, chars.length - 1 - index);
                }
            });
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
}

export function buddyStrings(A: string, B: string): boolean {
    const pairs = _.zip([...A], [...B]).filter(([a, b]) => a !== b);
    if (pairs.length === 2) {
        return pairs[0][0] === pairs[1][1] && pairs[0][1] === pairs[1][0];
    }
    return pairs.length === 0 && _.uniq([...A]).length !== A.length;
}

export function sortList(head: ListNode | null): ListNode | null {
    if (head === null) {
        return null;
    }

    function getLength(head: ListNode | null): number {
        if (head === null) {
            return 0;
        }
        return 1 + getLength(head.next);
    }

    function getNth(head: ListNode, n: number): ListNode {
        if (n === 0) {
            return head;
        }
        return getNth(head.next!, n - 1);
    }

    function merge(head1: ListNode | null, head2: ListNode | null): ListNode | null {
        if (head1 === null) {
            return head2;
        }
        if (head2 === null) {
            return head1;
        }
        if (head1.val < head2.val) {
            head1.next = merge(head1.next, head2);
            return head1;
        } else {
            head2.next = merge(head2.next, head1);
            return head2;
        }
    }

    const length = getLength(head);
    if (length === 1) {
        return head;
    }

    const leftTail = getNth(head, Math.floor(length / 2) - 1);
    const rightHead = leftTail.next!;
    leftTail.next = null;

    return merge(sortList(head)!, sortList(rightHead)!);
}

export function rob(nums: number[]): number {
    function linearRob(nums: number[]): number {
        const robNthRoom = new Array(nums.length).fill(0);
        const dontRobNthRoom = new Array(nums.length).fill(0);
        if (nums.length > 0) {
            robNthRoom[0] = nums[0];
            for (let i = 1; i < nums.length; ++i) {
                robNthRoom[i] = dontRobNthRoom[i - 1] + nums[i];
                dontRobNthRoom[i] = Math.max(robNthRoom[i - 1], dontRobNthRoom[i - 1]);
            }
            return Math.max(robNthRoom.pop(), dontRobNthRoom.pop());
        }
        return 0;
    }

    if (nums.length === 1) {
        return nums[0];
    }
    const copy1 = nums.slice();
    copy1.shift();
    const copy2 = nums.slice();
    copy2.pop();
    return Math.max(linearRob(copy1), linearRob(copy2));
}

export function rotate(nums: number[], k: number): void {
    function reverse(i: number, j: number) {
        for (let m = i; m < (i + j) / 2; ++m) {
            [nums[m], nums[j - m + i]] = [nums[j - m + i], nums[m]];
        }
    }

    reverse(0, nums.length - 1);
    const modN = k % nums.length;
    reverse(0, modN - 1);
    reverse(modN, nums.length - 1);
}

export function searchMatrix(matrix: number[][], target: number): boolean {
    if (matrix.length === 0) {
        return false;
    }
    const firstColumn = matrix.map((row) => row[0]);
    const rowPivot = _.sortedIndexBy(firstColumn, target);
    let row = matrix[rowPivot];
    row = row ?? matrix[0];

    if (row[0] == target) {
        return true;
    }
    if (rowPivot === 0) {
        return false;
    }
    row = matrix[rowPivot - 1];
    return _.sortedIndexOf(row, target) !== -1;
}

export function maxProfit(k: number, prices: number[]): number {
    if (k === 0) return 0;
    const n = prices.length;
    k = Math.min(k * 2, n);
    let sell = new Array(n).fill(0);
    let buy = new Array(n).fill(0);
    for (let K = 1; K <= k; ++K) {
        let nextSell = sell.slice();
        let nextBuy = buy.slice();
        let maxHistorySell = 0;
        let maxHistoryBuy = -prices[0];
        for (let N = 1; N < n; ++N) {
            const priceToday = prices[N];
            nextBuy[N] = maxHistorySell - priceToday;
            nextSell[N] = maxHistoryBuy + priceToday;
            maxHistorySell = Math.max(maxHistorySell, sell[N], 0);
            maxHistoryBuy = Math.max(maxHistoryBuy, buy[N]);
        }
        sell = nextSell;
        buy = nextBuy;
    }
    return Math.max(..._.times(n, (i: number) => sell[i]), 0);
}

export function minDominoRotations(A: number[], B: number[]): number {
    const [headA, ...restA] = A;
    const [headB, ...restB] = B;

    function compute(target: number, rowNum: number) {
        return (_.zip(restA, restB) as [number, number][])
            .map((pair: [number, number]) => {
                    if (pair[rowNum] === target) return 0;
                    else if (pair[1 - rowNum] === target) return 1;
                    else return Infinity;
                }
            )
            .reduce((prev: number, curr: number) => prev + curr, 0);
    }

    const candidates = [
        compute(headA, 0),
        compute(headB, 1),
        compute(headB, 0) + 1,
        compute(headA, 0) + 1
    ]

    const min = Math.min(...candidates);
    return min === Infinity ? -1 : min;
}


class Node {
    val: number
    neighbors: Node[]

    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val)
        this.neighbors = (neighbors === undefined ? [] : neighbors)
    }
}

export function cloneGraph(node: Node | null): Node | null {
    function getNodes(): Node[] {
        if (node === null) return [];
        const nodes = new Set<Node>();
        function dfs(v: Node) {
            nodes.add(v);
            v.neighbors.filter((n: Node) => !nodes.has(n)).forEach(dfs);
        }
        dfs(node);
        return [...nodes];
    }
    const nodes = getNodes();
    const mapValueToDeepCopiedNode = new Map<number, Node>(nodes.map(({val}: Node) => [val, new Node(val)]));
    nodes.forEach(({val, neighbors}: Node) => {
        const node = mapValueToDeepCopiedNode.get(val)!;
        node.neighbors = neighbors.map((n: Node) => mapValueToDeepCopiedNode.get(n.val)!);
    })
    return [...mapValueToDeepCopiedNode.values()][0];
}