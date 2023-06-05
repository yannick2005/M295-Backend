'use strict'

function double(number, callback){
    let result = number * 2;
    callback(result);
}

function printResult(result){
    console.log(result);
}

double(7, printResult)