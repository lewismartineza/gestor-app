import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Table } from 'reactstrap';
import { firestore } from '../utils/firebase';

export function Dashboard() {
  const { uid } = JSON.parse(window.localStorage.getItem('gestor:user'));
  const [products, setProducts] = useState({
    groupByMonth: [],
    groupByStatus: [],
    expireInTheMonth: [],
  });

  const data = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        label: '# de productos por mes',
        data: products.groupByMonth,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    firestore
      .collection('products')
      .where('userId', '==', uid)
      .onSnapshot((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) =>
          products.push({
            id: doc.id,
            ...doc.data(),
            expiration_date: doc.data().expiration_date.toDate(),
          }),
        );

        const groupByMonth = _.countBy(products, (product) => {
          const { expiration_date } = product;
          const { labels } = data;
          const month = expiration_date.getMonth();
          return labels[month];
        });

        const groupByStatus = products.reduce(
          (instance, currentProduct) => {
            const { expiration_date } = currentProduct;
            const today = new Date().getTime();
            const expirationDateProduct = expiration_date.getTime();

            if (today >= expirationDateProduct) {
              instance.expired = instance.expired + 1;
            } else {
              instance.normal = instance.normal + 1;
            }

            if (expiration_date.getMonth() === new Date().getMonth()) {
              instance.expireInTheMonth.push(currentProduct);
            }

            return instance;
          },
          { expired: 0, normal: 0, expireInTheMonth: [] },
        );

        setProducts({
          groupByMonth: Object.keys(groupByMonth)
            ? Object.values(groupByMonth)
            : [],
          groupByStatus: Object.keys(groupByStatus)
            ? Object.values(groupByStatus)
            : [],
          expireInTheMonth: groupByStatus.expireInTheMonth.length
            ? _.orderBy(
                groupByStatus.expireInTheMonth.slice(0, 5),
                'expiration_date',
              )
            : [],
        });
      });
  }, []);

  return (
    <div className='container-fluid'>
      <div className='d-sm-flex justify-content-between align-items-center mb-4'>
        <h3 className='text-dark mb-0'>Inicio</h3>
        <button
          className='btn btn-primary btn-sm d-none d-sm-inline-block'
          role='button'
          onClick={() => {
            window.print();
          }}
        >
          <i className='fas fa-download fa-sm text-white-50'></i> Descargar
          Gráfica
        </button>
      </div>
      <div className='row'>
        <div className='col-lg-6 col-xl-6'>
          <div className='card shadow mb-4'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h6 className='text-primary font-weight-bold m-0'>
                Movimientos Por Mes
              </h6>
              {/* <div className='dropdown no-arrow'>
                <button
                  className='btn btn-link btn-sm dropdown-toggle'
                  data-toggle='dropdown'
                  aria-expanded='false'
                  type='button'
                >
                  <i className='fas fa-ellipsis-v text-gray-400'></i>
                </button>
                <div className='dropdown-menu shadow dropdown-menu-right animated--fade-in'>
                  <p className='text-center dropdown-header'>
                    dropdown header:
                  </p>
                  <a className='dropdown-item' href='#'>
                    &nbsp;Action
                  </a>
                  <a className='dropdown-item' href='#'>
                    &nbsp;Another action
                  </a>
                  <div className='dropdown-divider'></div>
                  <a className='dropdown-item' href='#'>
                    &nbsp;Something else here
                  </a>
                </div>
              </div> */}
            </div>
            <div className='card-body'>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-xl-6'>
          <div className='card shadow mb-4'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h6 className='text-primary font-weight-bold m-0'>
                Movimientos Por Mes
              </h6>
            </div>
            <div className='card-body'>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-xl-4'>
          <div className='card shadow mb-4'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h6 className='text-primary font-weight-bold m-0'>
                Estado De Productos
              </h6>
            </div>
            <div className='card-body'>
              <Doughnut
                data={{
                  ...data,
                  labels: ['Vencidos', 'Buen estado'],
                  datasets: [
                    {
                      label: 'Cantidad de productos vencidos / Buen estado',
                      data: products.groupByStatus,
                      backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                      ],
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </div>
        </div>
        <div className='col-lg-7 col-xl-8'>
          <div className='card shadow mb-4'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h6 className='text-primary font-weight-bold m-0'>
                Productos Por Caducar en {data?.labels?.[new Date().getMonth()]}
              </h6>
            </div>
            <div className='card-body'>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Stock</th>
                    <th>Vendidas</th>
                    <th>F. Vencimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {products.expireInTheMonth.map((product, index) => (
                    <tr key={product.id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{product.name}</td>
                      <td>{product.mark}</td>
                      <td>{product.stock}</td>
                      <td>{product.total_sale}</td>
                      <td>
                        {product.expiration_date.toLocaleDateString('es', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
