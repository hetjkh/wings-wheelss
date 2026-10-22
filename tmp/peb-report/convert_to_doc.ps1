$ErrorActionPreference = 'Stop'
$inputReport = 'D:\my-wings\output\peb-training-report\PEB_Structural_Engineering_Training_Report_Updated.docx'
$outputReport = 'D:\my-wings\output\peb-training-report\PEB_Structural_Engineering_Training_Report_Updated.doc'
$wordApp = $null
$reportDocument = $null
try {
    $wordApp = New-Object -ComObject Word.Application
    $wordApp.Visible = $false
    $wordApp.DisplayAlerts = 0
    $wordApp.AutomationSecurity = 3
    $reportDocument = $wordApp.Documents.Open($inputReport, $false, $true, $false)
    $reportDocument.SaveAs2($outputReport, 0)
    $reportDocument.Close(0)
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($reportDocument)
    $reportDocument = $null
    Get-Item -LiteralPath $outputReport | Select-Object FullName, Length
} finally {
    if ($null -ne $reportDocument) {
        $reportDocument.Close(0)
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($reportDocument)
    }
    if ($null -ne $wordApp) {
        $wordApp.Quit()
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($wordApp)
    }
}
