import solution from "./test.js";
import assert from "assert";

const testCase = [
    { brown:10, yellow:2, expected_value:[4, 3] },
    { brown:8, yellow:1, expected_value:[3, 3] },
    { brown:24, yellow:24, expected_value:[8, 6] }
];

describe("실행 결과", () => {
    testCase.forEach(({brown, yellow, expected_value}) => {
        const result = JSON.stringify(solution(brown, yellow));
        const expect = JSON.stringify(expected_value)
        const msg = result === expect ? "Successful" : "Failed"
        it(msg, () => {
            assert.strictEqual(result, expect);
        })
    });
});