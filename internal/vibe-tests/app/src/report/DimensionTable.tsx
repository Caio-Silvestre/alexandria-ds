// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Table} from '@pharos-ds/core/Table';
import {StatusDot} from '@pharos-ds/core/StatusDot';
import {HStack} from '@pharos-ds/core/Stack';
import {Text} from '@pharos-ds/core/Text';
import type {TableColumn} from '@pharos-ds/core/Table';
import type {UniversalScore} from './types';
import {
  ALL_DIMENSIONS,
  DIMENSION_LABELS,
  computeOverall,
  formatScore,
  scoreToStatusVariant,
} from './utils';

interface DimensionTableProps {
  byPrompt: Record<string, UniversalScore>;
}

interface RowData extends Record<string, unknown> {
  id: string;
  promptId: string;
  correctness: number;
  accessibility: number;
  codeQuality: number;
  efficiency: number;
  maintainability: number;
  design: number;
  overall: number;
}

function ScoreCell({score}: {score: number}) {
  return (
    <HStack gap={1} hAlign="center">
      <StatusDot
        variant={scoreToStatusVariant(score)}
        label={`Score: ${formatScore(score)}`}
        size="sm"
      />
      <Text type="body">{formatScore(score)}</Text>
    </HStack>
  );
}

export function DimensionTable({byPrompt}: DimensionTableProps) {
  const data: RowData[] = Object.entries(byPrompt).map(([promptId, score]) => ({
    id: promptId,
    promptId,
    correctness: score.correctness.score,
    accessibility: score.accessibility.score,
    codeQuality: score.codeQuality.score,
    efficiency: score.efficiency.score,
    maintainability: score.maintainability.score,
    design: score.design?.score ?? 0,
    overall: computeOverall(score),
  }));

  const columns: TableColumn<RowData>[] = [
    {
      key: 'promptId',
      header: 'Prompt',
      renderCell: row => <Text type="body">{row.promptId}</Text>,
    },
    ...ALL_DIMENSIONS.map(
      (dim): TableColumn<RowData> => ({
        key: dim,
        header: DIMENSION_LABELS[dim],
        renderCell: row => <ScoreCell score={row[dim] as number} />,
      }),
    ),
    {
      key: 'overall',
      header: 'Overall',
      renderCell: row => <ScoreCell score={row.overall} />,
    },
  ];

  return (
    <Table<RowData>
      data={data}
      columns={columns}
      idKey="id"
      density="compact"
      dividers="rows"
      isStriped
    />
  );
}
