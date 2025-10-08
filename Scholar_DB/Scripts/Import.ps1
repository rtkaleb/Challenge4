# scripts/import.ps1
# Uso: botón derecho sobre import.ps1 -> Run with PowerShell (o desde PowerShell: .\scripts\import.ps1)

Write-Host "== Verificando herramientas =="
mongoimport --version | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Error "mongoimport no está instalado o no está en PATH."; exit 1 }

Write-Host "== Importando a scholar_db =="
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path $root -Parent
$dataDir = Join-Path $projectRoot "data"

# Import authors
mongoimport --db Scholar_DB --collection authors `
  --type csv --headerline `
  --file (Join-Path $dataDir "authors.csv") `
  --drop

# Import articles
mongoimport --db Scholar_DB --collection articles `
  --type csv --headerline `
  --file (Join-Path $dataDir "articles.csv") `
  --drop

Write-Host "== Importación completada =="
