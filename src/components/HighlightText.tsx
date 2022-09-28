interface HighlightTextProps {
  keyword: string;
  sickNm: string;
}
const HighlightText = ({ keyword, sickNm }: HighlightTextProps) => {
  if (!keyword.trim()) {
    return <span>{sickNm}</span>;
  }
  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = sickNm.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, index) => {
        return regex.test(part) ? (
          <strong key={index}>{part}</strong>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default HighlightText;
