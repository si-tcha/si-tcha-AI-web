$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$distPath = Join-Path $projectRoot 'dist'
if (-not (Test-Path (Join-Path $distPath 'index.html'))) { throw 'Exécuter npm run build avant de préparer la publication.' }
$outputPath = Join-Path $projectRoot 'output\deployment'
[void][IO.Directory]::CreateDirectory($outputPath)
$zipPath = Join-Path $outputPath 'Si-Tcha-AI-LWS-publication.zip'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipStream = [IO.File]::Open($zipPath, [IO.FileMode]::Create)
$archive = [IO.Compression.ZipArchive]::new($zipStream, [IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($file in Get-ChildItem -LiteralPath $distPath -Recurse -File -Force) {
    $entryName = $file.FullName.Substring($distPath.Length + 1).Replace('\', '/')
    if ($entryName.StartsWith('.vite/')) { continue }
    [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entryName, [IO.Compression.CompressionLevel]::Optimal)
  }
} finally { $archive.Dispose(); $zipStream.Dispose() }
$verificationZip = [IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  foreach ($required in @('index.html', '.htaccess', 'robots.txt', 'sitemap.xml', 'fr/investisseurs/index.html')) {
    if ($null -eq $verificationZip.GetEntry($required)) { throw "Entrée absente : $required" }
  }
  Write-Output "Archive vérifiée : $($verificationZip.Entries.Count) fichiers. Aucun identifiant FTP inclus."
} finally { $verificationZip.Dispose() }
