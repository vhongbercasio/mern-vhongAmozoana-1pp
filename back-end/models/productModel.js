// to create mongooese schema
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        // create the fields documents to in database 
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        numReviews: {
            type: Number,
            required: true
        }
    },
    // updating time each record 
    {
        timestamps: true
    }
);


const Product = mongoose.model('Product', productSchema);
export default Product;