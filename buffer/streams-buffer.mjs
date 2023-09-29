// First create text.txt file with this cmd
// for i in `seq 1 100`; do node -e "process.stdout.write('$i-hello world \n')" >> text.txt; done

import { readFile } from "fs/promises";

const data = (await readFile("./text.txt")).toString().split("\n");
const LINES_PER_ITERATION = 10;
const interations = data.length / LINES_PER_ITERATION; // 10 in 10 lines(not bytes)
let page = 0;
for (let index = 0; index < interations; index++) {
  const chunk = data.splice(page, (page += LINES_PER_ITERATION)).join("\n");

  const buffer = Buffer.from(chunk);

  const amountOfBytes = buffer.byteOffset;
  const bufferData = buffer.toString().split("\n");
  const amountOfLines = bufferData.length;

  // now the bufferData would be splitted and processed individually on demand
  console.log(
    "processing",
    bufferData,
    `lines: ${amountOfLines}, bytes: ${amountOfBytes}`
  );
}
// if it was a big file, it would crash or make program slow,sluggish
// fix is using a node.js streams

/*
processing [
  '1-hello world ',
  '2-hello world ',
  '3-hello world ',
  '4-hello world ',
  '5-hello world ',
  '6-hello world ',
  '7-hello world ',
  '8-hello world ',
  '9-hello world ',
  '10-hello world '
] lines: 10, bytes: 16
.....
....
....
....
....
....
....
....
processing [
  '91-hello world ',
  '92-hello world ',
  '93-hello world ',
  '94-hello world ',
  '95-hello world ',
  '96-hello world ',
  '97-hello world ',
  '98-hello world ',
  '99-hello world ',
  '100-hello world ',
  ''
] lines: 11, bytes: 968
*/
