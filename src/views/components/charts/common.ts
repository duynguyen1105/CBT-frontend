import { createStyles } from "@mantine/core";

export const useChartStyle = createStyles<string, {}>(() => ({
  root: {
    width: '100%',
    height: '100%'
  }
}));

export function useCommonChartStyle() {
  return useChartStyle({}, { name: 'Chart' });
}
