

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// import route files (middle wires)
const logger = require("./middlewares/logger"); 
const{notFound,errorHandler} = require("./middlewares/error");
const comments = require('./routes/commentRouter');
const materials = require('./routes/sale-materialsRouter');
const tools = require('./routes/sale-toolsRouter');
const finishedProjects = require('./routes/finished-projectsRouter');
const likes = require('./routes/likeRouter');

app.use(express.json());

//middle wires
app.use(logger)




//  routes
app.use(bodyParser.json());
app.use('/api/materials', materials);
app.use('/api/tools', tools);
app.use('/api/finishedProjects', finishedProjects);
app.use('/api/comments', comments);
app.use('/api/likes', likes);

//error handling after routes

app.use(notFound);


app.use(errorHandler);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
