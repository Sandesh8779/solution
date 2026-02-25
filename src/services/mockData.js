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
