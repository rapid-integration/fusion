import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { AppRoot } from "./app-root";
import "./app.css";

export default function App() {
  return (
    <Router root={AppRoot}>
      <FileRoutes />
    </Router>
  );
}
