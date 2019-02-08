f123();
console.log('A');
console.log('Z');
console.log('C');
console.log('A');
f123();

/// 똑같은 코드라는 것을 확인 할 수 있다.
// 추가가 있다면 f123()을 호출하는 1억개의 메소드들을 한번에 바꿀 수 있따.


function f123() {
    console.log(1);
    console.log(2);
    console.log(3)
}

// 함수의 입력과 출력
// 자바스크립트가 기본적으로 가지고 있는 함수 내장 객체 내장함수 .
Math.round(1.6) // Math객체에 round라는 메소드를 가지고 있다. : 반올림
 // 메소드를 가지고 있는 객체를 derectory로 비유 할 수 있다.
 // 입력값에 따라 round가 어떤 메커니즘을 가지는 지는 알 수 없지만 결과가 나온다. 우리도 만들 수 있다.

 sum(2,4) // 첫번째 입력값 + 두번째 입력값 = 결과 // 여기서 값을 전달하는 변수를 argument라고 한다.  각각의 입력값 하나하나를 argument 인자라고 하낟.

function sum(first, second){ // argument를 받는 값을 전달받는 변순를 parameter라고 한다.
    // console.log(first + second)
    // consoellog를 지우고 return을 통해 순수한 값만 가져 오게 한다.

    return first + second;
    // return은 함수의 값을 보내준다는 의미가 있고 이 함수를 종료하겠다는 2가지의 의미가 있다. 

    // sum이란 함수의 첫번째 값을 매개해주는 매개함수가 필요하다.
    // 입력값을 받을 수 있고 그에 따라 다르게 결과가 나올 수 있다.
}

sum(2,4) // 바로 출력되는데
Math.round(1.6) // 이건 출력되지 안흔다 console.log()로 묶어야한다.
// sum()이 더 좋아보이겠지만
// 나의 의지와 상관없이 늘 출력되기때문에 융통성이 있지는 않다.


//우리도 sum()의 메소드의 결과값을 순수하게 값만 가져 오고 싶다면
