import { Resend } from 'resend';
import { generateInvoiceHtml } from './emailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// CORS middleware
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}

export default async function handler(req, res) {
  // Set CORS headers first
  setCorsHeaders(res);

  // Handle preflight request immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      customerEmail, 
      customerName, 
      orderId, 
      items, 
      totalAmount, 
      paymentMethod, 
      tableName, 
      storeInfo,
      employeeName
    } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const htmlContent = generateInvoiceHtml({ 
      orderId, 
      tableName, 
      customerName, 
      items, 
      totalAmount, 
      paymentMethod, 
      storeInfo,
      employeeName
    });

    const storeNameStr = storeInfo?.storeName || storeInfo?.invoiceStoreName || storeInfo?.name || 'Hóa đơn';
    const replyToEmail = storeInfo?.invoiceEmail || storeInfo?.email || 'invoice@staff.id.vn';

    const { data, error } = await resend.emails.send({
      from: `${storeNameStr} <invoice@staff.id.vn>`,
      to: customerEmail,
      replyTo: replyToEmail,
      subject: `[${storeNameStr}] Hóa Đơn Thanh Toán ${orderId ? `#${orderId}` : ''} - ${new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message || JSON.stringify(error) });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
