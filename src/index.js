import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

// uses code-splitting for efficiency
const rootConfig = document.getElementById("root-config");
const rootLiveConfig = document.getElementById("root-liveconfig");
const rootPanel = document.getElementById("root-panel");
const rootVideoComponent = document.getElementById("root-videocomponent");

if (rootPanel) {
  import("./components/Panel.js").then(Panel =>
    ReactDOM.render(<Panel.default />, rootPanel)
  );
} else if (rootConfig) {
  import("./components/Config.js").then(Config =>
    ReactDOM.render(<Config.default />, rootConfig)
  );
} else if (rootLiveConfig) {
  import("./components/LiveConfig.js").then(LiveConfig =>
    ReactDOM.render(<LiveConfig.default />, rootLiveConfig)
  );
} else if (rootVideoComponent) {
  import("./components/VideoComponent.js").then(VideoComponent =>
    ReactDOM.render(<VideoComponent.default />, rootVideoComponent)
  );
} else {
  console.error("Unsupported Page!");
}
