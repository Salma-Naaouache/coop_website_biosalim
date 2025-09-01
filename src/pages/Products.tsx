import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Leaf, Award, Filter } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/supabaseClient";

// Import fallback images
import sorghumFlour from "@/assets/sorghum-flour.jpg";
import sorghumCouscous from "@/assets/sorghum-couscous.jpg";
import sorghumPasta from "@/assets/sorghum-pasta.jpg";

// Fallback images array
const fallbackImages = [sorghumFlour, sorghumCouscous, sorghumPasta];

// Categories - will be populated from database
const defaultCategories = [
  "Tous",
  "Couscous sans gluten",
  "Farine sans gluten",
  "Céréales sans gluten et dérivés",
  "Céréales et dérivés",
  "Couscous",
  "Graines et herbes",
  "Légumineuses naturelles",
  "Assaisonnements et Épices"
];

export default function Products() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Starting to fetch products...');
      
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .order('id', { ascending: true });

      console.log('Supabase response - data:', data);
      console.log('Supabase response - error:', error);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log('No products found in database');
        setProducts([]);
        return;
      }

      // Debug: Log the raw data from database
      console.log('Raw data from database:', data);

      // Transform the data to match the existing format
      const transformedProducts = data.map((product, index) => ({
        id: product.id.toString(),
        name: product.nom,
        description: product.description || "Description non disponible",
        longDescription: product.description || "Description détaillée non disponible",
        price: product.prix || 0,
        weight: product.quantité || "N/A",
        image: product.image_url || fallbackImages[index % fallbackImages.length],
        category: product.categorie || "Divers",
        benefits: ["Artisanal", "Qualité premium", "Cultivé localement", "100% naturel"], // Default benefits
        nutritionalInfo: {
          protein: "10g",
          fiber: "5g",
          iron: "3mg",
          magnesium: "100mg"
        } // Default nutritional info
      }));

      // Debug: Log the transformed products
      console.log('Transformed products:', transformedProducts);

      setProducts(transformedProducts);

      // Extract unique categories from products and combine with default ones
      const productCategories = [...new Set(data.map(p => p.categorie).filter(Boolean))];
      const allCategories = ["Tous", ...new Set([...defaultCategories.slice(1), ...productCategories])];
      setCategories(allCategories);

    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Erreur lors du chargement des produits');
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight
    });
    toast.success(`${product.name} ajouté au panier!`);
  };

  const filteredProducts = selectedCategory === "Tous" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Debug: Log filtering results
  console.log('Selected category:', selectedCategory);
  console.log('Filtered products:', filteredProducts);
  console.log('All products:', products);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement des produits...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchProducts} variant="outline">
              Réessayer
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/5 to-white dark:from-primary/10 dark:to-background overflow-hidden">
          <div className="container relative z-10 pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Bio Salim
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                Nos produits
              </h1>
              <p className="text-muted-foreground text-lg">
                Découvrez notre gamme de produits artisanaux à base de sorgho, cultivés et transformés avec amour dans les montagnes de Chefchaouen.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <span className="font-medium">Filtrer par catégorie:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-80">
                  <SelectValue placeholder="Choisir une catégorie" />
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
            
            {/* Category Buttons - Alternative UI */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="section">
          <div className="container">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} 
                {selectedCategory !== "Tous" && ` dans "${selectedCategory}"`}
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <div className="glass-card rounded-xl overflow-hidden">
                      {/* Product Image */}
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackImages[index % fallbackImages.length];
                          }}
                        />
                      </div>
                      
                      {/* Product Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{product.name}</h3>
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{product.description}</p>
                        
                        {/* Benefits */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.benefits.slice(0, 2).map((benefit) => (
                            <Badge key={benefit} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        
            
                        
                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">{product.price} DH</div>
                            <div className="text-sm text-muted-foreground">{product.weight}</div>
                          </div>
                          <Button 
                            className="btn-primary"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Product Details Section */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi choisir nos produits ?
              </h2>
              <p className="text-muted-foreground">
                Chaque produit Bio Salim porte en lui l'expertise traditionnelle et l'engagement qualité de nos artisanes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in [animation-delay:100ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Naturel</h3>
                <p className="text-muted-foreground">
                  Aucun additif chimique, conservateur artificiel ou colorant. Nos produits conservent toute leur pureté naturelle.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:200ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Artisanal</h3>
                <p className="text-muted-foreground">
                  Chaque produit est fabriqué à la main selon des méthodes traditionnelles transmises de génération en génération.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:300ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
                <p className="text-muted-foreground">
                  Sélection rigoureuse des matières premières et contrôle qualité à chaque étape de la production.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Commandez vos produits Bio Salim
              </h2>
              <p className="text-muted-foreground mb-8">
                Contactez-nous pour passer commande ou pour plus d'informations sur nos produits artisanaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-primary">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Commander maintenant
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+212123456789">Appeler maintenant</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}