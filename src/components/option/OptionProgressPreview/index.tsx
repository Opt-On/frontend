import { OptionProgress } from "@/api/audit";
import { Box, Label, ProgressBar, Text } from "@primer/react";
import styles from "@/components/option/OptionProgressPreview/OptionProgressPreview.module.scss";
import { optionMap } from "../OptionProgressOverview";
import Skeleton from "react-loading-skeleton";

export type OptionProgressPreviewProps = {
  optionProgress: OptionProgress;
  isDeclared?: boolean;
  onClick: () => void;
};

export default function OptionProgressPreview({
  optionProgress,
  isDeclared = false,
  onClick,
}: OptionProgressPreviewProps) {
  return (
    <Box className={styles.optionProgressPreview} onClick={onClick} role='button' tabIndex={0}>
      <Box className={styles.header}>
        {optionProgress?.name ? (
          <>
            <Text className={styles.title}>{optionMap[optionProgress.name] + " Option"}</Text>
            {isDeclared && <Label className={styles.declaredLabel}>Declared</Label>}
          </>
        ) : (
          <Skeleton width="325px" height="28px" />
        )}
      </Box>
      <Box>
        {optionProgress?.name ? (
          <>
            <Text className={styles.progressInfo}>
              {optionProgress?.completedRequirements ?? ""} /{" "}
              {optionProgress?.totalRequirements ?? ""} requirements met
            </Text>
          </>
        ) : (
          <Skeleton width="325px" height="14px" />
        )}
        {optionProgress?.name ? (
          <ProgressBar
            className={styles.progressBar}
            progress={
              optionProgress
                ? (optionProgress.completedRequirements / optionProgress.totalRequirements) * 100
                : 0
            }
          />
        ) : (
          <Skeleton width="325px" height="14px" />
        )}
      </Box>
    </Box>
  );
}
