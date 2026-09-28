import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { quarter: 'Q1 2025', revenue: 1.2, volume: 80 },
  { quarter: 'Q2 2025', revenue: 1.5, volume: 95 },
  { quarter: 'Q3 2025', revenue: 1.8, volume: 110 },
  { quarter: 'Q4 2025', revenue: 2.3, volume: 130 },
  { quarter: 'Q1 2026', revenue: 2.8, volume: 150 },
];

export function TractionChart() {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 bg-white p-6 rounded-sm shadow-xl border border-forest/10 flex items-center justify-center text-forest/50 text-sm">
        Data belum tersedia
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-white p-6 rounded-sm shadow-xl border border-forest/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-forest">Traksi Keuangan & Volume Panen</h3>
        <p className="text-sm text-forest/70">Pertumbuhan konsisten (dalam Miliar IDR & Tonase)</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#173D2B" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#173D2B" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C9A227" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="quarter" stroke="#173D2B" opacity={0.5} fontSize={12} tickMargin={10} />
          <YAxis stroke="#173D2B" opacity={0.5} fontSize={12} width={35} tickFormatter={(value) => value} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#FAF7F0', border: 'none', borderRadius: '4px', color: '#173D2B' }} 
            itemStyle={{ color: '#173D2B', fontWeight: 'bold' }} 
          />
          <Area type="monotone" dataKey="revenue" name="Revenue (Miliar IDR)" stroke="#173D2B" fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="volume" name="Volume (Ton)" stroke="#C9A227" fillOpacity={1} fill="url(#colorVolume)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
