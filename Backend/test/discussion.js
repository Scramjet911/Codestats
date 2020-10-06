let chai = require('chai');
let chaihttp = require('chai-http');
let should = chai.should();


chai.use(chaihttp);

module.exports = (app, userdets, admindets)=>{
    describe('Discussion', ()=>{
        let discussdets = {
            title : "Test Discussion",
            category : ["test", "coding"],
            body : "This is a test Discussion"
        };
        describe('GET Discussions',()=>{
            it('Get all Discussions', (done)=>{
                chai.request(app)
                    .get('/api/discussion/')
                    .end((ignore, res)=>{
                        res.should.have.status(201);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        }); 
        describe('Add New Disscusison',()=>{
            it("Shouldn't Add Discussion without Login", (done)=>{
                chai.request(app)
                    .post(`/api/discussion/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .send(discussdets)
                    .end((ignore,res)=>{
                        res.should.not.have.status(201);
                        done();
                    })
            });
            it("Should Add Discussion with Login", (done)=>{
                chai.request(app)
                    .post(`/api/discussion/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .send(discussdets)
                    .end((ignore,res)=>{
                        res.should.have.status(201);
                        done();
                    })
            });
        });
        describe("Update Discussion", ()=>{
            let discuss;
            before((done)=>{
                chai.request(app)
                    .post(`/api/discussion/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .send(discussdets)
                    .end((ignore, res)=>{
                        if(res.status === 201){
                            discuss = res.body;
                            done();
                        }
                    })
            });
            it("Shouldn't Update Discussion Without Login", (done)=>{
                chai.request(app)
                    .put(`/api/discussion/${userdets.user._id}/${discuss._id}`)
                    .set('Content-Type', 'application/json')
                    .send({title:"Updated Test Discussion"})
                    .end((ignore,response)=>{
                        response.should.have.status(401);
                        done();
                    })
            });
            it("Should Update Discussion With Login", (done)=>{
                chai.request(app)
                    .put(`/api/discussion/${userdets.user._id}/${discuss._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .send({title:"Updated Test Discussion"})
                    .end((ignore,response)=>{
                        response.should.have.status(201);
                        response.body.title.should.be.eql("Updated Test Discussion")
                        done();
                    })
            });
        })
        describe("Delete Discussion", ()=>{
            let discuss;
            before((done)=>{
                chai.request(app)
                    .post(`/api/discussion/${userdets.user._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .send(discussdets)
                    .end((ignore, res)=>{
                        if(res.status === 201){
                            discuss = res.body;
                            done();
                        }
                    })
            });
            it("Shouldn't Delete Discussion Without Login", (done)=>{
                chai.request(app)
                    .put(`/api/discussion/${userdets.user._id}/${discuss._id}`)
                    .set('Content-Type', 'application/json')
                    .end((ignore,response)=>{
                        response.should.have.status(401);
                        done();
                    })
            });
            it("Shouldn't Delete Discussion With Different User", (done)=>{
                chai.request(app)
                    .put(`/api/discussion/${admindets.user._id}/${discuss._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${admindets.token}`)
                    .end((ignore,response)=>{
                        response.should.have.status(400);
                        done();
                    })
            });
            it("Should Delete Discussion With Creator User", (done)=>{
                chai.request(app)
                    .put(`/api/discussion/${userdets.user._id}/${discuss._id}`)
                    .set('Content-Type', 'application/json')
                    .set('Authorization',`Bearer ${userdets.token}`)
                    .end((ignore,response)=>{
                        response.should.have.status(201);
                        done();
                    })
            });
        });

    });
}