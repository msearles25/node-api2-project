const server = require("./api/server.js");

const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
