import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#dddddd] px-4 md:px-8 lg:px-12 py-12 md:py-20">

      {/* Top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-20 max-w-[1500px] mx-auto">

        {/* Customer Care */}
        <div>
          <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase mb-6 md:mb-8 text-black">
            Customer Care
          </h4>

          <ul className="space-y-3 md:space-y-5 text-[13px] md:text-[15px] text-[#555]">
            <li className="hover:text-black cursor-pointer">Faq's</li>
            <li className="hover:text-black cursor-pointer">Returns & Refund Policy</li>
            <li className="hover:text-black cursor-pointer">Hallmark Dealers Notice</li>
            <li className="hover:text-black cursor-pointer">Insurance Evaluation</li>
            <li className="hover:text-black cursor-pointer">Bespoke Service</li>
            <li className="hover:text-black cursor-pointer">Book an Appointment</li>
          </ul>

          {/* Newsletter */}
          <div className="mt-10 md:mt-16">
            <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase mb-4 md:mb-6 text-black">
              Newsletter
            </h4>

            <p className="text-[13px] md:text-[15px] text-[#555] leading-6 md:leading-8 mb-4 md:mb-6">
              Subscribe here to receive updates, access exclusive deals,
              discounts, and more.
            </p>

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full md:w-[320px] border border-[#ddd] px-4 py-3 md:py-4 bg-white text-black mb-4 md:mb-6"
            />

            <button className="border border-black px-8 md:px-10 py-3 md:py-4 tracking-[2px] md:tracking-[3px] uppercase text-[11px] md:text-[13px] bg-black text-white hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase mb-6 md:mb-8 text-black">
            Explore
          </h4>

          <ul className="space-y-3 md:space-y-5 text-[13px] md:text-[15px] text-[#555]">
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Our Stores</li>
            <li className="hover:text-black cursor-pointer">Shipping and Delivery</li>
            <li className="hover:text-black cursor-pointer">Diamond Knowledge</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">Track Your Order</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase mb-6 md:mb-8 text-black">
            Contact Us
          </h4>

          <div className="space-y-3 md:space-y-5 text-[13px] md:text-[15px] text-[#555]">
            <p>95, Hatton Garden, London</p>
            <p className="text-blue-600">customerservice@heeradiamonds.com</p>
            <p className="text-blue-600">+442037953782</p>
            <p className="text-blue-600">+447535125095</p>
          </div>

          {/* Social */}
          <div className="flex gap-4 md:gap-5 mt-6 md:mt-8">
            <Facebook size={18} className="text-black" />
            <Instagram size={18} className="text-black" />
            <Youtube size={18} className="text-black" />
            <Linkedin size={18} className="text-black" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-20 max-w-[1500px] mx-auto border-t border-[#dddddd] pt-6 md:pt-10 gap-4 md:gap-0">

        <p className="text-[11px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase text-[#555]">
          © Heera Diamonds
        </p>

        <div className="flex gap-3 items-center">
          <img src="/payments/amex.png" alt="Amex" className="h-5 md:h-7" />
          <img src="/payments/applepay.png" alt="Apple Pay" className="h-5 md:h-7" />
          <img src="/payments/mastercard.png" alt="Mastercard" className="h-5 md:h-7" />
          <img src="/payments/visa.png" alt="Visa" className="h-5 md:h-7" />
        </div>
      </div>
    </footer>
  );
}

