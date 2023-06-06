'use strict'

function simulateDelay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    }) 
}

async function addAfterDelay(a, b, ms){
    await simulateDelay(ms);
    console.log(a + b);
}

addAfterDelay(3, 7, 3000);