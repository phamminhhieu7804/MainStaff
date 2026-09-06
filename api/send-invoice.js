import { generateInvoiceHtml } from './emailTemplate.js';
import nodemailer from 'nodemailer';
import admin from 'firebase-admin';

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountJson) {
      const serviceAccount = JSON.parse(serviceAccountJson);
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      initializeApp({
        credential: cert(serviceAccount)
      });
    } else {
      console.warn("FIREBASE_SERVICE_ACCOUNT_KEY not set. Using default credentials if available.");
      initializeApp();
    }
  } catch (error) {
    console.error('Firebase admin init error', error);
  }
}

const db = getFirestore();

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      storeId,
      customerEmail,
      customerName,
      orderId,
      items,
      totalAmount,
      paymentMethod,
      tableName,
      employeeName
    } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let smtpUser = null;
    let smtpPassword = null;
    let fetchedStoreInfo = {};

    if (storeId) {
      const emailConfigSnap = await db.doc(`stores/${storeId}/private_settings/emailConfig`).get();
      if (emailConfigSnap.exists) {
        const configData = emailConfigSnap.data();
        smtpUser = configData.smtpUser;
        smtpPassword = configData.smtpPassword;
      }

      const storeSettingsSnap = await db.doc(`store_settings/${storeId}`).get();
      if (storeSettingsSnap.exists) {
        fetchedStoreInfo = storeSettingsSnap.data();
      }
    }

    if (!smtpUser || !smtpPassword) {
      return res.status(400).json({ error: 'Chưa cấu hình Mật khẩu ứng dụng Gmail cho quán này.' });
    }

    const cleanSmtpPassword = smtpPassword.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: cleanSmtpPassword
      }
    });

    const htmlContent = generateInvoiceHtml({
      orderId,
      tableName,
      customerName,
      items,
      totalAmount,
      paymentMethod,
      storeInfo: fetchedStoreInfo,
      employeeName
    });

    const storeNameStr = fetchedStoreInfo?.invoiceStoreName || fetchedStoreInfo?.storeName || fetchedStoreInfo?.name || 'Hóa đơn';

    await transporter.sendMail({
      from: `"${storeNameStr}" <${smtpUser}>`,
      to: customerEmail,
      replyTo: fetchedStoreInfo?.invoiceEmail || fetchedStoreInfo?.email,
      subject: `[${storeNameStr}] Hóa Đơn Thanh Toán ${orderId ? `#${orderId}` : ''} - ${new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
      html: htmlContent
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    if (error.code === 'EAUTH' || error.message?.includes('EAUTH')) {
      return res.status(401).json({ error: 'Mật khẩu ứng dụng Gmail sai hoặc hết hạn. Vui lòng kiểm tra lại cấu hình.' });
    }
    return res.status(500).json({ error: error.message || 'Error sending email' });
  }
}