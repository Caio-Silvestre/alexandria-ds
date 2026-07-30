// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card} from '@pharos-ds/core/Card';
import {VStack} from '@pharos-ds/core/Stack';
import {Text} from '@pharos-ds/core/Text';
import {Heading} from '@pharos-ds/core/Text';
import {Badge} from '@pharos-ds/core/Badge';
import {Table} from '@pharos-ds/core/Table';
import type {TableColumn} from '@pharos-ds/core/Table';
import type {
  UniversalComparison,
  UniversalDimension,
  CostMetrics,
} from './types';
import {
  ALL_DIMENSIONS,
  CODE_DIMENSIONS,
  DIMENSION_LABELS,
  formatScore,
} from './utils';
import './report.css';

type WinnerType = 'pharos' | 'pharos-tailwind' | 'baseline' | 'html' | 'tie';

interface CompareViewProps {
  comparison: UniversalComparison;
}

interface DimRow extends Record<string, unknown> {
  id: string;
  dimension: string;
  pharosScore: number;
  baselineScore: number;
  htmlScore?: number;
  pharosTailwindScore?: number;
  delta: number;
  winner: string;
}

interface CatRow extends Record<string, unknown> {
  id: string;
  category: string;
  pharosOverall: number;
  baselineOverall: number;
  htmlOverall?: number;
  pharosTailwindOverall?: number;
  delta: number;
}

interface CostRow extends Record<string, unknown> {
  id: string;
  metric: string;
  pharos: string;
  baseline: string;
  html?: string;
  pharosTailwind?: string;
  winner: string;
}

function costWinner(
  pharosVal: number,
  baseVal: number,
  lowerIsBetter: boolean,
  htmlVal?: number,
  twVal?: number,
): WinnerType {
  const entries: [WinnerType, number][] = [
    ['pharos', pharosVal],
    ['baseline', baseVal],
  ];
  if (htmlVal != null) {
    entries.push(['html', htmlVal]);
  }
  if (twVal != null) {
    entries.push(['pharos-tailwind', twVal]);
  }

  const best = lowerIsBetter
    ? Math.min(...entries.map(([, v]) => v))
    : Math.max(...entries.map(([, v]) => v));
  const atBest = entries.filter(([, v]) => v === best);
  if (atBest.length > 1) {
    return 'tie';
  }
  return atBest[0][0];
}

function winnerBadgeVariant(
  w: string,
): 'success' | 'error' | 'warning' | 'neutral' | 'info' {
  switch (w) {
    case 'pharos':
      return 'success';
    case 'baseline':
      return 'error';
    case 'html':
      return 'warning';
    case 'pharos-tailwind':
      return 'info';
    default:
      return 'neutral';
  }
}

function winnerLabel(w: string): string {
  switch (w) {
    case 'pharos':
      return 'Pharos';
    case 'baseline':
      return 'Baseline';
    case 'html':
      return 'HTML';
    case 'pharos-tailwind':
      return 'Pharos+TW';
    default:
      return 'Tie';
  }
}

function deltaClassName(delta: number): string {
  if (delta > 0) {
    return 'report-color-positive';
  }
  if (delta < 0) {
    return 'report-color-negative';
  }
  return 'report-color-neutral';
}

function CostComparisonSection({
  pharosCost,
  baselineCost,
  htmlCost,
  pharosTailwindCost,
}: {
  pharosCost: CostMetrics;
  baselineCost: CostMetrics;
  htmlCost?: CostMetrics;
  pharosTailwindCost?: CostMetrics;
}) {
  const isThreeWay = !!htmlCost;
  const isFourWay = !!pharosTailwindCost;
  const hasDuration =
    pharosCost.avgDurationMs > 0 || baselineCost.avgDurationMs > 0;

  const costData: CostRow[] = [
    ...(hasDuration
      ? [
          {
            id: 'duration',
            metric: 'Avg Duration',
            pharos: `${(pharosCost.avgDurationMs / 1000).toFixed(1)}s`,
            baseline: `${(baselineCost.avgDurationMs / 1000).toFixed(1)}s`,
            ...(isThreeWay
              ? {html: `${((htmlCost?.avgDurationMs ?? 0) / 1000).toFixed(1)}s`}
              : {}),
            ...(isFourWay
              ? {
                  pharosTailwind: `${((pharosTailwindCost?.avgDurationMs ?? 0) / 1000).toFixed(1)}s`,
                }
              : {}),
            winner: costWinner(
              pharosCost.avgDurationMs,
              baselineCost.avgDurationMs,
              true,
              htmlCost?.avgDurationMs,
              pharosTailwindCost?.avgDurationMs,
            ),
          },
        ]
      : []),
    {
      id: 'input-tokens',
      metric: 'Input Tokens',
      pharos: `~${pharosCost.estimatedInputTokens.toLocaleString()}`,
      baseline: `~${baselineCost.estimatedInputTokens.toLocaleString()}`,
      ...(isThreeWay
        ? {html: `~${htmlCost?.estimatedInputTokens.toLocaleString()}`}
        : {}),
      ...(isFourWay
        ? {
            pharosTailwind: `~${pharosTailwindCost?.estimatedInputTokens.toLocaleString()}`,
          }
        : {}),
      winner: costWinner(
        pharosCost.estimatedInputTokens,
        baselineCost.estimatedInputTokens,
        true,
        htmlCost?.estimatedInputTokens,
        pharosTailwindCost?.estimatedInputTokens,
      ),
    },
    {
      id: 'output-tokens',
      metric: 'Output Tokens',
      pharos: `~${pharosCost.estimatedOutputTokens.toLocaleString()}`,
      baseline: `~${baselineCost.estimatedOutputTokens.toLocaleString()}`,
      ...(isThreeWay
        ? {html: `~${htmlCost?.estimatedOutputTokens.toLocaleString()}`}
        : {}),
      ...(isFourWay
        ? {
            pharosTailwind: `~${pharosTailwindCost?.estimatedOutputTokens.toLocaleString()}`,
          }
        : {}),
      winner: costWinner(
        pharosCost.estimatedOutputTokens,
        baselineCost.estimatedOutputTokens,
        true,
        htmlCost?.estimatedOutputTokens,
        pharosTailwindCost?.estimatedOutputTokens,
      ),
    },
    {
      id: 'total-tokens',
      metric: 'Total Tokens',
      pharos: `~${(pharosCost.estimatedInputTokens + pharosCost.estimatedOutputTokens).toLocaleString()}`,
      baseline: `~${(baselineCost.estimatedInputTokens + baselineCost.estimatedOutputTokens).toLocaleString()}`,
      ...(isThreeWay
        ? {
            html: `~${((htmlCost?.estimatedInputTokens ?? 0) + (htmlCost?.estimatedOutputTokens ?? 0)).toLocaleString()}`,
          }
        : {}),
      ...(isFourWay
        ? {
            pharosTailwind: `~${((pharosTailwindCost?.estimatedInputTokens ?? 0) + (pharosTailwindCost?.estimatedOutputTokens ?? 0)).toLocaleString()}`,
          }
        : {}),
      winner: costWinner(
        pharosCost.estimatedInputTokens + pharosCost.estimatedOutputTokens,
        baselineCost.estimatedInputTokens + baselineCost.estimatedOutputTokens,
        true,
        htmlCost
          ? htmlCost.estimatedInputTokens + htmlCost.estimatedOutputTokens
          : undefined,
        pharosTailwindCost
          ? pharosTailwindCost.estimatedInputTokens +
              pharosTailwindCost.estimatedOutputTokens
          : undefined,
      ),
    },
    {
      id: 'output-lines',
      metric: 'Avg Output Lines',
      pharos: String(pharosCost.avgOutputLines),
      baseline: String(baselineCost.avgOutputLines),
      ...(isThreeWay ? {html: String(htmlCost?.avgOutputLines)} : {}),
      ...(isFourWay
        ? {pharosTailwind: String(pharosTailwindCost?.avgOutputLines)}
        : {}),
      winner: costWinner(
        pharosCost.avgOutputLines,
        baselineCost.avgOutputLines,
        true,
        htmlCost?.avgOutputLines,
        pharosTailwindCost?.avgOutputLines,
      ),
    },
    {
      id: 'docs-read',
      metric: 'Avg Docs Read',
      pharos: String(pharosCost.avgDocsRead),
      baseline: String(baselineCost.avgDocsRead),
      ...(isThreeWay ? {html: String(htmlCost?.avgDocsRead)} : {}),
      ...(isFourWay
        ? {pharosTailwind: String(pharosTailwindCost?.avgDocsRead)}
        : {}),
      winner: 'tie', // not inherently better or worse
    },
  ];

  const costColumns: TableColumn<CostRow>[] = [
    {key: 'metric', header: 'Metric'},
    {
      key: 'pharos',
      header: 'Pharos',
      renderCell: row => <Text type="body">{row.pharos}</Text>,
    },
    {
      key: 'baseline',
      header: 'Baseline',
      renderCell: row => <Text type="body">{row.baseline}</Text>,
    },
    ...(isThreeWay
      ? [
          {
            key: 'html' as const,
            header: 'HTML',
            renderCell: (row: CostRow) => (
              <Text type="body">{row.html ?? '—'}</Text>
            ),
          } satisfies TableColumn<CostRow>,
        ]
      : []),
    ...(isFourWay
      ? [
          {
            key: 'pharosTailwind' as const,
            header: 'Pharos+TW',
            renderCell: (row: CostRow) => (
              <Text type="body">{row.pharosTailwind ?? '—'}</Text>
            ),
          } satisfies TableColumn<CostRow>,
        ]
      : []),
    {
      key: 'winner',
      header: 'Lower Cost',
      renderCell: row => (
        <Badge
          variant={winnerBadgeVariant(row.winner)}
          label={row.winner === 'tie' ? '—' : winnerLabel(row.winner)}
        />
      ),
    },
  ];

  return (
    <Table<CostRow>
      data={costData}
      columns={costColumns}
      idKey="id"
      density="balanced"
      dividers="rows"
    />
  );
}

export function CompareView({comparison}: CompareViewProps) {
  const {pharos, baseline, html, pharosTailwind, winners} = comparison;
  const isThreeWay = !!html;
  const isFourWay = !!pharosTailwind;

  let pharosWins = 0;
  let baselineWins = 0;
  let htmlWins = 0;
  let pharosTailwindWins = 0;
  let ties = 0;
  for (const dim of ALL_DIMENSIONS) {
    const w = winners[dim];
    if (w === 'pharos') {
      pharosWins++;
    } else if (w === 'baseline') {
      baselineWins++;
    } else if (w === 'html') {
      htmlWins++;
    } else if (w === 'pharos-tailwind') {
      pharosTailwindWins++;
    } else {
      ties++;
    }
  }

  const dimData: DimRow[] = ALL_DIMENSIONS.filter(
    dim => pharos.averages[dim] != null || baseline.averages[dim] != null,
  ).map(dim => ({
    id: dim,
    dimension: DIMENSION_LABELS[dim],
    pharosScore: pharos.averages[dim] ?? 0,
    baselineScore: baseline.averages[dim] ?? 0,
    ...(isThreeWay ? {htmlScore: html?.averages[dim] ?? 0} : {}),
    ...(isFourWay
      ? {pharosTailwindScore: pharosTailwind?.averages[dim] ?? 0}
      : {}),
    delta: (pharos.averages[dim] ?? 0) - (baseline.averages[dim] ?? 0),
    winner: winners[dim],
  }));

  const dimColumns: TableColumn<DimRow>[] = [
    {key: 'dimension', header: 'Dimension'},
    {
      key: 'pharosScore',
      header: 'Pharos',
      renderCell: row => (
        <Text type="body">{formatScore(row.pharosScore)}</Text>
      ),
    },
    {
      key: 'baselineScore',
      header: 'Baseline',
      renderCell: row => (
        <Text type="body">{formatScore(row.baselineScore)}</Text>
      ),
    },
    ...(isThreeWay
      ? [
          {
            key: 'htmlScore' as const,
            header: 'HTML',
            renderCell: (row: DimRow) => (
              <Text type="body">
                {row.htmlScore != null ? formatScore(row.htmlScore) : '—'}
              </Text>
            ),
          } satisfies TableColumn<DimRow>,
        ]
      : []),
    ...(isFourWay
      ? [
          {
            key: 'pharosTailwindScore' as const,
            header: 'Pharos+TW',
            renderCell: (row: DimRow) => (
              <Text type="body">
                {row.pharosTailwindScore != null
                  ? formatScore(row.pharosTailwindScore)
                  : '—'}
              </Text>
            ),
          } satisfies TableColumn<DimRow>,
        ]
      : []),
    {
      key: 'delta',
      header: 'Delta (Pharos−Base)',
      renderCell: row => (
        <Text type="body" className={deltaClassName(row.delta)}>
          {row.delta > 0 ? '+' : ''}
          {formatScore(row.delta)}
        </Text>
      ),
    },
    {
      key: 'winner',
      header: 'Winner',
      renderCell: row => (
        <Badge
          variant={winnerBadgeVariant(row.winner)}
          label={winnerLabel(row.winner)}
        />
      ),
    },
  ];

  const allCategories = new Set([
    ...Object.keys(pharos.byCategory),
    ...Object.keys(baseline.byCategory),
    ...(html ? Object.keys(html.byCategory) : []),
    ...(pharosTailwind ? Object.keys(pharosTailwind.byCategory) : []),
  ]);

  const catData: CatRow[] = [...allCategories].map(cat => {
    const pharosCat = pharos.byCategory[cat] ?? {};
    const baseCat = baseline.byCategory[cat] ?? {};
    const htmlInit = {};
    const htmlCat =
      html?.byCategory[cat] ?? (htmlInit as Record<UniversalDimension, number>);
    const twInit = {};
    const twCat =
      pharosTailwind?.byCategory[cat] ??
      (twInit as Record<UniversalDimension, number>);
    const pharosAvg =
      CODE_DIMENSIONS.reduce(
        (s, d) => s + ((pharosCat[d as UniversalDimension] as number) ?? 0),
        0,
      ) / CODE_DIMENSIONS.length;
    const baseAvg =
      CODE_DIMENSIONS.reduce(
        (s, d) => s + ((baseCat[d as UniversalDimension] as number) ?? 0),
        0,
      ) / CODE_DIMENSIONS.length;
    const htmlAvg = isThreeWay
      ? CODE_DIMENSIONS.reduce(
          (s, d) => s + ((htmlCat[d as UniversalDimension] as number) ?? 0),
          0,
        ) / CODE_DIMENSIONS.length
      : undefined;
    const twAvg = isFourWay
      ? CODE_DIMENSIONS.reduce(
          (s, d) => s + ((twCat[d as UniversalDimension] as number) ?? 0),
          0,
        ) / CODE_DIMENSIONS.length
      : undefined;
    return {
      id: cat,
      category: cat,
      pharosOverall: pharosAvg,
      baselineOverall: baseAvg,
      ...(htmlAvg != null ? {htmlOverall: htmlAvg} : {}),
      ...(twAvg != null ? {pharosTailwindOverall: twAvg} : {}),
      delta: pharosAvg - baseAvg,
    };
  });

  const catColumns: TableColumn<CatRow>[] = [
    {key: 'category', header: 'Category'},
    {
      key: 'pharosOverall',
      header: 'Pharos',
      renderCell: row => (
        <Text type="body">{formatScore(row.pharosOverall)}</Text>
      ),
    },
    {
      key: 'baselineOverall',
      header: 'Baseline',
      renderCell: row => (
        <Text type="body">{formatScore(row.baselineOverall)}</Text>
      ),
    },
    ...(isThreeWay
      ? [
          {
            key: 'htmlOverall' as const,
            header: 'HTML',
            renderCell: (row: CatRow) => (
              <Text type="body">
                {row.htmlOverall != null ? formatScore(row.htmlOverall) : '—'}
              </Text>
            ),
          } satisfies TableColumn<CatRow>,
        ]
      : []),
    ...(isFourWay
      ? [
          {
            key: 'pharosTailwindOverall' as const,
            header: 'Pharos+TW',
            renderCell: (row: CatRow) => (
              <Text type="body">
                {row.pharosTailwindOverall != null
                  ? formatScore(row.pharosTailwindOverall)
                  : '—'}
              </Text>
            ),
          } satisfies TableColumn<CatRow>,
        ]
      : []),
    {
      key: 'delta',
      header: 'Delta (Pharos−Base)',
      renderCell: row => (
        <Text type="body" className={deltaClassName(row.delta)}>
          {row.delta > 0 ? '+' : ''}
          {formatScore(row.delta)}
        </Text>
      ),
    },
  ];

  // Determine grid class based on number of win cards
  const winCardCount = 2 + (isThreeWay ? 1 : 0) + (isFourWay ? 1 : 0) + 1; // targets + ties
  const summaryGridClass =
    winCardCount >= 5
      ? 'report-compare-summaryGrid5'
      : winCardCount === 4
        ? 'report-compare-summaryGrid4'
        : 'report-compare-summaryGrid';

  return (
    <VStack gap={4}>
      <div className={summaryGridClass}>
        <Card>
          <div className="report-compare-winCard">
            <VStack gap={2}>
              <Text type="label">Pharos Wins</Text>
              <Heading level={2}>
                <span className="report-color-positive">{pharosWins}</span>
              </Heading>
            </VStack>
          </div>
        </Card>
        <Card>
          <div className="report-compare-winCard">
            <VStack gap={2}>
              <Text type="label">Baseline Wins</Text>
              <Heading level={2}>
                <span className="report-color-negative">{baselineWins}</span>
              </Heading>
            </VStack>
          </div>
        </Card>
        {isThreeWay && (
          <Card>
            <div className="report-compare-winCard">
              <VStack gap={2}>
                <Text type="label">HTML Wins</Text>
                <Heading level={2}>
                  <span className="report-color-warning">{htmlWins}</span>
                </Heading>
              </VStack>
            </div>
          </Card>
        )}
        {isFourWay && (
          <Card>
            <div className="report-compare-winCard">
              <VStack gap={2}>
                <Text type="label">Pharos+TW Wins</Text>
                <Heading level={2}>
                  <span className="report-color-info">
                    {pharosTailwindWins}
                  </span>
                </Heading>
              </VStack>
            </div>
          </Card>
        )}
        <Card>
          <div className="report-compare-winCard">
            <VStack gap={2}>
              <Text type="label">Ties</Text>
              <Heading level={2}>
                <span className="report-color-neutral">{ties}</span>
              </Heading>
            </VStack>
          </div>
        </Card>
      </div>

      <VStack gap={3}>
        <Heading level={3}>Dimension Comparison</Heading>
        <Table<DimRow>
          data={dimData}
          columns={dimColumns}
          idKey="id"
          density="balanced"
          dividers="rows"
        />
      </VStack>

      {catData.length > 0 && (
        <VStack gap={3}>
          <Heading level={3}>Category Breakdown</Heading>
          <Table<CatRow>
            data={catData}
            columns={catColumns}
            idKey="id"
            density="balanced"
            dividers="rows"
          />
        </VStack>
      )}

      {pharos.cost && baseline.cost && (
        <VStack gap={3}>
          <Heading level={3}>Cost Comparison</Heading>
          <CostComparisonSection
            pharosCost={pharos.cost}
            baselineCost={baseline.cost}
            htmlCost={html?.cost}
            pharosTailwindCost={pharosTailwind?.cost}
          />
        </VStack>
      )}
    </VStack>
  );
}
