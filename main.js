var http = require('http');
var fs = require('fs');
var url = require('url'); // url이란 모듈을 url이란 이름으로 쓰겠다.
// 모듈 : nodejs의 수많은 기능들을 비슷한것끼리 그룹핑한것을 모듈이라고 한다.
//
var app = http.createServer(function(request,response){
    //var url = request.url;
    var _url = request.url;
    //console.log(_url);
    var queryData = url.parse(_url, true).query;
    console.log(queryData);
    // 검색 : nodejs url parse(분석) query string
    // url.parse(request.url)
    // queryData로 출력되는 것은? :
    // localhost:3000?id=css
    // 결과 ->{id : css}
    var title = queryData.id
    if(_url == '/'){
      //  = '/index.html';
      title = "Welcome"
    }
    if(_url == '/favicon.ico'){
      //return response.writeHead(404);
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
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
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title} </title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <!--if문에 걸린다.홈으로 갔을 때 index.html로..-->
      <ol>
        <li><a href="1.html?id=HTML">HTML</a></li>
        <li><a href="2.html?id=CSS">CSS</a></li>
        <li><a href="3.html?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
      </p>
    </body>
    </html>
`
    response.end(template);
    //response.end(queryData.id);
    // response.end(fs.readFileSync(__dirname + _url);
    //response.end('egoing : ' + url)
    // egoing : /1.html
    // node.js는 사용자에게 전송하는 데이터가 바뀐다는 것이다. (여기에 무엇을 위치시키느냐에 따라...)
    // 사용자에게 전송할 데이터를 생성한다라는 것이 nodejs의 힘이다.


});
app.listen(3000);
