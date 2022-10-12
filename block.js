const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(timestamp,lastHash,hash,data){

        this.timestamp = timestamp; // Zeitstempel
        this.lastHash = lastHash; // Hash des vorhergehenden Blocks
        this.hash = hash; // Eigener Hash
        this.data = data; // Daten
    }
    toString(){ // für Debugging-Zwecke
        return `Block -
        Timestamp:  ${this.timestamp}
        Last Hash:  ${this.lastHash}
        Hash:       ${this.hash}
        Data:       ${this.data}`
    }
    static genesis(){ // 1. Block der chain

        return new this("Genesis time","-----","xABc1234",["data1","data2,data3"]); // call constructor
    }
    static mineBlock(lastBlock,ownData){ // weitere Blocks in der Chain

        const timestamp = Date.now(); // Zeit im ms seit 01.01.1970 | UNIX
        const lastHash  = lastBlock.hash;
        const hash      = Block.hash(timestamp,lastHash,ownData);
        // Mining energy time consumption
        // Proof of work
        return new this(timestamp,lastHash,hash,ownData);
    }
    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}
module.exports = Block; // Export als Modul