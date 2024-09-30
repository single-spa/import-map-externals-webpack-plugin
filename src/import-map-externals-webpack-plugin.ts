import { Compiler, ResolveData, ExternalModule } from "webpack";

export class ImportMapExternalsPlugin {
  declare options: Options;

  constructor(options) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    const importMapPromise: Promise<ImportMap> = this.fetchImportMap();

    compiler.hooks.normalModuleFactory.tap(
      "ImportMapExternalsPlugin",
      (nmf) => {
        nmf.hooks.factorize.tapPromise(
          "ImportMapExternalsPlugin",
          async (resolveData: ResolveData) => {
            const importMap = await importMapPromise;

            if (
              Object.keys(importMap?.imports || {}).includes(
                resolveData.request,
              )
            ) {
              return new ExternalModule(
                resolveData.request,
                compiler.options.output.library?.type || "module",
                resolveData.createData.userRequest || resolveData.request,
              );
            }
          },
        );
      },
    );
  }

  async fetchImportMap(): Promise<ImportMap> {
    const r = await fetch(this.options.importMapUrl);

    if (r.ok) {
      return r.json() as ImportMap;
    } else {
      throw Error(
        `Failed to load import map from url '${this.options.importMapUrl}'`,
      );
    }
  }
}

interface Options {
  importMapUrl: string;
}

interface ImportMap {
  imports?: ModuleMap;
  scopes?: Record<string, ModuleMap>;
}

type ModuleMap = Record<string, string>;
