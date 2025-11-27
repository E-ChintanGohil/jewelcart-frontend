import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/currency';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
  onClose?: () => void;
  isMobile?: boolean;
}

export interface FilterState {
  categories: string[];
  materials: string[];
  gemstones: string[];
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
}

const ProductFilters = ({ onFiltersChange, maxPrice, onClose, isMobile }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    materials: [],
    gemstones: [],
    priceRange: [0, maxPrice],
    inStock: false,
    featured: false,
  });

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets'];
  const materials = ['14K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Platinum', '22K Yellow Gold'];
  const gemstones = ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl'];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    updateFilters({ categories: newCategories });
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter(m => m !== material);
    updateFilters({ materials: newMaterials });
  };

  const handleGemstoneChange = (gemstone: string, checked: boolean) => {
    const newGemstones = checked
      ? [...filters.gemstones, gemstone]
      : filters.gemstones.filter(g => g !== gemstone);
    updateFilters({ gemstones: newGemstones });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      materials: [],
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
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
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
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{formatCurrency(filters.priceRange[0])}</span>
              <span>{formatCurrency(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Materials */}
        <div className="space-y-3">
          <h4 className="font-medium text-black">Materials</h4>
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={filters.materials.includes(material)}
                  onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                />
                <Label htmlFor={`material-${material}`} className="text-sm text-black cursor-pointer">
                  {material}
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
                  onCheckedChange={(checked) => handleGemstoneChange(gemstone, checked as boolean)}
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
