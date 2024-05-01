type TUserWordMeta = {
  id: string;
  userId: string;
  wordId: string;
  views: number;
  daily: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export { TUserWordMeta };
