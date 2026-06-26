import "./App.css";

import AppRoutes from "./routes";
import PageLoader from "./components/PageLoader";

function App() {
  const loading = false;

  if (loading) {
    return <PageLoader />;
  }

  return <AppRoutes />;
}

export default App;