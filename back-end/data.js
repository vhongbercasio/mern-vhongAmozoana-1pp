import bcrypt from 'bcryptjs';
//create product data
//comment all id, since the mongoda was automatically to put their uniq id 
const data = {
    users: [
        {
            name: 'Vhong',
            email: "vhong@gmail.com",
            password: bcrypt.hashSync('1234567'),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'users@exmaple.com',
            password: bcrypt.hashSync('1234'),
            isAdmin: false
        }
    ],

    products: [
        {
            // _id: '1',
            name: 'peshoop ssadsadsadhirt',
            slug: 'nike-slimdsad-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality shirt',
        },

        {
            // _id: '2',
            name: 'Nikesadsad shirt',
            slug: 'nike-Fit-shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 250,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality shirt',
        },
        {
            // _id: '3',
            name: 'Nikesadsad Pant',
            slug: 'nike-slim-pant',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality shirt',
        },
        {
            // _id: '4',
            name: 'Adidas Fit Pant',
            slug: 'adidas-fit-pant',
            category: 'Shirts',
            image: '/images/p4.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality shirt',
        }
    ]

};

export default data;