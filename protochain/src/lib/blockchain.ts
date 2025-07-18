import Block from "./block";
import Validation from "./validation";

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
        const lastBlock = this.getLastBlock();

        const validation = block.isValid(lastBlock);
        if (!validation.success) return validation;

        this.blocks.push(block);
        this.nextIndex++;
        return new Validation();
    }

    isValid(): Validation {
        for (let i = this.blocks.length - 1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const validation = currentBlock.isValid(previousBlock);
            if (!validation.success)
                return new Validation(false, `Block ${currentBlock.index} is invalid: ${validation.message}`);
        }
        return new Validation();
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash);
    }
}
