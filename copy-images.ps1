$brainDir = "C:\Users\crxre\.gemini\antigravity\brain\f7945936-a805-4594-8366-1bec6edf44e1"
$publicToursDir = "c:\Users\crxre\Downloads\CapturasCCT\CCT-website\public\images\tours"

# Find the generated images dynamically (since timestamps vary)
$marketImg = Get-ChildItem "$brainDir\*market_tour_colorful_fruits*.png" | Select-Object -First 1 -ExpandProperty FullName
$salsaImg = Get-ChildItem "$brainDir\*salsa_dancing*.png" | Select-Object -First 1 -ExpandProperty FullName
$coffeeImg = Get-ChildItem "$brainDir\*coffee_farm*.png" | Select-Object -First 1 -ExpandProperty FullName
$whaleImg = Get-ChildItem "$brainDir\*whale_watching*.png" | Select-Object -First 1 -ExpandProperty FullName
$hummingbirdImg = Get-ChildItem "$brainDir\*hummingbird_sanctuary*.png" | Select-Object -First 1 -ExpandProperty FullName
$foodImg = Get-ChildItem "$brainDir\*home_hero_tropical*.png" | Select-Object -First 1 -ExpandProperty FullName
$cristoImg = Get-ChildItem "$brainDir\*og_preview_image*.png" | Select-Object -First 1 -ExpandProperty FullName

# Copy and rename them to the 0-byte placeholders in public/images/tours
Copy-Item -Path $marketImg -Destination "$publicToursDir\market-tour-thumb.jpg" -Force
Copy-Item -Path $salsaImg -Destination "$publicToursDir\salsa-tour-thumb.jpg" -Force

Copy-Item -Path $coffeeImg -Destination "$publicToursDir\coffee-farm-thumb.jpg" -Force
Copy-Item -Path $coffeeImg -Destination "$publicToursDir\coffee-tasting-thumb.jpg" -Force
Copy-Item -Path $coffeeImg -Destination "$publicToursDir\coffee-tasting-hero.jpg" -Force
Copy-Item -Path $coffeeImg -Destination "$publicToursDir\chocotour-thumb.jpg" -Force

Copy-Item -Path $whaleImg -Destination "$publicToursDir\whale-watching-thumb.jpg" -Force
Copy-Item -Path $whaleImg -Destination "$publicToursDir\whale-watching-hero.jpg" -Force

Copy-Item -Path $hummingbirdImg -Destination "$publicToursDir\hummingbirds-thumb.jpg" -Force
Copy-Item -Path $hummingbirdImg -Destination "$publicToursDir\hummingbirds-hero.jpg" -Force
Copy-Item -Path $hummingbirdImg -Destination "$publicToursDir\waterfalls-thumb.jpg" -Force
Copy-Item -Path $hummingbirdImg -Destination "$publicToursDir\waterfalls-hero.jpg" -Force

Copy-Item -Path $foodImg -Destination "$publicToursDir\street-food-thumb.jpg" -Force
Copy-Item -Path $foodImg -Destination "$publicToursDir\street-food-hero.jpg" -Force

Copy-Item -Path $cristoImg -Destination "$publicToursDir\cristo-rey-thumb.jpg" -Force
Copy-Item -Path $cristoImg -Destination "$publicToursDir\cristo-rey-hero.jpg" -Force

Write-Output "Successfully swapped 0-byte placeholders with actual premium generated images for the tour cards and heroes."
