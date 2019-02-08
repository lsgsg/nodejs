// 무지 어려운 거니깐 계쏙 봐야 한다.
// 이해도 하기 전에 익숙해질 수 있다.
// 분명히 알고 있는데 설명이 안되는것
// 이건 이해를 한게 아니라 익숙해진 것

// 함수의 성격을 한번 보자 a라는 함수를 정의 했을때

// function a(){
//     console.log('A')
//
// }

var a = function(){
    console.log("A");
}
// a라는 변수에 함수를 값으로 두었다
// 자바스크리트는 함수가 값이다.

//a();

function slowfunc(callback){
    // 아주 느리다고 가정하자.
    callback();
}

slowfunc(a)
// showfunc의 argument는 a라는 이름의 함수가 실행될것이다.
