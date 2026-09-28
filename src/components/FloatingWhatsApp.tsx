import { useState, useEffect } from 'react';
import { CONTACT } from '../config/contact';

export function FloatingWhatsApp() {
  const [showBubble, setShowBubble] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Show bubble after 2 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
      // Hide bubble after 6 seconds total (visible for 4 seconds)
      setTimeout(() => setShowBubble(false), 4000);
    }, 2000);

    // Hide when keyboard is likely open (inputs are focused on touch devices)
    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsHidden(true);
      }
    };
    
    const handleBlur = () => {
      setIsHidden(false);
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  const message = "Halo Cetrofarm, saya ingin bertanya...";
  const waUrl = `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(message)}`;

  if (isHidden) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      {/* Speech Bubble */}
      <div 
        className={`transition-all duration-500 transform origin-bottom-right pointer-events-auto
          ${showBubble ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      >
        <div className="bg-white text-forest text-sm font-semibold py-3 px-5 rounded-3xl rounded-br-sm shadow-xl shadow-forest/10 border-2 border-forest/5 mb-6 whitespace-nowrap relative">
          Butuh bantuan? Chat kami!
          <div className="absolute -bottom-[9px] right-2 w-4 h-4 bg-white border-b-2 border-r-2 border-forest/5 transform rotate-45"></div>
        </div>
      </div>

      {/* Mascot Button */}
      <a 
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group pointer-events-auto inline-block animate-pop-in opacity-0"
        aria-label="Chat via WhatsApp"
      >
        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl">
          <img 
            src="/mascot/mascot-chat.png" 
            alt="Cetro Mascot" 
            className="w-full h-full object-contain filter drop-shadow-md"
            onError={(e) => {
              // Fallback placeholder with standard WA green if mascot isn't uploaded yet
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2325D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';
            }}
          />
        </div>
      </a>
    </div>
  );
}
