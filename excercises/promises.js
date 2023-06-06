'use strict'

const fs = required('fs');

function readFileValue(filePath) {
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, function(err, data){
            if(err){
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}

readFileValue('promises.js')
.catch(function(error){
    console.error("An error occurred" + error)
})
.then(function(value) {
    console.log('The value of the file is so long: ' + value.length)
});