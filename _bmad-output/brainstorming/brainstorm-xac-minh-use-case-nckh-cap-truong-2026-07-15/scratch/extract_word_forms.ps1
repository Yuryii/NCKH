param(
    [Parameter(Mandatory = $true)]
    [string]$InputDir,
    [Parameter(Mandatory = $true)]
    [string]$OutputDir,
    [string]$Pattern = '*'
)

$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

function Clean-WordText([string]$Text) {
    if ($null -eq $Text) { return '' }
    return (($Text -replace "[\r\a\v]", "`n") -replace "`n{3,}", "`n`n").Trim()
}

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    foreach ($file in (Get-ChildItem -LiteralPath $InputDir -File -Filter $Pattern | Sort-Object Name)) {
        $doc = $null
        try {
            $doc = $word.Documents.Open($file.FullName, $false, $true)

            $paragraphs = @()
            foreach ($paragraph in $doc.Paragraphs) {
                $text = Clean-WordText $paragraph.Range.Text
                if ($text) {
                    $paragraphs += [ordered]@{
                        text = $text
                        style = [string]$paragraph.Range.Style
                    }
                }
            }

            $tables = @()
            $tableIndex = 0
            foreach ($table in $doc.Tables) {
                $tableIndex++
                $cells = @()
                foreach ($cell in $table.Range.Cells) {
                    $cells += [ordered]@{
                        row = $cell.RowIndex
                        col = $cell.ColumnIndex
                        text = Clean-WordText $cell.Range.Text
                    }
                }
                $tables += [ordered]@{
                    index = $tableIndex
                    rows = $table.Rows.Count
                    columns = $table.Columns.Count
                    cells = $cells
                }
            }

            $formFields = @()
            foreach ($field in $doc.FormFields) {
                $formFields += [ordered]@{
                    name = [string]$field.Name
                    type = [int]$field.Type
                    result = Clean-WordText ([string]$field.Result)
                    status_text = [string]$field.StatusText
                }
            }

            $contentControls = @()
            foreach ($control in $doc.ContentControls) {
                $contentControls += [ordered]@{
                    title = [string]$control.Title
                    tag = [string]$control.Tag
                    type = [int]$control.Type
                    text = Clean-WordText $control.Range.Text
                }
            }

            $shapeTexts = @()
            foreach ($shape in $doc.Shapes) {
                if ($shape.TextFrame.HasText -eq -1) {
                    $text = Clean-WordText $shape.TextFrame.TextRange.Text
                    if ($text) { $shapeTexts += $text }
                }
            }

            $headersFooters = @()
            $sectionIndex = 0
            foreach ($section in $doc.Sections) {
                $sectionIndex++
                foreach ($header in $section.Headers) {
                    if ($header.Exists) {
                        $text = Clean-WordText $header.Range.Text
                        if ($text) {
                            $headersFooters += [ordered]@{
                                section = $sectionIndex
                                kind = "header-$($header.Index)"
                                text = $text
                            }
                        }
                    }
                }
                foreach ($footer in $section.Footers) {
                    if ($footer.Exists) {
                        $text = Clean-WordText $footer.Range.Text
                        if ($text) {
                            $headersFooters += [ordered]@{
                                section = $sectionIndex
                                kind = "footer-$($footer.Index)"
                                text = $text
                            }
                        }
                    }
                }
            }

            $result = [ordered]@{
                source_name = $file.Name
                paragraph_count = $doc.Paragraphs.Count
                table_count = $doc.Tables.Count
                form_field_count = $doc.FormFields.Count
                content_control_count = $doc.ContentControls.Count
                paragraphs = $paragraphs
                tables = $tables
                form_fields = $formFields
                content_controls = $contentControls
                shape_texts = $shapeTexts
                headers_footers = $headersFooters
            }

            $outputPath = Join-Path $OutputDir (([IO.Path]::GetFileNameWithoutExtension($file.Name)) + '.json')
            $result | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $outputPath -Encoding UTF8
            Write-Output "OK`t$($file.Name)`t$($doc.Paragraphs.Count) paragraphs`t$($doc.Tables.Count) tables"
        }
        catch {
            Write-Output "ERROR`t$($file.Name)`t$($_.Exception.Message)"
        }
        finally {
            if ($null -ne $doc) {
                $doc.Close(0)
                [Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null
            }
        }
    }
}
finally {
    $word.Quit()
    [Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
