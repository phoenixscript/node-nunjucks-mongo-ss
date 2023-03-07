;
const { expect } = require('chai');
const { app, getCountries, isError } = require('../src/app');
const request = require('supertest')

describe("isError function", () => {

    it('should return valid status if param is not found', async () => {
        const result = isError('sex', [{ val: '', msg: 'New Error', param: 'name' }, { val: '', msg: 'New Error', param: 'age' }])
        expect(result).to.eql("is-valid")
    })
    it('should return in valid status if param is  found', async () => {
        const result = isError('name', [{ val: '', msg: 'New Error', param: 'name' }, { val: '', msg: 'New Error', param: 'age' }])
        expect(result).to.eql("is-invalid")
    })
})


describe("getCountries function", () => {
    it('should get the list of countries as an array', async () => {
        const countries = await getCountries();
        expect(countries.length).to.be.greaterThan(0)
        // Testing randomly if the array includes 2 countries
        expect(countries).to.include.deep.members(["Denmark", "Finland"])
    })
})

describe('POST /', () => {

    it('should return an error if name is not provided', done => {
        request(app)
            .post('/')
            .type('form')
            .send({
                sex: 'Male',
                age: 25,
                country: 'USA'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Name is required');
                done();
            });
    });

    it('should return an error if sex is not provided', done => {
        request(app)
            .post('/')
            .type('form')
            .send({
                name: 'John Doe',
                age: 25,
                country: 'USA'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Please select an opton for sex');
                done();
            });
    });

    it('should return an error if age is not provided', done => {
        request(app)
            .post('/')
            .type('form')
            .send({
                name: 'John Doe',
                sex: 'male',
                country: 'USA'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Age must be number and not empty');
                done();
            });
    });

    it('should return an error if age is not a number', done => {
        request(app)
            .post('/')
            .type('form')
            .send({
                name: 'John Doe',
                sex: 'male',
                age: 'twenty-five',
                country: 'USA'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Age must be number and not empty');
                done();
            });
    });

    it('should return an error if country is not provided', done => {
        request(app)
            .post('/')
            .type('form')
            .send({
                name: 'John Doe',
                sex: 'male',
                age: 25
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Country is required');
                done();
            });
    });

    it('should save user data to the database if all fields are provided', done => {
        request(app)
            .post('/')
            .type('form')
            .send({
                name: 'John Doe',
                sex: 'male',
                age: 25,
                country: 'USA'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Application Complete');
                done();
            });
    });




});