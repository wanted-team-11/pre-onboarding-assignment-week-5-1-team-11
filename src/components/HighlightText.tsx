import React from "react";

interface TextProps {
  sickNm: string;
  searchValue: string;
}

const HighlightText = ({ sickNm, searchValue }: TextProps) => {
  return (
    <>
      {sickNm.includes(searchValue) && searchValue.length > 0 ? (
        <>
          {sickNm.split(searchValue)[0]}
          <strong>{searchValue}</strong>
          {sickNm.split(searchValue)[1]}
        </>
      ) : (
        sickNm
      )}
    </>
  );
};

export default HighlightText;
