import { createApp } from "vue";
import "@/assets/main.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Font Awesome -----
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
