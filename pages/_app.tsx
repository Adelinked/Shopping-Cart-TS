import "../styles/globals.css";
import { wrapper, store } from "../store/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(MyApp);
