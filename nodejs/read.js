var testFolder = './data';
var fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//         console.log()
//     })
// })

fs.readdir(testFolder, function (err, filelist) {
    console.log(filelist)
})
// 결과
// C:\work\nodejs>node nodejs/read.js
// [ 'CSS', 'HTML', 'Javascript' ]
