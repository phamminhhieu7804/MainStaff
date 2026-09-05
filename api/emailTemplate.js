export function generateInvoiceHtml({ orderId, tableName, customerName, items, totalAmount, paymentMethod, storeInfo }) {
  const storeName = storeInfo?.invoiceStoreName || storeInfo?.name || storeInfo?.storeName || 'TÊN QUÁN';
  const address = storeInfo?.invoiceAddress || storeInfo?.address || '';
  const phone = storeInfo?.invoicePhone || storeInfo?.phone || '';
  const email = storeInfo?.invoiceEmail || storeInfo?.email || '';

  const itemsHtml = (items || []).map(item => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px dashed #e5e7eb;">${item.name}</td>
      <td style="padding: 8px 0; text-align: center; border-bottom: 1px dashed #e5e7eb;">${item.quantity}</td>
      <td style="padding: 8px 0; text-align: right; border-bottom: 1px dashed #e5e7eb;">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body style="background-color: #f9fafb; padding: 20px; margin: 0;">
  <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1f2937; max-width: 450px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="font-size: 24px; font-weight: bold; text-transform: uppercase; margin: 0 0 10px 0; color: #111827;">${storeName}</h2>
      ${address ? `<p style="margin: 0 0 5px 0; font-size: 13px; color: #4b5563;">${address}</p>` : ''}
      ${phone ? `<p style="margin: 0 0 5px 0; font-size: 13px; color: #4b5563;">SĐT: ${phone}</p>` : ''}
      ${email ? `<p style="margin: 0 0 15px 0; font-size: 13px; color: #4b5563;">Email: ${email}</p>` : ''}
    </div>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 20px 0;"></div>
      
    <h3 style="font-size: 18px; font-weight: bold; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Hóa Đơn Điện Tử</h3>
      
    <div style="text-align: left; font-size: 13px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding-bottom: 8px; color: #4b5563;">Mã đơn:</td><td style="text-align: right; font-weight: bold; padding-bottom: 8px;">${orderId || '___'}</td></tr>
        <tr><td style="padding-bottom: 8px; color: #4b5563;">Bàn:</td><td style="text-align: right; font-weight: bold; padding-bottom: 8px;">${tableName || 'Mua mang đi'}</td></tr>
        ${customerName ? `<tr><td style="padding-bottom: 8px; color: #4b5563;">Khách hàng:</td><td style="text-align: right; font-weight: bold; padding-bottom: 8px;">${customerName}</td></tr>` : ''}
        ${paymentMethod ? `<tr><td style="padding-bottom: 8px; color: #4b5563;">Thanh toán:</td><td style="text-align: right; font-weight: bold; padding-bottom: 8px;">${paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}</td></tr>` : ''}
        <tr><td style="padding-bottom: 8px; color: #4b5563;">Thời gian:</td><td style="text-align: right; padding-bottom: 8px;">${new Date().toLocaleString('vi-VN')}</td></tr>
      </table>
    </div>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 20px 0;"></div>
      
    <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="border-bottom: 1px solid #9ca3af; padding-bottom: 10px; color: #111827; text-align: left;">Tên món</th>
          <th style="border-bottom: 1px solid #9ca3af; padding-bottom: 10px; text-align: center; width: 40px; color: #111827;">SL</th>
          <th style="border-bottom: 1px solid #9ca3af; padding-bottom: 10px; text-align: right; width: 90px; color: #111827;">T.Tiền</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 20px 0;"></div>
      
    <table style="width: 100%; border-collapse: collapse; font-size: 18px; color: #111827;">
      <tr>
        <td style="font-weight: bold;">TỔNG CỘNG:</td>
        <td style="text-align: right; font-weight: bold;">${(totalAmount || 0).toLocaleString('vi-VN')}đ</td>
      </tr>
    </table>
      
    <div style="border-top: 1px dashed #9ca3af; margin: 20px 0;"></div>
      
    <div style="text-align: center;">
      <p style="font-size: 14px; font-weight: bold; margin-top: 10px; font-style: italic; color: #111827;">Cảm ơn quý khách & Hẹn gặp lại!</p>
      <p style="font-size: 11px; margin-top: 8px; color: #6b7280;">Hệ thống quản lý SaaS Staff &copy; HieuPham</p>
    </div>
  </div>
</body>
</html>`;
}
