import { useState, useEffect } from 'react';
import { localStorageService, Product, Category, Material } from '@/lib/localStorage';
import apiService from '@/lib/apiService';
import { UPLOADS_BASE_URL } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/currency';
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Star } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [primaryImageUrl, setPrimaryImageUrl] = useState<string | null>(null);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    stock: '',
    weight: '',
    materialId: '',
    karatId: '',
    gemstone: '',
    certification: '',
    featured: false,
    // Active = visible/purchasable on the storefront. Turn off to hide a product.
    isActive: true,
    basePrice: '',
    // Fixed-price mode: price = ratePerGram × weight, not affected by the metal-rate cron
    isFixedPrice: false,
    fixedPrice: '',
    ratePerGram: '',
    // Phase 1: color & purity
    availableColors: ['yellow'] as string[],
    defaultColor: 'yellow',
    availablePurities: [] as string[],
    defaultPurity: '',
    // Phase 2: size
    sizeMin: '' as string | number,
    sizeMax: '' as string | number,
    sizeUnit: '' as '' | 'ring' | 'inch' | 'cm',
    // Phase 3: diamond
    diamondShape: '',
    diamondCount: '' as string | number,
    diamondTotalWeight: '' as string | number,
    diamondColor: '',
    diamondClarity: '',
    diamondSizeRange: '',
    // Phase 3: stones
    stoneDetails: [] as { name: string; count: string; totalWeight: string }[],
    // Phase 4: price breakup
    priceBreakup: [] as { label: string; amount: string }[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load from API
      const productsResponse = await apiService.getAdminProducts();
      setProducts(productsResponse.products || []);

      const categoriesResponse = await apiService.getCategories();
      setCategories(categoriesResponse || []);

      const materialsResponse = await apiService.getMaterials();
      setMaterials(materialsResponse || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load data from server. Please try again.",
        variant: "destructive",
      });
      // Fallback to localStorage if API fails
      setProducts(localStorageService.getProducts());
      setCategories(localStorageService.getCategories());
      setMaterials(localStorageService.getMaterials());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const productData: any = {
        name: formData.name,
        description: formData.description,
        categoryId: parseInt(categories.find(c => c.name === formData.category)?.id || '1'),
        stock: parseInt(formData.stock),
        // Weight is real product data — always send it, fixed-price or not. Fixed price
        // only means the price is set directly and the metal-rate cron leaves it alone.
        weight: parseFloat(formData.weight) || 0,
        materialId: parseInt(formData.materialId),
        karatId: parseInt(formData.karatId),
        gemstone: formData.gemstone || undefined,
        certification: formData.certification || undefined,
        featured: formData.featured,
        basePrice: formData.isFixedPrice ? 0 : parseFloat(formData.basePrice),
        // Fixed price = rate/gram × weight. Send both the rate (for the invoice) and
        // the computed fixed price (used everywhere else).
        ratePerGram: formData.isFixedPrice ? (parseFloat(formData.ratePerGram) || 0) : null,
        fixedPrice: formData.isFixedPrice
          ? Math.round((parseFloat(formData.ratePerGram) || 0) * (parseFloat(formData.weight) || 0))
          : null,
        tags: [],
        isActive: formData.isActive,
        // Phase 1: color & purity
        availableColors: formData.availableColors,
        defaultColor: formData.defaultColor || undefined,
        availablePurities: formData.availablePurities,
        defaultPurity: formData.defaultPurity || undefined,
        // Phase 2: size
        sizeMin: formData.sizeMin === '' ? null : Number(formData.sizeMin),
        sizeMax: formData.sizeMax === '' ? null : Number(formData.sizeMax),
        sizeUnit: formData.sizeUnit || undefined,
        // Phase 3: diamond
        diamondDetails: (formData.diamondShape || formData.diamondCount || formData.diamondTotalWeight || formData.diamondColor || formData.diamondClarity || formData.diamondSizeRange) ? {
          shape: formData.diamondShape || undefined,
          count: formData.diamondCount === '' ? undefined : Number(formData.diamondCount),
          totalWeight: formData.diamondTotalWeight === '' ? undefined : Number(formData.diamondTotalWeight),
          color: formData.diamondColor || undefined,
          clarity: formData.diamondClarity || undefined,
          sizeRange: formData.diamondSizeRange || undefined,
        } : null,
        // Phase 3: stones
        stoneDetails: formData.stoneDetails
          .filter(s => s.name)
          .map(s => ({
            name: s.name,
            count: s.count === '' ? null : Number(s.count),
            totalWeight: s.totalWeight === '' ? null : Number(s.totalWeight),
          })),
        // Phase 4: price breakup
        priceBreakup: formData.priceBreakup
          .filter(b => b.label && b.amount !== '')
          .map(b => ({
            label: b.label,
            amount: Number(b.amount),
          })),
      };

      // Only include images field for new products
      if (!editingProduct) {
        productData.images = [];
      }

      if (editingProduct) {
        // Update existing product via API
        if (selectedImages.length > 0 || primaryImageUrl || imagesToDelete.length > 0) {
          // Update with images or changed primary image (always keep existing images, but pass deletions)
          await apiService.updateProductWithImages(editingProduct.id, productData, selectedImages, true, primaryImageUrl, imagesToDelete);
          const deleteMessage = imagesToDelete.length > 0 ? ` (${imagesToDelete.length} image(s) deleted)` : '';
          const addMessage = selectedImages.length > 0 ? ` (${selectedImages.length} new image(s) added)` : '';
          toast({
            title: "Product updated",
            description: `Product updated successfully${deleteMessage}${addMessage}.`,
          });
        } else {
          // Update without images - don't pass images field at all
          await apiService.updateProduct(editingProduct.id, productData);
          toast({
            title: "Product updated",
            description: "Product has been updated successfully.",
          });
        }
      } else {
        // Create new product with images
        if (selectedImages.length > 0) {
          await apiService.createProductWithImages(productData, selectedImages);
          toast({
            title: "Product created",
            description: `New product created successfully with ${selectedImages.length} image(s).`,
          });
        } else {
          await apiService.createProduct(productData);
          toast({
            title: "Product created",
            description: "New product has been created successfully.",
          });
        }
      }

      resetForm();
      setIsDialogOpen(false);
      loadData();
    } catch (error: any) {
      console.error('Save product error:', error);

      // Extract error message from response
      let errorTitle = "Error";
      let errorDescription = "Failed to save product. Please try again.";

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Check if it's a user-friendly error
        if (errorData.userFriendly && errorData.message) {
          errorTitle = errorData.error || "Error";
          errorDescription = errorData.message;
        } else if (errorData.message) {
          errorDescription = errorData.message;
        } else if (errorData.error) {
          errorDescription = errorData.error;
        }

        // Add development details if available
        if (errorData.details && process.env.NODE_ENV === 'development') {
          errorDescription += `\n\nDetails: ${errorData.details}`;
        }
      } else if (error.message) {
        errorDescription = error.message;
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate price in real-time
  const calculatePrice = () => {
    if (formData.isFixedPrice) {
      // Fixed price = rate/gram × weight
      setCalculatedPrice(Math.round((parseFloat(formData.ratePerGram) || 0) * (parseFloat(formData.weight) || 0)));
      return;
    }
    if (!formData.materialId || !formData.karatId || !formData.weight || !formData.basePrice) {
      setCalculatedPrice(0);
      return;
    }

    const material = materials.find(m => m.id === parseInt(formData.materialId));
    if (!material) {
      setCalculatedPrice(0);
      return;
    }

    const karat = material.karats.find(k => k.id === parseInt(formData.karatId));
    if (!karat) {
      setCalculatedPrice(0);
      return;
    }

    const weight = parseFloat(formData.weight);
    const makingChargePerGram = parseFloat(formData.basePrice);
    const pricePerGram = karat.pricePerGram;

    const materialCost = pricePerGram * weight;
    const makingCost = makingChargePerGram * weight;
    const totalPrice = Math.round(materialCost + makingCost);

    setCalculatedPrice(totalPrice);
  };

  // Effect to recalculate price when form values change
  useEffect(() => {
    calculatePrice();
  }, [formData.materialId, formData.karatId, formData.weight, formData.basePrice, formData.isFixedPrice, formData.fixedPrice, formData.ratePerGram, materials]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      stock: '',
      weight: '',
      materialId: '',
      karatId: '',
      gemstone: '',
      certification: '',
      featured: false,
      isActive: true,
      basePrice: '',
      isFixedPrice: false,
      fixedPrice: '',
      ratePerGram: '',
      availableColors: ['yellow'],
      defaultColor: 'yellow',
      availablePurities: [],
      defaultPurity: '',
      sizeMin: '',
      sizeMax: '',
      sizeUnit: '',
      diamondShape: '',
      diamondCount: '',
      diamondTotalWeight: '',
      diamondColor: '',
      diamondClarity: '',
      diamondSizeRange: '',
      stoneDetails: [],
      priceBreakup: [],
    });
    setCalculatedPrice(0);
    setEditingProduct(null);
    setSelectedImages([]);
    setPrimaryImageUrl(null);
    setImagesToDelete([]);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Check if we're editing and have existing images (minus deleted ones)
      const existingImageCount = editingProduct && (editingProduct as any).images
        ? (editingProduct as any).images.length - imagesToDelete.length
        : 0;

      const totalImages = existingImageCount + filesArray.length;
      const maxImages = 5;

      if (totalImages > maxImages) {
        toast({
          title: "Too many images",
          description: `You can only have up to ${maxImages} images total. You currently have ${existingImageCount} image(s). Please remove ${totalImages - maxImages} existing image(s) first, then try again.`,
          variant: "destructive",
        });
        // Clear the file input
        e.target.value = '';
        return;
      }

      setSelectedImages(filesArray);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImageLocally = (imageUrl: string) => {
    setPrimaryImageUrl(imageUrl);
  };

  const handleDeleteExistingImage = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl]);

    // If the deleted image was the primary, clear the primary selection
    if (primaryImageUrl === imageUrl) {
      setPrimaryImageUrl(null);
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      // Fetch full product details including all images
      const fullProduct = await apiService.getProduct(product.id);

      // Handle both basePrice (camelCase) and base_price (snake_case) from API
      const basePriceValue = (fullProduct as any).base_price || fullProduct.basePrice;
      const materialIdValue = (fullProduct as any).material_id || fullProduct.materialId;
      const karatIdValue = (fullProduct as any).karat_id || fullProduct.karatId;

      // Find and set the current primary image
      const primaryImage = (fullProduct as any).images?.find((img: any) => img.isPrimary);
      setPrimaryImageUrl(primaryImage?.imageUrl || null);

      setEditingProduct(fullProduct);
      const fp: any = fullProduct;
      const dd = fp.diamondDetails || fp.diamond_details;
      const sd = fp.stoneDetails || fp.stone_details || [];
      const pb = fp.priceBreakup || fp.price_breakup || [];
      setFormData({
        name: fullProduct.name,
        description: fullProduct.description,
        category: fullProduct.category,
        stock: fullProduct.stock?.toString() || '',
        weight: fullProduct.weight?.toString() || '',
        materialId: materialIdValue?.toString() || '',
        karatId: karatIdValue?.toString() || '',
        gemstone: fullProduct.gemstone || '',
        certification: fullProduct.certification || '',
        featured: fullProduct.featured || false,
        isActive: (fullProduct.isActive ?? fullProduct.is_active) !== false,
        basePrice: basePriceValue?.toString() || '',
        isFixedPrice: (fp.is_fixed_price ?? (fp.fixed_price != null)) || false,
        fixedPrice: fp.fixed_price != null ? fp.fixed_price.toString() : '',
        // Rate for fixed-price products: use the stored rate, else derive from price/weight
        ratePerGram: (fp.rate_per_gram ?? fp.ratePerGram) != null
          ? (fp.rate_per_gram ?? fp.ratePerGram).toString()
          : (fp.fixed_price != null && fp.weight ? Math.round((fp.fixed_price / fp.weight) * 100) / 100 : '').toString(),
        availableColors: fp.availableColors || fp.available_colors || ['yellow'],
        defaultColor: fp.defaultColor || fp.default_color || 'yellow',
        availablePurities: fp.availablePurities || fp.available_purities || [],
        defaultPurity: fp.defaultPurity || fp.default_purity || '',
        sizeMin: fp.sizeMin ?? fp.size_min ?? '',
        sizeMax: fp.sizeMax ?? fp.size_max ?? '',
        sizeUnit: fp.sizeUnit || fp.size_unit || '',
        diamondShape: dd?.shape || '',
        diamondCount: dd?.count ?? '',
        diamondTotalWeight: dd?.totalWeight ?? dd?.total_weight ?? '',
        diamondColor: dd?.color || '',
        diamondClarity: dd?.clarity || '',
        diamondSizeRange: dd?.sizeRange || dd?.size_range || '',
        stoneDetails: sd.map((s: any) => ({
          name: s.name || '',
          count: s.count?.toString() || '',
          totalWeight: (s.totalWeight ?? s.total_weight)?.toString() || '',
        })),
        priceBreakup: pb.map((b: any) => ({
          label: b.label || '',
          amount: b.amount?.toString() || '',
        })),
      });
      // Set the current calculated price for editing
      setCalculatedPrice(fullProduct.price || 0);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error loading product details:', error);
      toast({
        title: "Error",
        description: "Failed to load product details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(id);
        loadData();
        toast({
          title: "Product deleted",
          description: "Product has been deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your jewelry inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            // Reload data when dialog closes to show any image changes
            loadData();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product information' : 'Create a new product in your inventory'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-muted-foreground">SKU will be auto-generated based on category and material</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materialId">Material</Label>
                  <Select value={formData.materialId} onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, materialId: value, karatId: '' }));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id.toString()}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fixed-price toggle: price is set directly and the metal-rate cron skips it.
                  Weight is still entered, stored and shown (product page + invoice). */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                <input
                  type="checkbox"
                  id="isFixedPrice"
                  checked={formData.isFixedPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFixedPrice: e.target.checked }))}
                  className="h-4 w-4"
                />
                <Label htmlFor="isFixedPrice" className="cursor-pointer">
                  Fixed price &mdash; set one price directly (not affected by metal-rate updates)
                </Label>
              </div>

              {formData.isFixedPrice && (
                <div className="space-y-2">
                  <Label htmlFor="ratePerGram">Rate (₹/gram)</Label>
                  <Input
                    id="ratePerGram"
                    name="ratePerGram"
                    type="number"
                    step="0.01"
                    value={formData.ratePerGram}
                    onChange={handleInputChange}
                    placeholder="e.g. 450"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Price = Rate × Weight
                    {formData.ratePerGram && formData.weight
                      ? ` = ₹${Math.round((parseFloat(formData.ratePerGram) || 0) * (parseFloat(formData.weight) || 0)).toLocaleString('en-IN')}`
                      : ''}. Shown as the per-gram rate on the invoice.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="karatId">Karat/Purity</Label>
                  <Select value={formData.karatId} onValueChange={(value) => setFormData(prev => ({ ...prev, karatId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select karat" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.find(m => m.id === parseInt(formData.materialId))?.karats.map((karat) => (
                        <SelectItem key={karat.id} value={karat.id.toString()}>
                          {karat.value} ({karat.purity}% purity)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!formData.isFixedPrice && (
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Making Charge (₹/gram)</Label>
                    <Input
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      step="0.01"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      placeholder="Making charge per gram"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Price Calculation Display */}
              {calculatedPrice > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-amber-800">💰 Calculated Final Price</h4>
                      <p className="text-sm text-amber-600">
                        Live price calculation based on current inputs
                      </p>
                      {formData.weight && formData.karatId && formData.materialId && (
                        <div className="mt-2 text-xs space-y-1">
                          <div className="text-amber-700">
                            <strong>Metal Cost:</strong> {parseFloat(formData.weight)}g × ₹{materials.find(m => m.id === parseInt(formData.materialId))?.karats.find(k => k.id === parseInt(formData.karatId))?.pricePerGram}/g = ₹{Math.round((parseFloat(formData.weight) || 0) * (materials.find(m => m.id === parseInt(formData.materialId))?.karats.find(k => k.id === parseInt(formData.karatId))?.pricePerGram || 0))}
                          </div>
                          <div className="text-amber-700">
                            <strong>Making Charges:</strong> {parseFloat(formData.weight)}g × ₹{parseFloat(formData.basePrice) || 0}/g = ₹{Math.round((parseFloat(formData.weight) || 0) * (parseFloat(formData.basePrice) || 0))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-800">
                        {formatCurrency(calculatedPrice)}
                      </div>
                      <div className="text-sm text-amber-600 font-medium">
                        Final Selling Price
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (g)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleInputChange}
                    // Weight drives the price for weight-based products, so it's required
                    // there. For fixed-price it's still stored and shown (page + invoice).
                    required={!formData.isFixedPrice}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gemstone">Gemstone</Label>
                  <Input
                    id="gemstone"
                    name="gemstone"
                    value={formData.gemstone}
                    onChange={handleInputChange}
                    placeholder="e.g., Diamond, Ruby, Emerald"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification">Certification</Label>
                  <Input
                    id="certification"
                    name="certification"
                    value={formData.certification}
                    onChange={handleInputChange}
                    placeholder="e.g., GIA, IGI"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Active {formData.isActive ? '(visible on site)' : '(hidden from site)'}</Label>
                </div>
              </div>

              {/* ─── Color & Purity (PDP options) ──────────────────── */}
              <div className="border-t pt-5 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">PDP Options</h3>

                <div className="space-y-2">
                  <Label>Available Colors</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'yellow', label: 'Yellow', hex: 'linear-gradient(135deg, #f4d35e, #e8b923)' },
                      { value: 'white', label: 'White', hex: 'linear-gradient(135deg, #f0f0f0, #c8c8c8)' },
                      { value: 'rose', label: 'Rose', hex: 'linear-gradient(135deg, #f7cac9, #e8a899)' },
                    ].map(c => {
                      const active = formData.availableColors.includes(c.value);
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => {
                            setFormData(prev => {
                              const exists = prev.availableColors.includes(c.value);
                              const next = exists
                                ? prev.availableColors.filter(v => v !== c.value)
                                : [...prev.availableColors, c.value];
                              return {
                                ...prev,
                                availableColors: next.length > 0 ? next : ['yellow'],
                                defaultColor: next.includes(prev.defaultColor) ? prev.defaultColor : (next[0] || 'yellow'),
                              };
                            });
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs ${active ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                        >
                          <span className="w-4 h-4 rounded-full" style={{ background: c.hex, boxShadow: 'inset 0 0 0 1px #999' }} />
                          {c.label}
                          {active && formData.defaultColor === c.value && <span className="text-[10px] uppercase text-blue-600">default</span>}
                        </button>
                      );
                    })}
                  </div>
                  {formData.availableColors.length > 1 && (
                    <div className="text-xs">
                      Default color:
                      <select
                        value={formData.defaultColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, defaultColor: e.target.value }))}
                        className="ml-2 border rounded px-1 py-0.5 text-xs"
                      >
                        {formData.availableColors.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Available Purities (Karat)</Label>
                  <div className="flex flex-wrap gap-2">
                    {['9K', '14K', '18K', '22K', '24K', '925 Sterling', '999 Fine'].map(p => {
                      const active = formData.availablePurities.includes(p);
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setFormData(prev => {
                              const exists = prev.availablePurities.includes(p);
                              const next = exists
                                ? prev.availablePurities.filter(v => v !== p)
                                : [...prev.availablePurities, p];
                              return {
                                ...prev,
                                availablePurities: next,
                                defaultPurity: next.includes(prev.defaultPurity) ? prev.defaultPurity : (next[0] || ''),
                              };
                            });
                          }}
                          className={`px-2.5 py-1 rounded text-xs ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                  {formData.availablePurities.length > 1 && (
                    <div className="text-xs">
                      Default purity:
                      <select
                        value={formData.defaultPurity}
                        onChange={(e) => setFormData(prev => ({ ...prev, defaultPurity: e.target.value }))}
                        className="ml-2 border rounded px-1 py-0.5 text-xs"
                      >
                        {formData.availablePurities.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* Size selector — only for relevant categories */}
                <div className="space-y-2">
                  <Label>Size Range (optional)</Label>
                  <div className="flex gap-2 items-center">
                    <select
                      value={formData.sizeUnit}
                      onChange={(e) => setFormData(prev => ({ ...prev, sizeUnit: e.target.value as any }))}
                      className="border rounded px-2 py-1.5 text-sm"
                    >
                      <option value="">No size</option>
                      <option value="ring">Ring size (6-26)</option>
                      <option value="inch">Length (inches)</option>
                      <option value="cm">Length (cm)</option>
                    </select>
                    {formData.sizeUnit && (
                      <>
                        <Input
                          type="number"
                          placeholder="Min"
                          value={formData.sizeMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, sizeMin: e.target.value }))}
                          className="w-20"
                        />
                        <span>to</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={formData.sizeMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, sizeMax: e.target.value }))}
                          className="w-20"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ─── Diamond Details ──────────────────────────────── */}
              <div className="border-t pt-5 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Diamond Details (optional)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="diamondShape">Shape</Label>
                    <Input id="diamondShape" placeholder="e.g. Round, Princess"
                      value={formData.diamondShape}
                      onChange={(e) => setFormData(p => ({ ...p, diamondShape: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="diamondCount">No. of Diamonds</Label>
                    <Input id="diamondCount" type="number"
                      value={formData.diamondCount}
                      onChange={(e) => setFormData(p => ({ ...p, diamondCount: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="diamondTotalWeight">Total Weight (carats)</Label>
                    <Input id="diamondTotalWeight" type="number" step="0.001"
                      value={formData.diamondTotalWeight}
                      onChange={(e) => setFormData(p => ({ ...p, diamondTotalWeight: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="diamondColor">Color</Label>
                    <Input id="diamondColor" placeholder="e.g. F-G"
                      value={formData.diamondColor}
                      onChange={(e) => setFormData(p => ({ ...p, diamondColor: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="diamondClarity">Clarity</Label>
                    <Input id="diamondClarity" placeholder="e.g. VS1-VS2"
                      value={formData.diamondClarity}
                      onChange={(e) => setFormData(p => ({ ...p, diamondClarity: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="diamondSizeRange">Size Range</Label>
                    <Input id="diamondSizeRange" placeholder="e.g. 1.0-1.5mm"
                      value={formData.diamondSizeRange}
                      onChange={(e) => setFormData(p => ({ ...p, diamondSizeRange: e.target.value }))} />
                  </div>
                </div>
              </div>

              {/* ─── Other Stones (multi-row) ─────────────────────── */}
              <div className="border-t pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Other Stones (optional)</h3>
                  <Button type="button" size="sm" variant="outline"
                    onClick={() => setFormData(p => ({ ...p, stoneDetails: [...p.stoneDetails, { name: '', count: '', totalWeight: '' }] }))}>
                    + Add Stone
                  </Button>
                </div>
                {formData.stoneDetails.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_100px_120px_auto] gap-2 items-center">
                    <Input placeholder="Stone name (e.g. Ruby)"
                      value={s.name}
                      onChange={(e) => {
                        const next = [...formData.stoneDetails];
                        next[i] = { ...next[i], name: e.target.value };
                        setFormData(p => ({ ...p, stoneDetails: next }));
                      }} />
                    <Input placeholder="Count" type="number"
                      value={s.count}
                      onChange={(e) => {
                        const next = [...formData.stoneDetails];
                        next[i] = { ...next[i], count: e.target.value };
                        setFormData(p => ({ ...p, stoneDetails: next }));
                      }} />
                    <Input placeholder="Wt (g)" type="number" step="0.001"
                      value={s.totalWeight}
                      onChange={(e) => {
                        const next = [...formData.stoneDetails];
                        next[i] = { ...next[i], totalWeight: e.target.value };
                        setFormData(p => ({ ...p, stoneDetails: next }));
                      }} />
                    <Button type="button" size="sm" variant="ghost"
                      onClick={() => setFormData(p => ({ ...p, stoneDetails: p.stoneDetails.filter((_, j) => j !== i) }))}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              {/* ─── Price Breakup (multi-row) ────────────────────── */}
              <div className="border-t pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Price Breakup (optional)</h3>
                  <Button type="button" size="sm" variant="outline"
                    onClick={() => setFormData(p => ({ ...p, priceBreakup: [...p.priceBreakup, { label: '', amount: '' }] }))}>
                    + Add Row
                  </Button>
                </div>
                {formData.priceBreakup.map((b, i) => (
                  <div key={i} className="grid grid-cols-[1fr_140px_auto] gap-2 items-center">
                    <Input placeholder="Particular (e.g. 18Kt Gold 3.2g)"
                      value={b.label}
                      onChange={(e) => {
                        const next = [...formData.priceBreakup];
                        next[i] = { ...next[i], label: e.target.value };
                        setFormData(p => ({ ...p, priceBreakup: next }));
                      }} />
                    <Input placeholder="Amount" type="number" step="0.01"
                      value={b.amount}
                      onChange={(e) => {
                        const next = [...formData.priceBreakup];
                        next[i] = { ...next[i], amount: e.target.value };
                        setFormData(p => ({ ...p, priceBreakup: next }));
                      }} />
                    <Button type="button" size="sm" variant="ghost"
                      onClick={() => setFormData(p => ({ ...p, priceBreakup: p.priceBreakup.filter((_, j) => j !== i) }))}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              {/* Image Upload Section */}
              <div className="space-y-3">
                <Label>Product Images</Label>

                {/* Show existing images if editing */}
                {editingProduct && (editingProduct as any).images && (editingProduct as any).images.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Images ({(editingProduct as any).images.length - imagesToDelete.length}/{(editingProduct as any).images.length}):</p>
                    <div className="flex flex-wrap gap-3">
                      {(editingProduct as any).images.map((image: any, index: number) => {
                        const isSelectedPrimary = primaryImageUrl === image.imageUrl;
                        const isMarkedForDeletion = imagesToDelete.includes(image.imageUrl);

                        return (
                          <div key={index} className={`relative group ${isMarkedForDeletion ? 'opacity-40' : ''}`}>
                            <img
                              src={`${UPLOADS_BASE_URL}${image.imageUrl}`}
                              alt={`Current ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border"
                            />
                            {/* Delete button */}
                            {!isMarkedForDeletion && (
                              <button
                                type="button"
                                onClick={() => handleDeleteExistingImage(image.imageUrl)}
                                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove image"
                              >
                                ×
                              </button>
                            )}
                            {/* Star icon to set/show primary */}
                            {!isMarkedForDeletion && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImageLocally(image.imageUrl)}
                                className={`absolute -top-2 -right-2 p-1 rounded-full transition-all ${
                                  isSelectedPrimary
                                    ? 'bg-yellow-400 text-white'
                                    : 'bg-gray-200 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600'
                                }`}
                                title={isSelectedPrimary ? 'Primary image' : 'Click to set as primary'}
                              >
                                {isSelectedPrimary ? (
                                  <Star className="h-4 w-4 fill-current" />
                                ) : (
                                  <Star className="h-4 w-4" />
                                )}
                              </button>
                            )}
                            {isMarkedForDeletion && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                <span className="text-white text-xs font-medium">Will be deleted</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click on the star icon to set an image as primary. Click the × to mark an image for deletion. Changes will be saved when you click "Update Product".
                    </p>
                  </div>
                )}

                {/* File input for new images */}
                <div>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {editingProduct
                      ? `Select new images to add. You have ${(editingProduct as any).images?.length || 0} image(s), maximum 5 total.`
                      : 'Select up to 5 images. First image will be the primary product image.'}
                  </p>
                </div>

                {/* Preview selected new images */}
                {selectedImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{selectedImages.length} new image(s) selected:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="w-20 h-20 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          {!editingProduct && index === 0 && (
                            <Badge className="absolute bottom-0 left-0 bg-blue-500 text-xs">Primary</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving
                    ? (selectedImages.length > 0 ? 'Uploading images...' : 'Saving...')
                    : (editingProduct ? 'Update Product' : 'Create Product')
                  }
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage all your jewelry products</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                // Handle both imageUrl and primary_image from API response
                const imageUrl = (product as any).primary_image || (product as any).imageUrl || product.imageUrl;

                return (
                <TableRow key={product.id}>
                  <TableCell>
                    {imageUrl ? (
                      <img
                        src={`${UPLOADS_BASE_URL}${imageUrl}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg border flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                      {product.featured && (
                        <Badge variant="secondary" className="mt-1">Featured</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock < 5 ? "destructive" : "secondary"}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )})}

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;