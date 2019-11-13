// Create a buffer
console.log('Create a new buffer (16 octects / 2 bytes)');
const simpleBuffer = new Buffer(2);
console.log(simpleBuffer);

// Write data
simpleBuffer.writeUInt16BE(0xdead, 0);

// Read data from the buffer
console.log('Read data from the buffer (16 octects / 2 bytes):');
console.log(simpleBuffer.readUInt16BE(0));

// Read more bytes than buffer size (4 bytes / 32 octets)
console.log('Read more bytes than buffer size (4 bytes / 32 octets):');
console.log(simpleBuffer.readUInt32BE(0, true));

// Read beyond the buffer size (2 bytes with offset = 2 bytes)
console.log('Read beyond the buffer size (2 bytes with offset = 2 bytes):');
console.log(simpleBuffer.readUInt16BE(2, true));
