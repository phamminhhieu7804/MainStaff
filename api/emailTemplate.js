export function generateInvoiceHtml({ orderId, tableName, customerName, items, totalAmount, paymentMethod, storeInfo, employeeName }) {
  const storeName = storeInfo?.invoiceStoreName || storeInfo?.name || storeInfo?.storeName || 'TÊN QUÁN';
  const address = storeInfo?.invoiceAddress || storeInfo?.address || '';
  const phone = storeInfo?.invoicePhone || storeInfo?.phone || '';
  const email = storeInfo?.invoiceEmail || storeInfo?.email || '';

  const itemsHtml = (items || []).map(item => `
    <tr>
      <td style="padding: 8px 0; font-size: 13px; color: #1f2937;">${item.name}</td>
      <td style="padding: 8px 0; font-size: 13px; color: #1f2937; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px 0; font-size: 13px; color: #1f2937; text-align: right;">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body style="background-color: #f9fafb; padding: 20px; margin: 0;">
  <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 14px; color: #1f2937; max-width: 450px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 2px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative;">
    
    <div style="text-align: center; margin-bottom: 20px;">
      <h3 style="font-size: 20px; font-weight: bold; text-transform: uppercase; margin: 0 0 5px 0; color: #1f2937; font-family: Arial, sans-serif;">${storeName}</h3>
      ${address ? `<p style="margin: 0 0 5px 0; font-size: 12px; color: #4b5563; font-family: Arial, sans-serif;">${address}</p>` : ''}
      ${phone ? `<p style="margin: 0 0 5px 0; font-size: 12px; color: #4b5563; font-family: Arial, sans-serif;">SĐT: ${phone}</p>` : ''}
      ${email ? `<p style="margin: 0 0 15px 0; font-size: 12px; color: #4b5563; font-family: Arial, sans-serif;">Email: ${email}</p>` : ''}
    </div>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 15px 0;"></div>
      
    <h4 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; text-align: center; font-family: Arial, sans-serif;">Hóa Đơn Thanh Toán</h4>
      
    <div style="text-align: left; font-size: 13px; margin-bottom: 15px; font-family: Arial, sans-serif;">
      <table style="width: 100%; border-collapse: collapse;">
        ${orderId ? `<tr><td style="padding-bottom: 5px; color: #4b5563;">Số phiếu:</td><td style="text-align: right; font-weight: bold; padding-bottom: 5px; color: #1f2937;">${orderId}</td></tr>` : ''}
        <tr><td style="padding-bottom: 5px; color: #4b5563;">Bàn:</td><td style="text-align: right; font-weight: bold; padding-bottom: 5px; color: #1f2937;">${tableName || 'Mua mang đi'}</td></tr>
        <tr><td style="padding-bottom: 5px; color: #4b5563;">Thu ngân:</td><td style="text-align: right; font-weight: bold; padding-bottom: 5px; color: #1f2937;">${employeeName || 'Nhân viên'}</td></tr>
        <tr><td style="padding-bottom: 5px; color: #4b5563;">Thời gian:</td><td style="text-align: right; padding-bottom: 5px; color: #1f2937;">${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</td></tr>
      </table>
    </div>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 15px 0;"></div>
      
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr>
          <th style="padding-bottom: 8px; color: #111827; text-align: left; font-size: 12px; border-bottom: 1px solid #d1d5db;">Tên món</th>
          <th style="padding-bottom: 8px; text-align: center; width: 40px; color: #111827; font-size: 12px; border-bottom: 1px solid #d1d5db;">SL</th>
          <th style="padding-bottom: 8px; text-align: right; width: 90px; color: #111827; font-size: 12px; border-bottom: 1px solid #d1d5db;">T.Tiền</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 15px 0;"></div>
      
    <table style="width: 100%; border-collapse: collapse; font-size: 16px; color: #111827; font-family: Arial, sans-serif;">
      <tr>
        <td style="font-weight: bold;">TỔNG CỘNG:</td>
        <td style="text-align: right; font-weight: bold;">${(totalAmount || 0).toLocaleString('vi-VN')} đ</td>
      </tr>
    </table>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 15px 0;"></div>
      
    <div style="text-align: center; font-family: Arial, sans-serif;">
      <p style="font-size: 12px; font-weight: bold; margin-top: 5px; font-style: italic; color: #1f2937;">Cảm ơn quý khách & Hẹn gặp lại!</p>
      <p style="font-size: 10px; margin-top: 5px; color: #6b7280;">Hệ thống quản lý SaaS Staff &copy; HieuPham</p>
    </div>
    
    <span style="display: none !important; opacity: 0; color: transparent;">${Date.now()}</span>
  </div>
</body>
</html>`;
}
