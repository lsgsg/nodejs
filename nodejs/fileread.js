// node nodejs/fileread.js
// 우리가 필요한것은 file system이다.

var fs = require('fs');
fs.readFile('sample.txt','utf8',function(err, data){
    console.log(data);
//     C:\work\nodejs\nodejs>node fileread.js
// <Buffer ea b6 81 ea b7 b9 ec a0 81 ec 9c bc eb a1 9c 20 ec a0 80 ed 9d ac eb 8a 94 20 eb 88 84 ea b5 ac eb 82 98 20 ec 98 ac eb b0 94 eb a5 b8 20 eb b2 95 ec ... > -- utf8 없었을때,

// C:\work\nodejs\nodejs>node fileread.js
// 궁극적으로 저희는 누구나 올바른 법적 도움을 받을 수 있도록 법률 시장을 혁신해서 모든 사람이 장벽없이 필요한 법률적 도움 을 받는 세상을 만들고 싶습니다. ----> utf8 설정 후 ..


//cd .. 부모디렉토리로 가는 것

})
