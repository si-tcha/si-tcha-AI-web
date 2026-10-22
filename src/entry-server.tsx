import { renderToString } from "react-dom/server";
import App from "./app/App";
import { seoPages } from "./app/data/seoPages";

export { seoPages };
export function render(path: string) {
  return renderToString(<App path={path} />);
}
