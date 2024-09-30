import { describe, it, expect } from "@jest/globals";
import webpack from "webpack";
import { ImportMapExternalsPlugin } from "../src/import-map-externals-webpack-plugin";
import { createFsFromVolume, Volume } from "memfs";

describe(`ImportMapExternalsPlugin`, () => {
  it(`externalizes a module`, (done) => {
    const fs = createFsFromVolume(new Volume());

    const compiler = webpack({
      mode: "development",
      entry: "./test/fixtures/main.js",
      devtool: false,
      output: {
        filename: "main.js",
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
    });

    // @ts-ignore https://webpack.js.org/api/node/#custom-file-systems
    compiler.outputFileSystem = fs;

    compiler.run((err, stats) => {
      console.log(stats?.toString());

      const content = fs.readFileSync("./dist/main.js", "utf-8");
      expect(content).toMatchSnapshot();

      if (err || stats?.hasErrors()) {
        done("Webpack failed to compiled");
        return;
      }

      compiler.close((closeErr) => {
        if (closeErr) {
          done(closeErr);
        } else {
          done();
        }
      });
    });
  });
});
