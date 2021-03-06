import { RegisterUserForm } from '../components/RegisterUserForm';

export function SingUp() {
  return (
    <div className='registrarse bg-gradient-primary'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-9 col-lg-12 col-xl-10'>
            <div className='card shadow-lg o-hidden border-0 my-5'>
              <div className='card-body p-0'>
                <div className='row'>
                  <div className='col-lg-6 d-none d-lg-flex'>
                    <div className='flex-grow-1 bg-login-image'>
                      <img
                        src=' ./assets/img/dogs/image2.jpeg'
                        alt=''
                        width='407px'
                      />
                    </div>
                  </div>
                  <RegisterUserForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
