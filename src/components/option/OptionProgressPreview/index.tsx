import { OptionProgress } from "@/api/audit";
import { Box, Label, ProgressBar, Text } from "@primer/react";
import styles from "@/components/option/OptionProgressPreview/OptionProgressPreview.module.scss";
import { optionMap } from "../OptionProgressOverview";

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
    <Box className={styles.optionProgressPreview} onClick={onClick} role="button" tabIndex={0}>
      <Box className={styles.header}>
        <Text className={styles.title}>{optionProgress?.name ? optionMap[optionProgress.name] + " Option" : ""}</Text>
        {isDeclared && <Label className={styles.declaredLabel}>Declared</Label>}
      </Box>
      <Box>
        <Text className={styles.progressInfo}>
          {optionProgress?.completedRequirements ?? ""} / {optionProgress?.totalRequirements ?? ""}{" "}
          requirements met
        </Text>
        <ProgressBar
          className={styles.progressBar}
          progress={
            optionProgress
              ? (optionProgress.completedRequirements / optionProgress.totalRequirements) * 100
              : 0
          }
        />
      </Box>
    </Box>
  );
}
