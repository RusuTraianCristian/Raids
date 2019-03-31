import "babel-polyfill";
import "./api/twitchExt";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";

// uses code-splitting for efficiency
const rootConfig = document.getElementById("root-config");
const rootLiveConfig = document.getElementById("root-liveconfig");
const rootPanel = document.getElementById("root-panel");
const rootVideoComponent = document.getElementById("root-videocomponent");

if (rootPanel) {
  import("./components/PanelPage/Panel.js").then(Panel =>
    ReactDOM.render(<Provider store={store}><Panel.default /></Provider>, rootPanel)
  );
} else if (rootConfig) {
  import("./components/ConfigPage/Config.js").then(Config =>
    ReactDOM.render(<Provider store={store}><Config.default /></Provider>, rootConfig)
  );
} else if (rootLiveConfig) {
  import("./components/LiveConfigPage/LiveConfig.js").then(LiveConfig =>
    ReactDOM.render(<Provider store={store}><LiveConfig.default /></Provider>, rootLiveConfig)
  );
} else if (rootVideoComponent) {
  import("./components/VideoComponentPage/VideoComponent.js").then(VideoComponent =>
    ReactDOM.render(<Provider store={store}><VideoComponent.default /></Provider>, rootVideoComponent)
  );
} else {
  console.error("Unsupported Page!");
}
