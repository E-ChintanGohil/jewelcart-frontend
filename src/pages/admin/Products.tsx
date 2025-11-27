import { useState, useEffect } from 'react';
import { localStorageService, Product, Category, Material } from '@/lib/localStorage';
import apiService from '@/lib/apiService';
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
    basePrice: '',
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

    try {
      const productData: any = {
        name: formData.name,
        description: formData.description,
        categoryId: parseInt(categories.find(c => c.name === formData.category)?.id || '1'),
        stock: parseInt(formData.stock),
        weight: parseFloat(formData.weight),
        materialId: parseInt(formData.materialId),
        karatId: parseInt(formData.karatId),
        gemstone: formData.gemstone || undefined,
        certification: formData.certification || undefined,
        featured: formData.featured,
        basePrice: parseFloat(formData.basePrice),
        tags: [],
        isActive: true,
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
    }
  };

  // Calculate price in real-time
  const calculatePrice = () => {
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
    const basePrice = parseFloat(formData.basePrice);
    const pricePerGram = karat.pricePerGram;

    const materialCost = pricePerGram * weight;
    const totalPrice = Math.round(materialCost + basePrice);

    setCalculatedPrice(totalPrice);
  };

  // Effect to recalculate price when form values change
  useEffect(() => {
    calculatePrice();
  }, [formData.materialId, formData.karatId, formData.weight, formData.basePrice, materials]);

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
      basePrice: '',
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
        basePrice: basePriceValue?.toString() || '',
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
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (INR)</Label>
                  <Input
                    id="basePrice"
                    name="basePrice"
                    type="number"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    placeholder="Making charges, etc."
                    required
                  />
                </div>
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
                            <strong>Material Cost:</strong> {parseFloat(formData.weight)}g × ₹{materials.find(m => m.id === parseInt(formData.materialId))?.karats.find(k => k.id === parseInt(formData.karatId))?.pricePerGram}/g = ₹{Math.round((parseFloat(formData.weight) || 0) * (materials.find(m => m.id === parseInt(formData.materialId))?.karats.find(k => k.id === parseInt(formData.karatId))?.pricePerGram || 0))}
                          </div>
                          <div className="text-amber-700">
                            <strong>Base Price:</strong> ₹{parseFloat(formData.basePrice) || 0} (making charges, etc.)
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
                    required
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

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
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
                              src={`http://localhost:5001${image.imageUrl}`}
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
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
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
                        src={`http://localhost:5001${imageUrl}`}
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