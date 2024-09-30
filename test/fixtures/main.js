import { registerApplication } from "single-spa";

registerApplication({
  name: "app1",
  activeWhen: ["/"],
  app: {
    async bootstrap() {},
    async mount() {},
    async unmount() {},
  },
});
