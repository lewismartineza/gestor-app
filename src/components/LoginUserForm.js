import { Link } from '@reach/router';
import { useFormik } from 'formik';
import { useAuthentication } from '../context/Context';

export function LoginUserForm() {
  const { login } = useAuthentication();
  const formik = useFormik({
    initialValues: {
      email: ' ',
      password: ' ',
    },
    onSubmit: ({ email, password }) => {
      login(email, password);
    },
  });

  return (
    <div className='col-lg-6'>
      <div className='p-5 mt-4 mr-5'>
        <div className='text-center ml-5'>
          <h4 className='text-dark mb-4'>¡Bienvenido!</h4>
        </div>
        <form className='user ml-5' onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <input
              className='form-control form-control-user'
              type='email'
              id='exampleInputEmail'
              aria-describedby='emailHelp'
              placeholder='Ingrese Dirección de Correo'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control form-control-user'
              type='password'
              id='exampleInputPassword'
              placeholder='Contraseña'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className='form-group'>
            <div className='custom-control custom-checkbox small'>
              <div className='form-check'>
                <input
                  className='form-check-input custom-control-input'
                  type='checkbox'
                  id='formCheck-1'
                />
                <label
                  className='form-check-label custom-control-label'
                  htmlFor='formCheck-1'
                >
                  Recuérdame
                </label>
              </div>
            </div>
          </div>
          <button
            className='btn btn-primary btn-block text-white btn-user'
            type='submit'
          >
            Iniciar sesión
          </button>
          <hr />
        </form>
        <div className='text-center'>
          <Link className='small mt-5 ml-5' to='registrarse'>
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
