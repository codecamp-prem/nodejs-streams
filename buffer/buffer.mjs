const buffer = Buffer.alloc(5);
buffer.fill("hi", 0, 2);
buffer.fill(0x3a, 2, 3); //0x3a hexadecimal char code for :
buffer.fill(0x29, 4, 5); // )
// error when it reaches max value
// buffer.fill('a', 5, 6)
// it should move to another buffer

const anotherBuffer = Buffer.alloc(6);
anotherBuffer.set(buffer, buffer.byteOffset);
anotherBuffer.fill("four", 5, 6);

console.log(buffer.toString(), buffer, buffer.byteLength); //hi:) <Buffer 68 69 3a 00 29> 5

console.log(anotherBuffer.toString(), anotherBuffer, anotherBuffer.byteLength); // hi:)f <Buffer 68 69 3a 00 29 66> 6

// or with fill data/pre allocated or same thing with Buffer.from
const msg = "Hello there!";

const preAllocated = Buffer.alloc(msg.length, msg);
console.log(preAllocated.toString(), preAllocated, preAllocated.byteLength);
//Hello there! <Buffer 48 65 6c 6c 6f 20 74 68 65 72 65 21> 12
// with Buffer.from()
const withBufferFrom = Buffer.from(msg);
console.log(
  withBufferFrom.toString(),
  withBufferFrom,
  withBufferFrom.byteLength
);
//Hello there! <Buffer 48 65 6c 6c 6f 20 74 68 65 72 65 21> 12

// ------- converting char code to hexadecimal
const str = "Hello Universe";
const charCodes = [];
const bytes = [];
for (const index in str) {
  // 1st to char code from char
  const code = str.charCodeAt(index);
  // then char code to hexa decimal
  const byteCode = "0x" + Math.abs(code).toString(16);
  charCodes.push(code);
  bytes.push(byteCode);
}

console.log("====================================");
console.log({
  charCodes,
  bytes,
  contentFromCharCodes: Buffer.from(charCodes).toString(),
  contentFromHexaBytes: Buffer.from(bytes).toString(),
});
/* output
 {
    charCodes: [
       72, 101, 108, 108, 111,
       32,  85, 110, 105, 118,
      101, 114, 115, 101
    ],
    bytes: [
      '0x48', '0x65', '0x6c',
      '0x6c', '0x6f', '0x20',
      '0x55', '0x6e', '0x69',
      '0x76', '0x65', '0x72',
      '0x73', '0x65'
    ],
    contentFromCharCodes: 'Hello Universe',
    contentFromHexaBytes: 'Hello Universe'
  }*/
console.log("====================================");
