import { Link } from '@reach/router';

export function SingUp() {
  return <div className="bg-gradient-primary">
  <div className="container">
      <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
              <div className="card shadow-lg o-hidden border-0 my-5">
                  <div className="card-body p-0">
                      <div className="row">
                          <div className="col-lg-6 d-none d-lg-flex">
                              <div className="flex-grow-1 bg-login-image"><img src="
                              ./assets/img/dogs/image2.jpeg" alt="" width="407px"/></div>
                          </div>
                          <div className="col-lg-6">
                              <div className="p-5 mr-4 mt-4">
                                  <div className="text-center">
                                      <h4 className="text-dark mb-4">¡Crear una cuenta!</h4>
                                  </div>
                                  <form className="user">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Nombres" name="first_name"/></div>
                                    <div className="col-sm-6"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Apellidos" name="last_name"/></div>
                                </div>
                                <div className="form-group"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Dirección de Correo" name="email"/></div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Contraseña" name="password"/></div>
                                    <div className="col-sm-6"><input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repetir Contraseña" name="password_repeat"/></div>
                                </div><button className="btn btn-primary btn-block text-white btn-user" type="submit">Registrar Cuenta</button>
                                <hr/>
                            </form>
                                  <div className="text-center"><Link className="small mt-5" to="/">¡Inicia Sesíon!</Link></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>;
}
