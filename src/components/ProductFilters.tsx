import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
  onClose?: () => void;
  isMobile?: boolean;
  initialCategory?: string;
}

export interface FilterState {
  categories: string[];
  metals: string[];
  purities: string[];
  gemstones: string[];
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
}

const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants'];
const metals: { name: string; color: string; ring: string }[] = [
  { name: 'Gold', color: 'linear-gradient(135deg, #f4d35e 0%, #e8b923 100%)', ring: '#d4a015' },
  { name: 'White Gold', color: 'linear-gradient(135deg, #f0f0f0 0%, #c8c8c8 100%)', ring: '#a8a8a8' },
  { name: 'Rose Gold', color: 'linear-gradient(135deg, #f7cac9 0%, #e8a899 100%)', ring: '#c98777' },
  { name: 'Platinum', color: 'linear-gradient(135deg, #e5e4e2 0%, #aeaca7 100%)', ring: '#8e8c87' },
  { name: 'Silver', color: 'linear-gradient(135deg, #f5f5f5 0%, #c0c0c0 100%)', ring: '#a0a0a0' },
];
const purities = ['24K', '22K', '18K', '14K', '999 Fine', '925 Sterling'];
const gemstones = ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl'];

const ProductFilters = ({ onFiltersChange, maxPrice, onClose, isMobile, initialCategory }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1).toLowerCase()] : [],
    metals: [],
    purities: [],
    gemstones: [],
    priceRange: [0, maxPrice],
    inStock: false,
    featured: false,
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCheck = (field: 'categories' | 'metals' | 'purities' | 'gemstones', value: string, checked: boolean) => {
    const current = filters[field];
    const updated = checked ? [...current, value] : current.filter(v => v !== value);
    updateFilters({ [field]: updated });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.metals.length > 0 ||
    filters.purities.length > 0 || filters.gemstones.length > 0 ||
    filters.inStock || filters.featured ||
    filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice;

  const clearAll = () => {
    const cleared: FilterState = {
      categories: [], metals: [], purities: [], gemstones: [],
      priceRange: [0, maxPrice], inStock: false, featured: false,
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const sectionClass = "py-4 border-b border-gray-100 last:border-0";
  const headingClass = "text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-3";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-brandblue">Filters</span>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button onClick={clearAll} className="text-[11px] text-brandgold hover:underline">
              Clear all
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className={sectionClass}>
        <h4 className={headingClass}>Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                id={`cat-${cat}`}
                checked={filters.categories.includes(cat)}
                onCheckedChange={(checked) => handleCheck('categories', cat, checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-brandblue data-[state=checked]:border-brandblue"
              />
              <span className="text-sm text-gray-600 group-hover:text-brandblue transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className={sectionClass}>
        <h4 className={headingClass}>Price</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(v) => updateFilters({ priceRange: v as [number, number] })}
          max={maxPrice}
          min={0}
          step={500}
          className="w-full"
        />
        <div className="flex items-center gap-2 mt-3">
          <Input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => {
              const val = Math.max(0, Math.min(Number(e.target.value) || 0, filters.priceRange[1]));
              updateFilters({ priceRange: [val, filters.priceRange[1]] });
            }}
            className="h-7 text-xs text-center border-gray-200"
          />
          <span className="text-gray-300 text-xs">—</span>
          <Input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => {
              const val = Math.min(maxPrice, Math.max(Number(e.target.value) || 0, filters.priceRange[0]));
              updateFilters({ priceRange: [filters.priceRange[0], val] });
            }}
            className="h-7 text-xs text-center border-gray-200"
          />
        </div>
      </div>

      {/* Purity (metal swatches) */}
      <div className={sectionClass}>
        <h4 className={headingClass}>Purity</h4>
        <div className="grid grid-cols-2 gap-2">
          {metals.map((m) => {
            const active = filters.metals.includes(m.name);
            return (
              <button
                key={m.name}
                onClick={() => handleCheck('metals', m.name, !active)}
                className={`flex items-center gap-2 py-1.5 px-2 rounded-md transition-all text-left ${
                  active ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex-shrink-0 transition-all ${
                    active ? 'ring-2 ring-offset-1' : 'ring-1'
                  }`}
                  style={{
                    background: m.color,
                    boxShadow: `inset 0 0 0 1px ${m.ring}`,
                    ['--tw-ring-color' as any]: active ? m.ring : '#e5e7eb',
                  }}
                />
                <span className={`text-xs ${active ? 'text-brandblue font-medium' : 'text-gray-600'}`}>
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Karat */}
      <div className={sectionClass}>
        <h4 className={headingClass}>Karat</h4>
        <div className="flex flex-wrap gap-1.5">
          {purities.map((p) => {
            const active = filters.purities.includes(p);
            return (
              <button
                key={p}
                onClick={() => handleCheck('purities', p, !active)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  active
                    ? 'bg-brandblue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gemstones */}
      <div className={sectionClass}>
        <h4 className={headingClass}>Gemstone</h4>
        <div className="space-y-2">
          {gemstones.map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.gemstones.includes(g)}
                onCheckedChange={(checked) => handleCheck('gemstones', g, checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-brandblue data-[state=checked]:border-brandblue"
              />
              <span className="text-sm text-gray-600 group-hover:text-brandblue transition-colors">{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className={sectionClass}>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
              className="border-gray-300 data-[state=checked]:bg-brandblue data-[state=checked]:border-brandblue"
            />
            <span className="text-sm text-gray-600 group-hover:text-brandblue transition-colors">In stock only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <Checkbox
              checked={filters.featured}
              onCheckedChange={(checked) => updateFilters({ featured: checked as boolean })}
              className="border-gray-300 data-[state=checked]:bg-brandblue data-[state=checked]:border-brandblue"
            />
            <span className="text-sm text-gray-600 group-hover:text-brandblue transition-colors">Featured only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
