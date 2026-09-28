export function NewsletterForm() {
  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || '#'

  return (
    <div className="max-w-md mx-auto">
      <form action={formEndpoint} method="POST" className="flex gap-2">
        <input type="hidden" name="form_type" value="newsletter" />
        <div className="flex-1 relative">
          <input 
            type="email" 
            name="email"
            required
            placeholder="Alamat Email Anda" 
            className="w-full px-4 py-3 rounded-sm border border-forest/20 focus:outline-none focus:ring-2 focus:ring-forest bg-white text-forest" 
          />
        </div>
        <button 
          type="submit" 
          className="px-6 py-3 bg-forest text-cream font-medium rounded-sm hover:bg-forest/90 transition-colors whitespace-nowrap"
        >
          Dapatkan
        </button>
      </form>
    </div>
  )
}
