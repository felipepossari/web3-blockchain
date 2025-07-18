import Validation from "../validation";

export default class Block {
    index: number;
    timestamp: number;
    hash: string;
    data: string;
    previousHash: string;

    constructor(index: number, data: string, previousHash: string) {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.getHash();
    }

    getHash(): string {
        return this.hash || "hash";
    }

    isValid(lastBlock: Block): Validation {
        if (!this.previousHash || lastBlock.index < 0 || this.index < 0)
            return new Validation(false, "Invalid previous hash");
        return new Validation();
    }
}