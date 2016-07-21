var r = require('rethinkdb');
var connection = null;
var fs = require('fs');
fs.readFile('./cacert', function(err, caCert) {
  r.connect({
    host: 'aws-us-east-1-portal.19.dblayer.com',
    port: 11419,
    authKey: '79j5u5xRR4E1f6R3aKNeeoT0bTRxIOlAay3vobqU',
    ssl: {
      ca: caCert
    }
  }, function(error, conn) {
      connection = conn;
      r.table('authors').get('22db1aeb-e867-41ff-9d0e-d08dbd3d0c79')
      .run(connection, function(err, cursor){
        if(err) throw err;
        /*cursor.toArray(function(err, result){
          if(err) throw err;
        })*/
        console.log(JSON.stringify(cursor, null, 2));
      });
  });
});
