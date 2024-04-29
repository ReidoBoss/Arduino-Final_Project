import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.js";
import "flowbite";
import "flowbite-datepicker";
import "flowbite/dist/datepicker.turbo.js";
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;
const app = createApp(App);

app.use(router);
app.mount("#app");

