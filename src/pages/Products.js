import _ from 'lodash';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import { CreateProductModalForm } from '../components/CreateProductModalForm';
import { firestore } from '../utils/firebase';

const PAGE_SIZE = 15;

const defaultValues = {
  name: '',
  provider: '',
  mark: '',
  price: 0,
  stock: 0,
  expiration_date: '',
  total_sale: 0,
};

export function Products() {
  const { uid } = JSON.parse(window.localStorage.getItem('gestor:user'));
  const [products, setProducts] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [pagination, setPagination] = useState({
    activePage: 0,
    totalPage: 0,
    totalProducts: 0,
    data: [],
  });

  const toggle = () => setModal(!modal);

  async function createProduct(values, actions) {
    const { expiration_date } = values;
    firestore
      .collection('products')
      .add({
        ...values,
        name: values.name.toLowerCase(),
        expiration_date: new Date(expiration_date),
        userId: uid,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `Producto ${values.name} con exito!`,
        });
        toggle();
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, no se ha podido eliminar el producto!',
        });
      });
  }

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

  function updateProduct(values) {
    if (values.stock === 0 && values.total_sale) {
      return Swal.fire({
        icon: 'info',
        title: `No se encuentran ${values.name} en existencia!`,
      });
    }

    firestore
      .collection('products')
      .doc(editProduct.id)
      .set({
        ...values,
        stock: values.stock - values.total_sale,
        total_sale: editProduct.total_sale + values.total_sale,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `La información de contacto ha sido actualizada con exíto!`,
        });
        toggle();
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, no se ha podido actualizar el contacto!',
        });
      });
  }

  useEffect(() => {
    firestore
      .collection('products')
      .where('userId', '==', uid)
      .onSnapshot((querySnapshot) => {
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
          <div className='d-flex justify-content-end'>
            <button
              className='btn btn-primary btn-sm mr-1'
              role='button'
              onClick={toggle}
            >
              Insertar producto
            </button>
            <button
              className='btn btn-primary btn-sm  d-none d-sm-inline-block'
              role='button'
              onClick={() => {
                window.print();
              }}
            >
              <i className='fas fa-download fa-sm text-white-50'></i> Descargar
            </button>
          </div>
          {editProduct ? (
            <CreateProductModalForm
              modal={modal}
              toggle={toggle}
              initialValues={editProduct}
              onSubmit={updateProduct}
              isEdition
              onReset={setEditProduct}
            />
          ) : (
            <CreateProductModalForm
              modal={modal}
              toggle={toggle}
              initialValues={defaultValues}
              onSubmit={createProduct}
            />
          )}

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
                  <th>Vendidos</th>
                  <th>Precio</th>
                  <th>F. Vencimiento</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagination.data.length ? (
                  pagination.data[pagination.activePage - 1].map((product) => (
                    <tr
                      key={product.id}
                      className={product.stock === 0 ? 'table-danger' : null}
                    >
                      <td>{product.name}</td>
                      <td>{product.provider}</td>
                      <td>{product.mark}</td>
                      <td>{product.stock}</td>
                      <td>{product.total_sale}</td>
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
                          className='fa fa-trash text-danger mr-3'
                          style={{ cursor: 'pointer', fontSize: '1.2em' }}
                          onClick={() => deleteProduct(product.id)}
                        ></span>
                        <span
                          className='fa fa-eye text-primary'
                          style={{ cursor: 'pointer', fontSize: '1.2em' }}
                          onClick={() => {
                            toggle();
                            setEditProduct(product);
                          }}
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
