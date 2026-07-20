$ErrorActionPreference = 'Stop'
$docxPath = 'C:\Users\dungl\Downloads\NCKH\_bmad-output\FRS Hệ thống quản lý hoạt động NCKH cấp trường - Dự thảo.docx'
$qaDir = 'C:\Users\dungl\Downloads\NCKH\.tmp\frs_nckh_20260719\rendered'
$pdfPath = Join-Path $qaDir 'FRS-NCKH-Du-thao.pdf'
New-Item -ItemType Directory -Force -Path $qaDir | Out-Null
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$word.Options.PrintBackground = $false
$word.Options.SaveNormalPrompt = $false
$doc = $null
try {
    $doc = $word.Documents.Open($docxPath, $false, $true, $false, '', '', $false, '', '', 0, 0, $false, $false, 0, $true)
    $doc.Repaginate()
    $doc.SaveAs2($pdfPath, 17)
    Write-Output "PDF=$pdfPath"
    Write-Output "PAGES=$($doc.ComputeStatistics(2))"
}
catch {
    Write-Error $_
    exit 1
}
finally {
    if ($null -ne $doc) { $doc.Close($false) }
    $word.Quit()
    if ($null -ne $doc) { [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($doc) | Out-Null }
    [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($word) | Out-Null
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
