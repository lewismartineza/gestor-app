import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { firestore } from '../utils/firebase';

const PAGE_SIZE = 2;

export function Products() {
  const [products, setProducts] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    activePage: 0,
    totalPage: 0,
    totalProducts: 0,
    data: [],
  });

  const toggle = () => setModal(!modal);

  const formik = useFormik({
    initialValues: {
      name: '',
      provider: '',
      mark: '',
      price: 0,
      stock: 0,
      expiration_date: '',
    },
    onSubmit: (values, actions) => {
      const { expiration_date } = values;
      firestore
        .collection('products')
        .add({
          ...values,
          name: values.name.toLowerCase(),
          expiration_date: new Date(expiration_date),
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: `Producto ${values.name} con exito!`,
          });
          toggle();
          actions.resetForm();
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error, no se ha podido eliminar el producto!',
          });
        });
    },
  });

  async function deleteProduct(id) {
    firestore
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado con exito!',
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, no se ha podido eliminar el producto!',
        });
      });
  }

  async function handlePageChange(pageNumber) {
    if (pageNumber === pagination.activePage) {
      return;
    }
    setPagination({ ...pagination, activePage: pageNumber });
  }

  async function handleSearch(evt) {
    if (evt.key === 'Enter') {
      firestore
        .collection('products')
        .where('name', '==', search.toLowerCase())
        .get()
        .then((query) => {
          const products = [];
          query.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

          const data = _.chunk(products, PAGE_SIZE);
          setPagination(() => ({
            activePage: 1,
            totalPage: data.length,
            totalProducts: products.length,
            data,
          }));
        });
    }
  }

  useEffect(() => {
    firestore.collection('products').onSnapshot((querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) =>
        products.push({ id: doc.id, ...doc.data() }),
      );
      setProducts(products);

      const data = _.chunk(products, PAGE_SIZE);
      setPagination(() => ({
        activePage: 1,
        totalPage: data.length,
        totalProducts: products.length,
        data,
      }));
    });
  }, [search]);

  if (!products) {
    return (
      <div className='container-fluid'>
        <div className='card shadow'>
          <div className='card-header py-3'>
            <p className='text-primary m-0 font-weight-bold'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid'>
      <div className='card shadow'>
        <div className='card-header py-3'>
          <p className='text-primary m-0 font-weight-bold'>
            Información De Producto
          </p>
          <button
            className='btn btn-primary float-right mr-1'
            role='button'
            onClick={toggle}
          >
            Insertar producto
          </button>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Ingrese información del producto
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <div className='modal-body pr-4'>
                  <input
                    type='text'
                    id='Nombre-Del-Producto'
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
                    id='Proveedor-1'
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
                    id='Proveedor-1'
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
                  <label className='mt-4 mb-0 mr-2 ml-2'>
                    Fecha de vencimiento
                  </label>
                  <input
                    type='date'
                    name='expiration_date'
                    className='mt-4 mb-0 mr-4 ml-3'
                    onChange={formik.handleChange}
                    value={formik.values.expiration_date}
                  />
                  <label className='mt-4 mb-0 mr-4 ml-2'>Numero de Stock</label>
                  <input
                    type='number'
                    name='stock'
                    className='mr-4 ml-3'
                    onChange={formik.handleChange}
                    value={formik.values.stock}
                  />
                </div>
                <div className='modal-footer'>
                  <button
                    className='btn btn-light'
                    type='button'
                    onClick={toggle}
                  >
                    Cancelar
                  </button>
                  <button className='btn btn-primary' type='submit'>
                    Registrar
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <div
            className='modal fade show pr-5 d-blok'
            role='dialog'
            tabIndex='-1'
            id='elim'
            aria-modal='true'
          >
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>Eliminar producto</h4>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <label>
                    ¿Seguro de eliminar el/los producto/s seleccionado/s?
                  </label>
                </div>
                <div className='modal-footer'>
                  <button
                    className='btn btn-light'
                    type='button'
                    data-dismiss='modal'
                  >
                    Cancelar
                  </button>
                  <button className='btn btn-primary' type='button'>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-6 text-nowrap'>
              {/* <div
                id='dataTable_length'
                className='dataTables_length'
                aria-controls='dataTable'
              >
                <label>
                  Mostrar&nbsp;
                  <select className='form-control form-control-sm custom-select custom-select-sm'>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                  </select>
                  &nbsp;
                </label>
              </div> */}
            </div>
            <div className='col-md-6 order-1'>
              <div
                className='text-md-right dataTables_filter'
                id='dataTable_filter'
              >
                <label>
                  <input
                    type='search'
                    className='form-control form-control-sm'
                    aria-controls='dataTable'
                    placeholder='Buscar'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                  />
                </label>
              </div>
            </div>
          </div>
          <div
            className='table-responsive table mt-2'
            id='dataTable'
            role='grid'
            aria-describedby='dataTable_info'
          >
            <table className='table my-0' id='dataTable'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Proveedor</th>
                  <th>Marca</th>
                  <th>Existencias</th>
                  <th>Precio</th>
                  <th>F. Vencimiento</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagination.data.length ? (
                  pagination.data[pagination.activePage - 1].map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.provider}</td>
                      <td>{product.mark}</td>
                      <td>{product.stock}</td>
                      <td>
                        {new Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: 'COP',
                          minimumFractionDigits: 1,
                        }).format(product.price)}
                      </td>
                      <td>
                        {product.expiration_date
                          .toDate()
                          .toLocaleDateString('es', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                      </td>
                      <td>
                        <span
                          className='fa fa-trash text-danger'
                          style={{ cursor: 'pointer', fontSize: '1.2em' }}
                          onClick={() => deleteProduct(product.id)}
                        ></span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className='text-center' colSpan={7}>
                      No hay registros...
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
          <div className='row'>
            <div className='col-md-6 align-self-center'>
              <p
                id='dataTable_info'
                className='dataTables_info'
                role='status'
                aria-live='polite'
              >
                Total productos almacenados: {pagination.totalProducts}
              </p>
            </div>
            <div className='col-md-6'>
              <Pagination
                activePage={pagination.activePage}
                itemsCountPerPage={PAGE_SIZE}
                totalItemsCount={pagination.totalProducts}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
