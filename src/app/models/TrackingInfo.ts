import mongoose, { Schema } from 'mongoose';

const trackingInfoSchema = new Schema({
  district_id: { type: Number, index: true },
  phone_numbers: { type: [{ type: String, match: /[0-9]{10}/ }] },
});

const TrackingInfoModel = mongoose.model('TrackingInfo', trackingInfoSchema);

export default TrackingInfoModel;
