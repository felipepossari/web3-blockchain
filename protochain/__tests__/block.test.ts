import Block from "../src/lib/block";

describe("Block tests", () => {

    let genesis: Block;

    beforeAll(() => {
        genesis = new Block(0, "Genesis Block", "hash")
    })

    test('Should be valid', () => {
        const block = new Block(1, "Genesis Block", genesis.hash)
        expect(block.isValid(genesis)).toBeTruthy();
    })

    test('Should NOT be valid (hash)', () => {
        const block = new Block(1, "Genesis Block", genesis.hash)
        block.hash = ""
        expect(block.isValid(genesis)).toBeFalsy();
    })

    test('Should NOT be valid (previousHash)', () => {''
        const block = new Block(1, "Genesis Block", "other hash")
        expect(block.isValid(genesis)).toBeFalsy();
    })

    test('Should NOT be valid (data)', () => {''
        const block = new Block(1, "", genesis.hash)
        expect(block.isValid(genesis)).toBeFalsy();
    })

    test('Should NOT be valid (timestamp)', () => {''
        const block = new Block(1, "Block", genesis.hash)
        block.timestamp = 0
        expect(block.isValid(genesis)).toBeFalsy();
    })

    test('Should NOT be valid (index)', () => {''
        const block = new Block(2, "Block", genesis.hash)
        expect(block.isValid(genesis)).toBeFalsy();
    })
})