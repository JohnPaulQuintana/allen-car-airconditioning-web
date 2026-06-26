import "./App.css";

import AppRoutes from "./routes";
import PageLoader from "./components/PageLoader";

console.log = () => {};
console.info = () => {};
console.warn = () => {};
console.error = () => {};
console.debug = () => {};

function App() {
  const loading = false;

  if (loading) {
    return <PageLoader />;
  }

  return <AppRoutes />;
}

export default App;
