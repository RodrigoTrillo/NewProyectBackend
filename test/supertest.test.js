const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect

const requester = supertest('http://localhost:3000')

describe('Testing Products', ()=>{
    describe('Test de productos', ()=>{
        const prodMock = {
            Marca: 'Nike',
            Modelo: 'Jordan',
            Talle: 43,
        }
        it('El endpoint POST /api/products debe crear un producto correctamente', async ()=>{
            const prodMock = {
              Marca: 'Nike',
              Modelo: 'Jordan',
              Talle: 43,
            }
            const {statusCode, created, _body} = await requester
                .post('/api/products')
                .send(prodMock)

                expect(statusCode).to.equal(201)
                expect(created).to.be.true
                expect(_body.payload).to.have.property('_id')

                console.log(response)
       })

       it('Al crear un producto solo con los datos elementales. Se debe corroborar que el producto creado cuenta con una propiedad admin: true', async ()=>{
            const {_body}= await requester
                .post('/api/products')
                .send(prodMock)

            expect(_body.payload).to.have.property('admin').is.true
       })
       it('El endpoint POST /api/products debe responder con status 400 si se intenta crear un producto sin el campo marca', async () => {
        const prodWithoutName = {
          modelo: 'jordan',
          talle: 43,
        };
      
        const { statusCode } = await requester
          .post('/api/products')
          .send(prodWithoutName);
      
        expect(statusCode).to.equal(400);
      });
      it('El endpoint GET /api/products debe devolver una respuesta con los campos status y payload (de tipo arreglo)', async () => {
        const { statusCode, _body } = await requester.get('/api/products');
      
        expect(statusCode).to.equal(200);
        expect(_body.payload).to.have.property('status');
        expect(_body.payload).to.have.property('payload').that.is.an('array');
      });
      it('El endpoint PUT /api/products/:id debe actualizar correctamente un producto', async () => {
        // Agregar un producto previamente para obtener su ID
        const newPet = {
          marca: 'Nike',
          modelo: 'Jordan',
          talle: 43,
        };
      
        const { body: { payload: { _id } } } = await requester
          .post('/api/products')
          .send(newProd);
      
        // Actualizar el producto con el ID obtenido
        const updatedProd = {
          marca: 'Nike',
          modelo: 'Jordan',
          birthDate: 43,
          admin: true,
        };
      
        const { statusCode } = await requester
          .put(`/api/products/${_id}`)
          .send(updatedProd);
      
        expect(statusCode).to.equal(200);
      
        // Obtener el producto actualizado y comparar el valor de admin
        const { body: { payload: updatedProdPayload } } = await requester.get(`/api/products/${_id}`);
      
        expect(updatedProdPayload.adopted).to.equal(updatedProd.admin);
      });
      it('El endpoint DELETE /api/products/:id debe poder borrar el ultimo producto agregado', async () => {
        // Agregar una mascota previamente para obtener su ID
        const newProd = {
          marca: 'Nike',
          modelo: 'Air',
          birthDate: 42,
        };
      
        const { body: { payload: { _id } } } = await requester
          .post('/api/products')
          .send(newProd);
      
        // Borrar la mascota con el ID obtenido
        const { statusCode } = await requester.delete(`/api/products/${_id}`);
      
        expect(statusCode).to.equal(200);
      
        // Corroborar si la mascota aún existe con un GET
        const { statusCode: getStatusCode } = await requester.get(`/api/products/${_id}`);
      
        expect(getStatusCode).to.equal(404);
      });
    })
})

describe('Testing de users',()=>{
  describe('Testing de usuarios', ()=>{
    const userMock = {
      username: 'john_doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    it('El endpoint Post /api/users debe crear un user correctamente', async ()=>{
      const userMock = {
        username: 'john_doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
    
      const { statusCode, _body } = await requester
        .post('/api/users')
        .send(userMock);
    
      expect(statusCode).to.equal(201);
      expect(_body).to.have.property('created').to.be.true;
      expect(_body.payload).to.have.property('_id');
    
      // Verificar si el usuario existe en la base de datos
      const { statusCode: getUserStatusCode, body: getUserBody } = await requester.get(`/api/users/${body.payload._id}`);
      expect(getUserStatusCode).to.equal(200);
      expect(getUserBody.payload).to.deep.equal(userMock);
    })
    it('Al crear un usuario solo con los datos elementales, se debe corroborar que el usuario cuente con la propiedad admin: false', async () => {
      const userMock = {
        username: 'jane_smith',
        email: 'janesmith@example.com',
        password: 'password123',
      };
    
      const { _body } = await requester
        .post('/api/users')
        .send(userMock);
    
      expect(_body.payload).to.have.property('admin').to.be.false;
    });
    it('El endpoint POST /api/users debe responder con status 400 si se intenta crear un usuario sin el campo nombre de usuario', async () => {
      const userWithoutUsername = {
        email: 'example@example.com',
        password: 'password123',
      };
    
      const { statusCode } = await requester
        .post('/api/users')
        .send(userWithoutUsername);
    
      expect(statusCode).to.equal(400);
    });
    it('El endpoint GET /api/users debe devolver una respuesta con los campos status y payload (de tipo arreglo)', async () => {
      const { statusCode, _body } = await requester.get('/api/users');
    
      expect(statusCode).to.equal(200);
      expect(_body).to.have.property('status');
      expect(_body).to.have.property('payload').that.is.an('array');
    });
    it('El endpoint PUT /api/users/:id debe actualizar correctamente un usuario', async () => {
      // Agregar un usuario previamente para obtener su ID
      const userMock = {
        username: 'john_doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
    
      const { body: { payload: { _id } } } = await requester
        .post('/api/users')
        .send(userMock);
    
      // Actualizar el usuario con el ID obtenido
      const updatedUser = {
        username: 'johndoe_updated',
        email: 'johndoe@example.com',
        password: 'newpassword456',
      };
    
      const { statusCode } = await requester
        .put(`/api/users/${_id}`)
        .send(updatedUser);
    
      expect(statusCode).to.equal(200);
    
      // Obtener el usuario actualizado y comparar el valor de username
      const { body: { payload: updatedUserPayload } } = await requester.get(`/api/users/${_id}`);
    
      expect(updatedUserPayload.username).to.equal(updatedUser.username);
    });
    it('El endpoint DELETE /api/users/:id debe poder borrar el último usuario agregado', async () => {
      // Agregar un usuario previamente para obtener su ID
      const userMock = {
        username: 'jane_smith',
        email: 'janesmith@example.com',
        password: 'password123',
      };
    
      const { body: { payload: { _id } } } = await requester
        .post('/api/users')
        .send(userMock);
    
      // Borrar el usuario con el ID obtenido
      const { statusCode } = await requester.delete(`/api/users/${_id}`);
    
      expect(statusCode).to.equal(200);
    
      // Corroborar si el usuario aún existe con un GET
      const { statusCode: getStatusCode } = await requester.get(`/api/users/${_id}`);
    
      expect(getStatusCode).to.equal(404);
    });

  })
})

describe('Test de sessions',()=>{
  describe('Test de sesiones',()=>{
    it('El endpoint POST /api/sessions debe responder con status 400 si se intenta crear una sesión sin el campo email o contraseña', async () => {
      const sessionWithoutCredentials = {
        email: 'example@example.com',
      };
    
      const { statusCode } = await requester
        .post('/api/sessions')
        .send(sessionWithoutCredentials);
    
      expect(statusCode).to.equal(400);
    });
    it('El endpoint POST /api/sessions debe responder con status 400 si se intenta crear una sesión sin el campo email o contraseña', async () => {
      const sessionWithoutCredentials = {
        email: 'example@example.com',
      };
    
      const { statusCode } = await requester
        .post('/api/sessions')
        .send(sessionWithoutCredentials);
    
      expect(statusCode).to.equal(400);
    });
    it('El endpoint DELETE /api/sessions debe poder cerrar la sesión actual', async () => {
      const { statusCode: postStatusCode } = await requester.post('/api/sessions');
    
      expect(postStatusCode).to.equal(200);
    
      const { statusCode: deleteStatusCode } = await requester.delete('/api/sessions');
    
      expect(deleteStatusCode).to.equal(200);
    });
  })
})