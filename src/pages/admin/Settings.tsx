import { useState, useEffect } from 'react';
import { localStorageService, Settings, Material, Karat } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store, Mail, Phone, MapPin, DollarSign, CreditCard, Settings as SettingsIcon, Users, Shield, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    logo: '',
    contact: {
      email: '',
      phone: '',
      address: ''
    },
    goldPrice: 0,
    silverPrice: 0,
    taxRate: 0,
    shippingRate: 0,
    freeShippingThreshold: 0,
    currency: 'INR',
    paymentMethods: [] as string[]
  });

  const [userSettings, setUserSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      orderUpdates: true,
      promotions: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30'
    },
    preferences: {
      theme: 'light',
      language: 'en'
    }
  });

  const [materialForm, setMaterialForm] = useState<{
    name: string;
    type: 'GOLD' | 'SILVER';
    isActive: boolean;
    karats: Karat[];
  }>({
    name: '',
    type: 'GOLD',
    isActive: true,
    karats: []
  });

  const [karatForm, setKaratForm] = useState<{
    value: string;
    purity: number;
    pricePerGram: number;
    isActive: boolean;
  }>({
    value: '',
    purity: 0,
    pricePerGram: 0,
    isActive: true
  });

  const [editingKarat, setEditingKarat] = useState<Karat | null>(null);

  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const paymentMethodOptions = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'net-banking', label: 'Net Banking' },
    { value: 'wallet', label: 'Digital Wallet' },
    { value: 'cod', label: 'Cash on Delivery' }
  ];

  useEffect(() => {
    loadSettings();
    loadMaterials();
    loadUserPreferences();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      // Load settings from API
      const response = await apiService.getSettings();

      // Map backend field names to frontend format
      const settingsData = {
        siteName: response.site_name || '',
        siteDescription: response.site_description || '',
        logo: response.logo || '',
        contact: {
          email: response.contact_email || '',
          phone: response.contact_phone || '',
          address: response.contact_address || ''
        },
        goldPrice: response.gold_price || 0,
        silverPrice: response.silver_price || 0,
        taxRate: response.tax_rate || 0,
        shippingRate: response.shipping_rate || 0,
        freeShippingThreshold: response.free_shipping_threshold || 0,
        currency: response.currency || 'INR',
        paymentMethods: response.payment_methods || []
      } as Settings;

      setSettings(settingsData);
      setFormData({
        siteName: settingsData.siteName,
        siteDescription: settingsData.siteDescription,
        logo: settingsData.logo,
        contact: settingsData.contact,
        goldPrice: settingsData.goldPrice,
        silverPrice: settingsData.silverPrice,
        taxRate: settingsData.taxRate,
        shippingRate: settingsData.shippingRate,
        freeShippingThreshold: settingsData.freeShippingThreshold,
        currency: settingsData.currency,
        paymentMethods: settingsData.paymentMethods
      });
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings from server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMaterials = async () => {
    try {
      const materialsData = await apiService.getMaterials();
      setMaterials(materialsData);
    } catch (error) {
      console.error('Failed to load materials:', error);
      toast({
        title: "Error",
        description: "Failed to load materials",
        variant: "destructive"
      });
    }
  };

  const loadUserPreferences = async () => {
    try {
      const prefs = await apiService.getUserPreferences();
      setUserSettings(prefs);
    } catch (error) {
      console.error('Failed to load user preferences:', error);
      toast({
        title: "Error",
        description: "Failed to load user preferences",
        variant: "destructive"
      });
    }
  };

  const handleSaveGeneral = async () => {
    try {
      // Map frontend field names to backend format
      const settingsToUpdate = {
        siteName: formData.siteName,
        siteDescription: formData.siteDescription,
        logo: formData.logo,
        contactEmail: formData.contact.email,
        contactPhone: formData.contact.phone,
        contactAddress: formData.contact.address
      };

      await apiService.updateSettings(settingsToUpdate);

      toast({
        title: "Success",
        description: "General settings updated successfully"
      });

      loadSettings();
    } catch (error) {
      console.error('Failed to update general settings:', error);
      toast({
        title: "Error",
        description: "Failed to update general settings",
        variant: "destructive"
      });
    }
  };

  const handleSaveBusiness = async () => {
    try {
      // Update karat prices in the backend based on new base prices
      const updateResult = await apiService.updateAllKaratPrices(formData.goldPrice, formData.silverPrice);

      // Update backend settings - map frontend field names to backend format
      const settingsToUpdate = {
        goldPrice: formData.goldPrice,
        silverPrice: formData.silverPrice,
        taxRate: formData.taxRate,
        shippingRate: formData.shippingRate,
        freeShippingThreshold: formData.freeShippingThreshold,
        currency: formData.currency,
        paymentMethods: formData.paymentMethods
      };

      await apiService.updateSettings(settingsToUpdate);

      toast({
        title: "Success",
        description: `Business settings updated successfully. ${updateResult.updatedCount} karat prices recalculated. 24K Gold: ₹${formData.goldPrice}/g, 999 Silver: ₹${formData.silverPrice}/g`
      });

      loadSettings();
      loadMaterials(); // Reload materials to show updated prices
    } catch (error) {
      console.error('Failed to update business settings:', error);
      toast({
        title: "Error",
        description: "Failed to update business settings and karat prices",
        variant: "destructive"
      });
    }
  };

  const handlePaymentMethodToggle = (method: string) => {
    const updatedMethods = formData.paymentMethods.includes(method)
      ? formData.paymentMethods.filter(m => m !== method)
      : [...formData.paymentMethods, method];
    
    setFormData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  const calculateAutoPrice = (purity: number, materialType: 'GOLD' | 'SILVER') => {
    const basePrice = materialType === 'GOLD' ? formData.goldPrice : formData.silverPrice;
    if (materialType === 'GOLD') {
      // For gold, calculate based on purity ratio (e.g., 22K = 22/24 * 24K price)
      return Math.round(basePrice * (purity / 100));
    } else {
      // For silver, typically use direct percentage
      return Math.round(basePrice * (purity / 100));
    }
  };

  const handlePurityChange = (purity: number) => {
    const autoPrice = calculateAutoPrice(purity, materialForm.type);
    setKaratForm(prev => ({
      ...prev,
      purity,
      pricePerGram: autoPrice
    }));
  };

  const handleAddKarat = () => {
    if (!karatForm.value || karatForm.purity <= 0) return;
    
    // Auto-calculate price if not manually set
    const pricePerGram = karatForm.pricePerGram || calculateAutoPrice(karatForm.purity, materialForm.type);
    
    if (editingKarat) {
      // Update existing karat
      setMaterialForm(prev => ({
        ...prev,
        karats: prev.karats.map(k =>
          k.id === editingKarat.id
            ? { ...k, value: karatForm.value, purity: karatForm.purity, pricePerGram, isActive: karatForm.isActive }
            : k
        )
      }));
      setEditingKarat(null);
    } else {
      // Add new karat
      const newKarat: Karat = {
        id: `karat-${Date.now()}`,
        value: karatForm.value,
        purity: karatForm.purity,
        materialType: materialForm.type,
        pricePerGram,
        isActive: karatForm.isActive
      };

      setMaterialForm(prev => ({
        ...prev,
        karats: [...prev.karats, newKarat]
      }));
    }

    setKaratForm({ value: '', purity: 0, pricePerGram: 0, isActive: true });
  };

  const handleEditKarat = (karat: Karat) => {
    setEditingKarat(karat);
    setKaratForm({
      value: karat.value,
      purity: karat.purity,
      pricePerGram: karat.pricePerGram,
      isActive: karat.isActive
    });
  };

  const handleRemoveKarat = (karatId: string) => {
    setMaterialForm(prev => ({
      ...prev,
      karats: prev.karats.filter(k => k.id !== karatId)
    }));
  };

  const handleSaveMaterial = async () => {
    if (!materialForm.name || materialForm.karats.length === 0) {
      toast({
        title: "Error",
        description: "Please provide material name and at least one karat option",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingMaterial) {
        // Update existing material
        await apiService.updateMaterial(editingMaterial.id, {
          name: materialForm.name,
          type: materialForm.type,
          isActive: materialForm.isActive
        });

        // Update existing karats or add new ones
        for (const karat of materialForm.karats) {
          if (karat.id.startsWith('karat-')) {
            // New karat, create it
            await apiService.createKarat(editingMaterial.id, {
              value: karat.value,
              purity: karat.purity,
              pricePerGram: karat.pricePerGram,
              isActive: karat.isActive
            });
          } else {
            // Existing karat, update it
            await apiService.updateKarat(karat.id, {
              value: karat.value,
              purity: karat.purity,
              pricePerGram: karat.pricePerGram,
              isActive: karat.isActive
            });
          }
        }

        toast({
          title: "Success",
          description: "Material updated successfully. Product prices have been recalculated."
        });
      } else {
        // Create new material
        const material = await apiService.createMaterial({
          name: materialForm.name,
          type: materialForm.type,
          isActive: materialForm.isActive
        });

        // Create karats for the new material
        for (const karat of materialForm.karats) {
          await apiService.createKarat(material.id, {
            value: karat.value,
            purity: karat.purity,
            pricePerGram: karat.pricePerGram,
            isActive: karat.isActive
          });
        }

        toast({
          title: "Success",
          description: "Material added successfully. Product prices have been recalculated."
        });
      }

      setShowMaterialDialog(false);
      setEditingMaterial(null);
      setEditingKarat(null);
      setMaterialForm({ name: '', type: 'GOLD', isActive: true, karats: [] });
      setKaratForm({ value: '', purity: 0, pricePerGram: 0, isActive: true });
      loadMaterials();
    } catch (error) {
      console.error('Failed to save material:', error);
      toast({
        title: "Error",
        description: "Failed to save material",
        variant: "destructive"
      });
    }
  };

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
    setMaterialForm({
      name: material.name,
      type: material.type,
      isActive: material.isActive,
      karats: material.karats
    });
    setShowMaterialDialog(true);
  };

  const handleDeleteMaterial = async (materialId: string) => {
    if (!confirm('Are you sure you want to delete this material? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.deleteMaterial(materialId);
      toast({
        title: "Success",
        description: "Material deleted successfully"
      });
      loadMaterials();
    } catch (error) {
      console.error('Failed to delete material:', error);
      toast({
        title: "Error",
        description: "Failed to delete material. It may have associated products.",
        variant: "destructive"
      });
    }
  };

  const handleSaveNotifications = async () => {
    try {
      await apiService.updateUserPreferences({ notifications: userSettings.notifications });
      toast({
        title: "Success",
        description: "Notification preferences updated successfully"
      });
      loadUserPreferences();
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update notification preferences",
        variant: "destructive"
      });
    }
  };

  const handleSaveSecurity = async () => {
    try {
      await apiService.updateUserPreferences({ security: userSettings.security });
      toast({
        title: "Success",
        description: "Security settings updated successfully"
      });
      loadUserPreferences();
    } catch (error) {
      console.error('Failed to update security settings:', error);
      toast({
        title: "Error",
        description: "Failed to update security settings",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: formData.currency || 'INR'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Business
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.contact.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, address: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <Button onClick={handleSaveGeneral} className="w-full md:w-auto">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Base Metal Prices
                </CardTitle>
                <CardDescription>Set base prices - all karat prices will calculate automatically</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goldPrice" className="text-base font-medium">24K Gold Price (per gram)</Label>
                    <Input
                      id="goldPrice"
                      type="number"
                      value={formData.goldPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, goldPrice: Number(e.target.value) }))}
                      placeholder="e.g., 6000"
                      className="text-lg"
                    />
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-orange-800 mb-2">Auto-calculated Gold Prices:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>• 24K (99.9%): {formatPrice(formData.goldPrice)}/g</div>
                        <div>• 22K (91.7%): {formatPrice(Math.round(formData.goldPrice * 0.918))}/g</div>
                        <div>• 18K (75%): {formatPrice(Math.round(formData.goldPrice * 0.751))}/g</div>
                        <div>• 14K (58.3%): {formatPrice(Math.round(formData.goldPrice * 0.584))}/g</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silverPrice" className="text-base font-medium">999 Pure Silver Price (per gram)</Label>
                    <Input
                      id="silverPrice"
                      type="number"
                      value={formData.silverPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, silverPrice: Number(e.target.value) }))}
                      placeholder="e.g., 85"
                      className="text-lg"
                    />
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-800 mb-2">Auto-calculated Silver Prices:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>• 999 Fine (99.9%): {formatPrice(formData.silverPrice)}/g</div>
                        <div>• 925 Sterling (92.5%): {formatPrice(Math.round(formData.silverPrice * 0.926))}/g</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">How it works:</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Enter only the base prices above. When you click "Save Business Settings", all karat prices will be automatically calculated and updated across your entire inventory based on purity percentages.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax & Shipping</CardTitle>
                <CardDescription>Configure taxes and shipping rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingRate">Shipping Rate</Label>
                  <Input
                    id="shippingRate"
                    type="number"
                    value={formData.shippingRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, shippingRate: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={formData.freeShippingThreshold}
                    onChange={(e) => setFormData(prev => ({ ...prev, freeShippingThreshold: Number(e.target.value) }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure accepted payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {paymentMethodOptions.map((method) => (
                  <div key={method.value} className="flex items-center space-x-2">
                    <Switch
                      id={method.value}
                      checked={formData.paymentMethods.includes(method.value)}
                      onCheckedChange={() => handlePaymentMethodToggle(method.value)}
                    />
                    <Label htmlFor={method.value}>{method.label}</Label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Selected: {formData.paymentMethods.map(method => 
                    paymentMethodOptions.find(opt => opt.value === method)?.label
                  ).join(', ') || 'None'}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-green-800">Ready to Update Prices?</h3>
                <p className="text-xs text-green-700 mt-1">
                  This will save settings and automatically update all {materials.length > 0 ? materials.reduce((sum, m) => sum + m.karats.length, 0) : '6'} karat prices across your inventory.
                </p>
              </div>
              <Button onClick={handleSaveBusiness} className="bg-green-600 hover:bg-green-700 text-white">
                <DollarSign className="h-4 w-4 mr-2" />
                Save & Update Prices
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Materials & Karats Management
                <Dialog open={showMaterialDialog} onOpenChange={setShowMaterialDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Material
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingMaterial ? 'Edit Material' : 'Add New Material'}
                      </DialogTitle>
                      <DialogDescription>
                        Configure material type and karat options
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="materialName">Material Name</Label>
                          <Input
                            id="materialName"
                            value={materialForm.name}
                            onChange={(e) => setMaterialForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Gold, Silver"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="materialType">Material Type</Label>
                          <Select
                            value={materialForm.type}
                            onValueChange={(value: 'GOLD' | 'SILVER') => setMaterialForm(prev => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GOLD">Gold</SelectItem>
                              <SelectItem value="SILVER">Silver</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">Karat Options</h4>
                         <div className="grid grid-cols-4 gap-4">
                           <div className="space-y-2">
                             <Label htmlFor="karatValue">Karat Value</Label>
                             <Input
                               id="karatValue"
                               value={karatForm.value}
                               onChange={(e) => setKaratForm(prev => ({ ...prev, value: e.target.value }))}
                               placeholder="e.g., 24K, 925"
                             />
                           </div>
                            <div className="space-y-2">
                              <Label htmlFor="karatPurity">Purity (%)</Label>
                              <Input
                                id="karatPurity"
                                type="number"
                                step="0.1"
                                value={karatForm.purity}
                                onChange={(e) => handlePurityChange(Number(e.target.value))}
                                placeholder="e.g., 99.9"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="karatPrice">Price per Gram (INR)</Label>
                              <Input
                                id="karatPrice"
                                type="number"
                                value={karatForm.pricePerGram}
                                onChange={(e) => setKaratForm(prev => ({ ...prev, pricePerGram: Number(e.target.value) }))}
                                placeholder="Auto-calculated"
                              />
                              <p className="text-xs text-muted-foreground">
                                Auto-calculated: ₹{calculateAutoPrice(karatForm.purity || 0, materialForm.type).toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div className="flex items-end gap-2">
                              <Button onClick={handleAddKarat} className="flex-1">
                                {editingKarat ? 'Update' : 'Add'} Karat
                              </Button>
                              {editingKarat && (
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    setEditingKarat(null);
                                    setKaratForm({ value: '', purity: 0, pricePerGram: 0, isActive: true });
                                  }}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                         </div>

                        <div className="space-y-2">
                          <Label>Added Karats</Label>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                              {materialForm.karats.map((karat) => (
                                <div key={karat.id} className="flex items-center justify-between p-2 border rounded">
                                  <span>
                                    {karat.value} ({karat.purity}% purity) - ₹{karat.pricePerGram.toLocaleString('en-IN')}/gram
                                  </span>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditKarat(karat)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveKarat(karat.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowMaterialDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveMaterial}>
                          {editingMaterial ? 'Update' : 'Save'} Material
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>
                View materials and their automatically calculated karat prices (Updated from Business → Base Metal Prices)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="bg-yellow-500 rounded-full p-1 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Automatic Price Management</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Karat prices shown below are automatically calculated from base metal prices set in Business tab.
                      To update prices, go to Business → Base Metal Prices and click "Save Business Settings".
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{material.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant={material.type === 'GOLD' ? 'default' : 'secondary'}>
                            {material.type}
                          </Badge>
                          <Badge variant={material.isActive ? 'default' : 'secondary'}>
                            {material.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMaterial(material)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMaterial(material.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                      <div className="flex flex-wrap gap-2">
                        {material.karats.map((karat) => (
                          <Badge key={karat.id} variant="outline">
                            {karat.value} ({karat.purity}%) - ₹{karat.pricePerGram.toLocaleString('en-IN')}/g
                          </Badge>
                        ))}
                      </div>
                  </div>
                ))}
                {materials.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No materials found. Add your first material to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={userSettings.notifications.email}
                  onCheckedChange={(checked) => 
                    setUserSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={userSettings.notifications.sms}
                  onCheckedChange={(checked) => 
                    setUserSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                </div>
                <Switch
                  checked={userSettings.notifications.orderUpdates}
                  onCheckedChange={(checked) => 
                    setUserSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, orderUpdates: checked }
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Promotional Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about promotions and offers</p>
                </div>
                <Switch
                  checked={userSettings.notifications.promotions}
                  onCheckedChange={(checked) => 
                    setUserSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, promotions: checked }
                    }))
                  }
                />
              </div>
              <Button onClick={handleSaveNotifications} className="w-full md:w-auto mt-4">
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={userSettings.security.twoFactor}
                  onCheckedChange={(checked) => 
                    setUserSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactor: checked }
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Select 
                  value={userSettings.security.sessionTimeout} 
                  onValueChange={(value) => 
                    setUserSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: value }
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSecurity} className="w-full md:w-auto mt-4">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
