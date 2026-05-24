import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function UploadDropzone({ onFileUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition ${
        isDragActive
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-zinc-700 bg-zinc-900"
      }`}
    >
      <input {...getInputProps()} />

      <h2 className="text-2xl font-semibold text-cyan-400">
        Upload Firmware Log
      </h2>

      <p className="mt-4 text-zinc-400">
        Drag & drop a log file here, or click to browse.
      </p>
    </div>
  );
}

export default UploadDropzone;