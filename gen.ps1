$items = @(
  @('Pad Thai Goong Sod', 'pad-thai-goong-sod'),
  @('Green Curry Chicken', 'green-curry-chicken'),
  @('Som Tum Thai (Papaya Salad)', 'som-tum-thai'),
  @('Massaman Beef Curry', 'massaman-beef-curry'),
  @('Khao Pad Pu (Crab Fried Rice)', 'khao-pad-pu'),
  @('Moo Ping (Grilled Pork)', 'moo-ping'),
  @('Pla Rad Prik (Crispy Fish)', 'pla-rad-prik'),
  @('Thai Iced Tea', 'thai-iced-tea'),
  @('Moo Krob (Crispy Pork Belly)', 'moo-krob'),
  @('Khao Soi (Northern Curry Noodles)', 'khao-soi'),
  @('Tod Mun Pla (Thai Fish Cakes)', 'tod-mun-pla'),
  @('Larb Moo (Spicy Minced Pork Salad)', 'larb-moo'),
  @('Tub Tim Grob (Red Ruby Dessert)', 'tub-tim-grob')
)

foreach ($item in $items) {
  $name = $item[0]
  $file = $item[1]
  $svg = "<svg width='800' height='800' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='#111827'/><text x='50%' y='50%' font-family='sans-serif' font-size='30' fill='#D4AF37' text-anchor='middle' dominant-baseline='middle'>$name</text><text x='50%' y='56%' font-family='sans-serif' font-size='20' fill='#9CA3AF' text-anchor='middle' dominant-baseline='middle'>(Replace with $file.png)</text></svg>"
  Set-Content -Path "public\$file.svg" -Value $svg -Encoding UTF8
}
