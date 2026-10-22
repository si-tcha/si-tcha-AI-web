
  import { createRoot } from "react-dom/client";
  import App from "./app/App";
  import "./styles/index.css";

  // The build includes static HTML for discovery and no-JavaScript access.
  // Mount afresh because the demo dashboard's date changes between build and visit.
  createRoot(document.getElementById("root")!).render(<App path={window.location.pathname} />);
  
