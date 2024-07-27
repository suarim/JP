const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 18
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    mobile: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Please fill a valid mobile number']
    },
    admin: {
      type: Boolean,
      default: false
    }
  });
  
  const Employee = mongoose.model('Employee', employeeSchema);