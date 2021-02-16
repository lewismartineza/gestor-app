import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { firestore } from '../utils/firebase';

export function UserForm() {
  const userStorage = JSON.parse(window.localStorage.getItem('gestor:user'));
  const { email, displayName } = userStorage;
  const [first_name, last_name, full_name] = displayName
    ? displayName.split('|')
    : [];

  const formik = useFormik({
    initialValues: {
      email,
      first_name,
      last_name,
      full_name,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      firestore
        .collection('user')
        .doc(userStorage.uid)
        .set({
          ...values,
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: `La información de contacto ha sido actualizada con exíto!`,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:
              'Ha ocurrido un error, no se ha podido actualizar el contacto!',
          });
        });
    },
  });

  return (
    <div className='card shadow mb-3'>
      <div className='card-header py-3'>
        <p className='text-primary m-0 font-weight-bold'>Datos De Usuario</p>
      </div>
      <div className='card-body'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-row'>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='username'>
                  <strong>Nombre De Completo</strong>
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='user'
                  name='full_name'
                  readOnly
                  value={formik.values.full_name}
                />
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='email'>
                  <strong>Correo</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='email'
                  placeholder='user@example.com'
                  name='email'
                  readOnly
                  value={formik.values.email}
                />
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='first_name'>
                  <strong>Nombres</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Jess'
                  name='first_name'
                  readOnly
                  value={formik.values.first_name}
                />
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='last_name'>
                  <strong>Apellidos</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Creig'
                  name='last_name'
                  readOnly
                  value={formik.values.last_name}
                />
              </div>
            </div>
          </div>
          {/* <div className='form-group'>
            <button className='btn btn-primary btn-sm' type='submit'>
              Guardar Cambios
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
