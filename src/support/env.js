var {setDefaultTimeout} = require('cucumber');

setDefaultTimeout(process.env.DEFAULT_TIMEOUT || 60000);
