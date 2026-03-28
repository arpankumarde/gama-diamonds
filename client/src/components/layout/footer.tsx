import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-green border-t-2 border-brand-gold/60">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
      
      <div className="px-4 md:px-8 lg:px-12 py-12 md:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-20 max-w-[1500px] mx-auto">

          {/* Customer Care */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="block w-6 h-[1px] bg-brand-gold"></span>
              <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase text-brand-gold">
                Customer Care
              </h4>
            </div>

            <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] text-white/75">
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">FAQ's</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Returns & Refund Policy</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Hallmark Dealers Notice</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Insurance Evaluation</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Bespoke Service</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Book an Appointment</li>
            </ul>

            {/* Newsletter */}
            <div className="mt-10 md:mt-16">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="block w-6 h-[1px] bg-brand-gold"></span>
                <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase text-brand-gold">
                  Newsletter
                </h4>
              </div>

              <p className="text-[13px] md:text-[14px] text-white/70 leading-6 md:leading-7 mb-5 md:mb-6">
                Subscribe to receive exclusive updates, access to private collections, and special offers.
              </p>

              <div className="relative mb-4 md:mb-6">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full md:w-[320px] border border-brand-gold/20 bg-white/10 backdrop-blur-sm rounded-lg pl-12 pr-4 py-3 md:py-4 text-white placeholder:text-white/50 focus:border-brand-gold/60 focus:bg-white/15 outline-none transition duration-300"
                />
              </div>

              <button className="inline-flex items-center gap-2 bg-brand-gold text-brand-green px-6 md:px-8 py-3 md:py-4 tracking-[2px] md:tracking-[3px] uppercase text-[11px] md:text-[12px] font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300">
                Subscribe
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="block w-6 h-[1px] bg-brand-gold"></span>
              <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase text-brand-gold">
                Explore
              </h4>
            </div>

            <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] text-white/75">
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">About Us</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Our Stores</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Shipping and Delivery</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Diamond Knowledge</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Careers</li>
              <li className="hover:text-brand-gold cursor-pointer transition duration-300 hover:translate-x-1">Track Your Order</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="block w-6 h-[1px] bg-brand-gold"></span>
              <h4 className="text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase text-brand-gold">
                Contact Us
              </h4>
            </div>

            <div className="space-y-4 md:space-y-5 text-[13px] md:text-[14px] text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold/60 mt-0.5 flex-shrink-0" />
                <p>95, Hatton Garden, London</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                <a href="mailto:customerservice@heeradiamonds.com" className="text-brand-gold hover:text-white transition duration-300">
                  customerservice@heeradiamonds.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+442037953782" className="block text-brand-gold hover:text-white transition duration-300">
                    +44 20 3795 3782
                  </a>
                  <a href="tel:+447535125095" className="block text-brand-gold hover:text-white transition duration-300">
                    +44 75 3512 5095
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 md:mt-10">
              <p className="text-[11px] tracking-[2px] uppercase text-brand-gold/70 mb-4">Follow Us</p>
              <div className="flex gap-4 md:gap-5">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold group transition duration-300 cursor-pointer">
                  <Facebook size={16} className="text-brand-gold group-hover:text-brand-green transition duration-300" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold group transition duration-300 cursor-pointer">
                  <Instagram size={16} className="text-brand-gold group-hover:text-brand-green transition duration-300" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold group transition duration-300 cursor-pointer">
                  <Youtube size={16} className="text-brand-gold group-hover:text-brand-green transition duration-300" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold group transition duration-300 cursor-pointer">
                  <Linkedin size={16} className="text-brand-gold group-hover:text-brand-green transition duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-20 max-w-[1500px] mx-auto border-t border-brand-gold/20 pt-8 md:pt-10 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <p className="text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase text-white/60 mb-2">
              © 2024 Gama Diamonds
            </p>
            <p className="text-[10px] tracking-[2px] uppercase text-brand-gold/70">
              Hatton Garden, London
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-[10px] tracking-[2px] uppercase text-white/50">Secure Payments</p>
            <div className="flex gap-3 items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-brand-gold/15 rounded-lg p-2 hover:border-brand-gold/40 transition duration-300">
                <img src="/payments/amex.png" alt="Amex" className="h-4 md:h-5 opacity-80" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-brand-gold/15 rounded-lg p-2 hover:border-brand-gold/40 transition duration-300">
                <img src="/payments/applepay.png" alt="Apple Pay" className="h-4 md:h-5 opacity-80" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-brand-gold/15 rounded-lg p-2 hover:border-brand-gold/40 transition duration-300">
                <img src="/payments/mastercard.png" alt="Mastercard" className="h-4 md:h-5 opacity-80" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-brand-gold/15 rounded-lg p-2 hover:border-brand-gold/40 transition duration-300">
                <img src="/payments/visa.png" alt="Visa" className="h-4 md:h-5 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}