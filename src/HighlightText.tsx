import * as S from "./styles/SearchStyle";

interface TextProps {
  sickNm: string;
  searchData: string;
  children?: any;
}

const HighlightText = ({ sickNm, searchData }: TextProps) => {
  return (
    <>
      <S.SearchText>
        {sickNm.includes(searchData) && searchData.length > 0 ? (
          <>
            {sickNm.split(searchData)[0]}
            <S.StrongText>{searchData}</S.StrongText>
            {sickNm.split(searchData)[1]}
          </>
        ) : (
          sickNm
        )}
      </S.SearchText>
    </>
  );
};
export default HighlightText;
