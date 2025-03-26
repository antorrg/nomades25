import midd from '../src/middlewares/middlewares.js'; // Ajusta la ruta según sea necesario


xdescribe('Middleware protectParam y protectRoute de protección de rutas MVC', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {}
    };
    res = {
      render: jest.fn()
    };
    next = jest.fn();
  });
  describe('Middleware protectParam, proteccion contra parametros incorrectos (no Integer)', ()=>{
  it('Debería dejar pasar si el id es un entero válido.', () => {
    req.params.id = '2';
    midd.protectParam(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.render).not.toHaveBeenCalled();
  });

  it('Debería arrojar un error y renderizar la vista "error" con su respectivo mensaje si el id no es válido.', () => {
    req.params.id = '2.5';
    midd.protectParam(req, res, next);
    expect(res.render).toHaveBeenCalledWith('error', { message: 'Parámetros no permitidos', status: 400 });
    expect(next).not.toHaveBeenCalled();
  });
  });
  describe('Middleware protectRoute, proteccion de querys y prevencion de que no contenga body', ()=>{
    it('Deberia dejar pasar si la query es un integer y no existe nada en el body.', ()=>{
        req.query.id = '2';
        midd.protectRoute(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.render).not.toHaveBeenCalled();
    });
    it('Debería arrojar un error y renderizar la vista "error" con su respectivo mensaje si el id no es válido.', ()=>{
        req.query.id  = '2.5';
        midd.protectRoute(req, res, next);
        expect(res.render).toHaveBeenCalledWith('error', { message: 'Parámetros no permitidos', status: 400 });
        expect(next).not.toHaveBeenCalled();
    });
    it('Debería arrojar un error y renderizar la vista "error" con su respectivo mensaje si el body contiene elementos.', ()=>{
        req.query.id  = '2';
        req.body= {user: 'lllddd'}
        midd.protectRoute(req, res, next);
        expect(res.render).toHaveBeenCalledWith('error', { message: 'Parámetros no permitidos', status: 400 });
        expect(next).not.toHaveBeenCalled();
    })
  })
});

