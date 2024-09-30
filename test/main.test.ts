import { describe, it, xit } from "@jest/globals";
import webpack from "webpack";
import { ImportMapExternalsPlugin } from "../src/import-map-externals-webpack-plugin";

describe(`ImportMapExternalsPlugin`, () => {
  xit(`externalizes a module`, (done) => {
    webpack(
      {
        mode: "development",
        entry: "./test/fixtures/main.js",
        output: {
          library: {
            type: "module",
          },
        },
        plugins: [
          new ImportMapExternalsPlugin({
            importMapUrl: "https://react.microfrontends.app/importmap.json",
          }),
        ],
        experiments: {
          outputModule: true,
        },
      },
      (err, stats) => {
        console.log(stats?.toString());
        if (err || stats?.hasErrors()) {
          done(`Error during webpack compilation`);
        } else {
          done();
        }
      },
    );
  });
});
