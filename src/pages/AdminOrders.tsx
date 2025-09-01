import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '@/contexts/AdminContext';
import { LogOut, Package, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminOrders = () => {
  const { isAuthenticated, logout, orders, updateOrderStatus } = useAdmin();
  const { toast } = useToast();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast({
      title: "Statut mis à jour",
      description: `Commande ${orderId} mise à jour vers ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/admin/products'}>
                <Package className="h-4 w-4 mr-2" />
                Produits
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                    <p className="text-muted-foreground">
                      {order.customerName} - {order.customerPhone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customerAddress}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </p>
                    {order.customerNotes && (
                      <p className="text-sm text-muted-foreground italic">
                        Note: {order.customerNotes}
                      </p>
                    )}
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Articles commandés:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <span>{item.productName}</span>
                           <span className="text-muted-foreground">
                             {item.quantity} × {item.price} DH = {item.quantity * item.price} DH
                           </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-bold text-lg">Total: {order.totalPrice} DH</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Statut:</span>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune commande trouvée</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;