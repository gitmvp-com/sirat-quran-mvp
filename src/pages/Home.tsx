import { Link } from "react-router-dom";
import { Book, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const getSurahOfTheDay = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return (dayOfYear % 114) + 1;
};

const Home = () => {
  const [surahOfDay, setSurahOfDay] = useState<any>(null);

  useEffect(() => {
    const fetchSurahOfDay = async () => {
      const surahNumber = getSurahOfTheDay();
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}`
        );
        const data = await response.json();
        if (data.code === 200) {
          setSurahOfDay({
            number: data.data.number,
            name: data.data.name,
            englishName: data.data.englishName,
            englishNameTranslation: data.data.englishNameTranslation,
            numberOfAyahs: data.data.numberOfAyahs,
          });
        }
      } catch (error) {
        console.error("Error fetching Surah of the Day:", error);
      }
    };

    fetchSurahOfDay();
  }, []);

  return (
    <div className="min-h-[calc(100vh-12rem)] pb-8">
      <div className="w-full max-w-4xl mx-auto px-4 space-y-12">
        {/* Hero Section */}
        <div className="relative pt-12 pb-8 animate-fade-in">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

          <div className="relative text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wider">
                بسم الله الرحمن الرحيم
              </span>
            </div>

            <div className="relative">
              <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-primary to-foreground bg-clip-text text-transparent drop-shadow-sm">
                  Sirat
                </span>
              </h1>
              <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 -z-10" />
            </div>

            <p className="text-base text-muted-foreground font-light tracking-wide">
              Read. Reflect. Remember.
            </p>
          </div>
        </div>

        {/* Surah of the Day */}
        {surahOfDay && (
          <div className="space-y-2.5 -mt-4">
            <Link
              to={`/quran/${surahOfDay.number}`}
              className="block group animate-fade-in"
            >
              <div className="glass-effect rounded-3xl p-3.5 border border-border/30 hover:border-primary/30 smooth-transition backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        Surah of the Day
                      </p>
                      <h3 className="text-sm font-bold leading-tight">
                        {surahOfDay.englishName} ({surahOfDay.number})
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {surahOfDay.englishNameTranslation}
                      </p>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-primary/40">
                    {surahOfDay.number}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* CTA to Quran */}
        <div className="flex flex-col items-center gap-6 pt-6">
          <Link
            to="/quran"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold shadow-lg hover:shadow-xl smooth-transition hover:scale-105 active:scale-95"
          >
            <Book className="h-5 w-5" />
            Browse All Surahs
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 pt-6">
          {[
            { value: "114", label: "Surahs" },
            { value: "6,236", label: "Verses" },
            { value: "30", label: "Juz" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center glass-effect rounded-2xl p-3 border border-border/20 hover:border-border/40 smooth-transition"
            >
              <div className="text-2xl font-bold bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-0.5">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
