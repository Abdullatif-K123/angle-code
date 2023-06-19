import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { wrapper } from "../redux/store";
import { SnackbarProvider } from "notistack";
function App({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
}
export default wrapper.withRedux(App);
