#!/usr/bin/env bash
# Copyright (c) Meta Platforms, Inc. and affiliates.

set -euo pipefail

# Publish a vibe test report to GitHub Pages.
#
# Usage:
#   ./scripts/publish-report.sh <pharos-iteration> [baseline-iteration]
#
# The report is always published under reports/<pharos-iteration>/ on gh-pages.
# No --slug, no --name, no override — just the hash.
#
# Examples:
#   ./scripts/publish-report.sh a87fa578
#   ./scripts/publish-report.sh a87fa578 446469c7

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VIBE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <pharos-iteration> [baseline-iteration]"
  echo ""
  echo "Builds and deploys a vibe test report to GitHub Pages."
  echo "Report URL: https://pharos-ds.vercel.app/reports/<pharos-iteration>/"
  exit 1
fi

PHAROS_ITER="$1"
BASELINE_ITER="${2:-}"

ARGS="--iteration $PHAROS_ITER"
if [ -n "$BASELINE_ITER" ]; then
  ARGS="$ARGS --baseline $BASELINE_ITER"
fi

echo ""
echo "📊 Publishing vibe test report"
echo "   Pharos iteration:      $PHAROS_ITER"
if [ -n "$BASELINE_ITER" ]; then
  echo "   Baseline iteration: $BASELINE_ITER"
fi
echo "   Deploy to:          reports/$PHAROS_ITER/"
echo ""

cd "$VIBE_DIR"
exec npx tsx src/deploy-report.ts $ARGS
