export function ContactForm() {
  return (
    <div className='card shadow'>
      <div className='card-header py-3'>
        <p className='text-primary m-0 font-weight-bold'>
          Informacion De Contacto
        </p>
      </div>
      <div className='card-body'>
        <form>
          <div className='form-group'>
            <label for='address'>
              <strong>Dirección</strong>
              <br />
            </label>
            <input
              className='form-control'
              type='text'
              placeholder='Turin,56'
              name='address'
            />
          </div>
          <div className='form-row'>
            <div className='col'>
              <div className='form-group'>
                <label for='city'>
                  <strong>Ciudad</strong>
                  <br />
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Cartagena'
                  name='city'
                />
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label for='country'>
                  <strong>Pais</strong>
                </label>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Colombia'
                  name='country'
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
