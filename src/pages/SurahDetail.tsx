import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchSurahWithTranslation, SurahDetail } from "@/lib/quran-api";
import { ScrollArea } from "@/components/ui/scroll-area";

const SurahDetailPage = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const [arabic, setArabic] = useState<SurahDetail | null>(null);
  const [english, setEnglish] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  useEffect(() => {
    if (surahNumber) {
      loadSurah(parseInt(surahNumber));
    }
  }, [surahNumber]);

  const loadSurah = async (number: number) => {
    setLoading(true);
    try {
      const data = await fetchSurahWithTranslation(number);
      setArabic(data.arabic);
      setEnglish(data.english);
    } catch (error) {
      console.error("Error loading surah:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading Surah...</p>
        </div>
      </div>
    );
  }

  if (!arabic || !english) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Surah not found</p>
        <Link to="/quran" className="text-primary hover:underline mt-4 inline-block">
          Back to Quran
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="glass-effect rounded-3xl p-6 border border-border/30 backdrop-blur-xl">
        <Link
          to="/quran"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quran
        </Link>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">{arabic.englishName}</h1>
            <p className="text-4xl arabic-text">{arabic.name}</p>
          </div>
          <p className="text-muted-foreground">{arabic.englishNameTranslation}</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Surah {arabic.number}</span>
            <span>•</span>
            <span>{arabic.numberOfAyahs} verses</span>
            <span>•</span>
            <span>{arabic.revelationType}</span>
          </div>
        </div>

        {/* Toggle Translation */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="text-sm text-primary hover:underline"
          >
            {showTranslation ? "Hide" : "Show"} Translation
          </button>
        </div>
      </div>

      {/* Bismillah */}
      {arabic.number !== 1 && arabic.number !== 9 && (
        <div className="text-center py-8">
          <p className="text-3xl arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-sm text-muted-foreground mt-2">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      )}

      {/* Ayahs */}
      <ScrollArea className="h-[600px] rounded-3xl">
        <div className="space-y-6 px-4">
          {arabic.ayahs.map((ayah, index) => (
            <div
              key={ayah.number}
              className="glass-effect rounded-2xl p-6 border border-border/30 backdrop-blur-xl space-y-4"
            >
              {/* Arabic Text */}
              <div className="text-right">
                <p className="quran-font text-2xl leading-loose">
                  {ayah.text}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mr-2">
                    {ayah.numberInSurah}
                  </span>
                </p>
              </div>

              {/* English Translation */}
              {showTranslation && english.ayahs[index] && (
                <div className="pt-4 border-t border-border/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {english.ayahs[index].text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        {arabic.number > 1 ? (
          <Link
            to={`/quran/${arabic.number - 1}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold smooth-transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Surah
          </Link>
        ) : (
          <div />
        )}

        {arabic.number < 114 && (
          <Link
            to={`/quran/${arabic.number + 1}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold smooth-transition"
          >
            Next Surah
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SurahDetailPage;
