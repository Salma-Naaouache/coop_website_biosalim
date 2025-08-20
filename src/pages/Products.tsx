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

// Import images
import sorghumFlour from "@/assets/sorghum-flour.jpg";
import sorghumCouscous from "@/assets/sorghum-couscous.jpg";
import sorghumPasta from "@/assets/sorghum-pasta.jpg";

// Categories
const categories = [
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

// Products data
const products = [
  {
    id: "1",
    name: "Farine de sorgho",
    description: "Farine 100% naturelle, parfaite pour vos pâtisseries et pains traditionnels. Riche en fibres et sans gluten.",
    longDescription: "Notre farine de sorgho est moulue à partir de grains cultivés dans les montagnes de Chefchaouen. Elle conserve toutes ses propriétés nutritionnelles grâce à un processus de mouture traditionnel respectueux du grain.",
    price: 45,
    weight: "1kg",
    image: sorghumFlour,
    category: "Farine sans gluten",
    benefits: ["Sans gluten", "Riche en fibres", "Source de protéines", "Cultivé localement"],
    nutritionalInfo: {
      protein: "11g",
      fiber: "6.7g",
      iron: "4.4mg",
      magnesium: "165mg"
    }
  },
  {
    id: "2",
    name: "Couscous de sorgho",
    description: "Couscous artisanal au sorgho, une alternative nutritive au couscous traditionnel. Texture parfaite et goût authentique.",
    longDescription: "Préparé selon les méthodes traditionnelles par nos artisanes, ce couscous de sorgho offre une expérience gustative unique tout en apportant une valeur nutritionnelle exceptionnelle.",
    price: 55,
    weight: "500g",
    image: sorghumCouscous,
    category: "Couscous sans gluten",
    benefits: ["Artisanal", "Digestion facile", "Sans gluten", "Préparation rapide"],
    nutritionalInfo: {
      protein: "10g",
      fiber: "5.2g",
      iron: "3.8mg",
      zinc: "2.1mg"
    }
  },
  {
    id: "3",
    name: "Pâtes artisanales au sorgho",
    description: "Pâtes faites main au sorgho, alliant tradition et santé. Parfaites pour tous vos plats de pâtes préférés.",
    longDescription: "Nos pâtes artisanales sont façonnées à la main par nos coopératrices expertes. Elles cuisent parfaitement et conservent leur forme tout en offrant un goût délicat et authentique.",
    price: 38,
    weight: "400g",
    image: sorghumPasta,
    category: "Céréales sans gluten et dérivés",
    benefits: ["Fait main", "Cuisson parfaite", "Goût authentique", "Texture unique"],
    nutritionalInfo: {
      protein: "9g",
      fiber: "4.1g",
      iron: "2.9mg",
      calcium: "28mg"
    }
  },
  {
    id: "4",
    name: "Couscous traditionnel",
    description: "Couscous artisanal préparé selon les méthodes ancestrales. Texture moelleuse et saveur authentique.",
    longDescription: "Notre couscous traditionnel est roulé à la main par nos artisanes expertes, offrant une texture parfaite et un goût incomparable.",
    price: 35,
    weight: "500g",
    image: sorghumCouscous,
    category: "Couscous",
    benefits: ["Artisanal", "Tradition", "Texture parfaite", "Saveur authentique"],
    nutritionalInfo: {
      protein: "12g",
      fiber: "2.8g",
      iron: "1.8mg",
      zinc: "1.5mg"
    }
  },
  {
    id: "5",
    name: "Mélange de graines bio",
    description: "Assortiment de graines biologiques cultivées localement. Parfait pour vos salades et plats santé.",
    longDescription: "Un mélange soigneusement sélectionné de graines de tournesol, courge et sésame, cultivées sans pesticides dans nos fermes partenaires.",
    price: 42,
    weight: "300g",
    image: sorghumFlour,
    category: "Graines et herbes",
    benefits: ["Bio", "Riche en oméga", "Cultivé localement", "Sans pesticides"],
    nutritionalInfo: {
      protein: "18g",
      fiber: "8.2g",
      iron: "5.1mg",
      magnesium: "220mg"
    }
  },
  {
    id: "6",
    name: "Lentilles vertes du Maroc",
    description: "Lentilles vertes premium cultivées dans les régions montagneuses. Excellente source de protéines végétales.",
    longDescription: "Nos lentilles vertes sont cultivées en altitude, ce qui leur confère une saveur unique et une texture ferme idéale pour vos plats mijotés.",
    price: 28,
    weight: "500g",
    image: sorghumPasta,
    category: "Légumineuses naturelles",
    benefits: ["Riche en protéines", "Source de fer", "Cultivé en altitude", "Cuisson rapide"],
    nutritionalInfo: {
      protein: "24g",
      fiber: "11g",
      iron: "7.6mg",
      folate: "358mcg"
    }
  },
  {
    id: "7",
    name: "Mélange d'épices Ras el Hanout",
    description: "Mélange traditionnel d'épices marocaines aux arômes complexes. Indispensable en cuisine orientale.",
    longDescription: "Notre Ras el Hanout est composé de plus de 20 épices soigneusement sélectionnées et mélangées selon une recette traditionnelle transmise de génération en génération.",
    price: 65,
    weight: "100g",
    image: sorghumFlour,
    category: "Assaisonnements et Épices",
    benefits: ["Traditionnel", "20+ épices", "Recette ancestrale", "Arômes intenses"],
    nutritionalInfo: {
      protein: "12g",
      fiber: "25g",
      iron: "47mg",
      calcium: "1800mg"
    }
  },
  {
    id: "8",
    name: "Flocons d'avoine bio",
    description: "Flocons d'avoine biologiques, parfaits pour un petit-déjeuner nutritif et énergisant.",
    longDescription: "Nos flocons d'avoine sont issus de l'agriculture biologique et conservent toutes leurs fibres naturelles pour un petit-déjeuner sain et équilibré.",
    price: 32,
    weight: "500g",
    image: sorghumCouscous,
    category: "Céréales et dérivés",
    benefits: ["Bio", "Riche en fibres", "Énergisant", "Petit-déjeuner sain"],
    nutritionalInfo: {
      protein: "13g",
      fiber: "10g",
      iron: "4.2mg",
      magnesium: "138mg"
    }
  }
];

export default function Products() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
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
                      
                      {/* Nutrition highlights */}
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-primary">{product.nutritionalInfo.protein}</div>
                          <div className="text-xs text-muted-foreground">Protéines</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold text-primary">{product.nutritionalInfo.fiber}</div>
                          <div className="text-xs text-muted-foreground">Fibres</div>
                        </div>
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