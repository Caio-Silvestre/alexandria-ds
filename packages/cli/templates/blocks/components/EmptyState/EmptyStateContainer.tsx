// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {EmptyState} from '@pharos-ds/core/EmptyState';
import {Button} from '@pharos-ds/core/Button';
import {Card} from '@pharos-ds/core/Card';
import {Icon} from '@pharos-ds/core/Icon';
import {FolderPlusIcon} from '@heroicons/react/24/outline';

export default function EmptyStateContainer() {
  return (
    <Card>
      <EmptyState
        icon={<Icon icon={FolderPlusIcon} size="lg" />}
        title="No projects yet"
        description="Create your first project to start organizing your work. You can invite team members after."
        actions={
          <>
            <Button label="Import" variant="secondary" />
            <Button label="Create project" variant="primary" />
          </>
        }
      />
    </Card>
  );
}
