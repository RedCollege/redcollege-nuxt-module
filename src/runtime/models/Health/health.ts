import type { DateTime } from 'luxon';

export interface IHealth {
    readonly isHealthy:  boolean;
    readonly status:     string;
    readonly finishedAt: Date;
    readonly debugInfo:  DebugInfo;
    readonly checks:     Check[];
}

export interface Check {
    readonly name:       string;
    readonly isCached:   boolean;
    readonly message:    string;
    readonly status:     string;
    readonly finishedAt: DateTime;
    readonly meta:       Meta;
}

export interface Meta {
    readonly sizeInPercentage?: MemoryInBytes;
    readonly memoryInBytes?:    MemoryInBytes;
    readonly connection?:       Connection;
    readonly connectionsCount?: ConnectionsCount;
}

export interface Connection {
    readonly name:    string;
    readonly dialect: string;
}

export interface ConnectionsCount {
    readonly active:           number;
    readonly warningThreshold: number;
    readonly failureThreshold: number;
}

export interface MemoryInBytes {
    readonly used:             number;
    readonly failureThreshold: number;
    readonly warningThreshold: number;
}

export interface DebugInfo {
    readonly pid:      number;
    readonly ppid:     number;
    readonly platform: string;
    readonly uptime:   number;
    readonly version:  string;
}
