
'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


function printStacks(){
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

 //move pieces
function movePiece(token, startStack, endStack){
  
 
  // move the pieces
  startStack.pop(token); 
  endStack.push(token); 

  //check for win  
  if(checkForWin()){
    console.log('Congratulations, you won the game!'); 
  }else{
    return false; 
  }

}


function isLegal(startStack, endStack){
  
  // string inputs 
  if(typeof startStack !== 'string' || typeof endStack !== 'string'){
    
    return false; 
  }

  //for loop for objects
  for(let key in stacks){

    //key in  array
    if(Array.isArray(stacks[key]) === false){
     return false; 
    }
  }


  // trim and make lowercase
  startStack = startStack.toLowerCase().trim(); 
  endStack = endStack.toLowerCase().trim(); 

  //input a b c
  if((startStack !== 'a' && startStack !== 'b' && startStack !== 'c') || (endStack !== 'a' && endStack !== 'b' && endStack !== 'c')){
    return false; 
  }
  startStack = stacks[startStack]; 
  endStack = stacks[endStack]; 
 
  let lastTokenOfStartStack = startStack[startStack.length -1]; 
  let lastTokenOfEndStack = endStack[endStack.length -1];

  
  if(endStack.length === 0){ 
    movePiece(lastTokenOfStartStack, startStack, endStack); 
    return true; 
  }else if(lastTokenOfStartStack < lastTokenOfEndStack){
    movePiece(lastTokenOfStartStack, startStack, endStack); 
    return true; 
  }else{
    return false; 
  } 

}


function checkForWin(){
  
  //for loop to go over input and check for win
  for(let key in stacks){
    if(stacks[key][0] === 4 && stacks[key][1] === 3 && stacks[key][2] === 2 && stacks[key][3] === 1){
      return true;  
    }
  }
  return false; 
}

//illegal move
function towersOfHanoi(startStack, endStack){
 
  if(isLegal(startStack, endStack)){
    return true;
    
  }else{
    console.log('Illegal move');
  }
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

  //4 additional tests 

  describe('isLegal', function(){
    it('should only allow string arguments as the input parameters for isLegal function', function(){
      let actual = isLegal(4, null);
      let expected = false; 
      assert.equal(actual, expected); 
    });

    it('should verify that the value of each key in stacks object is an array',function(){
      stacks = {
        a: [4, 3, 2, 1],
        b: {},
        c: []
      }; 
      let actual = isLegal('a', 'b');
      let expected = false; 
      assert.equal(actual, expected); 
    });

    it('should properly handle uppercase letters with whitespace for the start and end stacks',function(){
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      let actual = isLegal('A   ', '  B');
      let expected = true; 
      assert.equal(actual, expected); 
    });

    it('should check to see that the player is only using A, B, and C as the start and end stack inputs', function(){
      let actual = isLegal('g', 'f');
      let expected = false; 
      assert.equal(actual, expected); 
    });

  });
} else {

  getPrompt();

}