import React, { FC } from 'react';
import { ThemeType } from "../Icon/Icon";
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    style?: React.CSSProperties;
    theme?: ThemeType;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
