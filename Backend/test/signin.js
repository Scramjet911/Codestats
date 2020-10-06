let chai = require('chai');
let chaihttp = require('chai-http');
// let {app} = require('../app');
const { CreateUser, DeleteUser } = require('./database');
let should = chai.should();

// let headers = {'Accept':'application/json','Content-Type':'application/json'}
chai.use(chaihttp);

module.exports = (app)=>{
    describe('Login', ()=>{
        // before(()=>{
        //     CreateUser("testuser");
        //     // done();
        // });
        it("Should Not Login",(done)=>{
            chai.request(app)
            .post('/api/signin')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({email:"testuser@gmail.com", password:"wrongpassword"})
                .end((ignore,res)=>{
                    res.should.not.have.status(200);
                    done();
                });
        });
        it("Should Login",(done)=>{
            chai.request(app)
                .post('/api/signin')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({email:"testuser@gmail.com", password:"testuser"})
                .end((ignore,res)=>{
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('_id');
                    res.body.user.should.have.property('username');
                    res.body.user.should.have.property('name');
                    res.body.user.should.have.property('email');
                    res.body.user.should.have.property('role');
                    done();
                });
        });
        // after(()=>{
        //     DeleteUser("testuser");
        //     // done();
        // });
    });
}