let chai = require('chai');
let chaihttp = require('chai-http');
let should = chai.should();


chai.use(chaihttp);

module.exports = (app, userdets, admindets)=>{
    describe('Events', ()=>{
        // console.log(userdets, admindets);
        let eventdets = {
            title:"Test Event", 
            location:"Test Location", 
            date:new Date().toISOString(),
            duration:69
        };
        
        describe('GET Events',()=>{
            it('Get all Events', (done)=>{
                chai.request(app)
                    .get('/api/event/')
                    .end((ignore, res)=>{
                        res.should.have.status(201);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
        
        describe('Add Review Event',()=>{
            it("Shouldn't Add Review Event without Login", (done)=>{
                chai.request(app)
                    .post(`/api/review-event/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .send(eventdets)
                    .end((ignore,res)=>{
                        res.should.not.have.status(201);
                        done();
                    })
            });
            it("Should Add Review Event with Login", (done)=>{
                chai.request(app)
                    .post(`/api/review-event/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .send(eventdets)
                    .end((ignore,res)=>{
                        res.should.have.status(201);
                        done();
                    })
            });
        });

        describe('Add Event (Admin)',()=>{
            it("Shouldn't Add Review Event without Login", (done)=>{
                chai.request(app)
                    .post(`/api/event/${admindets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .send(eventdets)
                    .end((ignore,res)=>{
                        res.should.not.have.status(201);
                        done();
                    })
            });
            it("Shouldn't Add Event with Non-Admin Login", (done)=>{
                chai.request(app)
                    .post(`/api/event/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .send(eventdets)
                    .end((ignore,res)=>{
                        res.should.not.have.status(201);
                        done();
                    })
            });
            it("Should Add Event with Admin Login", (done)=>{
                chai.request(app)
                    .post(`/api/event/${admindets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${admindets.token}`)
                    .send(eventdets)
                    .end((ignore,res)=>{
                        res.should.have.status(201);
                        done();
                    })
            });
        });
    });
}