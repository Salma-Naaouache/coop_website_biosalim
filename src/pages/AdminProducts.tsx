import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '@/contexts/AdminContext';
import { LogOut, Plus, Edit, Trash2, ShoppingCart, Package, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/supabaseClient';

const AdminProducts = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    description: '',
    quantité: '',
    categorie: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const categories = [
    'Couscous sans gluten',
    'Farine sans gluten', 
    'Céréales sans gluten et dérivés',
    'Céréales et dérivés',
    'Couscous',
    'Graines et herbes',
    'Légumineuses naturelles',
    'Assaisonnements et Épices'
  ];

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: any) => {
    try {
      const { data, error } = await supabase
        .from('produits')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;
      
      setProducts([...products, data]);
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProduct = async (id: number, productData: any) => {
    try {
      const { data, error } = await supabase
        .from('produits')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setProducts(products.map(p => p.id === id ? data : p));
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('produits')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetForm = () => {
    setFormData({ 
      nom: '', 
      prix: '', 
      description: '', 
      quantité: '', 
      categorie: '',
      image_url: ''
    });
    setImageFile(null);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      nom: formData.nom,
      prix: parseInt(formData.prix),
      description: formData.description,
      quantité: formData.quantité,
      categorie: formData.categorie,
      image_url: formData.image_url
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast({
          title: "Produit mis à jour",
          description: `${productData.nom} a été mis à jour avec succès`,
        });
        setEditingProduct(null);
      } else {
        await addProduct(productData);
        toast({
          title: "Produit ajouté",
          description: `${productData.nom} a été ajouté avec succès`,
        });
        setIsAddDialogOpen(false);
      }
      
      resetForm();
    } catch (error) {
      // Error already handled in the functions above
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      nom: product.nom,
      prix: product.prix.toString(),
      description: product.description || '',
      quantité: product.quantité || '',
      categorie: product.categorie || '',
      image_url: product.image_url || ''
    });
  };

  const handleDelete = async (product: any) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${product.nom}?`)) {
      try {
        await deleteProduct(product.id);
        toast({
          title: "Produit supprimé",
          description: `${product.nom} a été supprimé`,
          variant: "destructive",
        });
      } catch (error) {
        // Error already handled in deleteProduct function
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a URL for preview
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image_url: imageUrl });
    }
  };

  const ProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="nom">Nom du produit</Label>
        <Input
          id="nom"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prix">Prix (DH)</Label>
          <Input
            id="prix"
            type="number"
            value={formData.prix}
            onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quantité">Quantité</Label>
          <Input
            id="quantité"
            value={formData.quantité}
            onChange={(e) => setFormData({ ...formData, quantité: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="categorie">Catégorie</Label>
        <Select value={formData.categorie} onValueChange={(value) => setFormData({ ...formData, categorie: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image du produit</Label>
        <div className="space-y-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          <div className="space-y-2">
            <Label htmlFor="image_url">Ou URL de l'image</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://exemple.com/image.jpg"
            />
          </div>
          {formData.image_url && (
            <div className="mt-2">
              <img src={formData.image_url} alt="Preview" className="w-20 h-20 object-cover rounded" />
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={resetForm}>
          Annuler
        </Button>
        <Button type="submit">
          {editingProduct ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Gestion des Produits BioSalim</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/admin/orders')}>
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
                <DialogContent className="max-w-2xl">
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
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tous les produits ({products.length})</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-muted">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.nom}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{product.nom}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.prix} DH</span>
                  <span className="text-sm text-muted-foreground">Stock: {product.quantité}</span>
                </div>
                {product.categorie && (
                  <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
                    {product.categorie}
                  </span>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter votre premier produit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  </DialogHeader>
                  <ProductForm />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-2xl">
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