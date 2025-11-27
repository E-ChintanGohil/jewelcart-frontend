import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Image, FileText, Star, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  type: 'hero' | 'testimonial' | 'blog' | 'gallery' | 'page';
  title: string;
  content: string;
  image?: string;
  status: 'published' | 'draft';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const Content = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    type: 'hero' as ContentItem['type'],
    title: '',
    content: '',
    image: '',
    status: 'published' as ContentItem['status'],
    featured: false
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    const savedContent = localStorage.getItem('jewelbox_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      // Initialize with sample content
      const sampleContent: ContentItem[] = [
        {
          id: '1',
          type: 'hero',
          title: 'Diamonds that tell a story',
          content: 'Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty.',
          image: '/placeholder.svg',
          status: 'published',
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'testimonial',
          title: 'Amazing Service',
          content: 'The jewelry quality is exceptional and the customer service was outstanding. I absolutely love my engagement ring!',
          status: 'published',
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          type: 'blog',
          title: 'How to Choose the Perfect Engagement Ring',
          content: 'Choosing an engagement ring is one of the most important decisions you\'ll make. Here\'s our comprehensive guide to help you find the perfect ring...',
          image: '/placeholder.svg',
          status: 'published',
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          type: 'gallery',
          title: 'Luxury Collection 2024',
          content: 'Our latest collection featuring the finest diamonds and precious stones.',
          image: '/placeholder.svg',
          status: 'published',
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '5',
          type: 'page',
          title: 'About Our Craftsmanship',
          content: 'With over 30 years of experience, our master jewelers bring unparalleled skill and attention to detail to every piece we create.',
          status: 'published',
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      setContent(sampleContent);
      localStorage.setItem('jewelbox_content', JSON.stringify(sampleContent));
    }
  };

  const saveContent = (newContent: ContentItem[]) => {
    localStorage.setItem('jewelbox_content', JSON.stringify(newContent));
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const now = new Date().toISOString();
      
      if (editingItem) {
        // Update existing item
        const updatedContent = content.map(item =>
          item.id === editingItem.id
            ? { ...item, ...formData, updatedAt: now }
            : item
        );
        saveContent(updatedContent);
        
        toast({
          title: "Success",
          description: "Content updated successfully"
        });
      } else {
        // Create new item
        const newItem: ContentItem = {
          id: Date.now().toString(),
          ...formData,
          createdAt: now,
          updatedAt: now
        };
        
        saveContent([...content, newItem]);
        
        toast({
          title: "Success",
          description: "Content created successfully"
        });
      }

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'hero',
      title: '',
      content: '',
      image: '',
      status: 'published',
      featured: false
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: ContentItem) => {
    setFormData({
      type: item.type,
      title: item.title,
      content: item.content,
      image: item.image || '',
      status: item.status,
      featured: item.featured
    });
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (itemId: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      const updatedContent = content.filter(item => item.id !== itemId);
      saveContent(updatedContent);
      
      toast({
        title: "Success",
        description: "Content deleted successfully"
      });
    }
  };

  const getContentByType = (type: string) => {
    return content.filter(item => item.type === type);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hero': return <Star className="h-4 w-4" />;
      case 'testimonial': return <Star className="h-4 w-4" />;
      case 'blog': return <FileText className="h-4 w-4" />;
      case 'gallery': return <Image className="h-4 w-4" />;
      case 'page': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const ContentTable = ({ contentItems }: { contentItems: ContentItem[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contentItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {getTypeIcon(item.type)}
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {item.content}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              {item.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(item.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">Manage website content and pages</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Content' : 'Create New Content'}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update content information' : 'Add new content to your website'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Content Type *</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ContentItem['type'] })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="hero">Hero Section</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="blog">Blog Post</option>
                    <option value="gallery">Gallery</option>
                    <option value="page">Page Content</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentItem['status'] })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Content title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Content text..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Content</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Create'} Content
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.length}</div>
            <p className="text-xs text-muted-foreground">All content items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {content.filter(item => item.status === 'published').length}
            </div>
            <p className="text-xs text-muted-foreground">Live content</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {content.filter(item => item.status === 'draft').length}
            </div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {content.filter(item => item.featured).length}
            </div>
            <p className="text-xs text-muted-foreground">Featured items</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Content</TabsTrigger>
          <TabsTrigger value="testimonial">Testimonials</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="page">Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Sections</CardTitle>
              <CardDescription>Main banner and hero content for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable contentItems={getContentByType('hero')} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Testimonials</CardTitle>
              <CardDescription>Customer reviews and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable contentItems={getContentByType('testimonial')} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Articles and blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable contentItems={getContentByType('blog')} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
              <CardDescription>Product and showcase gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable contentItems={getContentByType('gallery')} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="page" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Static page content and information</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable contentItems={getContentByType('page')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {content.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content found. Create your first content item!</p>
        </div>
      )}
    </div>
  );
};

export default Content;