// console.log(true)
//논리연산자는 true와 false로 이루어져 있다.
// true = 1 -> err Y? 변수 이름으로 사용할 수 없다. boolean의 데이터 타입으로 약속했기 때문에
//console.log(1 == 1); // true의 표현식 true
//console.log(1 == 2); // false
// 비교연산자 : 좌항과 우항을 비교하여 true 아니면 false를 return
// 프로그램이라고 하는 이것은 입력에 대햐여 결과를 출력하는 기계이다.
// 입력을 부르는 여러가지 표현 parameter : 입력되는 정보의 형, argument : 그형식에 맞게 실제로 입력한
// input + output = IO
// nodejs console input parameters
var args = process.argv;
console.log(args)

// [ 'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\work\\nodejs\\boolean.js',
//   'egoing' ]
// 배열의 형식으로 값이 불러왔다.
// 이중에 첫번째 줄은 nodejs runtime이 어느 위치에 있는지
// 두번째 줄 실행시킨 경로
// 3번째 경로
// C:\work\nodejs>node boolean.js egoing seulki
// [ 'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\work\\nodejs\\boolean.js',
//   'egoing',
//   'seulki' ]
console.log(args[2])// egoing
