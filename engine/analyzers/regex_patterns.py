PATTERNS = {
    "kernel_panic":
        r"(kernel panic|Kernel Panic)",

    "oom_killer":
        r"(Out of memory|oom.kill)",

    "segfault":
        r"segfault at",

    "disk_error":
        r"(I/O error|blk_update_request|Buffer I/O error)",

    "firmware_fail":
        r"(firmware.*failed|BIOS.*error|ACPI.*Error)",

    "cpu_throttle":
        r"(CPU.*throttl|thermal.*throttl)",

    "pcie_error":
        r"(PCIe.*error|AER.*error)",

    "memory_ecc":
        r"(ECC.*error|EDAC)",

    "test_failed":
        r"(FAIL|FAILED|ERROR|ASSERTION.*FAILED)",

    "test_passed":
        r"(PASS|PASSED|SUCCESS|OK)"
}