export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='bg-white sticky-footer'>
      <div className='container my-auto'>
        <div className='text-center my-auto copyright'>
          <span>Copyright © Gestor {year}</span>
        </div>
      </div>
    </footer>
  );
}
