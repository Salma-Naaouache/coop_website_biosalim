import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  email: string;
  password: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
  date: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default admin credentials (in real app, this would be secured)
const DEFAULT_ADMIN: Admin = {
  id: '1',
  email: 'admin@biosalim.com',
  password: 'admin123'
};

// Sample data
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Farine de sorgho',
    price: 25,
    description: 'Farine de sorgho bio cultivée dans les montagnes de Chefchaouen',
    stock: 50
  },
  {
    id: '2',
    name: 'Couscous de sorgho',
    price: 30,
    description: 'Couscous traditionnel à base de sorgho, savoureux et nutritif',
    stock: 35
  },
  {
    id: '3',
    name: 'Pâtes artisanales au sorgho',
    price: 28,
    description: 'Pâtes artisanales fabriquées avec amour par les femmes de Bio Salim',
    stock: 40
  }
];

const SAMPLE_ORDERS: Order[] = [
  {
    id: '1',
    customerName: 'Sarah Benali',
    customerEmail: 'sarah@example.com',
    items: [
      { productId: '1', productName: 'Farine de sorgho', quantity: 2, price: 25 }
    ],
    totalPrice: 50,
    status: 'Pending',
    date: new Date().toISOString()
  },
  {
    id: '2',
    customerName: 'Ahmed Mansouri',
    customerEmail: 'ahmed@example.com',
    items: [
      { productId: '2', productName: 'Couscous de sorgho', quantity: 1, price: 30 },
      { productId: '3', productName: 'Pâtes artisanales au sorgho', quantity: 1, price: 28 }
    ],
    totalPrice: 58,
    status: 'Paid',
    date: new Date(Date.now() - 86400000).toISOString()
  }
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      setIsAuthenticated(true);
    }

    // Load data from localStorage or use sample data
    const storedProducts = localStorage.getItem('biosalim_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(SAMPLE_PRODUCTS);
      localStorage.setItem('biosalim_products', JSON.stringify(SAMPLE_PRODUCTS));
    }

    const storedOrders = localStorage.getItem('biosalim_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(SAMPLE_ORDERS);
      localStorage.setItem('biosalim_orders', JSON.stringify(SAMPLE_ORDERS));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminSession', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminSession');
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('biosalim_products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, ...productUpdate } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('biosalim_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('biosalim_products', JSON.stringify(updatedProducts));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updatedOrders = orders.map(o => 
      o.id === id ? { ...o, status } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('biosalim_orders', JSON.stringify(updatedOrders));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};