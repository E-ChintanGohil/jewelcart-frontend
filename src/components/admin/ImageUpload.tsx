import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { apiService } from '@/lib/apiService';
import { Upload, X, Image as ImageIcon, Loader2, Star } from 'lucide-react';

interface ProductImage {
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface ImageUploadProps {
  productId: string | number;
  currentImages?: ProductImage[];
  onImagesUpdated: () => void;
  maxFiles?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  productId,
  currentImages = [],
  onImagesUpdated,
  maxFiles = 5
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<ProductImage[]>(currentImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Update images when currentImages prop changes
  useEffect(() => {
    console.log('[ImageUpload] currentImages prop:', currentImages);
    setImages(currentImages);
  }, [currentImages]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    // Check if adding these files would exceed the limit
    const remainingSlots = maxFiles - images.length;
    if (fileArray.length > remainingSlots) {
      toast({
        title: 'Too many files',
        description: `You can only add ${remainingSlots} more image(s). Product can have maximum ${maxFiles} images.`,
        variant: 'destructive',
      });
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      toast({
        title: 'Invalid file type',
        description: 'Please select only image files (JPEG, PNG, GIF, WebP)',
        variant: 'destructive',
      });
      return;
    }

    // Validate file sizes (5MB limit)
    const oversizedFiles = fileArray.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: 'File too large',
        description: 'Please select images smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    uploadFiles(fileArray);
  };

  const uploadFiles = async (files: File[]) => {
    try {
      setIsUploading(true);

      // Upload each file sequentially
      for (const file of files) {
        await apiService.uploadProductImage(productId, file);
      }

      toast({
        title: 'Images uploaded successfully',
        description: `${files.length} image(s) have been uploaded`,
      });

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Notify parent to refresh data
      onImagesUpdated();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      await apiService.deleteProductImage(productId, imageUrl);
      toast({
        title: 'Image deleted',
        description: 'Product image has been removed',
      });
      onImagesUpdated();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Failed to delete image',
        variant: 'destructive',
      });
    }
  };

  const handleSetPrimary = async (imageUrl: string) => {
    try {
      await apiService.setPrimaryProductImage(productId, imageUrl);
      toast({
        title: 'Primary image updated',
        description: 'This image is now the primary product image',
      });
      onImagesUpdated();
    } catch (error) {
      console.error('Set primary error:', error);
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to set primary image',
        variant: 'destructive',
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const canUploadMore = images.length < maxFiles;

  return (
    <div className="space-y-4">
      {/* Current Images Display */}
      {images.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Product Images</h4>
              <Badge variant="secondary">{images.length}/{maxFiles} images</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((image, index) => (
                  <div key={`${image.imageUrl}-${index}`} className="relative group">
                    <div className="relative aspect-square rounded-lg border overflow-hidden bg-gray-100">
                      <img
                        src={`http://localhost:5001${image.imageUrl}`}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {image.isPrimary && (
                        <Badge className="absolute top-2 left-2 bg-green-500">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Primary
                        </Badge>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      {!image.isPrimary && (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => handleSetPrimary(image.imageUrl)}
                          className="text-xs"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Set Primary
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(image.imageUrl)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Hover over an image to set it as primary or delete it. The primary image is shown in product listings.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upload Area */}
      {canUploadMore && (
        <Card>
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-lg font-medium">Uploading...</p>
                  <p className="text-sm text-gray-600">Please wait while we upload your image</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <ImageIcon className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Upload Product Images
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop images here, or click to select
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <p>Supported formats: JPEG, PNG, GIF, WebP</p>
                    <p>Maximum file size: 5MB per image</p>
                    <p>Remaining slots: {maxFiles - images.length}/{maxFiles}</p>
                  </div>
                  <Button type="button" onClick={openFileDialog}>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Images
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!canUploadMore && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm font-medium">
                Maximum image limit reached ({maxFiles}/{maxFiles}). Delete an image to upload a new one.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
