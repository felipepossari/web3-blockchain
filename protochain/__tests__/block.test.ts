import Block from "../src/lib/block";

describe("Block tests", () => {

    test('Should be valid', () => {
        const block = new Block(0, "Genesis Block", "abc")
        expect(block.isValid()).toBeTruthy();
    })

    test('Should NOT be valid (hash)', () => {
        const block = new Block(0, "Genesis Block", "")
        block.hash = ""
        expect(block.isValid()).toBeFalsy();
    })

    test('Should NOT be valid (previousHash)', () => {''
        const block = new Block(0, "Genesis Block", "")
        expect(block.isValid()).toBeFalsy();
    })

    test('Should NOT be valid (data)', () => {''
        const block = new Block(0, "", "abc")
        expect(block.isValid()).toBeFalsy();
    })

    test('Should NOT be valid (timestamp)', () => {''
        const block = new Block(0, "Block", "abc")
        block.timestamp = 0
        expect(block.isValid()).toBeFalsy();
    })

    test('Should NOT be valid (index)', () => {''
        const block = new Block(-1, "Block", "abc")
        expect(block.isValid()).toBeFalsy();
    })
})