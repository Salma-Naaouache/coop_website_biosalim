
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ backgroundColor: 'hsl(var(--footer-bg))', color: 'hsl(var(--footer-text))' }} className="pt-16 pb-8 border-t border-footer-accent/20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in [animation-delay:100ms]">
            <h4 className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--footer-accent))' }}>BioSalim</h4>
            <p className="text-muted-foreground mb-4">
              À la découverte des saveurs locales ! La Coopérative BioSalim met à l'honneur les trésors naturels de son terroir. Découvrez notre sélection premium d'épices, de céréales, d'herbes aromatiques et de couscous, cultivés et transformés dans le respect de la tradition.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100083422935004&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'hsl(var(--footer-accent))' }}>
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/coop_biosalim?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'hsl(var(--footer-accent))' }}>
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in [animation-delay:200ms]">
            <h4 className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--footer-accent))' }}>{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {[
                { name: "Accueil", path: "/" },
                { name: "À propos", path: "/about" },
                { name: "Produits", path: "/products" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:300ms]">
            <h4 className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--footer-accent))' }}>{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5" style={{ color: 'hsl(var(--footer-accent))' }} />
                <span className="opacity-70">
                  مركز دار اقوباع جماعة الدردار<br />
                  N2, Chefchaouen 91000<br />
                  Maroc
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" style={{ color: 'hsl(var(--footer-accent))' }} />
                <span className="opacity-70">+212 672 695 112 / +212 662 102 006</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" style={{ color: 'hsl(var(--footer-accent))' }} />
                <span className="opacity-70">coopbiosalim@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:400ms]">
            <h4 className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--footer-accent))' }}>{t.footer.newsletter}</h4>
            <p className="opacity-70 mb-4">
              {t.footer.newsletterDesc}
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder={t.footer.yourEmail} 
                className="rounded-md px-4 py-2 bg-white/10 text-white placeholder:text-white/70"
                required 
              />
              <button 
                type="submit" 
                className="btn-primary mt-2"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 mt-8 text-center opacity-70">
          <p>&copy; {currentYear} BioSalim. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  );
}
