import { useState, useEffect } from 'react';
import { Customer } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/currency';
import { Plus, Edit, Search, MessageSquare, Phone, Mail } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [noteDialog, setNoteDialog] = useState<{ open: boolean; customer: Customer | null }>({ open: false, customer: null });
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    dateOfBirth: '',
    leadSource: '',
    status: 'lead' as 'lead' | 'customer' | 'vip',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customersData = await apiService.getCustomers();
      setCustomers(customersData);
    } catch (error) {
      console.error('Failed to load customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const customerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        dateOfBirth: formData.dateOfBirth || undefined,
        leadSource: formData.leadSource,
        status: formData.status,
      };

      if (editingCustomer) {
        // Update existing customer
        await apiService.updateCustomer(editingCustomer.id, customerData);
        toast({
          title: "Customer updated",
          description: "Customer information has been updated successfully.",
        });
      } else {
        // Create new customer
        await apiService.createCustomer(customerData);
        toast({
          title: "Customer created",
          description: "New customer has been added successfully.",
        });
      }
      
      resetForm();
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save customer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      dateOfBirth: '',
      leadSource: '',
      status: 'lead',
    });
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      street: customer.address?.street || '',
      city: customer.address?.city || '',
      state: customer.address?.state || '',
      zipCode: customer.address?.zipCode || '',
      country: customer.address?.country || '',
      dateOfBirth: customer.dateOfBirth || '',
      leadSource: customer.leadSource || '',
      status: customer.status,
    });
    setIsDialogOpen(true);
  };

  const handleAddNote = async () => {
    if (noteDialog.customer && newNote.trim()) {
      try {
        await apiService.addCustomerNote(noteDialog.customer.id, newNote.trim());
        setNewNote('');
        setNoteDialog({ open: false, customer: null });
        loadData();
        toast({
          title: "Note added",
          description: "Customer note has been added successfully.",
        });
      } catch (error) {
        console.error('Failed to add note:', error);
        toast({
          title: "Error",
          description: "Failed to add note. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );


  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case 'lead': return 'bg-yellow-100 text-yellow-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </DialogTitle>
              <DialogDescription>
                {editingCustomer ? 'Update customer information' : 'Add a new customer to your database'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadSource">Lead Source</Label>
                  <Input
                    id="leadSource"
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleInputChange}
                    placeholder="e.g., Website, Referral, Social Media"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'lead' | 'customer' | 'vip') => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCustomer ? 'Update Customer' : 'Create Customer'}
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
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>Manage all your customers and leads</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                      <div className="text-sm text-muted-foreground">
                        Customer since {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                  <TableCell>{customer.orderCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNoteDialog({ open: true, customer })}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notes Dialog */}
      <Dialog open={noteDialog.open} onOpenChange={(open) => setNoteDialog({ open, customer: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Notes</DialogTitle>
            <DialogDescription>
              Add notes for {noteDialog.customer?.firstName} {noteDialog.customer?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="max-h-48 overflow-y-auto space-y-2">
              {noteDialog.customer?.notes.map((note, index) => (
                <div key={note.id || index} className="p-2 bg-muted rounded text-sm">
                  <div className="font-medium text-xs text-muted-foreground mb-1">
                    {note.createdBy} - {new Date(note.createdAt).toLocaleDateString()}
                  </div>
                  <div>{typeof note === 'string' ? note : note.note}</div>
                </div>
              ))}
              {(!noteDialog.customer?.notes || noteDialog.customer.notes.length === 0) && (
                <p className="text-muted-foreground text-sm">No notes yet.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newNote">Add Note</Label>
              <Textarea
                id="newNote"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note here..."
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setNoteDialog({ open: false, customer: null })}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>
                Add Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;