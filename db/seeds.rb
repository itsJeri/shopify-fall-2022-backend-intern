puts "Seeding warehouses..."
w1 = Warehouse.create(name: "Virginia 1", street: "1111 Fake St", city: "Alexandria", country: "United States")
w2 = Warehouse.create(name: "Virginia 2", street: "2222 Imagination Dr", city: "Rainbow Land", country: "United States")
w3 = Warehouse.create(name: "Ontario 1", street: "3321 Rainbow Rd", city: "Toronto", country: "Canada")

puts "Seeding items..."
i1 = Item.create(name: "Sponge", description: "A yellow square sponge wearing square pants.", warehouse: w1)
i2 = Item.create(name: "Pencil", description: "An instrument for writing or drawing, consisting of a thin stick of graphite. DoodleBob's weapon of choice.", warehouse: w1)
i3 = Item.create(name: "Eraser", description: "A piece of soft rubber used to rub out something written or drawn.", warehouse: w2)