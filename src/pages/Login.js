import { Link } from '@reach/router';

export function Login() {
    return <div className="bg-gradient-primary">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-flex">
                                <div className="flex-grow-1 bg-login-image"><img src="
                                ./assets/img/dogs/fui.png" alt="" srcset=""/></div>
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h4 className="text-dark mb-4">Bienvenid@ !</h4>
                                    </div>
                                    <form className="user ml-5">
                                        <div className="form-group"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Ingrese Dirección de Correo" name="email"/></div>
                                        <div className="form-group"><input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Contraseña" name="password"/></div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <div className="form-check"><input className="form-check-input custom-control-input" type="checkbox" id="formCheck-1"/><label className="form-check-label custom-control-label" for="formCheck-1">Recuérdame</label></div>
                                            </div>
                                        </div><button className="btn btn-primary btn-block text-white btn-user" type="submit">Iniciar sesión</button>
                                        <hr/>
                                    </form>
                                    <div className="text-center"><Link className="small mt-5 mr-5" to="registarse">Registrarse</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}
