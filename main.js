var http = require('http');
var fs = require('fs');
var url = require('url'); // url이란 모듈을 url이란 이름으로 쓰겠다.
// 모듈 : nodejs의 수많은 기능들을 비슷한것끼리 그룹핑한것을 모듈이라고 한다.
//

// refactoring : 내부의 코드를 개선한다.
// 함수와 같은 것을 사용해서 처음부터 코드를 쓴다는 건 천재나 하는 것
// 그 고수도 처음부터 그렇게 한것은 아닐거다.
// 투박해도 동작하는 코드를 짠 다음에 리팩토링 하는 것이 중요하다.


var qs = require('querystring') ;
var template = {
     HTML : function (title, list, body, control){
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
          ${control}
          ${body}
        </body>
        </html>
        `
    },
    list : function (filelist){
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
                // var list = templateList(filelist);
                // var template = templateHTML(
                //     title,
                //     list,
                //     `<h2>${title}</h2>${description}`,
                //     `<a href="/create">create</a>`
                // );
                // response.writeHead(200);
                // response.end(template);

                var list = template.list(filelist);
                var html = template.HTML(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(html);
            });


                // }); title과 description을 문자로 받로 받기 때문에 function이 필요 없다.

            } else {
            fs.readdir('./data', function(err, filelist){

                fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
                var title = queryData.id
                var list = template.list(filelist);
                var html = template.HTML(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>
                     <a href="/update?id=${title}">update</a>
                     <form action="delete_process" method="post">
                         <input type="hidden" name="id" value="${title}">
                         <input type="submit" value="delete">
                     </form>
                    `
                );
                response.writeHead(200);
                response.end(html);
            })

            });
        }



    } else if(pathname === '/create'){

        fs.readdir('./data',function(err, filelist){
            var title = "WEB - create";

            var list = template.list(filelist);
            var html= template.HTML(title, list, `
                <form action="/create_process" method = "post">
                    <p><input type = "text" name = "title" placeholder="title"></p>
                    <p>
                        <textarea name="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `,
            '');

            response.writeHead(200);
            response.end(html)
        })

    } else if ( pathname === "/create_process"){
        // 검색 node js write file

        var body = "";
        request.on('data', function(data){ // callback부분
            // request.on data는 웹브라우저가 post 방식으로 데이터를 전송할때,
            // 데이터가 엄청많다고 가정했을 때, 그 데이터를 한번에 처리하는 것은  프로그램에 문제가 생길 수 있다.
            // 그래서 nodejs에서는 post방식으로 전송되는 데이터가 많은 경우를 대비해서 어떤 특정한
            // 만약 100이 있으면 조각조각의 양들을 서버쪽에서 수신할때마다 서버는 callback함수를 호출하게 되어있다.
            // 그리고 호출할 때 data란느 인자를 통해 수신한 정보를 주는 것으로 약속되어 있다.
            body = body + data;
            // callback이 실행될때마다 data를 추가하주는 것
            // 조각조각 정보가 들어오다가... 정보가 끝이 나면 'end'에 해당되는 calback이 실행되도록 할것이다. ↓
        });
        request.on('end' , function(){
                var post = qs.parse(body);
                var title = post.title;
                var description = post.description;
                // 파일을 만든 뒤 callback함수를 사용하여 리다이렉션 한다.
                fs.writeFile(`data/${title}`, description,'utf8', function( err ){
                    response.writeHead(302, {Location : `/?id=${title}`});
                    // 리다이렉션 : 302
                    response.end();
                })
                //console.log(post.title);
        });
        //createServer는 nodejs 가 서버로 들어올때 마다 호출한다. 그때, 인자를 2개를 주는데 request에는 요청할때 웹브라우저가 우리에게 보낸 정보,
        // response는 응답할때 우리가 웹브라우저할때 전송할 정보를 말한다.
        // response.writeHead(200);
        // response.end("성공적이다!")
    } else if(pathname === "/update"){
        fs.readdir('./data', function(err, filelist){
            fs.readFile(`data/${queryData.id}`,'utf8',function(err, description){
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                `
                <form action="/update_process" method = "post">
                    <input type="hidden" name="id" value=${title}>
                    <p><input type = "text" name = "title" value = ${title}></p>
                    <p>
                        <textarea name="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>

                `,
                `<a href="/create">create</a>
                 <a href="/update?id=${title}">update</a>`
            );
            response.writeHead(200);
            response.end(html);
            })
        })
    } else if(pathname === "/update_process"){
        var body = '';
        request.on('data', function(data){
            body = body + data

        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id
            var title = post.title;
            var description = post.description;


            // nodejs file rename 검색
            // fs.rename(oldPath, newPath)
            fs.rename(`data/${id}`,`data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8',
                function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            })
        })
    }  else if(pathname === "/delete_process"){
        // nodejs delete file 검색
        // 첫번째 검색결과 -> fs.unlink
        var body = '';
        request.on('data', function(data){
            body = body + data

        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {location:`/`})
                response.end();
            })
        });
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
