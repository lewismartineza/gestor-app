import { Link } from '@reach/router';
import { Footer } from '../components/Footer';
import { useAuthentication } from '../context/Context';
export function BaseLayout({ component: Component, ...props }) {
  const user = JSON.parse(localStorage.getItem('gestor:user'));
  const { logout } = useAuthentication();

  return (
    <div id='wrapper'>
      <>
        <nav className='navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0'>
          <div className='container-fluid d-flex flex-column p-0'>
            <a
              className='navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0'
              href='#'
            >
              <div className='sidebar-brand-icon rotate-n-15'>
                <i className='fas fa-chart-bar'></i>
              </div>
              <div className='sidebar-brand-text mx-3'>
                <span>Gestor</span>
              </div>
            </a>
            <hr className='sidebar-divider my-0' />
            <ul className='nav navbar-nav text-light' id='accordionSidebar'>
              <li className='nav-item'>
                <Link className='nav-link active' to='/dashboard'>
                  <i className='fa fa-columns'></i>
                  <span>Inicio</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/perfil'>
                  <i className='fas fa-user'></i>
                  <span>Perfil</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/productos'>
                  <i className='fas fa-table'></i>
                  <span>Productos</span>
                </Link>
              </li>
              <li className='nav-item'></li>
              <li className='nav-item'></li>
            </ul>
            <div className='text-center d-none d-md-inline'>
              <button
                className='btn rounded-circle border-0'
                id='sidebarToggle'
                type='button'
              ></button>
            </div>
          </div>
        </nav>
        <div className='d-flex flex-column' id='content-wrapper'>
          <div id='content'>
            <nav className='navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top'>
              <div className='container-fluid'>
                <button
                  className='btn btn-link d-none rounded-circle mr-3'
                  id='sidebarToggleTop'
                  type='button'
                >
                  <i className='fas fa-bars'></i>
                </button>
                <ul className='nav navbar-nav flex-nowrap ml-auto'>
                  <li className='nav-item dropdown d-sm-none no-arrow'>
                    <a
                      className='dropdown-toggle nav-link'
                      data-toggle='dropdown'
                      aria-expanded='false'
                      href='#'
                    >
                      <i className='fas fa-search'></i>
                    </a>
                    <div
                      className='dropdown-menu dropdown-menu-right p-3 animated--grow-in'
                      aria-labelledby='searchDropdown'
                    >
                      <form className='form-inline mr-auto navbar-search w-100'>
                        <div className='input-group'>
                          <input
                            className='bg-light form-control border-0 small'
                            type='text'
                            placeholder='Search for ...'
                          />
                          <div className='input-group-append'>
                            <button
                              className='btn btn-primary py-0'
                              type='button'
                            >
                              <i className='fas fa-search'></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className='nav-item dropdown no-arrow mx-1'>
                    <div
                      className='shadow dropdown-list dropdown-menu dropdown-menu-right'
                      aria-labelledby='alertsDropdown'
                    ></div>
                  </li>
                  <div className='d-none d-sm-block topbar-divider'></div>
                  <li className='nav-item dropdown no-arrow'>
                    <div className='nav-item dropdown no-arrow'>
                      <a
                        className='dropdown-toggle nav-link'
                        data-toggle='dropdown'
                        aria-expanded='false'
                        href='#'
                      >
                        <span className='d-none d-lg-inline mr-2 text-gray-600 small'>
                          {user.displayName?.split('|')[2]}
                        </span>
                        <img
                          className='border rounded-circle img-profile'
                          src='assets/img/dogs/4ea7fb833c63a4ea0b0fb696c5919dd7.png'
                        />
                      </a>
                      <div className='dropdown-menu shadow dropdown-menu-right animated--grow-in'>
                        <Link className='dropdown-item' to='/perfil'>
                          <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Perfil
                        </Link>
                        {/*  <a className='dropdown-item' href='#'>
                          <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Ajustes
                        </a>
                        <a className='dropdown-item' href='#'>
                          <i className='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Panel de actividad
                        </a> */}
                        <div className='dropdown-divider'></div>
                        <span
                          style={{ cursor: 'pointer' }}
                          className='dropdown-item'
                          onClick={() => logout()}
                        >
                          <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Salir
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            {<Component />}
          </div>
          <Footer />
        </div>
      </>
      <a className='border rounded d-inline scroll-to-top' href='#page-top'>
        <i className='fas fa-angle-up'></i>
      </a>
    </div>
  );
}
