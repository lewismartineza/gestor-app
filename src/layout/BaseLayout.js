import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
export function BaseLayout({ component: Component, ...props }) {
  return (
    <>
      <Header />
      {<Component />}
      <Footer />
    </>
  );
}
