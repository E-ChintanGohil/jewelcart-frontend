import { useState, useEffect, useRef } from 'react';
import { Category } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { UPLOADS_BASE_URL } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Trash2, Edit, Plus, Upload, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
    sortOrder: 0,
    showOnHomepage: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await apiService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      let savedCategory: Category;
      if (editingCategory) {
        savedCategory = await apiService.updateCategory(editingCategory.id, formData);
        toast({ title: "Success", description: "Category updated successfully" });
      } else {
        savedCategory = await apiService.createCategory(formData);
        toast({ title: "Success", description: "Category created successfully" });
      }

      // Upload image if a file was selected
      if (imageFile && savedCategory?.id) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);
        const token = localStorage.getItem('jewelbox_auth_token');
        await fetch(`${UPLOADS_BASE_URL}/api/categories/${savedCategory.id}/image`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadFormData,
        });
      }

      loadCategories();
      resetForm();
    } catch (error) {
      console.error('Failed to save category:', error);
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      status: 'ACTIVE',
      sortOrder: 0,
      showOnHomepage: true,
    });
    setImageFile(null);
    setImagePreview('');
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      imageUrl: category.imageUrl || '',
      status: category.status || 'ACTIVE',
      sortOrder: category.sortOrder || 0,
      showOnHomepage: (category as any).showOnHomepage !== false && (category as any).show_on_homepage !== false,
    });
    setImageFile(null);
    setImagePreview(category.imageUrl
      ? (category.imageUrl.startsWith('/') ? `${UPLOADS_BASE_URL}${category.imageUrl}` : category.imageUrl)
      : '');
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await apiService.deleteCategory(categoryId);
        loadCategories();

        toast({
          title: "Success",
          description: "Category deleted successfully"
        });
      } catch (error) {
        console.error('Failed to delete category:', error);
        toast({
          title: "Error",
          description: "Failed to delete category. It may have associated products.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Update category information' : 'Add a new product category'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Rings, Necklaces"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Category description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Category Image</Label>
                <div
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded mx-auto" />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                        onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(''); }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <Upload className="h-8 w-8 mx-auto mb-1 opacity-50" />
                      <p className="text-sm">Click to upload image</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  placeholder="0"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as 'ACTIVE' | 'INACTIVE' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  id="showOnHomepage"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={formData.showOnHomepage}
                  onChange={(e) => setFormData({ ...formData, showOnHomepage: e.target.checked })}
                />
                <Label htmlFor="showOnHomepage" className="cursor-pointer text-sm font-normal">
                  Show on homepage (Shop by Category section)
                </Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCategory ? 'Update' : 'Create'} Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">All categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {categories.filter(cat => cat.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {categories.filter(cat => cat.status === 'INACTIVE').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently inactive</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
            <div className="aspect-video bg-secondary overflow-hidden">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl.startsWith('/') ? `${UPLOADS_BASE_URL}${category.imageUrl}` : category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <Badge
                    variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}
                    className={category.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {category.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {category.description || 'No description provided'}
              </p>
              
              <div className="text-xs text-muted-foreground mb-4">
                Created: {new Date(category.createdAt || category.created_at).toLocaleDateString()}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found. Create your first category!</p>
        </div>
      )}
    </div>
  );
};

export default Categories;