import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { wrapper } from "../redux/store";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log(userData);
      dispatch(
        login({
          ...userData,
        })
      );
    }
  }, []);
  return (
    <SnackbarProvider maxSnack={3}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
}
export default wrapper.withRedux(App);
