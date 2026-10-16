#!/bin/bash
candidates=(
  "photo-1545241047-6083a3684587" # ficus
  "photo-1614594975525-e45190c55d0b" # monstera
  "photo-1512428813094-81478587b77b" # bird of paradise
  "photo-1509423350716-97f9360b4e09" # plant in pot
  "photo-1509223197845-458d87318791" # cactus / desert
  "photo-1501004318641-b39e6451bec6" # plants
  "photo-1578749556568-bc2c40e68b61" # pottery
  "photo-1600585154340-be6161a56a0c" # interior
  "photo-1592150621744-aca64f48394a" # ficus
  "photo-1517849845537-4d257902454a" # dog/other
  "photo-1584589167171-541ce45f1eea" # olive / greenery
  "photo-1598880940371-c756e015fea1" # snake plant
  "photo-1617173944883-6ffbd35d584d" # monstera pot
  "photo-1534349762230-e0cadf78f5da" # interior loft
  "photo-1586023492125-27b2c045efd7" # armchair / interior
  "photo-1600210492486-724fe5c67fb0" # architectural living room
  "photo-1558618666-fcd25c85cd64" # ceramics
  "photo-1563245372-f21724e3856d" # terracotta pot
  "photo-1528183429752-a97d0bf99b5a" # cactus
  "photo-1485955900006-10f4d324d411" # succulent pot
  "photo-1502005229762-ee1b2da97ba4" # architectural interior
  "photo-1513694203232-719a280e022f" # minimal room
  "photo-1524758631624-e2822e304c36" # minimal interior
  "photo-1506744038136-46273834b3fb" # nature
)

for id in "${candidates[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://images.unsplash.com/$id?auto=format&fit=crop&w=300&q=80")
  echo "$id : $code"
done
