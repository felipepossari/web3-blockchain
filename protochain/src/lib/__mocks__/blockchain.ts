import Block from "./block";
import Validation from "../validation";

export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;

    constructor() {
        this.blocks = [
            new Block(this.nextIndex, "Genesis Block", "")
        ];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    addBlock(block: Block): Validation {
        if(block.index < 0) return new Validation(false, "Invalid index");

        this.blocks.push(block);
        this.nextIndex++;
        return new Validation();
    }

    isValid(): Validation {
        return new Validation();
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash);
    }
}
