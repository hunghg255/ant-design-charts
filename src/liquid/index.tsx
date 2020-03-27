import React, { useContext, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Liquid as G2plotLiquid, LiquidConfig as G2plotProps } from '@antv/g2plot';
import useChart from '../hooks/useChart';
import { ConfigContext, ErrorBoundary } from '../base';

export interface LiquidConfig extends G2plotProps {
  chartRef?: React.MutableRefObject<G2plotLiquid | undefined>;
  chartStyle?: React.CSSProperties;
  className?: string;
}

const LiquidChart = forwardRef((props: LiquidConfig, ref) => {
  const config = useContext(ConfigContext);
  const { chartRef, chartStyle = {}, className, ...rest } = Object.assign(config, props);

  const { chart, container } = useChart<G2plotLiquid, LiquidConfig>(G2plotLiquid, rest);

  useEffect(() => {
    if (chartRef) {
      chartRef.current = chart.current;
    }
  }, [chart.current]);
  useImperativeHandle(ref, () => ({
    getChart: () => chart.current,
  }));
  return (
    <ErrorBoundary>
      <div className={className} style={chartStyle} ref={container} />
    </ErrorBoundary>
  );
});

LiquidChart.defaultProps = G2plotLiquid.getDefaultOptions();

export default LiquidChart;
