import { useState } from "react"
import { GoldButton } from "../common/Button";
import { narediExcelStatistik } from "../../services/statistike";
import { ChevronDownIcon } from "lucide-react";

export default function ExcelExport() {
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const years = [2021, 2022, 2023, 2024, 2025];

    const handleExcelExport = async() => {
        setLoading(true);
        try {
            const res = await narediExcelStatistik(selectedYear);
            console.log('Excel export response:', res);
            const url = window.URL.createObjectURL(res.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Rezervacije_${selectedYear}_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
                
        } catch (error) {
            console.error('Excel export error:', error);
            alert('Napaka pri izvozu statistik');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    disabled={loading}
                    className="appearance-none px-6 py-3 pr-12 bg-black-card border border-white/20 text-white font-inter font-medium rounded hover:border-gold/50 focus:border-gold focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {years.map((year) => (
                        <option key={year} value={year} className="bg-black-card">
                            {year}
                        </option>
                    ))}
                </select>
                
                {/* Custom dropdown icon */}
                <ChevronDownIcon 
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none transition-opacity ${loading ? 'opacity-50' : ''}`}
                />
            </div>

            <GoldButton 
                onClick={handleExcelExport}
                disabled={loading}
            >
                {loading ? 'Pripravljam...' : 'Izvozi v Excel'}
            </GoldButton>
        </div>

    )
}