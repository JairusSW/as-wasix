import fs from "node:fs";
import { execSync } from "node:child_process";

const REPO_URL = "https://github.com/wasix-org/wasix-abi-rust.git";
const REPO_REF = process.env.WASIX_ABI_REF || "main";
const CLONE_DIR = ".cache/wasix-abi-rust";
const INPUT = `${CLONE_DIR}/src/lib_generated32.rs`;
const OUTPUT = "assembly/bindings/wasix_32v1.ts";

prepareSource();

const source = fs.readFileSync(INPUT, "utf8");
const modMatch = source.match(/pub mod wasix_32v1 \{([\s\S]*)\n\}/m);
if (!modMatch) {
  throw new Error(`unable to locate wasix_32v1 extern module in ${INPUT}`);
}
const body = modMatch[1];

const lines = [
  "// Auto-generated from vendor/wasix-abi-rust/src/lib_generated32.rs",
  '// Source module: wasix_32v1 extern "C" imports',
  "",
  "export const WASIX_ERRNO_SUCCESS: i32 = 0;",
  "export const WASIX_ERRNO_NOSYS: i32 = 52;",
  "",
];

let count = 0;

const voidFnRegex = /pub fn\s+(\w+)\s*\(([^)]*)\)\s*;/gms;
for (const match of body.matchAll(voidFnRegex)) {
  const signature = match[0];
  if (signature.includes("->")) continue;

  const name = match[1];
  const args = parseArgs(match[2], name);
  lines.push("\n// @ts-expect-error: Decorators valid here");
  lines.push(`@external(\"wasix_32v1\", \"${name}\")`);
  lines.push(`export declare function ${name}(${args}): void;`);
  lines.push("");
  count++;
}

const typedFnRegex = /pub fn\s+(\w+)\s*\(([^)]*)\)\s*->\s*([^;]+);/gms;
for (const match of body.matchAll(typedFnRegex)) {
  const name = match[1];
  const args = parseArgs(match[2], name);
  const ret = match[3].trim();
  let returnType = "i32";
  if (ret === "!") returnType = "void";
  else if (ret !== "i32")
    throw new Error(`unexpected return type ${ret} in ${name}`);

  lines.push(`@external(\"wasix_32v1\", \"${name}\")`);
  lines.push(`export declare function ${name}(${args}): ${returnType};`);
  lines.push("");
  count++;
}

lines.push(`export const WASIX_BINDING_COUNT: i32 = ${count};`);
fs.writeFileSync(OUTPUT, lines.join("\n"));
console.log(`Generated ${OUTPUT} with ${count} imports.`);

function parseArgs(rawArgs, fnName) {
  const args = rawArgs.trim();
  if (!args) return "";
  return args
    .split(",")
    .map((arg) => arg.trim())
    .filter((arg) => arg.length > 0)
    .map((arg) => {
      const [argName, rustType] = arg.split(":").map((part) => part.trim());
      if (rustType === "i32" || rustType === "i64") {
        return `${argName}: ${rustType}`;
      }
      throw new Error(`unexpected arg type ${rustType} in ${fnName}`);
    })
    .join(", ");
}

function prepareSource() {
  fs.mkdirSync(".cache", { recursive: true });
  fs.rmSync(CLONE_DIR, { recursive: true, force: true });
  execSync(`git clone --depth 1 --branch ${REPO_REF} ${REPO_URL} ${CLONE_DIR}`, {
    stdio: "inherit",
  });
}
