import { OptionProgress } from "@/api/audit";
import styles from "@/components/option/OptionProgressPreview/OptionProgressPreview.module.scss";
import { useAuth } from "@/context/AuthContext";
import { Box, Label, ProgressBar, Text } from "@primer/react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { optionMap } from "../OptionProgressOverview";

export type OptionProgressPreviewProps = {
  optionProgress: OptionProgress;
  onClick: () => void;
};

export default function OptionProgressPreview({
  optionProgress,
  onClick,
}: OptionProgressPreviewProps) {
  const { userInfo } = useAuth();
  const [isDeclared, setIsDeclared] = useState(false);

  useEffect(() => {
    if (userInfo && optionProgress) {
      setIsDeclared(
        userInfo.optionNames &&
          userInfo.optionNames.includes(
            optionMap[optionProgress.name] + " Option"
          )
      );
    }
  }, [userInfo, optionProgress]);

  if (!userInfo) {
    return <Skeleton className={styles.skeletonTitle} />;
  }

  return (
    <Box
      className={styles.optionProgressPreview}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Box className={styles.header}>
        {optionProgress?.name ? (
          <>
            <Text className={styles.title}>
              {optionMap[optionProgress.name] + " Option"}
            </Text>
            {isDeclared && (
              <Label className={styles.declaredLabel}>Declared</Label>
            )}
          </>
        ) : (
          <Skeleton className={styles.skeletonTitle} />
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
          <Skeleton className={styles.skeletonText} />
        )}
        {optionProgress?.name ? (
          <ProgressBar
            className={styles.progressBar}
            progress={
              optionProgress
                ? (optionProgress.completedRequirements /
                    optionProgress.totalRequirements) *
                  100
                : 0
            }
          />
        ) : (
          <Skeleton className={styles.skeletonText} />
        )}
      </Box>
    </Box>
  );
}
