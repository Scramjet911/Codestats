process.env.NODE_ENV = 'test';

let sinon = require('sinon');
let chai = require('chai');
let chaihttp = require('chai-http');
let {app, server} = require('../app');
const {CreateUser, DeleteUser, CreateAdmin, ClearAllCollections} = require('./database');

chai.use(chaihttp);

// sinon.stub(console,"log");
sinon.stub(console,"error");

let userdets, admindets;

let testfiles = ['event',
                 'discussion',
                ];
before((done)=>{

    // ClearAllCollections();
    CreateUser("testuser"); 
    CreateAdmin("testadmin");
    chai.request(app)
        .post('/api/signin')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({email:"testuser@gmail.com", password:"testuser"})
        .end((ignore,res)=>{
            if(res.status === 200){
                userdets = res.body;
            }
        })

    chai.request(app)
        .post('/api/signin')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({email:"testadmin@gmail.com", password:"testadmin"})
        .end((ignore,response)=>{
            if(response.status === 200){
                admindets = response.body;
                // console.log(userdets, admindets);
                done();
            }
        })
})
describe("Website API Test", ()=>{
    it("Should Import All Test Files",()=>{
        require('./signin')(app);
        testfiles.forEach(test=>{
            require(`./${test}`)(app, userdets, admindets);
        });
    })
})

after(async ()=>{
    DeleteUser("testadmin");
    DeleteUser("testuser");
    await ClearAllCollections();
    server.close(()=>{
        process.exit(0);
    });
});