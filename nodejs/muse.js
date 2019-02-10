// 모듈을 사용할 것이다.

// var M = {
//     v : 'v',
//     f : function (){
//         console.log(this.v);
//     }
// }


// 모듈을 가져 올때엔 require
var part = require('./mpart.js')
console.log(part) // -> mpart.js에 있는 객체가 결과값으로 나왔다.
// ./ 현재 디렉토리..
// M.f();
part.f(); // v


// 객체를 정리할 수 있는 더 큰 상자 : 모듈
// 파일로 쪼개서 웹으로 독립시킬 수 있다.
