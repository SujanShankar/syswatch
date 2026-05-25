import { spawn } from "child_process";

export function runPythonScript(
  scriptName,
  args = []
) {

  return new Promise(

    (resolve, reject) => {

      const pythonProcess =
        spawn(

          "python3",

          [
            `/engine/${scriptName}`,
            ...args
          ]
        );

      let data = "";

      let error = "";

      pythonProcess.stdout.on(

        "data",

        (chunk) => {

          data +=
            chunk.toString();
        }
      );

      pythonProcess.stderr.on(

        "data",

        (chunk) => {

          error +=
            chunk.toString();
        }
      );

      pythonProcess.on(

        "close",

        () => {

          if (error) {

            reject(
              new Error(error)
            );

            return;
          }

          try {

            resolve(
              JSON.parse(data)
            );

          } catch {

            resolve(data);
          }
        }
      );
    }
  );
}