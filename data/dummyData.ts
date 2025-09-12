import { Property } from "@/types/types"

export const properties = [
  {
    id: 1,
    title: "Modern Apartment in Jeddah",
    price: 120000,
    image: "/properties/property01.webp",
    url: "/properties/1"
  },
  {
    id: 2,
    title: "Luxury Villa in Riyadh",
    price: 850000,
    image: "/properties/property02.webp",
    url: "/properties/2"
  },
  {
    id: 3,
    title: "Cozy Studio in Dammam",
    price: 75000,
    image: "/properties/property03.webp",
    url: "/properties/3"
  },
  {
    id: 4,
    title: "Harmony Homes",
    price: 325000,
    image: "/properties/property04.webp",
    url: "/properties/3"
  },
  {
    id: 5,
    title: "Luxe Residences",
    price: 750000,
    image: "/properties/property05.webp",
    url: "/properties/3"
  },
  {
    id: 6,
    title: "Serene Estates",
    price: 635000,
    image: "/properties/property06.webp",
    url: "/properties/3"
  },
]

export const bannerData = {
  bg_image: '/hero-bg.webp',
  points: [
    { id:1,title: "Personalized Property Insights", description: "Get tailored recommendations based on your unique lifestyle and preferences. Our expertise ensures you discover properties that truly feel like home." },
    { id:2,title: "Luxury Redefined", description: "Get tailored recommendations based on your unique lifestyle and preferences. Our expertise ensures you discover properties that truly feel like home." },
    { id:3,title: "Comprehensive Support", description: "Get tailored recommendations based on your unique lifestyle and preferences. Our expertise ensures you discover properties that truly feel like home." },
  ]
}

export const articleDummyData = [
  {
    id: 1,
    title: "Why Real Estate is a Hedge Against Inflation",
    content: "lorem ipsom",
    image: "/blog/blog01.webp",
    url: "#"
  },
  {
    id: 2,
    title: "Why Real Estate is a Hedge Against Inflation",
    content: "lorem ipsom",
    image: "/blog/blog02.webp",
    url: "#"
  },
  {
    id: 3,
    title: "Why Real Estate is a Hedge Against Inflation",
    content: "lorem ipsom",
    image: "/blog/blog03.webp",
    url: "#"
  },
]

export const faqsDummyData = [
  {
    "id": 1,
    "title": "How do I find the right property for my needs?",
    "description": "We offer personalized recommendations based on your preferences, lifestyle, and budget. Our team works closely with you to ensure you find the perfect home or investment property."
  },
  {
    "id": 2,
    "title": "What is the process for buying a property?",
    "description": "The process includes property search, site visits, negotiations, legal paperwork, and finalizing the deal. We guide you at every step to make it seamless and stress-free."
  },
  {
    "id": 3,
    "title": "Do you assist with financing options?",
    "description": "Yes, we can connect you with trusted financial institutions and mortgage brokers to find the best financing options tailored to your needs."
  },
  {
    "id": 4,
    "title": "Are your listings updated regularly?",
    "description": "Absolutely! Our listings are updated in real-time to provide you with the latest and most accurate information about available properties."
  },
  {
    "id": 5,
    "title": "Can you help me sell my property?",
    "description": "Yes, we provide expert marketing and valuation services to ensure your property is sold at the best possible price in the shortest time."
  }
]

export const servicesDummyData = [
  {
    "id": 1,
    "title": "Property Match",
    "description": "Discover homes tailored to your lifestyle and budget with our personalized property search and expert recommendations.",
    "image": "/blog/blog01.webp"
  },
  {
    "id": 2,
    "title": "Market Insights",
    "description": "Stay ahead with up-to-date market trends, property valuations, and investment opportunities to make informed decisions.",
    "image": "/blog/blog02.webp"
  },
  {
    "id": 3,
    "title": "Seamless Transactions",
    "description": "From negotiations to paperwork, we handle every detail of the buying and selling process for a smooth and stress-free experience.",
    "image": "/blog/blog03.webp"
  }
]

export const propertiesPagesDummy: Property[] = [
  {
    "propertyId": "prop-12345",
    "title": "Charming Family Home with Modern Amenities",
    "price": 750000,
    "description": "A beautiful 4-bedroom family home with a spacious backyard and modern amenities.",
    "propertySize": "2,500",
    "bedrooms": 4,
    "bathrooms": 3,
    "garage": 2,
    "garageSize": "500",
    "yearBuilt": 2010,
    "propertyType": "Single Family Home",
    "propertyStatus": "For Sale",
    "additionalDetails": {
      "deposit": "$10,000",
      "poolSize": "15x30 ft",
      "amenities": [
        "Swimming pool",
        "Gym",
        "Community park"
      ],
      "additionalRooms": [
        "Home office",
        "Media room"
      ],
      "equipment": [
        "Central air conditioning",
        "Dishwasher",
        "Microwave"
      ]
    },
    "address": {
      "address": "123 Main Street",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345",
      "area": "Green Valley",
      "country": "USA"
    },
    "features": [
      "Hardwood floors",
      "Granite countertops",
      "Stainless steel appliances"
    ]
  },
  {
    "propertyId": "prop-67890",
    "title": "Luxury Penthouse with Rooftop Terrace",
    "price": 1200000,
    "description": "Luxurious penthouse apartment with stunning city views and a private rooftop terrace.",
    "propertySize": "3,000",
    "bedrooms": 3,
    "bathrooms": 4,
    "garage": 1,
    "garageSize": "250",
    "yearBuilt": 2018,
    "propertyType": "Condominium",
    "propertyStatus": "For Rent",
    "additionalDetails": {
      "deposit": "$20,000",
      "poolSize": "N/A",
      "amenities": [
        "24/7 Concierge",
        "Rooftop lounge",
        "Fitness center"
      ],
      "additionalRooms": [
        "Library",
        "Guest suite"
      ],
      "equipment": [
        "Smart home system",
        "Built-in coffee maker",
        "Wine cooler"
      ]
    },
    "address": {
      "address": "456 High Rise Avenue",
      "city": "Metropolis",
      "state": "NY",
      "zipCode": "54321",
      "area": "Downtown",
      "country": "USA"
    },
    "features": [
      "Floor-to-ceiling windows",
      "Marble bathrooms",
      "Private elevator"
    ]
  },
  {
    "propertyId": "prop-abcde",
    "title": "Cozy Bungalow for First-Time Buyers",
    "price": 350000,
    "description": "Cozy bungalow perfect for a small family or first-time homebuyer.",
    "propertySize": "1,500",
    "bedrooms": 2,
    "bathrooms": 1,
    "garage": 1,
    "garageSize": "200",
    "yearBuilt": 1985,
    "propertyType": "Bungalow",
    "propertyStatus": "Sold",
    "additionalDetails": {
      "deposit": "N/A",
      "poolSize": "N/A",
      "amenities": [
        "Garden",
        "Playground"
      ],
      "additionalRooms": [
        "Sunroom"
      ],
      "equipment": [
        "Washer/Dryer hookups",
        "Window A/C unit"
      ]
    },
    "address": {
      "address": "789 Quiet Lane",
      "city": "Smallville",
      "state": "IL",
      "zipCode": "98765",
      "area": "The Meadows",
      "country": "USA"
    },
    "features": [
      "Fenced backyard",
      "Original hardwood floors",
      "Large front porch"
    ]
  },
  {
    "propertyId": "prop-fghij",
    "title": "Modern Townhouse with Open Layout",
    "price": 950000,
    "description": "Modern townhouse with an open-concept layout and a private balcony.",
    "propertySize": "2,200",
    "bedrooms": 3,
    "bathrooms": 3,
    "garage": 2,
    "garageSize": "400",
    "yearBuilt": 2020,
    "propertyType": "Townhouse",
    "propertyStatus": "For Sale",
    "additionalDetails": {
      "deposit": "$15,000",
      "poolSize": "N/A",
      "amenities": [
        "Gated community",
        "Dog park",
        "Walking trails"
      ],
      "additionalRooms": [
        "Loft"
      ],
      "equipment": [
        "Tankless water heater",
        "Energy-efficient appliances"
      ]
    },
    "address": {
      "address": "101 Grand Street",
      "city": "Uptown",
      "state": "TX",
      "zipCode": "67890",
      "area": "The Bluffs",
      "country": "USA"
    },
    "features": [
      "High ceilings",
      "Smart thermostat",
      "Walk-in closets"
    ]
  },
  {
    "propertyId": "prop-klmno",
    "title": "Sprawling Estate with Equestrian Facilities",
    "price": 2500000,
    "description": "Sprawling estate with multiple acres, a guest house, and equestrian facilities.",
    "propertySize": "8,000",
    "bedrooms": 6,
    "bathrooms": 7,
    "garage": 4,
    "garageSize": "1,200",
    "yearBuilt": 2005,
    "propertyType": "Estate",
    "propertyStatus": "Pending",
    "additionalDetails": {
      "deposit": "$50,000",
      "poolSize": "20x50 ft",
      "amenities": [
        "Tennis court",
        "Horse stables",
        "Putting green"
      ],
      "additionalRooms": [
        "Gym",
        "Sauna",
        "Ballroom"
      ],
      "equipment": [
        "Geothermal heating",
        "Security system",
        "Commercial-grade kitchen appliances"
      ]
    },
    "address": {
      "address": "222 Country Road",
      "city": "Ruralville",
      "state": "CO",
      "zipCode": "13579",
      "area": "The Foothills",
      "country": "USA"
    },
    "features": [
      "Private lake access",
      "Mountain views",
      "Helipad"
    ]
  },
  {
    "propertyId": "prop-pqrst",
    "title": "Charming Cottage with Artist's Studio",
    "price": 550000,
    "description": "Charming cottage with a large garden and an artist's studio.",
    "propertySize": "1,800",
    "bedrooms": 3,
    "bathrooms": 2,
    "garage": 1,
    "garageSize": "220",
    "yearBuilt": 1950,
    "propertyType": "Cottage",
    "propertyStatus": "For Sale",
    "additionalDetails": {
      "deposit": "$8,000",
      "poolSize": "N/A",
      "amenities": [
        "Greenhouse",
        "Outdoor fireplace"
      ],
      "additionalRooms": [
        "Art studio"
      ],
      "equipment": [
        "Wood-burning stove",
        "Rainwater collection system"
      ]
    },
    "address": {
      "address": "333 Forest Path",
      "city": "Willow Creek",
      "state": "OR",
      "zipCode": "24680",
      "area": "The Woods",
      "country": "USA"
    },
    "features": [
      "Mature trees",
      "Detached studio",
      "Quiet cul-de-sac"
    ]
  }
]