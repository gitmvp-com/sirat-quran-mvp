const API_BASE = "https://api.alquran.cloud/v1";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${API_BASE}/surah`);
  const data = await response.json();
  if (data.code === 200) {
    return data.data;
  }
  throw new Error("Failed to fetch surahs");
};

export const fetchSurahDetail = async (surahNumber: number): Promise<SurahDetail> => {
  const response = await fetch(`${API_BASE}/surah/${surahNumber}`);
  const data = await response.json();
  if (data.code === 200) {
    return data.data;
  }
  throw new Error("Failed to fetch surah detail");
};

export const fetchSurahWithTranslation = async (
  surahNumber: number
): Promise<{ arabic: SurahDetail; english: SurahDetail }> => {
  const [arabic, english] = await Promise.all([
    fetchSurahDetail(surahNumber),
    fetch(`${API_BASE}/surah/${surahNumber}/en.asad`).then((r) => r.json()),
  ]);

  if (english.code === 200) {
    return { arabic, english: english.data };
  }

  throw new Error("Failed to fetch translations");
};
