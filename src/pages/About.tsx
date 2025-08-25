import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Lightbulb, Handshake } from "lucide-react";

// Import images
import ihssanePortrait from "@/assets/ihssane-portrait.jpg";
import alMoutmirTraining from "@/assets/al-moutmir-training.jpg";
import womenGroup from "@/assets/women-group.jpg";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                À propos de nous
              </h1>
              <p className="text-muted-foreground text-lg">
                Découvrez l'histoire inspirante de Bio Salim, une coopérative qui transforme la vie des femmes rurales de Chefchaouen.
              </p>
            </div>
          </div>
        </section>

        {/* Histoire Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Notre histoire
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Bio Salim a vu le jour dans les montagnes verdoyantes de Chefchaouen, portée par la vision d'Ihssane Hamoudane et de femmes rurales déterminées à changer leur destin. Face aux défis économiques et sociaux, elles ont uni leurs forces pour créer quelque chose d'extraordinaire.
                  </p>
                  <p>
                    Ce qui a commencé comme un rêve de quelques femmes courageuses est devenu une coopérative florissante qui emploie aujourd'hui plus de 30 femmes rurales. Chaque jour, elles transforment le sorgho local en produits de qualité, préservant les traditions tout en embrassant l'innovation.
                  </p>
                  <p>
                    Notre histoire est celle de la résilience, de la solidarité et de l'espoir. C'est l'histoire de femmes qui ont refusé d'accepter leur situation et qui ont créé leur propre chemin vers l'indépendance économique.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:200ms]">
                <img 
                  src="/lovable-uploads/1fc29e4f-f7af-41d8-8b5d-7f7ea6b754dc.png"
                  alt="Produits Bio Salim - épices et farines de sorgho"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Valeurs */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Mission & Valeurs
              </h2>
              <p className="text-muted-foreground">
                Les principes qui guident chacune de nos actions et décisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in [animation-delay:100ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Autonomisation</h3>
                <p className="text-muted-foreground">
                  Donner aux femmes rurales les moyens de leur indépendance économique et sociale.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:200ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Solidarité</h3>
                <p className="text-muted-foreground">
                  Créer des liens forts entre les membres de la coopérative et la communauté.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:300ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Allier tradition et modernité pour créer des produits d'exception.
                </p>
              </div>
              
              <div className="text-center animate-fade-in [animation-delay:400ms]">
                <div className="mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Durabilité</h3>
                <p className="text-muted-foreground">
                  Préserver l'environnement et assurer un avenir durable pour nos communautés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partenaires Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative animate-fade-in">
                <img 
                  src="/lovable-uploads/ef81f48f-ae87-409d-af7e-1b6df7379252.png"
                  alt="Partenariat avec Al Moutmir"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="animate-fade-in [animation-delay:200ms]">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Nos partenaires
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Al Moutmir</strong> a été notre partenaire clé dès le début de cette aventure. Cette initiative nous a accompagnés dans structurer notre coopérative, former nos membres et développer nos compétences commerciales.
                  </p>
                  <p>
                    Grâce à leur soutien, nous avons pu accéder à des formations techniques, améliorer la qualité de nos produits et apprendre à utiliser les outils digitaux pour atteindre de nouveaux marchés.
                  </p>
                  <p>
                    Cette collaboration illustre parfaitement comment les partenariats peuvent transformer des défis en opportunités concrètes et durables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre équipe */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Notre équipe
              </h2>
              <p className="text-muted-foreground">
                Plus de 30 femmes talentueuses qui donnent vie à Bio Salim chaque jour.
              </p>
            </div>
            
            <div className="text-center mb-8">
              <img 
                src="/lovable-uploads/b44e291a-07af-4019-82b3-718dcc1ac534.png"
                alt="L'équipe de Bio Salim"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                Chaque membre de notre équipe apporte sa passion, son savoir-faire et sa détermination pour faire de Bio Salim une réussite collective. Ensemble, nous cultivons non seulement le sorgho, mais aussi l'espoir et l'avenir.
              </p>
              <Button asChild className="btn-primary">
                <Link to="/contact">
                  Rejoindre notre mission <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}