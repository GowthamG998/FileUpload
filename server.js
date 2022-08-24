const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./db');
const mongoose = require('mongoose');
const {createProxyMiddleware} = require('http-proxy-middleware')
const PORT = Number(5000);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));// static path setting for all uploads directory

app.use(cors());
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect(config.dbHost,{ useNewUrlParser: true}, (err) => {
     if(err) throw err;
     console.log(`mongodb connected`)
})

app.use('/api', require('./route/fileRoute'));
app.use('/api', createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true }));

/* default route */
app.use('/*', (req,res) => {
    return res.status(404).json({msg: "requested Path not found"});
});

app.listen(PORT, () => {
    console.log(`server is up and running @ http://localhost:${PORT}`);
})