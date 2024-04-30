export const fetchWord = async (word: string) => {
  if (!word) throw new Error("No location provided");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MW_URL}/${word}?key=${process.env.NEXT_PUBLIC_MW_API_KEY}`
  );
  const data = await response.json();
  return data;
};
