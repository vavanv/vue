import fs from 'fs'
import path from 'path'

const categories = [
  'Electronics',
  'Lifestyle',
  'Services',
  'Office',
  'Software',
  'Sports',
  'Telecomm',
  'Health',
  'Art',
  'Advanced Tech',
  'Furniture',
  'Stationery',
  'Gift',
  'Decor',
  'Kitchen',
  'History',
  'Jewelry',
  'Recreation',
  'Collectible',
  'Maintenance',
]
const productNames = [
  'Quantum',
  'Eco-Friendly',
  'Dynamic',
  'Innovator',
  'CyberShield',
  'Aura',
  'Peak',
  'Logistics',
  'Future Focus',
  'Global Connect',
  'Prime',
  'Ultra',
  'Smart',
  'Elite',
  'Vortex',
  'Zenith',
  'Nebula',
  'Titan',
  'Apex',
  'Infinity',
  'Compact',
  'Rugged',
  'Sleek',
  'Premium',
  'Pro',
  'Max',
  'Lite',
  'Plus',
  'Ultra',
  'Extreme',
]
const productSuffixes = [
  'Processor',
  'Bottle',
  'Hosting',
  'Lamp',
  'Firewall',
  'Fan',
  'Shoes',
  'Sync',
  'VR Headset',
  'Sim Card',
  'Tablet',
  'Watch',
  'Camera',
  'Drone',
  'Monitor',
  'Keyboard',
  'Mouse',
  'Controller',
  'Scanner',
  'Printer',
  'Module',
  'Unit',
  'System',
  'Gadget',
  'Device',
  'Appliance',
  'Tool',
  'Kit',
  'Pack',
  'Core',
]

const customersPath = 'c:/Develop/Vue/src/assets/customers.json'
const productsPath = 'c:/Develop/Vue/src/assets/products.json'

const customers = JSON.parse(fs.readFileSync(customersPath, 'utf8'))

const products = []
let productId = 1

customers.forEach((customer) => {
  const count = Math.floor(Math.random() * 6) + 5 // 5 to 10 products per customer
  for (let i = 0; i < count; i++) {
    const name = `${productNames[Math.floor(Math.random() * productNames.length)]} ${productSuffixes[Math.floor(Math.random() * productSuffixes.length)]} ${productId}`
    const price = parseFloat((Math.random() * 2000 + 10).toFixed(2))
    const category = categories[Math.floor(Math.random() * categories.length)]

    products.push({
      id: productId++,
      name: name,
      price: price,
      category: category,
      customerId: customer.id,
    })
  }
})

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2))
console.log(`Successfully generated ${products.length} products for ${customers.length} customers.`)
