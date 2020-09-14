require('dotenv').config({path:__dirname+'/.env'});

const mongoose = require('mongoose');
const express=require('express');
const app=express();
const bodyParser= require('body-parser');
const cookieParser =require('cookie-parser');
const cors = require('cors');
const webpush = require('web-push');
const Agenda = require('agenda');
const http = require('http').Server(app);
// const http = require('http');
const {parse} = require('url');

// let httpServer;

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextapp = next({dev});
const nexthandle = nextapp.getRequestHandler();


const io = require('socket.io')(http);

// Routes
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const subscriberRoutes = require("./routes/subscribe");
const eventRoutes = require("./routes/events");
const articleRoutes=require("./routes/article");
const categoryRoutes =require("./routes/category");
const resourceRoutes =require("./routes/resources");
const chatRoutes = require("./routes/chat");
const { initSocket } = require('./controllers/chat');
const discussionRoutes=require("./routes/discussion")

// Webpush initialize with keys
webpush.setVapidDetails('mailto:massmenon@gmail.com',process.env.publicKey,process.env.privateKey);     


// Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false 
}).then(()=>{
    console.log("DB connected : "+process.env.DATABASE);
});

// Initiate Agenda Job services
const startAgenda = async () => {
    let agenda = new Agenda({db: {address : process.env.DATABASE, 
    processEvery : '5 minutes', options : {useNewUrlParser: true, useUnifiedTopology: true}}});
    await agenda.start();
    require('./jobs/notification')(agenda);
    app.agenda = agenda;

    // Set Indexes for Agenda Collection
    let agendaSchema = new mongoose.Schema({},{collection:'agendaJobs', strict:false});
    let agendaModel = mongoose.model('agendaJobs',agendaSchema);
    let indexes = await agendaModel.collection.getIndexes();
    if(!('user_event' in indexes)){
        await agendaModel.collection.createIndex({"data.eventId":1,"data.userId":1},{name:'user_event',sparse:'true'});
    }
};

startAgenda()
.catch(err=>console.error(err));

// Initiate Websocket
initSocket(io);

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/subscription",subscriberRoutes);
app.use("/api",eventRoutes);
app.use("/api",articleRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api",resourceRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/discussion",discussionRoutes);

nextapp.prepare().then(()=>{
    app.get('/*',(req, res)=>{
        const parsedUrl = parse(req.url, true);
        // const {pathname, query} = parsedUrl;
        // console.log(req.url);
        // nextapp.render(req,res,req.url);
            // console.log(pathname);
        
        // else{
            nexthandle(req,res,parsedUrl);
        // }
    });
});

const port = process.env.PORT || 8000;

http.listen(port,()=>{
    console.log(`http :${port}`);
});