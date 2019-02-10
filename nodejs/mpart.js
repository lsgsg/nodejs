var M = {
    v : 'v',
    f : function (){
        console.log(this.v);
    }
}

module.exports = M
// 약속이다.! 그러려니 해라
// mpart.js에 있는 여러 기능들 중에 M이 가리키는 저 모듈을
// 바깥에서 사용할 수 있도록 export 한것이다.
