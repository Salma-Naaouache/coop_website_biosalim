import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Wheat, Lightbulb, Package, Users, TrendingUp } from "lucide-react";

// Import images
import ihssanePortrait from "@/assets/ihssane-portrait.jpg";
import sorghumCloseup from "@/assets/sorghum-closeup.jpg";
import alMoutmirTraining from "@/assets/al-moutmir-training.jpg";
import sorghumFlour from "@/assets/sorghum-flour.jpg";
import sorghumCouscous from "@/assets/sorghum-couscous.jpg";
import sorghumPasta from "@/assets/sorghum-pasta.jpg";
import womenGroup from "@/assets/women-group.jpg";

// Products data
const products = [
  {
    id: "1",
    name: "Farine de sorgho",
    description: "Idéale pour vos recettes traditionnelles",
    image: sorghumFlour
  },
  {
    id: "2",
    name: "Couscous de sorgho",
    description: "Savoureux et nutritif",
    image: sorghumCouscous
  },
  {
    id: "3",
    name: "Pâtes artisanales au sorgho",
    description: "Respectant la tradition et la santé",
    image: sorghumPasta
  }
];

export default function Index() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Mission Section */}
        <section id="mission" className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in [animation-delay:100ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                BioSalim
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Notre mission
                </h2>
                <p className="text-muted-foreground mb-6">
                  Chez BioSalim, notre mission dépasse la simple production agricole. Nous œuvrons pour :
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Autonomiser économiquement les femmes rurales</h3>
                      <p className="text-muted-foreground text-sm">Leur offrir des compétences et un rôle actif dans la coopérative.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Wheat className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Préserver la biodiversité</h3>
                      <p className="text-muted-foreground text-sm">En cultivant le sorgho, une céréale locale résistante à la sécheresse.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Promouvoir une alimentation saine</h3>
                      <p className="text-muted-foreground text-sm">Grâce à des produits 100 % naturels.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:300ms]">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/9e3594aa-e6ab-40a0-841f-f7e70d5c8ce9.png"
                    alt="Ihssane Hamoudane et les membres de la coopérative" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/cce82479-4add-4265-9525-93014a978466.png"
                    alt="Produits BioSalim" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Al Moutmir Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/5 to-white dark:from-primary/10 dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="/lovable-uploads/al-moutmir-temoignages-agriculteurs.png"
                    alt="Témoignages des agriculteurs bénéficiaires" 
                    className="w-full aspect-square rounded-xl shadow-lg object-cover"
                  />
                  <img 
                    src="/lovable-uploads/al-moutmir-formation-femmes.png"
                    alt="Session de formation Al Moutmir avec les femmes" 
                    className="w-full aspect-square rounded-xl shadow-lg object-cover"
                  />
                  <img 
                    src="/lovable-uploads/al-moutmir-travail-terrain.png"
                    alt="Travail sur le terrain Al Moutmir" 
                    className="w-full aspect-square rounded-xl shadow-lg object-cover"
                  />
                  <img 
                    src="/lovable-uploads/al-moutmir-rapport-activite.png"
                    alt="Rapport d'activité Al Moutmir" 
                    className="w-full aspect-square rounded-xl shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="animate-fade-in [animation-delay:200ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  Partenariat
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Al Moutmir – Catalyseur de notre réussite
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    La coopérative BioSalim n'aurait pas atteint son plein potentiel sans l'appui de l'initiative Al Moutmir, un programme dédié à soutenir les initiatives locales à fort impact social. Dès le départ, nous avons rencontré des défis, et leur accompagnement a transformé ces obstacles en opportunités concrètes.
                  </p>
                  <p>
                    Grâce à Al Moutmir, nous avons bénéficié de formations techniques, appris à structurer notre coopérative et améliorer la qualité de nos produits. Les femmes ont ainsi développé leurs compétences et renforcé leur confiance en elles.
                  </p>
                  <p>
                    Le programme nous a également guidés pour commercialiser nos produits et utiliser des plateformes digitales afin d'atteindre de nouveaux marchés. Cet appui a été essentiel pour faire de BioSalim un modèle de développement rural durable.
                  </p>
                </div>
                <blockquote className="mt-8 p-6 bg-white dark:bg-card rounded-lg border-l-4 border-primary shadow-md">
                  <p className="text-lg italic text-foreground mb-3">
                    "Al Moutmir nous a donné les outils, la confiance et le soutien nécessaires pour transformer un rêve en réalité."
                  </p>
                  <cite className="text-primary font-semibold">— Ihssane Hamoudane</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        {/* Founder Video Section */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Rencontrez notre fondatrice
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                L'histoire d'Ihssane Hamoudane
              </h2>
              <p className="text-muted-foreground">
                Découvrez le parcours inspirant de notre fondatrice et sa vision pour l'autonomisation des femmes rurales.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto animate-fade-in [animation-delay:200ms]">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/0XfUlMc1r14?si=U8s9H_j6CS3Hij8L" 
                  title="Rencontre avec Ihssane Hamoudane - Fondatrice BioSalim" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              
              <div className="mt-8 text-center">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "Notre mission va au-delà de la production : c'est transformer des vies et préserver notre patrimoine agricole."
                </blockquote>
                <cite className="text-primary font-semibold">— Ihssane Hamoudane, Fondatrice de BioSalim</cite>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Nos créations
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Nos produits
              </h2>
              <p className="text-muted-foreground">
                Du champ à votre table, nos produits sont transformés avec soin et amour. Découvrez notre gamme :
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="glass-card p-6 rounded-xl text-center animate-fade-in" 
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <blockquote className="text-lg italic text-muted-foreground mb-6 max-w-2xl mx-auto">
                "Chaque produit que nous créons porte l'amour, le savoir-faire et la force des femmes de BioSalim."
              </blockquote>
              <Button asChild className="btn-primary">
                <Link to="/products">
                  Voir nos produits <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Nos résultats
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Notre impact
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center animate-fade-in [animation-delay:100ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">30+</div>
                <h3 className="text-xl font-semibold mb-2">femmes</h3>
                <p className="text-muted-foreground">
                  Plus de 30 femmes rurales gagnent leur indépendance financière et participent activement à la coopérative.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:200ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto">
                  <Package className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <h3 className="text-xl font-semibold mb-2">produits phares</h3>
                <p className="text-muted-foreground">
                  Farine, couscous et pâtes au sorgho, illustrant notre savoir-faire et notre engagement pour une alimentation saine.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:300ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">1</div>
                <h3 className="text-xl font-semibold mb-2">communauté transformée</h3>
                <p className="text-muted-foreground">
                  Chaque récolte et chaque produit vendu contribue à améliorer l'éducation, le transport et le bien-être des villages de la région.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <img 
                src="/lovable-uploads/b44e291a-07af-4019-82b3-718dcc1ac534.png"
                alt="Groupe des femmes de BioSalim avec leurs produits"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-24 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Rejoignez notre mission
              </h2>
              <p className="text-muted-foreground mb-8">
                Découvrez comment vous pouvez soutenir BioSalim et contribuer à l'autonomisation des femmes rurales de Chefchaouen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Découvrir notre histoire</Link>
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