function LOC($Path)
{
    $Total = 0

    Get-ChildItem $Path -Recurse -File | Select-Object -ExpandProperty FullName |
            ForEach-Object {
                $Total += Get-Content $_ | Measure-Object -Line | Select-Object -ExpandProperty Lines
            }

    return $Total
}

(LOC -Path ./src) + (LOC -Path ./test-box) + (LOC -Path ./test-dom/src)