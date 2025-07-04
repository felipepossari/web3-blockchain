import Blockchain from "../src/lib/blockchain";
import Block from "../src/lib/block";

describe("Blockchain tests", () => {

    test('Should has genesis block', () => {
        const blockchain = new Blockchain();
        expect(blockchain.blocks.length).toBe(1);
    })

    test('Should add block', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(
            new Block(1, "Genesis Block", blockchain.blocks[0].hash));
        expect(result).toBeTruthy();
    })

    test('Should not add block if it is invalid', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(
            new Block(2, "Genesis Block", blockchain.blocks[0].hash));
        expect(result).toBeFalsy();
    })

    test('Should be valid', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(
            new Block(1, "Genesis Block", blockchain.blocks[0].hash)
        )
        expect(blockchain.isValid()).toBeTruthy();
    })

    test('Should not be valid if block is invalid', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(
            new Block(1, "Genesis Block", blockchain.blocks[0].hash)
        )
        blockchain.blocks[1].hash = ""
        expect(blockchain.isValid()).toBeFalsy();
    })
})