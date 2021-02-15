// import Swal from 'sweetalert2';
import { useFormik } from 'formik';

export function UserForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
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
    <div className='card shadow mb-3'>
      <div className='card-header py-3'>
        <p className='text-primary m-0 font-weight-bold'>Ajustes De Usuario</p>
      </div>
      <div className='card-body'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-row'>
            <div className='col'>
              <div className='form-group'>
                <label for='username'>
                  <strong>Nombre De Usuario</strong>
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='user'
                  name='username'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label for='email'>
                  <strong>Correo</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='email'
                  placeholder='user@example.com'
                  name='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className='col'>
              <div className='form-group'>
                <label for='first_name'>
                  <strong>Nombres</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Jess'
                  name='first_name'
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label for='last_name'>
                  <strong>Apellidos</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Creig'
                  name='last_name'
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <button className='btn btn-primary btn-sm' type='submit'>
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
