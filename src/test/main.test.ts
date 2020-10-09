import {search} from '../main'
import assert from 'assert'

describe('Binary search simple test', () => {
    it('should return the index of the item if the item exists', () => {
        assert(search([1, 3, 5, 7, 9], 5) === 2)
    })
    it('should return -1 if the item does NOT exist', () => {
        assert(search([1, 3, 5, 7, 9], 4) === -1)
    })
})
