const mongoose = require("mongoose");
const Service = require("./service.model"); // Import Service model

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
      },
    ],
    totalDuration: {
      type: Number, // Automatically calculated
    },
    estimatedPickupTime: {
      type: Date, // Auto-calculated
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// **Auto-calculate total duration before saving**
OrderSchema.pre("save", async function (next) {
  let totalDuration = 0;

  for (let i = 0; i < this.services.length; i++) {
    const service = await Service.findById(this.services[i].service);
    totalDuration += service.duration;
  }

  this.totalDuration = totalDuration;

  // Calculate estimated pickup time
  this.estimatedPickupTime = new Date();
  this.estimatedPickupTime.setHours(this.estimatedPickupTime.getHours() + totalDuration);

  next();
});

module.exports = mongoose.model("Order", OrderSchema);
