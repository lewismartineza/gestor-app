export function ProfilePhotoForm() {
  return (
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
  );
}
