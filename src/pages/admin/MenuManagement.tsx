import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Loader2, Coffee, Sun, Moon } from 'lucide-react';
import { MenuItem, MealType } from '@/types/database';

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    meal_type: 'breakfast' as MealType,
    category: '',
    description: '',
    price: '',
    quantity: '',
    availability: true,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch menu items',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      meal_type: 'breakfast',
      category: '',
      description: '',
      price: '',
      quantity: '',
      availability: true,
    });
    setEditingItem(null);
  };

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        meal_type: item.meal_type,
        category: item.category,
        description: item.description || '',
        price: item.price.toString(),
        quantity: item.quantity.toString(),
        availability: item.availability,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const itemData = {
        name: formData.name,
        meal_type: formData.meal_type,
        category: formData.category,
        description: formData.description || null,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        availability: formData.availability,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(itemData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Menu item updated successfully' });
      } else {
        const { error } = await supabase.from('menu_items').insert([itemData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Menu item added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save menu item',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Menu item deleted successfully' });
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete menu item',
      });
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ availability: !item.availability })
        .eq('id', item.id);

      if (error) throw error;
      fetchMenuItems();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const getMealIcon = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee className="h-5 w-5" />;
      case 'lunch':
        return <Sun className="h-5 w-5" />;
      case 'dinner':
        return <Moon className="h-5 w-5" />;
    }
  };

  const filterByMealType = (mealType: MealType) =>
    menuItems.filter((item) => item.meal_type === mealType);

  const MenuItemCard = ({ item }: { item: MenuItem }) => (
    <Card className="card-shadow hover:card-shadow-lg transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              {!item.availability && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Unavailable
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="mb-2">
              {item.category}
            </Badge>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            )}
            <div className="flex items-center gap-4 mt-3">
              <span className="font-bold text-primary">₹{item.price}</span>
              <span className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Switch
              checked={item.availability}
              onCheckedChange={() => handleToggleAvailability(item)}
            />
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenDialog(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
            <p className="text-muted-foreground">Manage dining hall menu items</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="gradient-primary hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingItem
                      ? 'Update the menu item details below.'
                      : 'Fill in the details for the new menu item.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="meal_type">Meal Type</Label>
                      <Select
                        value={formData.meal_type}
                        onValueChange={(value: MealType) =>
                          setFormData({ ...formData, meal_type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="e.g., Main Course"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Brief description..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="availability"
                      checked={formData.availability}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, availability: checked })
                      }
                    />
                    <Label htmlFor="availability">Available</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : editingItem ? (
                      'Update'
                    ) : (
                      'Add'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="breakfast" className="gap-2">
                <Coffee className="h-4 w-4" />
                Breakfast
              </TabsTrigger>
              <TabsTrigger value="lunch" className="gap-2">
                <Sun className="h-4 w-4" />
                Lunch
              </TabsTrigger>
              <TabsTrigger value="dinner" className="gap-2">
                <Moon className="h-4 w-4" />
                Dinner
              </TabsTrigger>
            </TabsList>

            {(['breakfast', 'lunch', 'dinner'] as MealType[]).map((mealType) => (
              <TabsContent key={mealType} value={mealType}>
                {filterByMealType(mealType).length === 0 ? (
                  <Card className="card-shadow">
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">
                        No {mealType} items added yet.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setFormData({ ...formData, meal_type: mealType });
                          handleOpenDialog();
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add {mealType} item
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filterByMealType(mealType).map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
}
