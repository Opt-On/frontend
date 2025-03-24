import { useAuth } from "@/context/AuthContext";
import { Box, Link, Text } from "@primer/react";
import { OptionSubheaderInfo } from "./OptionProgressDetailed";

export default function OptionInfoSubheader({
  optionInfo,
}: {
  optionInfo: OptionSubheaderInfo;
}) {
  const { userInfo } = useAuth();

  const fullOptionName = `${optionInfo} Option`;

  const declared =
    userInfo && userInfo.optionNames && fullOptionName in userInfo.optionNames;

  const coordName = optionInfo.coordinator.split(",")[0];
  const coordExtra = optionInfo.coordinator.split(",")[1];
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      width="100%"
      padding="1rem 3rem"
      sx={{ gap: "1rem" }}
    >
      <Box>
        <Text as="h5" weight="semibold">
          Status
        </Text>
        <Text as="h5" weight="light">
          {declared ? "Declared" : "Undeclared"}
        </Text>
      </Box>
      <Box>
        <Text as="h5" weight="semibold">
          Grade Requirements
        </Text>
        <Text as="h5" weight="light">
          {optionInfo.minGrade}
        </Text>
      </Box>

      <Box>
        <Text as="h5" weight="semibold">
          Option Coordinator
        </Text>
        <span>
          <Link href={`mailto:${optionInfo.email}`}>
            <Text as="h5" weight="light">
              {coordName}
            </Text>
          </Link>
          <Text as="h5" weight="light">
            {coordExtra}
          </Text>
        </span>
      </Box>
    </Box>
  );
}
