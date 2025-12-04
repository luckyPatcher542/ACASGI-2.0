# Script para probar rutas de editar y cambiar estado

$base = "http://localhost:4000/api"

# Test 1: Inactivar grupo
Write-Host "Test 1: Inactivar grupo 1..." -ForegroundColor Cyan
$response = Invoke-RestMethod -Uri "$base/grupo/inactivar/1" -Method Put -ContentType "application/json" -Body (ConvertTo-Json @{ motivo = "Prueba desactivación" })
Write-Host $response | ConvertTo-Json

# Test 2: Activar grupo
Write-Host "`nTest 2: Activar grupo 1..." -ForegroundColor Cyan
$response = Invoke-RestMethod -Uri "$base/grupo/activar/1" -Method Put -ContentType "application/json" -Body (ConvertTo-Json @{ motivo = "Prueba activación" })
Write-Host $response | ConvertTo-Json

# Test 3: Inactivar semillero
Write-Host "`nTest 3: Inactivar semillero 1..." -ForegroundColor Cyan
$response = Invoke-RestMethod -Uri "$base/semillero/inactivar/1" -Method Put -ContentType "application/json" -Body (ConvertTo-Json @{ motivo = "Prueba desactivación semillero" })
Write-Host $response | ConvertTo-Json

Write-Host "`n✅ Pruebas completadas" -ForegroundColor Green
