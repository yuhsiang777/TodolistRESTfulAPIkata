const http = require('http');
const { v4: uuidv4 } = require(uuid);
const errHandle = require('./errorHandle');

const todos = [];

const headers = {
  'Access-Control-Allows-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

const requestListener = function (req, res) {
  if (req.url == "/todos" && req.method == 'GET') {
    res.writeHead(200, headers);
    res.write(JSON.stringify(
      {
        'status': 'succees',
        'data': todos,
      }
    ));
    res.end();
  } else if (req.url == "/todos" && req.method == 'POST') {
    req.on('end', function () {
      try {
        const title = JSON.parse(body).title;

        if (title !== undefined) {
          const obj = {
            'title': title,
            'id': uuidv4
          };

          todos.push(obj);
          res.writeHead(200, headers);
          res.write(JSON.stringify(
            {
              'status': 'succees',
              'data': todos,
            }
          ));
          res.end();
        } else {
          errHandle(res)
        }

      } catch (error) {
        errHandle(res)
      }
    })
  } else if (req.url == "/todos" && req.method == 'DELETE') {
    todos.length = 0;

    res.writeHead(200, headers);
    res.write(JSON.stringify(
      {
        'status': 'succees',
        'data': todos,
      }
    ));
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(JSON.stringify({
      'status': 'false',
      'data': 'not web'
    }));
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(3005);