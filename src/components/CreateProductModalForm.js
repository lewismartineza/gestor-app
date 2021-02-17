import { useFormik } from 'formik';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
export function CreateProductModalForm({
  isEdition,
  toggle,
  modal,
  initialValues,
  onSubmit,
  onReset,
}) {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      unmountOnClose
      onClosed={() => {
        if (isEdition) onReset(null);
      }}
    >
      <ModalHeader toggle={toggle}>
        {isEdition ? 'Editar' : 'Ingrese'} información del producto
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <div className='modal-body pr-4'>
            <input
              type='text'
              className='form-control m-2 p-2 '
              placeholder='Ingrese nombre del producto'
              name='name'
              height='37px'
              width='457px'
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <input
              type='text'
              className='form-control m-2 p-2'
              placeholder='Ingrese nombre del proveedor'
              name='provider'
              height='37px'
              width='457px'
              onChange={formik.handleChange}
              value={formik.values.provider}
            />
            <input
              type='text'
              className='form-control m-2 p-2'
              placeholder='Ingrese marca del producto'
              name='mark'
              height='37px'
              width='457px'
              onChange={formik.handleChange}
              value={formik.values.mark}
            />
            <input
              type='text'
              className='form-control m-2 p-2'
              placeholder='Ingrese el precio del producto'
              name='price'
              height='37px'
              width='457px'
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <>
              {!isEdition && (
                <>
                  <label className='mt-4 mb-0 mr-2 ml-2'>
                    Fecha de vencimiento
                  </label>
                  <input
                    type='date'
                    name='expiration_date'
                    className='form-control mt-4 mb-0 mr-4 ml-3'
                    onChange={formik.handleChange}
                    value={formik.values.expiration_date}
                  />
                </>
              )}
            </>

            <label className='mt-4 mb-0 mr-4 ml-2'>Numero de Stock </label>
            <input
              type='number'
              name='stock'
              className='form-control mr-4 ml-3'
              readOnly={isEdition}
              onChange={formik.handleChange}
              value={formik.values.stock}
            />
            {isEdition && (
              <>
                <label className='mt-4 mb-0 mr-4 ml-2'>Cantidad vendida</label>
                <input
                  type='number'
                  name='total_sale'
                  className='form-control mr-4 ml-3'
                  min='0'
                  max={`${formik.values.stock}`}
                  onChange={formik.handleChange}
                  disabled={formik.values.stock === 0}
                />
              </>
            )}
          </div>
          <div className='modal-footer'>
            <button className='btn btn-light' type='button' onClick={toggle}>
              Cancelar
            </button>
            <button className='btn btn-primary' type='submit'>
              {isEdition ? 'Editar' : 'Registrar'}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
