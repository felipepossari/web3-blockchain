import express from "express";
import morgan from "morgan";
import Blockchain from "../lib/blockchain";
import Block from "../lib/block";

const PORT: number = 3000;

const app: express.Application = express();

if (process.argv.includes("--run")) {
    app.use(morgan("tiny"));
}
app.use(express.json());

const blockchain = new Blockchain();

app.get("/status", (req, res, next) => {
    res.json({
        numberOfBlocks: blockchain.blocks.length,
        isValid: blockchain.isValid(),
        lastBlock: blockchain.getLastBlock()
    })
})

app.get('/blocks/:indexOrHash', (req, res, next) => {
    let block: Block | undefined;

    if (/^[0-9]+$/.test(req.params.indexOrHash)) {
        block = blockchain.blocks[parseInt(req.params.indexOrHash)]
    } else {
        block = blockchain.getBlock(req.params.indexOrHash)
    }

    if (!block) {
        res.sendStatus(404);
    } else {
        res.json(block);
    }
});

app.post('/blocks', (req, res, next) => {
    if (!req.body) {
        res.sendStatus(400);
        return
    }

    const block = new Block(req.body.index, req.body.data, req.body.previousHash);
    const validation = blockchain.addBlock(block);

    if (validation.success) {
        res.json(block);
    } else {
        res.status(400).json(validation);
    }
})

if (process.argv.includes("--run")) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export {
    app
};