import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 🔐 بيانات سلة (حطيها في .env)
const CLIENT_ID = process.env.SALLA_CLIENT_ID;7e42b932-6690-477d-aba0-a9fca78047e5
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;87d448ab8653ce37eddefb645d0b5526c51d2350e8f59081ad2eb6121b88a16f
const REDIRECT_URI = process.env.SALLA_REDIRECT_URI;https://lamsahai-ihnzuvxh.manus.space/callback

// 📌 Callback URL
router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Missing code from Salla",
      });
    }

    // 🔁 نبدل code بـ access_token
    const response = await axios.post(
      "https://accounts.salla.sa/oauth2/token",
      {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: code,
      }
    );

    const data = response.data;

    // 🧠 هنا تقدرين تحفظين التوكن في DB
    console.log("Salla Tokens:", data);

    // ✅ الرد النهائي
    return res.json({
      success: true,
      message: "تم الربط بنجاح 🎉",
      data: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      },
    });
  } catch (error) {
    console.error("Salla Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "فشل الربط ❌",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
