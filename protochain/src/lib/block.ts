import sha256 from "crypto-js/sha256";

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
        return sha256(
            this.index +
            this.data +
            this.timestamp +
            this.previousHash
        ).toString()
    }

    isValid(lastBlock: Block): boolean {
        if (lastBlock.index !== this.index - 1) return false;
        if (!this.hash) return false;
        if (!this.data) return false;
        if (this.previousHash != lastBlock.hash) return false;
        if (this.timestamp < 1) return false;
        return true;
    }
}