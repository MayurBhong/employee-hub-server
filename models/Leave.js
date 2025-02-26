import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId:{type: Schema.Types.ObjectId, ref: "Employee", required: true},
    leaveType: {
        type: String,
        enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
        required: true,
    },
    startDate:{type: Date, required: true},
    endDate:{type: Date, required: true},
    reason:{type: String, required: true},
    status:{
        type: String, 
        enum: ["Pending", "Approved", "Rejected"], 
        default: "Pending"
    },
    createAt:{type: Date, default: Date.now},
    updateAt:{type: Date, default: Date.now},
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;