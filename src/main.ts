import "./style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");

setTimeout(async () => {
	console.log("发送模拟消息");
	const response = await fetch("https://thin-kids-do.loca.lt/", {
		headers: {
			"bypass-tunnel-reminder": "true",
		},
	}).catch((err) => {
		console.log("模拟消息发送失败", err);
	});
	const data = response ? await response?.text() : "error";
	console.log("模拟消息发送成功", data);
}, 3000);
