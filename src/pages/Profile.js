import { ContactForm } from '../components/ContactForm';
import { ProfilePhotoForm } from '../components/ProfilePhotoForm';
import { UserForm } from '../components/UserForm';
export function Profile() {
  return (
    <div className='container-fluid'>
      <h3 className='text-dark mb-4'>Perfil</h3>
      <div className='row mb-3'>
        <ProfilePhotoForm />
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
              <UserForm />
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
