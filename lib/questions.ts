/**
 * 画像は public/cards/。
 * correctCardId: この問題で取る札のID。
 * answer: 入力欄に打ち込む答え
 */

export type Card = { id: string; image: string; label: string };

export type Question = {
  id: string;
  readingImage: string;
  correctImage: string;
  prompt: string;
  correctAnswers: { cardId: string; answers: string[] }[];
  modalImages?: Record<string, string>;
};


// 全問題で同じ取り札を使用します。並び順もここで指定します。
export const cards: Card[] = [
  { id: "a", image: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421104/A.jpg", label: "取り札 A" },
  { id: "b", image: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421270/B.jpg", label: "取り札 B" },
  { id: "c", image: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421270/C.jpg", label: "取り札 C" },
  { id: "d", image: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421270/D.jpg", label: "取り札 D" },
  { id: "e", image: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421271/E.jpg", label: "取り札 E" },
  { id: "f", image: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421270/F.jpg", label: "取り札 F" },
];

export const questions: Question[] = [
  {
    id: "q1",
    readingImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421501/1Q.jpg",
    correctImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421539/1_D.jpg",
    prompt: "第1問",

    correctAnswers: [
      {
        cardId: "d",
        answers: ["ほしがき", "干し柿", "干しがき", "ほし柿", "干柿", "ホシガキ"],
      },
    ],

    modalImages: {
      a: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421536/1_A.jpg",
      b: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421537/1_B.jpg",
      c: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421538/1_C.jpg",
      d: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421539/1_D.jpg",
      e: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421540/1_E.jpg",
      f: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421541/1_F.jpg",
      T: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421542/1_T.jpg"
    },
  },

  {
    id: "q2",
    readingImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421502/2Q.jpg",
    correctImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421550/2_A.jpg",
    prompt: "第2問",

    correctAnswers: [
      {
        cardId: "a",
        answers: ["もみじ", "紅葉", "もみぢ", "モミジ"],
      },
    ],

    modalImages: {
      a: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421550/2_A.jpg",
      b: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421549/2_B.jpg",
      c: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421552/2_C.jpg",
      d: "/cards/Q/2/2_D.jpg",
      e: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421552/2_E.jpg",
      f: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421554/2_F.jpg",
      T: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421555/2_T.jpg"
    },
  },

  {
    id: "q3",
    readingImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421504/3Q.jpg",
    correctImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421564/3_F.jpg",
    prompt: "第3問",

    correctAnswers: [
      {
        cardId: "f",
        answers: ["した", "舌", "シタ"],
      },
    ],

    modalImages: {
      a: "/cards/Q/3/3_A.jpg",
      b: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421561/3_B.jpg",
      c: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421560/3_C.jpg",
      d: "/cards/Q/3/3_D.jpg",
      e: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421562/3_E.jpg",
      f: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421564/3_F.jpg",
      T: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793422108/3_T.jpg"
    },
  },

  {
    id: "q4",
    readingImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421502/4Q.jpg",
    correctImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421568/4_B.jpg",
    prompt: "第4問",

    correctAnswers: [
      {
        cardId: "b",
        answers: ["正四面体", "せいしめんたい", "セイシメンタイ"],
      },
    ],

    modalImages: {
      a: "/cards/Q/4/4_A.jpg",
      b: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421568/4_B.jpg",
      c: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421570/4_C.jpg",
      d: "/cards/Q/4/4_D.jpg",
      e: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421569/4_E.jpg",
      f: "/cards/Q/4/4_F.jpg",
      T: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421571/4_T.jpg"
    },
  },

  {
    id: "q5",
    readingImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421504/5Q.jpg",
    correctImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421577/5_E.jpg",
    prompt: "第5問",

    correctAnswers: [
      {
        cardId: "e",
        answers: ["村", "むら", "そん", "ムラ", "ソン"],
      },
    ],

    modalImages: {
      a: "/cards/Q/5/5_A.jpg",
      b: "/cards/Q/5/5_B.jpg",
      c: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421576/5_C.jpg",
      d: "/cards/Q/5/5_D.jpg",
      e: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421577/5_E.jpg",
      f: "/cards/Q/5/5_F.jpg",
      T: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421578/5_T.jpg"
    },
  },

  {
    id: "q6",
    readingImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421505/6Q.jpg",
    correctImage: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421586/6_C.jpg",
    prompt: "第6問",

    correctAnswers: [
      {
        cardId: "c",
        answers: ["招待状", "しょうたいじょう", "ショウタイジョウ"],
      },
    ],

    modalImages: {
      a: "/cards/Q/6/6_A.jpg",
      b: "/cards/Q/6/6_B.jpg",
      c: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421586/6_C.jpg",
      d: "/cards/Q/6/6_D.jpg",
      e: "/cards/Q/6/6_E.jpg",
      f: "/cards/Q/6/6_F.jpg",
      T: "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421585/6_T.jpg"
    },
  }
];