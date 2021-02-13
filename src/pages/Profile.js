export function Profile() {
  return (
    <div className='container-fluid'>
      <h3 className='text-dark mb-4'>Perfil</h3>
      <div className='row mb-3'>
        <div className='col-lg-4'>
          <div className='card mb-3'>
            <div className='card-body text-center shadow'>
              <img
                className='rounded-circle mb-3 mt-4'
                src='assets/img/dogs/4ea7fb833c63a4ea0b0fb696c5919dd7.png'
                width='160'
                height='160'
              />
              <div className='mb-3'>
                <button className='btn btn-primary btn-sm' type='button'>
                  Cambiar Fotos
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='row mb-3 d-none'>
            <div className='col'>
              <div className='card text-white bg-primary shadow'>
                <div className='card-body'>
                  <div className='row mb-2'>
                    <div className='col'>
                      <p className='m-0'>Peformance</p>
                      <p className='m-0'>
                        <strong>65.2%</strong>
                      </p>
                    </div>
                    <div className='col-auto'>
                      <i className='fas fa-rocket fa-2x'></i>
                    </div>
                  </div>
                  <p className='text-white-50 small m-0'>
                    <i className='fas fa-arrow-up'></i>&nbsp;5% since last month
                  </p>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='card text-white bg-success shadow'>
                <div className='card-body'>
                  <div className='row mb-2'>
                    <div className='col'>
                      <p className='m-0'>Peformance</p>
                      <p className='m-0'>
                        <strong>65.2%</strong>
                      </p>
                    </div>
                    <div className='col-auto'>
                      <i className='fas fa-rocket fa-2x'></i>
                    </div>
                  </div>
                  <p className='text-white-50 small m-0'>
                    <i className='fas fa-arrow-up'></i>&nbsp;5% since last month
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='card shadow mb-3'>
                <div className='card-header py-3'>
                  <p className='text-primary m-0 font-weight-bold'>
                    Ajustes De Usuario
                  </p>
                </div>
                <div className='card-body'>
                  <form>
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
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className='form-group'>
                          <label for='email'>
                            <strong>Dirección&nbsp;de correo</strong>
                            <br />
                          </label>
                          <input
                            className='form-control'
                            type='email'
                            placeholder='user@example.com'
                            name='email'
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
