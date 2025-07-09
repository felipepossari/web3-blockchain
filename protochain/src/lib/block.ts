import sha256 from "crypto-js/sha256";
import Validation from "./validation";

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

    isValid(lastBlock: Block): Validation {
        if (lastBlock.index !== this.index - 1) return new Validation(false, "Invalid index");
        if (!this.hash) return new Validation(false, "Invalid hash");
        if (!this.data) return new Validation(false, "Invalid data");
        if (this.previousHash != lastBlock.hash) return new Validation(false, "Invalid previous hash");
        if (this.timestamp < 1) return new Validation(false, "Invalid timestamp");
        return new Validation();
    }
}