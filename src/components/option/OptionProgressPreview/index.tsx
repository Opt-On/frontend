import { OptionProgress } from "@/api/audit";
import { Box, Label, ProgressBar, Text } from "@primer/react";
import styles from "@/components/option/OptionProgressPreview/OptionProgressPreview.module.scss";

export type OptionProgressPreviewProps = {
  optionProgress: OptionProgress;
  isDeclared?: boolean;
};

export default function OptionProgressPreview({
  optionProgress,
  isDeclared = false,
}: OptionProgressPreviewProps) {
  return (
    <Box className={styles.optionProgressPreview}>
      <Box className={styles.header}>
        <Text className={styles.title}>{optionProgress?.name ?? ""}</Text>
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
