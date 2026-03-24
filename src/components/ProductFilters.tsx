import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/currency';
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

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants'];
  const metals = ['Gold', 'Silver', 'Platinum'];
  const purities = ['24K', '22K', '18K', '14K', '999 Fine', '925 Sterling'];
  const gemstones = ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl'];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCheckboxChange = (field: 'categories' | 'metals' | 'purities' | 'gemstones', value: string, checked: boolean) => {
    const current = filters[field];
    const updated = checked ? [...current, value] : current.filter(v => v !== value);
    updateFilters({ [field]: updated });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      metals: [],
      purities: [],
      gemstones: [],
      priceRange: [0, maxPrice],
      inStock: false,
      featured: false,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card className="w-full bg-white border-gray-300">
      {isMobile && (
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-black">Filters</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
      )}

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-black">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-600 hover:text-black">
            Clear All
          </Button>
        </div>

        <Separator />

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCheckboxChange('categories', category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm text-black cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Price Range</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
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
                className="h-8 text-xs text-center"
                placeholder="Min"
              />
              <span className="text-gray-400 text-sm">to</span>
              <Input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const val = Math.min(maxPrice, Math.max(Number(e.target.value) || 0, filters.priceRange[0]));
                  updateFilters({ priceRange: [filters.priceRange[0], val] });
                }}
                className="h-8 text-xs text-center"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Metal */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Metal</h4>
          <div className="space-y-2">
            {metals.map((metal) => (
              <div key={metal} className="flex items-center space-x-2">
                <Checkbox
                  id={`metal-${metal}`}
                  checked={filters.metals.includes(metal)}
                  onCheckedChange={(checked) => handleCheckboxChange('metals', metal, checked as boolean)}
                />
                <Label htmlFor={`metal-${metal}`} className="text-sm text-black cursor-pointer">
                  {metal}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Purity */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Purity</h4>
          <div className="space-y-2">
            {purities.map((purity) => (
              <div key={purity} className="flex items-center space-x-2">
                <Checkbox
                  id={`purity-${purity}`}
                  checked={filters.purities.includes(purity)}
                  onCheckedChange={(checked) => handleCheckboxChange('purities', purity, checked as boolean)}
                />
                <Label htmlFor={`purity-${purity}`} className="text-sm text-black cursor-pointer">
                  {purity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Gemstones */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Gemstones</h4>
          <div className="space-y-2">
            {gemstones.map((gemstone) => (
              <div key={gemstone} className="flex items-center space-x-2">
                <Checkbox
                  id={`gemstone-${gemstone}`}
                  checked={filters.gemstones.includes(gemstone)}
                  onCheckedChange={(checked) => handleCheckboxChange('gemstones', gemstone, checked as boolean)}
                />
                <Label htmlFor={`gemstone-${gemstone}`} className="text-sm text-black cursor-pointer">
                  {gemstone}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Other Filters */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Other</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
              />
              <Label htmlFor="in-stock" className="text-sm text-black cursor-pointer">
                In Stock Only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={filters.featured}
                onCheckedChange={(checked) => updateFilters({ featured: checked as boolean })}
              />
              <Label htmlFor="featured" className="text-sm text-black cursor-pointer">
                Featured Items
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
