import { Box, Text } from "@primer/react";
import { useCallback, useState } from "react";
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
  const [selected, setSelected] = useState("Choose an option");
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(event.target.value);
      setOptionSelected(event.target.value);
    },
    [] // Empty dependency array means the callback won't change unless the component is re-mounted
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      marginTop="1rem"
    >
      {/* primers select buggy mess, will deal with later*/}
      <select
        id="menu"
        value={selected}
        onChange={(e) => handleSelectChange(e)}
        className="select-button"
      >
        <option className="select-option" value="default" hidden>
          Choose an option
        </option>
        <option className="select-option" value="Management Science">
          Management Science
        </option>
        <option className="select-option" value="Computing">
          Computing Option
        </option>
        <option className="select-option" value="Water">
          Water
        </option>
      </select>

      {optionSelected ? (
        <OptionProgressDetailed />
      ) : (
        <>
          <Text weight="light" marginTop="12rem" as="h4">
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
