var http = require('http');
var fs = require('fs');
var url = require('url'); // url이란 모듈을 url이란 이름으로 쓰겠다.
// 모듈 : nodejs의 수많은 기능들을 비슷한것끼리 그룹핑한것을 모듈이라고 한다.
//

function templateHTML(title, list, body){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title} </title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <!--if문에 걸린다.홈으로 갔을 때 index.html로..-->
      ${list}
      ${body}
    </body>
    </html>
    `
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `
        <li>
            <a href= "/?id=${filelist[i]}">
                ${filelist[i]}
            </a>
        </li>`
        i = i + 1;
    }
    list = list + '</ul>'
    return list;
}

var app = http.createServer(function(request,response){
    //var url = request.url;
    var _url = request.url;
    //console.log(_url);
    var queryData = url.parse(_url, true).query;
    // console.log(queryData);
    // 검색 : nodejs url parse(분석) query string
    // url.parse(request.url)
    // queryData로 출력되는 것은? :
    // localhost:3000?id=css
    // 결과 ->{id : css}
    //var title = queryData.id

    //not found 구현
    //console.log(url.parse(_url, true))
    // 주어진 url 정보를 분석해서 보여줌
    // C:\work\nodejs>node main.js
    // Url {
    // protocol: null,
    // slashes: null,
    // auth: null,
    // host: null,
    // port: null,
    // hostname: null,
    // hash: null,
    // search: null,
    // query: {},
    // pathname: '/',
    // path: '/',
    // href: '/' }
    // console.log(url.parse(_url, true).pathname);
    var pathname = url.parse(_url, true).pathname;

    //nodejs file list in derectory

    if(pathname === "/"){
        if(queryData.id === undefined){

            //var description = "Hello, Node.js";
            //fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){

            fs.readdir('./data', function(err, filelist){
                // console.log(filelist);
                // 결과
                //  C:\work\nodejs>node main.js
                // [ 'CSS', 'HTML', 'Javascript' ]
                var title = "welcome";
                var description = " Hello, Node.js "
                /* var list = `
                <ol>
                  <li><a href="1.html?id=HTML">HTML</a></li>
                  <li><a href="2.html?id=CSS">CSS</a></li>
                  <li><a href="3.html?id=JavaScript">JavaScript</a></li>
                </ol>
                `*/
                var list = templateList(filelist);
                var template = templateHTML(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`
                );
                response.writeHead(200);
                response.end(template);
            });


                // }); title과 description을 문자로 받로 받기 때문에 function이 필요 없다.

            } else {
            fs.readdir('./data', function(err, filelist){

                fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
                var title = queryData.id
                var list = templateList(filelist);
                var template = templateHTML(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`
                );
                response.writeHead(200);
                response.end(template);
            })

            });
        }



    } else {
        response.writeHead(404);
        // 웹서버와 웹브라우저 사이에서 작동여부.. 기계와 기계가 통신하는 아주 간결한 약속 , 성공적이다. 200
        // 파일을 못찾겠다. 404,
        // 이 페이지는 문제가 있다. 500
        response.end("not found")
    }


    // if(_url == '/'){
    //   //  = '/index.html';
    //   title = "Welcome"
    // }
    // if(_url == '/favicon.ico'){
    //   //return response.writeHead(404);
    //     response.writeHead(404);
    //     response.end();
    //     return;
    // }
    // response.writeHead(200);
    //console.log(__dirname + _url);
    //C:\work\nodejs/index.html
    // __main.js가 위치하는 디렉토리이고
    // index.html 사용자가 요청하는 url이 전달 되었기 때문이다.
    //C:\work\nodejs/1.html
    // C:\work\nodejs/coding.jpg
    // 사용자가 요청할때마다 접근할때마다 우리는 자바스크립트를 통해서 이 코드를 사용해서 우리가 읽어드리게될 파일을 만들거다.
    // 이것을 read할거다. 이 명령어가 nodejs의 기능이다.
    // 그경로에 의한 파일을 읽어서
    // response.end(이 위치에 위치시키는 것이다. )


    // 정적인 html파일을 복사 붙여넣기하여 동적인 웹페이지를 만들어보자
    // queryString으로 바뀌었으면 하는 것을 `${}` 로 바꾸었다.
    // a태그를 클릭했을때도 바꾸고 싶다면 ?id=HTML

    // fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
    // var template = `
    // <!doctype html>
    // <html>
    // <head>
    //   <title>WEB1 - ${title} </title>
    //   <meta charset="utf-8">
    // </head>
    // <body>
    //   <h1><a href="/">WEB</a></h1>
    //   <!--if문에 걸린다.홈으로 갔을 때 index.html로..-->
    //   <ol>
    //     <li><a href="1.html?id=HTML">HTML</a></li>
    //     <li><a href="2.html?id=CSS">CSS</a></li>
    //     <li><a href="3.html?id=JavaScript">JavaScript</a></li>
    //   </ol>
    //   <h2>${title}</h2>
    //   <p>${description}</p>
    // </body>
    // </html>
    // `
    // response.writeHead(200);
    // response.end(template);
    // });

    //response.end(queryData.id);
    // response.end(fs.readFileSync(__dirname + _url);
    //response.end('egoing : ' + url)
    // egoing : /1.html
    // node.js는 사용자에게 전송하는 데이터가 바뀐다는 것이다. (여기에 무엇을 위치시키느냐에 따라...)
    // 사용자에게 전송할 데이터를 생성한다라는 것이 nodejs의 힘이다.


});
app.listen(3000);
