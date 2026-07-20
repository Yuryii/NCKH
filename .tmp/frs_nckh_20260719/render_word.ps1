$ErrorActionPreference = 'Stop'
$docxPath = 'C:\Users\dungl\Downloads\NCKH\_bmad-output\FRS Hệ thống quản lý hoạt động NCKH cấp trường - Dự thảo.docx'
$qaDir = 'C:\Users\dungl\Downloads\NCKH\.tmp\frs_nckh_20260719\rendered'
$pdfPath = Join-Path $qaDir 'FRS-NCKH-Du-thao.pdf'
New-Item -ItemType Directory -Force -Path $qaDir | Out-Null
$word = $null
$doc = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $doc = $word.Documents.Open($docxPath, $false, $false)
    foreach ($story in $doc.StoryRanges) {
        $range = $story
        while ($null -ne $range) {
            if ($range.Fields.Count -gt 0) { $range.Fields.Update() | Out-Null }
            $range = $range.NextStoryRange
        }
    }
    if ($doc.TablesOfContents.Count -gt 0) {
        foreach ($toc in $doc.TablesOfContents) { $toc.Update() | Out-Null }
    }
    $doc.Repaginate()
    $doc.Save()
    $doc.ExportAsFixedFormat($pdfPath, 17)
    Write-Output "PDF=$pdfPath"
    Write-Output "PAGES=$($doc.ComputeStatistics(2))"
}
finally {
    if ($null -ne $doc) { $doc.Close($false) }
    if ($null -ne $word) { $word.Quit() }
    if ($null -ne $doc) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null }
    if ($null -ne $word) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
