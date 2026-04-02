import { Card } from '../../../components/ui/Card';
import type { ICategoryBreakdown } from '@/types';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_META } from '../../../constants/categories';

interface CustomizedContentProps {
  root?: { children?: unknown[] };
  depth?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
  fill?: string;
}

const CustomizedContent = (props: CustomizedContentProps) => {
  const { x, y, width, height, name, fill } = props;
  
  if (!width || !height || width < 40 || height < 40) return null;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke="var(--color-surface)" strokeWidth={2} />
      <text x={(x || 0) + (width || 0) / 2} y={(y || 0) + (height || 0) / 2} textAnchor="middle" fill="#fff" fontSize={12} className="font-medium outline-none">
        {name}
      </text>
    </g>
  );
};

export function SpendingHeatmap({ data, isLoading }: { data: ICategoryBreakdown[], isLoading: boolean }) {
  const chartData = data.map(d => ({
    name: CATEGORY_META[d.category]?.label || d.category,
    size: d.amount,
    fill: CATEGORY_META[d.category]?.color || 'var(--color-outline-variant)'
  }));

  return (
    <Card className="w-full h-[500px]">
      <h2 className="text-lg font-heading font-medium mb-6">Spending Heatmap</h2>
      <div className="w-full h-[400px]">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-surface-variant/50 rounded-lg"></div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={chartData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              content={<CustomizedContent />}
            >
              <Tooltip formatter={(value: number | string | readonly (string | number)[] | undefined) => `$${value}`} />
            </Treemap>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
