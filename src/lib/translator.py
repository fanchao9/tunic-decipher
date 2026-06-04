import cmudict

d = cmudict.dict()

PHONEME_TYPES = {
    # Consonants
    'B': 'C', 'CH': 'C', 'D': 'C', 'DH': 'C', 'F': 'C', 'G': 'C', 'HH': 'C',
    'JH': 'C', 'K': 'C', 'L': 'C', 'M': 'C', 'N': 'C', 'NG': 'C', 'P': 'C',
    'R': 'C', 'S': 'C', 'SH': 'C', 'T': 'C', 'TH': 'C', 'V': 'C', 'W': 'C',
    'Y': 'C', 'Z': 'C', 'ZH': 'C',
    # Vowels
    'AA': 'V', 'AE': 'V', 'AH': 'V', 'AO': 'V', 'AW': 'V', 'AY': 'V', 'EH': 'V',
    'ER': 'V', 'EY': 'V', 'IH': 'V', 'IY': 'V', 'OW': 'V', 'OY': 'V', 'UH': 'V',
    'UW': 'V', 'YUW': 'V'
}

class TrunicGlyph:
    def __init__(self, consonant=None, vowel=None, invert=False):
        self.consonant = consonant  # Inner lines
        self.vowel = vowel          # Outer lines
        self.invert = invert       

    def __repr__(self):
        order = "Vowel->Consonant" if self.invert else "Consonant->Vowel"
        return f"[Glyph: C={self.consonant}, V={self.vowel} ({order})]"

def english_to_phonemes(word):
    word = word.lower().strip()
    if word in d:
        raw_phonemes = d[word][0]
        clean_phonemes = [''.join([i for i in ph if not i.isdigit()]) for ph in raw_phonemes]
        return clean_phonemes
    else:
        return None

def build_trunic_glyphs(phonemes):
    glyphs = []
    i = 0
    while i < len(phonemes):
        current_ph = phonemes[i]
        current_type = PHONEME_TYPES.get(current_ph)

        next_ph = phonemes[i+1] if i + 1 < len(phonemes) else None
        next_type = PHONEME_TYPES.get(next_ph) if next_ph else None

        # Case 1: Consonant followed by Vowel (Standard Tunic Glyph)
        if current_type == 'C' and next_type == 'V':
            glyphs.append(TrunicGlyph(consonant=current_ph, vowel=next_ph, invert=False))
            i += 2
        # Case 2: Vowel followed by Consonant (Inverted Glyph - features the bottom circle)
        elif current_type == 'V' and next_type == 'C':
            glyphs.append(TrunicGlyph(consonant=next_ph, vowel=current_ph, invert=True))
            i += 2
        # Case 3: Lone Consonant
        elif current_type == 'C':
            glyphs.append(TrunicGlyph(consonant=current_ph, vowel=None, invert=False))
            i += 1
        # Case 4: Lone Vowel
        elif current_type == 'V':
            glyphs.append(TrunicGlyph(consonant=None, vowel=current_ph, invert=False))
            i += 1
        else:
            i += 1

    return glyphs

#test
word_to_translate = "Diamond"
phonemes = english_to_phonemes(word_to_translate)

print(f"English Word: {word_to_translate}")
print(f"Phonetic Spoken Sound: {phonemes}")

if phonemes:
    trunic_layout = build_trunic_glyphs(phonemes)
    print("\n--- Generated Trunic Glyph Map ---")
    for idx, glyph in enumerate(trunic_layout):
        print(f"Rune {idx + 1}: {glyph}")