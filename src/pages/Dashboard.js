export function Dashboard() {
  return (
    <div className='container-fluid'>
      <div className='d-sm-flex justify-content-between align-items-center mb-4'>
        <h3 className='text-dark mb-0'>Inicio</h3>
        <a
          className='btn btn-primary btn-sm d-none d-sm-inline-block'
          role='button'
          href='#'
        >
          <i className='fas fa-download fa-sm text-white-50'></i>Generar Reporte
        </a>
      </div>
      <div className='row'>
        <div className='col-lg-7 col-xl-8'>
          <div className='card shadow mb-4'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h6 className='text-primary font-weight-bold m-0'>
                Movimientos De Hoy
              </h6>
              <div className='dropdown no-arrow'>
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
              </div>
            </div>
            <div className='card-body'>
              <div className='chart-area'>
                <canvas data-bs-chart='{"type":"line","data":{"labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],"datasets":[{"label":"Earnings","fill":true,"data":["0","10000","5000","15000","10000","20000","15000","25000"],"backgroundColor":"rgba(78, 115, 223, 0.05)","borderColor":"rgba(78, 115, 223, 1)"}]},"options":{"maintainAspectRatio":false,"legend":{"display":false},"title":{},"scales":{"xAxes":[{"gridLines":{"color":"rgb(234, 236, 244)","zeroLineColor":"rgb(234, 236, 244)","drawBorder":false,"drawTicks":false,"borderDash":["2"],"zeroLineBorderDash":["2"],"drawOnChartArea":false},"ticks":{"fontColor":"#858796","padding":20}}],"yAxes":[{"gridLines":{"color":"rgb(234, 236, 244)","zeroLineColor":"rgb(234, 236, 244)","drawBorder":false,"drawTicks":false,"borderDash":["2"],"zeroLineBorderDash":["2"]},"ticks":{"fontColor":"#858796","padding":20}}]}}}'></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-xl-4'>
          <div className='card shadow mb-4'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h6 className='text-primary font-weight-bold m-0'>
                Estado De Productos
              </h6>
              <div className='dropdown no-arrow'>
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
              </div>
            </div>
            <div className='card-body'>
              <div className='chart-area'>
                <canvas data-bs-chart='{"type":"doughnut","data":{"labels":["Direct","Social","Referral"],"datasets":[{"label":"","backgroundColor":["#4e73df","#1cc88a","#36b9cc"],"borderColor":["#ffffff","#ffffff","#ffffff"],"data":["50","30","15"]}]},"options":{"maintainAspectRatio":false,"legend":{"display":false},"title":{}}}'></canvas>
              </div>
              <div className='text-center small mt-4'>
                <span className='mr-2'>
                  <i className='fas fa-circle text-primary'></i>
                  &nbsp;Caduca En 3 Meses
                </span>
                <span className='mr-2'>
                  <i className='fas fa-circle text-success'></i>
                  &nbsp;Caduca En 6 Meses
                </span>
                <span className='mr-2'>
                  <i className='fas fa-circle text-info'></i>&nbsp;Caduca En 12
                  Meses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='row'>
            <div className='col-lg-6 mb-4'>
              <div className='card text-white bg-danger shadow'>
                <div className='card-body'>
                  <p className='m-0'>Caduca En 1 Mes</p>
                  <p className='text-white-50 small m-0'></p>
                </div>
              </div>
            </div>
            <div className='col-lg-6 mb-4'>
              <div className='card text-white bg-primary shadow'>
                <div className='card-body'>
                  <p className='m-0'>
                    &nbsp;Caduca En 3 Meses
                    <br />
                  </p>
                  <p className='text-white-50 small m-0'></p>
                </div>
              </div>
            </div>
            <div className='col-lg-6 mb-4'>
              <div className='card text-white bg-success shadow'>
                <div className='card-body'>
                  <p className='m-0'>
                    Caduca En 6 Meses
                    <br />
                  </p>
                  <p className='text-white-50 small m-0'></p>
                </div>
              </div>
            </div>
            <div className='col-lg-6 mb-4'>
              <div className='card text-white bg-info shadow'>
                <div className='card-body'>
                  <p className='m-0'>Caduca en 12 Meses</p>
                  <p className='text-white-50 small m-0'></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
