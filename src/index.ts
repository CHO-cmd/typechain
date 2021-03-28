// class Human {
//   public name: string;
//   public age: number;
//   public gender: string;
//   constructor(name: string, age: number, gender: string) {
//     this.name = name;
//     this.age = age;
//     this.gender = gender;
//   }
// }

// const Jenny = new Human("Jenny", 24, "female");

// const sayHi = (person: Human): string => {
//   return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`
// };

// console.log(sayHi(Jenny));

import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timpestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timpestamp: number,
    data: string,
  ): string =>
    CryptoJS.SHA256(index + previousHash + timpestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.timpestamp === 'number' &&
    typeof aBlock.data === 'string';

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timpestamp: number,
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timpestamp = timpestamp;
  }
}

const genestsCBlock: Block = new Block(
  0,
  '2020200294398293',
  '',
  'hello',
  123456,
);

let blockchain: Block[] = [genestsCBlock];

// console.log(blockchain);

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previosBlock: Block = getLatestBlock();
  const newIndex: number = previosBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previosBlock.hash,
    newTimestamp,
    data,
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previosBlock.hash,
    data,
    newTimestamp,
  );

  addBlock(newBlock);
  return newBlock;
};

// console.log(createNewBlock("hello"), createNewBlock("bye"));

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timpestamp,
    aBlock.data,
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');

console.log(blockchain);

export {};
