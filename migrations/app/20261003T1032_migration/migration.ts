#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/2acb2050c20ba599a9dc039232182f3be90d73c71b89b60f124e248f0a16ebd2/contract';
import startContract from '../../snapshots/2acb2050c20ba599a9dc039232182f3be90d73c71b89b60f124e248f0a16ebd2/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/2b3b2cc5b99725ab6c5a3f7d52db015d9fe9ddeeb0170dab7c4758ad9d7e706c/contract';
import endContract from '../../snapshots/2b3b2cc5b99725ab6c5a3f7d52db015d9fe9ddeeb0170dab7c4758ad9d7e706c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'token',
        column: 'created_at',
        defaultSql: 'DEFAULT (now())',
      }),
      this.setDefault({
        schema: 'public',
        table: 'user',
        column: 'created_at',
        defaultSql: 'DEFAULT (now())',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
