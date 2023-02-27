const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const openApiDocumentation = require('../openapi.json');

const {
	itemRoutes,
} = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', (req, res) => {
	res.json({
		status: true
	})
});

app.use('/item', itemRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// Connect to mongoDB
let mongoDB = process.env.MONGODB_URL || "mongodb://localhost:27017/express-api-unit-test-starter";
mongoose.connect(mongoDB, {
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, '❌❌❌ MongoDB Connection Error ❌❌❌'));

module.exports = app;