const http = require('http');
const app = require('./app');

const port = process.env.port || 3000;
const server = http.createServer(app);



server.listen(port, () => console.log(`Server listening at http://localhost:${port} Swagger docs en http://localhost:3000/api-docs`));
