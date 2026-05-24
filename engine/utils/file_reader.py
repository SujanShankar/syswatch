def read_log_file(filepath):
    with open(
        filepath,
        "r",
        errors="replace"
    ) as file:

        return file.readlines()