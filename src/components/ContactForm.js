import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { firestore } from '../utils/firebase';

const initialValues = {
  address: '',
  city: '',
  country: '',
};
export function ContactForm() {
  const { uid } = JSON.parse(window.localStorage.getItem('gestor:user'));
  const [userContactInfo, setUserContactInfo] = useState(null);

  useEffect(() => {
    firestore
      .collection('user-contact')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) =>
          setUserContactInfo({
            id: doc.id,
            ...doc.data(),
          }),
        );
      });
  }, []);

  const formik = useFormik({
    initialValues: userContactInfo || initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let promise;

      if (!userContactInfo) {
        promise = Promise.resolve(
          firestore.collection('user-contact').add({
            ...values,
            userId: uid,
          }),
        );
      } else {
        promise = Promise.resolve(
          firestore
            .collection('user-contact')
            .doc(userContactInfo.id)
            .set({
              ...values,
            }),
        );
      }

      promise
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
              placeholder='Ingrese su dirección'
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
                  placeholder='Ingrese el nombre de su ciudad'
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
                  placeholder='Ingrese el nombre de su país'
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
