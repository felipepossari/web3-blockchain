import request from "supertest";
import { app } from "../src/server/blockchainServer";
import { describe, test, expect, jest } from "@jest/globals";

jest.mock("../src/lib/block");
jest.mock("../src/lib/blockchain");

describe("Blockchain Server tests", () => {
    test('GET /status', async () => {
        const response = await request(app)
            .get("/status");
        expect(response.status).toBe(200);
        expect(response.body.isValid.success)
    });
});