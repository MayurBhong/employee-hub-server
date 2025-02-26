import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason} = req.body;
        const employee = await Employee.findOne({userId});

        const newLeave = new Leave({ 
          employeeId: employee._id, leaveType, startDate, endDate, reason
        });

        await newLeave.save();

        return res.status(200).json({success: true})
    } catch (error) {
        return res.status(500).json({success: false, error: "add leave server error"})
    }
}

const getLeave = async (req, res) => {
    try{
        const {id, role} = req.params;
        let leaves;
        if(role === "admin") {
          leaves = await Leave.find({employeeId: id});
        } else {            
            const employee = await Employee.findOne({userId: id});
            leaves = await Leave.find({employeeId: employee._id});
        }
   
        return res.status(200).json({success: true, leaves})
    } catch(error) {
        return res.status(500).json({success: false, error: "leave add server error"})
    }
}

const getLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate:[
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name"
                }
            ]
        })
        return res.status(200).json({success: true, leaves})
    } catch(error) {
        return res.status(500).json({success: false, error: "leave add server error"})
    }
}

const getLeaveDetail = async (req, res) => {
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate:[
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name profileImage"
                }
            ]
        })
        return res.status(200).json({success: true, leave})
    } catch(error) {
        return res.status(500).json({success: false, error: "leave detail server error"})
    }
}

const updateLeave = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status});
        if(!leave) {
            return res.status(404).json({success: false, error: "leave not found"})
        }
        return res.status(200).json({success: true})
    } catch(error) {
        return res.status(500).json({success: false, error: "leave update server error"})
    }
}

export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave};