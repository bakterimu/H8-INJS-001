const request = require('supertest');
const { response } = require('../app.js');
const app = require('../app.js');
const data = require('../data.json');

// Testing GET / Route
describe('GET / Route', () => {
  test('GET / should return json => {page: "Home"}', (done) => {
    request(app)
      .get('/')
      // Status code 200
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err)
        else {
          // Tipe data res.body harus object
          expect(typeof res.body).toBe('object');
          // res.body mempunyai property page
          expect(res.body).toHaveProperty('page');
          // res.body.page mempunyai nilai Home
          expect(res.body.page).toBe('Home');
          done();
        }
      });
  });
});

describe('POST /login Route', () => {
  test('POST /login mempunyai data user maka return token dan status code 200', async () => {
    const response = await request(app)
      .post('/login')
      // Mengirim form
      .send({email: "dimas@gmail.com", password: "passdimas"})
      // Status code 200
      expect(response.status).toBe(200)
      // response.body mempunyai properti token
      expect(response.body).toHaveProperty('token');
      // Tipe data token harus string
      expect(typeof response.body.token).toBe('string');
      // tidak mengetes isi token karena tiap hit token akan berbeda
  });

  test('POST /login mempunyai data user yang salah maka akan return status code 401 dan {msg: "Nama atau Password salah"', async () => {
    const response = await request(app)
      .post('/login')
      // Mengirim form yang salah
      .send({email: "haha@gmail.com", password: "passsalah"})
      // status code 401 - unauthorized
      expect(response.status).toBe(401)
      // response.body mempunyai properti msg
      expect(response.body).toHaveProperty('msg')
      // tipe data nilai dari msg harus string
      expect(typeof response.body.msg).toBe('string');
      // msg mempunyai nilai 'Nama atau Password Salah'
      expect(response.body.msg).toBe('Nama atau Password Salah')
  });
});

describe('GET /users Route', () => {
  test('GET /users akan mengembalikan semua data user dan status code 200 jika user mempunyai token', async () => {
    const response = await request(app)
      .get('/users')
      // Mengirim token
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkaW1hc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3NkaW1hcyIsImZpcnN0X25hbWUiOiJEaW1hcyIsImxhc3RfbmFtZSI6IlN1cHJpYWRpIiwiaWF0IjoxNjM1MzI4Mzg1fQ.Yt7cRknOPTr4Ndz61dXMJJ73ZrGo5dejzPY_o-IJFmE')
      // Status code 200
      expect(response.status).toBe(200);
      // response.body harus berisi data yang diambil dari data.json
      expect(response.body).toEqual(data);
  });

  test('GET /users user tidak mempunyai token, maka akan mengembalikan status code 500 dan {msg: "Token tidak ditemukan}"', (done) => {
    request(app)
      .get('/users')
      .end((err, res) => {
        if (err) console.log(err)
        else {
          // Status code 500 - Internal server error
          expect(res.status).toBe(500);
          // res.body mempunyai properti msg
          expect(res.body).toHaveProperty('msg');
          // Tipe data res.body.msg harus string
          expect(typeof res.body.msg).toBe('string');
          // msg mempunyai nilai 'Token tidak ditemukan'
          expect(res.body.msg).toBe('Token tidak ditemukan');
          done();
        }
      });
  });

  test('GET /users user mempunyai token yang salah, maka akan mengembalikan status code 401 dan {msg: "User belum mendaftar!"}', async () => {
    const response = await request(app)
      .get('/users')
      // Mengirim token yang salah
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ5dWxpMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzeXVsaTEyMyIsImZpcnN0X25hbWUiOiJZdWxpYW5hIiwibGFzdF9uYW1lIjoiTm92aXRhIn0.6EcMFK-lkYc9LqAbKNI_evBBWd3IBQhAJ9Ma1eW5GsM')
      // status code 401 - unauthorized
      expect(response.status).toBe(401);
      // response.body mempunyai properti msg
      expect(response.body).toHaveProperty('msg');
      // Tipe data nilai dari msg harus string
      expect(typeof response.body.msg).toBe('string');
      // msg mempunyai nilai 'User belum mendaftar!'
      expect(response.body.msg).toBe('User belum mendaftar!')
  })
});