import {
    search,
    findMinArrowShots,
    removeDuplicateLetters,
    buddyStrings,
    ListNode,
    sortList,
    rob,
    rotate,
    searchMatrix,
    maxProfit,
    minDominoRotations,
    minDepth
} from '../main';
import assert from 'assert';

describe('Binary search simple test', () => {
    it('return the index of the item if the item exists', () => {
        assert(search([1, 3, 5, 7, 9], 5) === 2);
    });
    it('return -1 if the item does NOT exist', () => {
        assert(search([1, 3, 5, 7, 9], 4) === -1);
    });
});

describe('findMinArrowShots sample tests', () => {
    it('sample test 1', () => {
        assert(
            findMinArrowShots([
                [10, 16],
                [2, 8],
                [1, 6],
                [7, 12],
            ]) === 2
        );
    });
    it('sample test 2', () => {
        assert(
            findMinArrowShots([
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8],
            ]) === 4
        );
    });
    it('sample test 3', () => {
        assert(
            findMinArrowShots([
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 5],
            ]) === 2
        );
    });
    it('sample test 4', () => {
        assert(findMinArrowShots([[1, 2]]) === 1);
    });
    it('sample test 5', () => {
        assert(
            findMinArrowShots([
                [2, 3],
                [2, 3],
            ]) === 1
        );
    });
});

describe('removeDuplicateLetters sample tests', () => {
    it('sample test 1', () => {
        assert(removeDuplicateLetters('bcabc') === 'abc');
    });
    it('sample test 2', () => {
        assert(removeDuplicateLetters('cbacdcbc') === 'acdb');
    });
});

describe('buddyStrings tests', () => {
    it('test 1', () => {
        assert(buddyStrings('ab', 'ba'));
    });
    it('test 2', () => {
        assert(!buddyStrings('ab', 'ab'));
    });
    it('test 3', () => {
        assert(buddyStrings('aa', 'aa'));
    });
    it('test 4', () => {
        assert(buddyStrings('aaaaaaabc', 'aaaaaaacb'));
    });
    it('test 5', () => {
        assert(!buddyStrings('', 'aa'));
    });
});

function arrayToListNode(array: number[]): ListNode | null {
    if (array.length === 0) {
        return null;
    }
    const [head, ...rest] = array;
    return new ListNode(head, arrayToListNode(rest));
}

function listNodeToArray(node: ListNode | null): number[] {
    if (node === null) {
        return [];
    }
    return [node.val].concat(listNodeToArray(node.next));
}

function arrayEqual(array1: number[], array2: number[]): boolean {
    return array1.toString() === array2.toString();
}

describe('sortList tests', () => {
    it('test 1', () => {
        assert(arrayEqual(listNodeToArray(sortList(arrayToListNode([-1, 5, 3, 4, 0]))), [-1, 0, 3, 4, 5]));
    });
    it('test 2', () => {
        assert(arrayEqual(listNodeToArray(sortList(arrayToListNode([]))), []));
    });
    it('test 3', () => {
        assert(arrayEqual(listNodeToArray(sortList(arrayToListNode([4, 2, 1, 3]))), [1, 2, 3, 4]));
    });
});

describe('rob tests', () => {
    it('test 1', () => {
        assert(rob([2, 3, 2]) === 3);
    });
    it('test 2', () => {
        assert(rob([1, 2, 3, 1]) === 4);
    });
    it('test 3', () => {
        assert(rob([0]) === 0);
    });
});

describe('rotate tests', () => {
    it('test 1', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const k = 3;
        rotate(arr, k);
        assert(arrayEqual(arr, [5, 6, 7, 1, 2, 3, 4]));
    });
    it('test 2', () => {
        const arr = [-1, -100, 3, 99];
        const k = 2;
        rotate(arr, k);
        assert(arrayEqual(arr, [3, 99, -1, -100]));
    });
});

describe('rotate tests', () => {
    it('test 1', () => {
        const matrix = [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 50],
        ];
        const target = 3;
        assert(searchMatrix(matrix, target));
    });

    it('test 2', () => {
        const matrix = [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 50],
        ];
        const target = 13;
        assert(!searchMatrix(matrix, target));
    });

    it('test 3', () => {
        const matrix = [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 50],
        ];
        const target = 13;
        assert(!searchMatrix(matrix, target));
    });

    it('test 4', () => {
        const matrix: number[][] = [];
        const target = 3;
        assert(!searchMatrix(matrix, target));
    });

    it('test 5', () => {
        const matrix = [[1]];
        const target = 3;
        assert(!searchMatrix(matrix, target));
    });
});


describe('Best Time to Buy and Sell Stock IV tests', () => {
    it('test 1', () => {
        const arr = [2, 4, 1]
        const k = 2;
        const output = 2;
        assert(maxProfit(k, arr) === output);
    });
    it('test 2', () => {
        const arr = [3, 2, 6, 5, 0, 3]
        const k = 2;
        const output = 7;
        assert(maxProfit(k, arr) === output);
    });
});


describe('Minimum Domino Rotations For Equal Row tests', () => {
    it('test 1', () => {
        const arr1 = [2, 1, 2, 4, 2, 2];
        const arr2 = [5, 2, 6, 2, 3, 2];
        assert(minDominoRotations(arr1, arr2) === 2)
    });
    it('test 2', () => {
        const arr1 = [3, 5, 1, 2, 3]
        const arr2 = [3, 6, 3, 3, 4]
        assert(minDominoRotations(arr1, arr2) === -1);
    });
});