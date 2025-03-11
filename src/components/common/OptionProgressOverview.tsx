import { Box, Text } from "@primer/react";
import { useCallback, useState } from "react";
import ActionSelect from "../ActionSelect";
import OptionProgressDetailed from "./OptionProgressDetailed";
import OptionProgressPreview from "./OptionProgressPreview";

// const Select = styled.select`
//   padding: 8px;
//   border-radius: 6px;
//   border: 1px solid #656d76;
//   color: #656d76;
//   background-color: #fff;
//   width: 25%;
//   font-size: 16px;
//   cursor: pointer;

//   &:focus {
//     border-color: black;
//     outline: none;
//   }
// `;

// const Option = styled.option`
//   padding: 10px;
//   font-size: 16px;
// `;

export default function OptionProgressOverview() {
  const [selected, setSelected] = useState(-1);
  // const [isMainPage, setIsMainPage] = useState(true);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optionList = [
    "Artificial Intelligence",
    "Biomechanics",
    "Computer Engineering",
    "Computing",
    "Entrepreneurship",
    "Environmental Engineering",
    "Life Sciences",
    "Management Science",
    "Mechatronics",
    "Physical Sciences",
    "Quantum Engineering",
    "Software Engineering",
    "Statistics",
  ];

  const handleSelectChange = useCallback(
    (index: number) => {
      setSelected(index);
      setOptionSelected(optionList[index]);
    },
    [optionList]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      // marginTop="1rem"
    >
      <Text
        as="h1"
        marginTop={selected == -1 ? "6rem" : "2rem"}
        weight="light"
        style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}
      >
        What option are you interested in?
      </Text>
      <Text as="h3" weight="light" marginTop="0.25rem">
        Select from available options to see more details
      </Text>
      {/* primers select buggy mess, will deal with later*/}
      <Box marginTop="1rem">
        <ActionSelect
          optionList={optionList}
          selected={selected}
          handleSetSelected={handleSelectChange}
        />
      </Box>

      {optionSelected ? (
        <OptionProgressDetailed />
      ) : (
        <>
          <Text weight="light" marginTop="8rem" as="h4">
            Options you&lsquo;ve made progress towards{" "}
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            sx={{ gap: "2rem" }}
            marginTop="3rem"
          >
            <OptionProgressPreview isDeclared={true} />
            <OptionProgressPreview isDeclared={false} />
            <OptionProgressPreview isDeclared={false} />
          </Box>
        </>
      )}
    </Box>
  );
}
