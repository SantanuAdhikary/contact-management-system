const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required: true
        },
        contact: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("contacts",contactSchema);

