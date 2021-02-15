import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { firestore } from '../utils/firebase';
export function Products() {
  const [products, setProducts] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      provider: '',
      mark: '',
      price: 0,
      stock: 0,
      expiration_date: '',
    },
    onSubmit: (values) => {
      // aqui van los datos al servidor de firebase
      console.log(values);
    },
  });

  async function deleteProduct(id) {
    firestore
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        // agregar sweet alert exitoso
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        // agregar sweet alert de error
        console.error('Error removing document: ', error);
      });
  }

  useEffect(() => {
    const products = [];
    firestore
      .collection('products')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) =>
          products.push({ id: doc.id, ...doc.data() }),
        );
        setProducts(products);
      })
      .catch((error) => {
        // agregar sweet alert de error
        console.error(`Error getting documents: ${error}`);
      });
  }, []);

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
          <a
            className='btn btn-primary float-right'
            role='button'
            id='eliminar'
            data-toggle='modal'
            href='#elim'
          >
            Eliminar producto
          </a>
          <a
            className='btn btn-primary float-right mr-1'
            role='button'
            data-toggle='modal'
            href='#modal'
          >
            Insertar producto
          </a>
          <div className='modal fade' role='dialog' tabIndex='-1' id='modal'>
            <form onSubmit={formik.handleSubmit}>
              <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title'>
                      Ingrese información del producto
                    </h4>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
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
                    <label className='mt-4 mb-0 mr-4 ml-2'>
                      Numero de Stock
                    </label>
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
                      data-dismiss='modal'
                    >
                      Cancelar
                    </button>
                    <button className='btn btn-primary' type='submit'>
                      Registrar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
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
              <div
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
              </div>
            </div>
            <div className='col-md-6'>
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
                  <th>F. Vencimiento</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
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
                ))}
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
                Mostrando 1 a 2 de 27
              </p>
            </div>
            <div className='col-md-6'>
              <nav className='d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers'>
                <ul className='pagination'>
                  <li className='page-item disabled'>
                    <a className='page-link' aria-label='Previous'>
                      <span aria-hidden='true'>«</span>
                    </a>
                  </li>
                  <li className='page-item active'>
                    <a className='page-link'>1</a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link'>2</a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link'>3</a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link' aria-label='Next'>
                      <span aria-hidden='true'>»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
