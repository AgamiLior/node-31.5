const { MarkovMachine } = require("./markov");

describe("markov machine", function () {

    test("check for chains", function () {
        let mm = new MarkovMachine("the only cat is my cat is the best");
        expect(mm.chains).toEqual({
            the: ["only", "best"],
            only: ["cat"],
            cat: ["is", "is"],
            is: ["my", "the"],
            my: ["cat"],
            best: [null],
        });
    });

    test("pick random choice from array", function () {
        expect(MarkovMachine.randomize(["a", "a", "a"])).toEqual("a");
        expect(MarkovMachine.randomize([1, 1, 1])).toEqual(1);
        expect(["a", "b", "c"]).toContain(MarkovMachine.randomize(["a", "b", "c"]));
    });

    test("generates text", function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(mm.chains).toEqual({
            a: ["b"],
            b: ["c"],
            c: [null],
        });
        expect(["a b c", "b c", "c"]).toContain(text);
    });

    test("generates valid sentence", function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(text.endsWith("c")).toBe(true);

    });
});