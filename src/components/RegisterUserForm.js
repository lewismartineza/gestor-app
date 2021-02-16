import { Link } from "@reach/router";
import { useFormik } from "formik";

export function RegisterUserForm() {
  const formik = useFormik({
    initialValues: {
      first_name: ' ',
      last_name: ' ',
      email: ' ',
      password: ' ',
      password_repeat: ' ',
    },
    onSubmit: (values, actions) => {
      console.log(values);
      // Swal.fire({
      //   icon: 'success',
      //   title: `Producto ${values.name} con exito!`,
      // });
      // actions.resetForm();
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Ha ocurrido un error, no se ha podido eliminar el producto!',
      // });
    },
  });

  return (
    <div className="col-lg-6">
      <div className="p-5 mr-4 mt-4">
        <div className="text-center">
          <h4 className="text-dark mb-4">¡Crear una cuenta!</h4>
        </div>
        <form className="user" onSubmit={formik.handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                className="form-control form-control-user"
                type="text"
                id="exampleFirstName"
                placeholder="Nombres"
                name="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
            </div>
            <div className="col-sm-6">
              <input
                className="form-control form-control-user"
                type="text"
                id="exampleFirstName"
                placeholder="Apellidos"
                name="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-user"
              type="email"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Dirección de Correo"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <input
                className="form-control form-control-user"
                type="password"
                id="examplePasswordInput"
                placeholder="Contraseña"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <div className="col-sm-6">
              <input
                className="form-control form-control-user"
                type="password"
                id="exampleRepeatPasswordInput"
                placeholder="Repetir Contraseña"
                name="password_repeat"
                onChange={formik.handleChange}
                value={formik.values.password_repeat}
              />
            </div>
          </div>
          <button
            className="btn btn-primary btn-block text-white btn-user" type="submit">Registrar Cuenta
          </button>
          <hr />
        </form>
        <div className="text-center">
          <Link className="small mt-5" to="/">
            ¡Inicia Sesíon!
          </Link>
        </div>
      </div>
    </div>
  );
}
