param([string]$File = "out\RomanKnows_Presentation.pptx", [string]$Out = "dist\pp")
$full = (Resolve-Path $File).Path
$outDir = Join-Path (Get-Location) $Out
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$pp = New-Object -ComObject PowerPoint.Application
try {
  $pres = $pp.Presentations.Open($full, $true, $false, $false)
  $pres.Export($outDir, "PNG", 1600, 900)
  Write-Output ("slides: " + $pres.Slides.Count)
  $pres.Close()
} finally { $pp.Quit() }
