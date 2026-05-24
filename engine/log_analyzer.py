import re
import json
import sys

from datetime import datetime

from analyzers.regex_patterns import (
    PATTERNS
)

from analyzers.severity_engine import (
    SEVERITY
)

from utils.file_reader import (
    read_log_file
)


def analyze_log(filepath):
    lines = read_log_file(filepath)

    results = {
        "file": filepath,

        "analyzed_at": (
            datetime.utcnow().isoformat()
        ),

        "total_lines": len(lines),

        "matches": [],

        "summary": {
            key: 0
            for key in PATTERNS
        },

        "pass_count": 0,

        "fail_count": 0,

        "verdict": "PASS"
    }

    for line_num, line in enumerate(
        lines,
        start=1
    ):
        for (
            pattern_name,
            regex
        ) in PATTERNS.items():

            if re.search(
                regex,
                line,
                re.IGNORECASE
            ):

                severity = (
                    SEVERITY[pattern_name]
                )

                results["summary"][
                    pattern_name
                ] += 1

                results["matches"].append({
                    "line_number":
                        line_num,

                    "pattern":
                        pattern_name,

                    "severity":
                        severity,

                    "content":
                        line.strip()[:300]
                })

                if (
                    pattern_name
                    == "test_passed"
                ):
                    results[
                        "pass_count"
                    ] += 1

                elif (
                    pattern_name
                    == "test_failed"
                ):
                    results[
                        "fail_count"
                    ] += 1

    critical_count = sum(
        1
        for match
        in results["matches"]
        if match["severity"]
        == "CRITICAL"
    )

    if (
        critical_count > 0
        or results["fail_count"] > 0
    ):
        results["verdict"] = "FAIL"

    return results


if __name__ == "__main__":
    if len(sys.argv) > 1:
        filepath = sys.argv[1]

        output = analyze_log(filepath)

        print(
            json.dumps(
                output,
                indent=2
            )
        )