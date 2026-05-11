export const MOCK_USERS = [
    {
        id: 'u1',
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password',
        role: 'user',
        location: 'Downtown'
    },
    {
        id: 'w1',
        name: 'Bob the Builder',
        email: 'worker@example.com',
        password: 'password',
        role: 'worker',
        serviceType: 'Carpenter',
        location: 'Uptown',
        availability: true,
        rating: 4.8
    },
    {
        id: 'w2',
        name: 'Alice Electric',
        email: 'alice@example.com',
        password: 'password',
        role: 'worker',
        serviceType: 'Electrician',
        location: 'Downtown',
        availability: false,
        rating: 4.9
    },
    {
        id: 'a1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin'
    }
];

export const SERVICE_DETAILS = {
    'carpenter': {
        description: 'Expert carpenters for furniture making, wood repairs, door/window fitting, and custom woodwork at your home.',
        type: 'Home Repair & Renovation',
        priceRange: '₹500 – ₹5,000',
        priceNote: 'Price varies based on work complexity and materials used.'
    },
    'gas-pipeline': {
        description: 'Certified technicians for safe gas pipeline installation, leak detection, and repairs.',
        type: 'Safety & Infrastructure',
        priceRange: '₹800 – ₹4,000',
        priceNote: 'Price depends on pipeline length and type of work.'
    },
    'gas-repair': {
        description: 'Quick and safe gas appliance repair services by trained professionals.',
        type: 'Appliance Repair',
        priceRange: '₹300 – ₹2,000',
        priceNote: 'Diagnosis charge may apply separately.'
    },
    'electrician': {
        description: 'Licensed electricians for wiring, installations, switchboard repairs, and electrical maintenance.',
        type: 'Electrical Services',
        priceRange: '₹400 – ₹6,000',
        priceNote: 'Price varies based on work scope and parts required.'
    },
    'painter': {
        description: 'Professional painters for interior and exterior painting, wall textures, and waterproofing.',
        type: 'Home Improvement',
        priceRange: '₹10 – ₹25 per sq.ft',
        priceNote: 'Final price depends on area size and paint quality.'
    },
    'home-cleaner': {
        description: 'Thorough home deep cleaning including floors, kitchen, and living areas by trained staff.',
        type: 'Cleaning Services',
        priceRange: '₹1,000 – ₹4,000',
        priceNote: 'Price based on home size (1BHK, 2BHK, 3BHK, etc.).'
    },
    'bathroom-cleaner': {
        description: 'Deep bathroom cleaning, tile scrubbing, sanitization, and odor removal.',
        type: 'Cleaning Services',
        priceRange: '₹400 – ₹1,500',
        priceNote: 'Price per bathroom; discounts for multiple bathrooms.'
    },
    'plumber': {
        description: 'Expert plumbers for pipe leaks, tap repairs, drainage issues, and bathroom fittings.',
        type: 'Plumbing Services',
        priceRange: '₹300 – ₹3,000',
        priceNote: 'Price depends on issue type and parts needed.'
    },
    'motor-repair': {
        description: 'Water motor and pump repair, rewinding, and replacement services.',
        type: 'Appliance Repair',
        priceRange: '₹500 – ₹3,500',
        priceNote: 'Includes inspection; parts charged separately.'
    },
    'tank-sump-cleaner': {
        description: 'Professional overhead tank and underground sump cleaning and disinfection.',
        type: 'Cleaning Services',
        priceRange: '₹800 – ₹3,000',
        priceNote: 'Price based on tank/sump capacity.'
    },
    'washing-machine-repair': {
        description: 'Repair and servicing of all washing machine brands — front load and top load.',
        type: 'Appliance Repair',
        priceRange: '₹400 – ₹2,500',
        priceNote: 'Spare parts charged extra if required.'
    },
    'welding': {
        description: 'Metal welding, gate fabrication, grill repair, and structural welding work.',
        type: 'Fabrication & Repair',
        priceRange: '₹500 – ₹5,000',
        priceNote: 'Price based on material and work hours.'
    },
    'ac-repair': {
        description: 'AC servicing, gas refilling, installation, and repair for all brands.',
        type: 'Appliance Repair',
        priceRange: '₹500 – ₹4,000',
        priceNote: 'Gas refill and parts charged separately.'
    },
    'water-purifier': {
        description: 'Water purifier installation, filter replacement, and repair for all brands.',
        type: 'Appliance Services',
        priceRange: '₹300 – ₹2,000',
        priceNote: 'Filters and parts charged extra.'
    },
    'refrigerator-repair': {
        description: 'Refrigerator repair, gas charging, thermostat replacement for all brands.',
        type: 'Appliance Repair',
        priceRange: '₹500 – ₹3,500',
        priceNote: 'Spare parts charged separately.'
    },
    'laptop-desktop-repair': {
        description: 'Laptop and desktop repair, OS installation, hardware upgrades, and data recovery.',
        type: 'Electronics Repair',
        priceRange: '₹500 – ₹5,000',
        priceNote: 'Price depends on issue; parts extra.'
    },
    'microwave-repair': {
        description: 'Microwave oven repair and servicing for all brands and models.',
        type: 'Appliance Repair',
        priceRange: '₹400 – ₹2,000',
        priceNote: 'Parts charged separately if needed.'
    },
    'tv-repair': {
        description: 'TV repair, wall mounting, and installation for LED, LCD, and Smart TVs.',
        type: 'Electronics Services',
        priceRange: '₹400 – ₹3,000',
        priceNote: 'Parts and mounting hardware charged extra.'
    },
    'chimney-repair': {
        description: 'Kitchen chimney cleaning, repair, and installation services.',
        type: 'Appliance Services',
        priceRange: '₹500 – ₹2,500',
        priceNote: 'Filter replacement charged separately.'
    },
    'gas-geyser': {
        description: 'Gas geyser installation, repair, and servicing by certified technicians.',
        type: 'Appliance Services',
        priceRange: '₹400 – ₹2,500',
        priceNote: 'Parts and gas charged separately.'
    },
    'dish-washer': {
        description: 'Dishwasher installation, repair, and maintenance for all brands.',
        type: 'Appliance Repair',
        priceRange: '₹500 – ₹3,000',
        priceNote: 'Spare parts charged extra.'
    },
    'geyser': {
        description: 'Electric geyser installation, repair, and element replacement.',
        type: 'Appliance Services',
        priceRange: '₹300 – ₹2,000',
        priceNote: 'Parts charged separately.'
    },
    'water-level-controller': {
        description: 'Water level controller installation, wiring, and repair services.',
        type: 'Electrical Services',
        priceRange: '₹500 – ₹2,500',
        priceNote: 'Device cost extra if replacement needed.'
    },
    'inverter-ups': {
        description: 'Inverter and UPS installation, battery replacement, and repair.',
        type: 'Electrical Services',
        priceRange: '₹500 – ₹4,000',
        priceNote: 'Battery cost charged separately.'
    },
    'solar-water-heater': {
        description: 'Solar water heater installation, repair, and maintenance services.',
        type: 'Green Energy Services',
        priceRange: '₹1,000 – ₹6,000',
        priceNote: 'Price based on system size and issue.'
    },
    'cooking-range': {
        description: 'Cooking range and gas stove repair, burner cleaning, and part replacement.',
        type: 'Appliance Repair',
        priceRange: '₹300 – ₹2,000',
        priceNote: 'Parts charged separately.'
    }
};

export const SERVICE_CATEGORIES = [
    { id: 'carpenter', name: 'Carpenter', icon: 'Hammer', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400' },
    { id: 'gas-pipeline', name: 'Gas Pipeline', icon: 'Flame', image: '/images/gas-pipeline.jpg' },
    { id: 'gas-repair', name: 'Gas Repair', icon: 'Wrench', image: '/images/gas-repair.jpg' },
    { id: 'electrician', name: 'Electrician', icon: 'Zap', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400' },
    { id: 'painter', name: 'Painter', icon: 'Brush', image: '/images/painter.jpg' },
    { id: 'home-cleaner', name: 'Home Cleaner', icon: 'Home', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
    { id: 'bathroom-cleaner', name: 'Bathroom Cleaner', icon: 'Bath', image: '/images/bathroom-cleaner.jpg' },
    { id: 'plumber', name: 'Plumber', icon: 'Droplet', image: '/images/plumber.jpg' },
    { id: 'motor-repair', name: 'Motor Repair', icon: 'Cog', image: '/images/motor-repair.jpg' },
    { id: 'tank-sump-cleaner', name: 'Tank & Sump Cleaner', icon: 'Container', image: '/images/tank-sump-cleaner.jpg' },
    { id: 'washing-machine-repair', name: 'Washing Machine Repair', icon: 'Settings', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400' },
    { id: 'welding', name: 'Welding', icon: 'Flame', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400' },
    { id: 'ac-repair', name: 'AC Repair & Installation', icon: 'Wind', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400' },
    { id: 'water-purifier', name: 'Water Purifier Sale & Repair', icon: 'Droplets', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    { id: 'refrigerator-repair', name: 'Refrigerator Repair', icon: 'Refrigerator', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400' },
    { id: 'laptop-desktop-repair', name: 'Laptop/Desktop Sale & Repair', icon: 'Monitor', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400' },
    { id: 'microwave-repair', name: 'Microwave Repair', icon: 'Microwave', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400' },
    { id: 'tv-repair', name: 'TV Repair & Installation', icon: 'Tv', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
    { id: 'chimney-repair', name: 'Chimney Repair & Installation', icon: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
    { id: 'gas-geyser', name: 'Gas Geyser', icon: 'Flame', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    { id: 'dish-washer', name: 'Dish Washer', icon: 'Utensils', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
    { id: 'geyser', name: 'Geyser', icon: 'Droplet', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    { id: 'water-level-controller', name: 'Water Level Controller', icon: 'Gauge', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    { id: 'inverter-ups', name: 'Inverter UPS Sale & Repair', icon: 'Battery', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400' },
    { id: 'solar-water-heater', name: 'Solar Water Heater Repair', icon: 'Sun', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
    { id: 'cooking-range', name: 'Cooking Range Repair', icon: 'Flame', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' }
];

export const MOCK_REQUESTS = [
    {
        id: 'r1',
        userId: 'u1',
        serviceType: 'Electrician',
        status: 'pending',
        date: '2025-12-15',
        details: 'Power outage in kitchen',
        location: 'Downtown'
    }
];
