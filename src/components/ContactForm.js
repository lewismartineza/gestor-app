// import Swal from 'sweetalert2';
import { useFormik } from 'formik';


export function ContactForm() {
  const formik = useFormik({
    initialValues: {
      address: '',
      city: '',
      country: '',
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
    <div className='card shadow'>
      <div className='card-header py-3'>
        <p className='text-primary m-0 font-weight-bold'>
          Informacion De Contacto
        </p>
      </div>
      <div className='card-body'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='address'>
              <strong>Dirección</strong>
              <br />
            </label>
            <input
              className='form-control'
              type='text'
              placeholder='Turin,56'
              name='address'
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </div>
          <div className='form-row'>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='city'>
                  <strong>Ciudad</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Cartagena'
                  name='city'
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='country'>
                  <strong>Pais</strong>
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Colombia'
                  name='country'
                  onChange={formik.handleChange}
                  value={formik.values.country}
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
