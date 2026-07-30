// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Dialog} from '@pharos-ds/core/Dialog';
import {VStack} from '@pharos-ds/core/Stack';
import {Text} from '@pharos-ds/core/Text';
import {Heading} from '@pharos-ds/core/Text';
import {Button} from '@pharos-ds/core/Button';
import {Icon} from '@pharos-ds/core/Icon';
import './report.css';

interface CodeModalProps {
  isOpen: boolean;
  onHide: () => void;
  promptId: string;
  target: 'pharos' | 'baseline' | 'html';
  code: string;
}

export function CodeModal({
  isOpen,
  onHide,
  promptId,
  target,
  code,
}: CodeModalProps) {
  const targetLabel =
    target === 'pharos' ? 'Pharos' : target === 'baseline' ? 'Baseline' : 'HTML';
  const lineCount = code.split('\n').length;

  return (
    <Dialog
      isOpen={isOpen}
      onHide={onHide}
      purpose="info"
      width={800}
      aria-label={`${targetLabel} code for ${promptId}`}>
      <div className="report-codeModal-header">
        <VStack gap={1}>
          <Heading level={3}>
            {promptId} — {targetLabel}
          </Heading>
          <Text type="supporting">{lineCount} lines</Text>
        </VStack>
        <Button
          variant="ghost"
          label="Close"
          tooltip="Close"
          icon={<Icon icon="close" color="inherit" />}
          onClick={onHide}
        />
      </div>
      <div className="report-codeModal-content">
        <div className="report-codeModal-codeBlock">{code}</div>
      </div>
    </Dialog>
  );
}
