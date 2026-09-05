import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Coffee,
  Users,
  BarChart3,
  Receipt,
  Mail,
  Zap,
  Globe,
  Download
} from 'lucide-react';

function App() {
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    fetch('https://apiadminstaff.vercel.app/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPackages(data.packages);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingPackages(false));
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Group packages by type (Thường vs Pro)
  const groupedPackages = packages.reduce((acc, pkg) => {
    const type = pkg.type || 'Thường';
    if (!acc[type]) acc[type] = [];
    acc[type].push(pkg);
    return acc;
  }, {});

  // Sort groups: Thường first, then Pro
  const sortedTypes = Object.keys(groupedPackages).sort((a, b) => {
    if (a.toLowerCase() === 'thường') return -1;
    if (b.toLowerCase() === 'thường') return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Staff SaaS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Tính năng</a>
            <a href="#apps" className="hover:text-blue-600 transition-colors">Hệ sinh thái</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Bảng giá</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">Về chúng tôi</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://adminstaff.vercel.app/" target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Đăng nhập Admin
            </a>
            <a href="https://staff-rho-eight.vercel.app/" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
              Mở Staff App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grid.framerusercontent.com/assets/fXy02T2B9R8M5E9Yy3Tq1yM5XmQ.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Ứng dụng Web thế hệ mới (PWA)
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Quản lý quán thông minh, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                nhân đôi hiệu suất.
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Giải pháp phần mềm quản lý toàn diện dành cho Quán Cafe & Nhà Hàng. 
              Sử dụng trực tiếp trên nền tảng Web không cần qua App Store, hoặc <strong className="text-gray-900">Tải về máy</strong> (Thêm vào Màn hình chính) để dùng như một ứng dụng gốc siêu mượt mà!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://adminstaff.vercel.app/" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 gap-2">
                <Monitor className="w-5 h-5" />
                Đăng nhập Admin
              </a>
              <a href="https://staff-rho-eight.vercel.app/" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm gap-2">
                <Smartphone className="w-5 h-5" />
                Sử dụng Staff App
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Hỗ trợ cài đặt trực tiếp về điện thoại / máy tính
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tính năng đột phá</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Mọi công cụ bạn cần để vận hành quán trơn tru, từ lúc mở cửa đến khi chốt sổ.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users />}
              title="Quản lý nhân sự & Tính lương"
              desc="Chấm công bằng định vị GPS, tự động tính lương theo giờ/phút/giây chính xác tuyệt đối. Phân ca thông minh."
            />
            <FeatureCard 
              icon={<BarChart3 />}
              title="Thống kê doanh thu realtime"
              desc="Theo dõi doanh thu, biểu đồ tài chính và lịch sử đơn hàng theo thời gian thực từ bất cứ đâu."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Thanh toán tự động (SePay)"
              desc="Khách quét VietQR, hệ thống tự nhận tiền và đổi trạng thái bàn ngay lập tức mà không cần xác nhận thủ công."
            />
            <FeatureCard 
              icon={<Mail />}
              title="Hóa đơn điện tử (E-Invoice)"
              desc="Tự động sinh mã hóa đơn, tạo file biên lai đẹp mắt và gửi thẳng vào email khách hàng sau khi thanh toán."
            />
            <FeatureCard 
              icon={<Download />}
              title="Cài đặt không cần App Store"
              desc="Sử dụng nền tảng Web App (PWA). Cho phép 'Thêm vào màn hình chính' để cài đặt trực tiếp trên iOS và Android nhẹ nhàng."
            />
            <FeatureCard 
              icon={<Globe />}
              title="Menu điện tử (Khách tự order)"
              desc="Khách tự quét mã QR tại bàn để xem menu, đặt món và gọi thanh toán mà không cần chờ nhân viên."
            />
          </div>
        </div>
      </section>

      {/* Ecosystem Apps */}
      <section id="apps" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hệ sinh thái ứng dụng Web (PWA) hiện đại</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chúng tôi tập trung vào trải nghiệm nền tảng Web tiên tiến nhất. Khởi chạy nhanh, không tốn dung lượng máy, và cập nhật tính năng tức thời.
              </p>
              
              <div className="space-y-6">
                <AppItem 
                  title="AdminStaff (Dành cho Quản lý)"
                  desc="Cổng điều hành trung tâm. Cài đặt quán, quản lý nhân viên, cấu hình hóa đơn, kiểm soát tài chính."
                  link="https://adminstaff.vercel.app/"
                />
                <AppItem 
                  title="Staff App (Dành cho Nhân viên)"
                  desc="Công cụ làm việc hàng ngày. Order món, đóng bàn, chấm công, xem lịch làm việc. Hỗ trợ cài thẳng vào điện thoại."
                  link="https://staff-rho-eight.vercel.app/"
                />
                <AppItem 
                  title="MenuStaff (Dành cho Khách hàng)"
                  desc="Menu điện tử quét mã QR. Khách tự chọn món, gọi tính tiền và tự nhập email nhận hóa đơn."
                  link="#"
                />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex items-center justify-center p-8 relative">
                <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                  <div className="h-10 border-b border-gray-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 flex">
                    <div className="w-1/4 border-r border-gray-100 bg-gray-50 p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="w-3/4 p-6">
                      <div className="h-8 bg-blue-100 rounded-lg w-1/3 mb-6"></div>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="h-24 bg-gray-100 rounded-lg"></div>
                        <div className="h-24 bg-gray-100 rounded-lg"></div>
                        <div className="h-24 bg-gray-100 rounded-lg"></div>
                      </div>
                      <div className="h-40 bg-indigo-50 rounded-lg w-full border border-indigo-100 flex items-center justify-center">
                        <BarChart3 className="w-12 h-12 text-indigo-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Grouped like Admin) */}
      <section id="pricing" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bảng giá dịch vụ</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Chỉ xem giá cả tham khảo. Đăng nhập vào Admin để tiến hành gia hạn.</p>
          </div>
          
          {loadingPackages ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {sortedTypes.map(type => {
                const typePkgs = groupedPackages[type];
                const isPro = type.toLowerCase() === 'pro';
                
                const samplePkg = typePkgs[0];
                
                return (
                  <div key={type} className={`rounded-3xl border p-8 md:p-10 flex flex-col relative overflow-hidden transition-all ${isPro ? 'bg-gray-900 border-gray-800 shadow-2xl shadow-blue-900/20' : 'bg-white border-gray-200 shadow-sm'}`}>
                    {isPro && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                        Khuyên dùng
                      </div>
                    )}
                    
                    <div className="flex flex-col md:flex-row gap-10">
                      {/* Left: Info & Features */}
                      <div className="md:w-1/2 flex flex-col">
                        <h3 className={`text-3xl font-bold mb-3 ${isPro ? 'text-white' : 'text-gray-900'}`}>Gói {type}</h3>
                        <p className={`mb-8 ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>Giải pháp quản lý tối ưu dành cho quán của bạn.</p>
                        
                        <ul className="space-y-4 flex-1">
                          {(samplePkg.features || []).length > 0 ? (
                            samplePkg.features.map((f, i) => <PricingFeature key={i} text={f} dark={isPro} />)
                          ) : (
                            <>
                              <PricingFeature text={`Số nhân viên: ${samplePkg.maxEmployees === -1 ? 'Không giới hạn' : samplePkg.maxEmployees}`} dark={isPro} />
                              <PricingFeature text={`Quản lý bàn: ${samplePkg.maxTables === -1 ? 'Không giới hạn' : samplePkg.maxTables}`} dark={isPro} />
                              {samplePkg.isInvoiceEnabled && <PricingFeature text="Gửi Hóa đơn điện tử (E-Invoice)" dark={isPro} />}
                              {samplePkg.isSepayEnabled && <PricingFeature text="Thanh toán tự động (SePay)" dark={isPro} />}
                              {isPro && <PricingFeature text="Báo cáo tài chính chuyên sâu & Xuất Excel" dark={isPro} />}
                            </>
                          )}
                        </ul>
                      </div>
                      
                      {/* Right: Grid of Prices (Like Admin) */}
                      <div className="md:w-1/2">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                          {typePkgs.map(pkg => {
                            const hasDiscount = pkg.discount > 0;
                            const finalPrice = hasDiscount ? pkg.price - (pkg.price * pkg.discount / 100) : pkg.price;
                            
                            return (
                              <div key={pkg.id} className={`border-2 rounded-xl p-5 text-center transition-all flex flex-col justify-center items-center ${isPro ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                <div className={`text-sm font-bold mb-2 ${isPro ? 'text-blue-400' : 'text-blue-600'}`}>
                                  {pkg.name || `${pkg.durationValue || pkg.durationDays || ''} ${pkg.durationUnit === 'hours' ? 'giờ' : 'ngày'}`}
                                </div>
                                <div className={`text-xl font-black mb-1 ${isPro ? 'text-white' : 'text-gray-900'}`}>
                                  {finalPrice === 0 ? 'Miễn phí' : `${finalPrice.toLocaleString('vi-VN')}đ`}
                                </div>
                                {hasDiscount && (
                                  <div className={`text-xs line-through ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {pkg.price.toLocaleString('vi-VN')}đ
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
            <span className="text-3xl text-white font-bold">HP</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Về người sáng lập</h2>
          <h3 className="text-xl font-medium text-blue-600 mb-6">HieuPham - Founder & Lead Developer</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Với đam mê công nghệ và sự am hiểu sâu sắc về ngành dịch vụ F&B, tôi đã xây dựng nên hệ sinh thái <strong>Staff SaaS</strong> nhằm giải quyết những bài toán quản lý nhức nhối nhất của các chủ quán. 
            Mục tiêu của tôi là mang đến một công cụ vận hành tự động, chính xác, minh bạch với chi phí vô cùng hợp lý, giúp bạn tối ưu hóa lợi nhuận và dành nhiều thời gian hơn cho việc mở rộng kinh doanh.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-blue-600 transition-colors">
            <Mail className="w-5 h-5" /> Liên hệ hợp tác
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Bản quyền thuộc về đối tác hệ thống SaaS staff. Thiết kế bởi HieuPham.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function AppItem({ title, desc, link }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 mb-2">{desc}</p>
        <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
          Truy cập <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function PricingFeature({ text, dark = false }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className={`w-5 h-5 shrink-0 ${dark ? 'text-blue-400' : 'text-blue-500'}`} />
      <span className={dark ? 'text-gray-300' : 'text-gray-600'}>{text}</span>
    </li>
  );
}

export default App;
