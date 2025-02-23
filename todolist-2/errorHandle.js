function errorHandle(res) {
  const headers = {
    'Access-Control-Allows-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }
  res.writeHead(400, headers);
  res.write(JSON.stringify(
    {
      'status': 'false',
      'message': '欄位未填寫正確或無此 todo list'
    }
  ));
  res.end();
}
module.exports = errorHandle;