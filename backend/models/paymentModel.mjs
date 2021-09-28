import  mongoose  from "mongoose";

const paymentSchema = new mongoose.Schema({
    user:{type: Array, default: []},
    data:{type: Array, default: []},
    payment:{type: Array, default: []},
});
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;