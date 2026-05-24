import { spawn }
  from "child_process";

import path
  from "path";

import { fileURLToPath }
  from "url";

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

export function runPythonScript(
  scriptName,
  args = []
) {

  return new Promise(
    (resolve, reject) => {

      const scriptPath =
        path.join(
          __dirname,
          "../../../engine",
          scriptName
        );

      const process =
        spawn(
          "python",
          [
            scriptPath,
            ...args
          ]
        );

      let stdout = "";
      let stderr = "";

      process.stdout.on(
        "data",
        (data) => {

          stdout +=
            data.toString();
        }
      );

      process.stderr.on(
        "data",
        (data) => {

          stderr +=
            data.toString();
        }
      );

      process.on(
        "close",
        (code) => {

          if (code !== 0) {

            reject(
              new Error(stderr)
            );

            return;
          }

          try {

            resolve(
              JSON.parse(stdout)
            );

          } catch {

            reject(
              new Error(
                "Failed to parse Python output"
              )
            );
          }
        }
      );
    }
  );
}