import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin } from '@/contexts/AdminContext';
import { LogOut, Plus, Edit, Trash2, ShoppingCart, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminProducts = () => {
  const { isAuthenticated, logout, products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  });

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', stock: '' });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      stock: parseInt(formData.stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({
        title: "Produit mis à jour",
        description: `${productData.name} a été mis à jour avec succès`,
      });
      setEditingProduct(null);
    } else {
      addProduct(productData);
      toast({
        title: "Produit ajouté",
        description: `${productData.name} a été ajouté avec succès`,
      });
      setIsAddDialogOpen(false);
    }
    
    resetForm();
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      stock: product.stock.toString()
    });
  };

  const handleDelete = (product: any) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${product.name}?`)) {
      deleteProduct(product.id);
      toast({
        title: "Produit supprimé",
        description: `${product.name} a été supprimé`,
        variant: "destructive",
      });
    }
  };

  const ProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du produit</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Prix (€)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={resetForm}>
          Annuler
        </Button>
        <Button type="submit">
          {editingProduct ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/admin/orders'}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Commandes
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un produit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  </DialogHeader>
                  <ProductForm />
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">{product.price}€</span>
                  <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun produit trouvé</p>
            </CardContent>
          </Card>
        )}

        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier le produit</DialogTitle>
              </DialogHeader>
              <ProductForm />
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;