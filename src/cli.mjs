#!/usr/bin/env node

import { exec } from "child_process";
import paths from "./constants/paths.mjs";

const [, , command] = process.argv;

if (command === "init") {
    exec(`node ${paths.scriptInit}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`validate-env Error: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
} else if (command === "generate") {
    exec(`node ${paths.scriptGenerate}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`validate-env Error: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
} else {
    console.log("Usage: validate-env <command>");
    console.log("Commands:");
    console.log("  init      Run to create the config file");
    console.log("  generate  Run to generate env.example file");
}
