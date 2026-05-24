function UploadDropzone({
  onUpload
}) {

  function handleFileChange(
    event
  ) {

    const file =
      event.target.files[0];

    if (file) {
      onUpload(file);
    }
  }

  return (

    <label
      className="
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-zinc-700
        bg-zinc-900/60
        p-12
        text-center
        transition
        hover:border-cyan-400
      "
    >

      <input
        type="file"

        accept=".log,.txt"

        className="hidden"

        onChange={
          handleFileChange
        }
      />

      <h2
        className="
          text-2xl
          font-semibold
          text-cyan-400
        "
      >
        Upload Firmware Log
      </h2>

      <p
        className="
          mt-2
          text-sm
          text-zinc-400
        "
      >
        Drag & drop a log file
        here, or click to browse.
      </p>

    </label>
  );
}

export default UploadDropzone;