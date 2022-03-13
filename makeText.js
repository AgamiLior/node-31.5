/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const markov = require("./markov");

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}


async function makeTextWithURL(url) {
    try {
        let response = await axios.get(url);
        generateText(response.data);
    } catch (err) {
        console.error(`Error reading ${url}: ${err}`);
        process.exit(1);
    }
}

let method = process.argv[2];
let path = process.argv[3];

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeTextWithURL(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}