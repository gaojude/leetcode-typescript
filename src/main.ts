import {sortedIndexOf} from 'lodash'

export function search(nums: number[], target: number): number {
    return sortedIndexOf(nums, target);
}
