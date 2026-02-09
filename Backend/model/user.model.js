const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.MOBILE_ENCRYPTION_KEY; // 32 chars
const IV_LENGTH = 16;

// 🔐 encrypt helper
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    age: {
      type: Number,
    },

    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified("mobile")) {
    this.mobile = encrypt(this.mobile);
  }
});

UserSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  if (update.password || update?.$set?.password) {
    const rawPassword = update.password || update.$set.password;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(rawPassword, salt);

    if (update.password) update.password = hashed;
    else update.$set.password = hashed;
  }

  if (update.mobile || update?.$set?.mobile) {
    const rawMobile = update.mobile || update.$set.mobile;
    const encrypted = encrypt(rawMobile);

    if (update.mobile) update.mobile = encrypted;
    else update.$set.mobile = encrypted;
  }
});

module.exports = mongoose.model("User", UserSchema);
