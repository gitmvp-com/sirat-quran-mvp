import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";
import { fetchSurahs, Surah } from "@/lib/quran-api";

const Quran = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    setLoading(true);
    try {
      const data = await fetchSurahs();
      setSurahs(data);
    } catch (error) {
      console.error("Error loading surahs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading Quran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="text-center space-y-4 py-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-br from-foreground via-primary to-foreground bg-clip-text text-transparent drop-shadow-sm">
            The Holy Quran
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          Select a surah to read
        </p>
      </div>

      <div className="space-y-3 px-4">
        {surahs.map((surah) => (
          <Link key={surah.number} to={`/quran/${surah.number}`} className="block">
            <div className="glass-effect rounded-3xl p-6 md:p-8 smooth-transition hover:scale-[1.01] apple-shadow hover:shadow-2xl border border-border/30 hover:border-primary/30 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-lg">
                    {surah.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-semibold">{surah.englishName}</h3>
                    <Book className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {surah.englishNameTranslation}
                  </p>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{surah.numberOfAyahs} verses</span>
                    <span>•</span>
                    <span>{surah.revelationType}</span>
                  </div>
                </div>

                <div className="hidden md:block text-right">
                  <p className="text-2xl arabic-text font-semibold">{surah.name}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quran;
