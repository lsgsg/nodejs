var fs = require('fs');

// readfileSync (동기적인것)
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt','utf8');
// console.log(result);
// console.log('C');

// abc 순차적으로 나왔다.
// 1. 파일이름


//
console.log('A'); // 비동기적인..
fs.readFile('syntax/sample.txt','utf8', function(err, result){
    //함수를 3번째 인자로 줘야한다.
    // nodejs가 실행시키면서 첫번째 인자는 에러를 두번 째 파라미터는 파일의 인자를 공급해 주는 것을 약속했다.
    console.log(result)
});
console.log(result);
console.log('C');


// callback이란?
// nodejs야 readfile이라는 기능을 사용해 근데 파일을 불러오는 건 느리니깐  작업이 끝난 다음에 끝났다는 신호를 보내줘  // 나중에 전화해 callback
//  작업이 끝난 후에 처리해야할일을 function 안에 배치해 놓으면 처리가 될것이다.
// 나중에 전화해 nodejs 한테 파일을 읽은다음에 함수를 호출함으로써 나를 불러! 이거 실행해!
