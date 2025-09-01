import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Create order from cart items
    const orderItems = items.map(item => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    // Add order to admin system
    addOrder({
      customerName: orderForm.name,
      customerPhone: orderForm.phone,
      customerAddress: orderForm.address,
      customerNotes: orderForm.notes,
      items: orderItems,
      totalPrice: getTotalPrice()
    });

    toast.success('Commande envoyée avec succès! Nous vous contacterons bientôt.');
    clearCart();
    setShowCheckout(false);
    setOrderForm({ name: '', phone: '', address: '', notes: '' });
    onClose();
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Votre panier</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Votre panier est vide</p>
            <Button 
              onClick={onClose} 
              className="mt-4 btn-primary"
            >
              Continuer les achats
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {showCheckout ? 'Finaliser la commande' : 'Votre panier'}
          </DialogTitle>
        </DialogHeader>
        
        {!showCheckout ? (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.weight}</p>
                  <p className="text-sm font-medium text-primary">{item.price} DH</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">{getTotalPrice()} DH</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={onClose}
                >
                  Continuer les achats
                </Button>
                <Button 
                  className="flex-1 btn-primary" 
                  onClick={() => setShowCheckout(true)}
                >
                  Commander
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted">
              <h4 className="font-semibold mb-2">Résumé de la commande</h4>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{item.price * item.quantity} DH</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-primary">{getTotalPrice()} DH</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address">Adresse de livraison *</Label>
                <Textarea
                  id="address"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                  placeholder="Instructions spéciales pour la livraison..."
                />
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Mode de paiement:</strong> Paiement à la livraison (espèces)
              </p>
            </div>

            <div className="flex space-x-2">
              <Button 
                type="button"
                variant="outline" 
                className="flex-1" 
                onClick={() => setShowCheckout(false)}
              >
                Retour
              </Button>
              <Button 
                type="submit"
                className="flex-1 btn-primary"
              >
                Confirmer la commande
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}