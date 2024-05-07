import {
    mysqlTable,
    serial,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/mysql-core';

export const hosts = mysqlTable('host', {
    id: serial('id').primaryKey(),
    ip: varchar('ip', { length: 15 }),
}, (hosts) => ({
    ipIndex: uniqueIndex("ip_idx").on(hosts.ip),
}));
