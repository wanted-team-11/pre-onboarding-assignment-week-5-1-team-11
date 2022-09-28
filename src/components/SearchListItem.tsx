import styled from "styled-components";

function SearchListItem({
  searchKeyword,
  result,
}: {
  searchKeyword: string;
  result: any;
}) {
  return (
    <StyledSpan
      dangerouslySetInnerHTML={{
        __html: result.trim().replace(searchKeyword, `<b>${searchKeyword}</b>`),
      }}
    />
  );
}

export default SearchListItem;

const StyledSpan = styled.span``;
