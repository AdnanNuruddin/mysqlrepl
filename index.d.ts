declare module 'mysqlrepl' {

    import { ConnectionConfig } from 'mysql'

    export type MysqlReplEventType =
        'unknown' |
        'query' |
        'intvar' |
        'rotate' |
        'format' |
        'xid' |
        'tablemap' |
        'writerows' |
        'updaterows' |
        'deleterows'

    export interface MysqlReplOptions {
        serverId?: number
        startAtEnd?: boolean
        filename?: string
        position?: number
        includeEvents?: MysqlReplEventType[]
        excludeEvents?: MysqlReplEventType[]
        includeSchema?: Record<string, boolean | string[]>
        excludeSchema?: Record<string, boolean | string[]>
    }
    export interface MysqlReplEvent {
        tableId: number
        timestamp: number
        nextPosition: number
        size: number
        dump(): void
        getEventName(): string
        getTypeName(): string
    }
    export interface Rotate extends MysqlReplEvent {
        position: number
        binlogName: string
    }
    export interface Xid extends MysqlReplEvent {
        xid: number
    }
    export interface Query extends MysqlReplEvent {
        slaveProxyId: number
        executionTime: number
        schemaLength: number
        errorCode: number
        statusVarsLength: number
        statusVars: string
        schema: string
        query: string
    }
    export interface IntVar extends MysqlReplEvent {
        type: number
        value: number
    }
    export interface TableMap extends MysqlReplEvent {
        tableMap: any[]
        flags: number
        schemaName: string
        tableName: string
    }
    export default class MysqlRepl {
        constructor(options: ConnectionConfig)
        start(options: MysqlReplOptions): void
        stop(): void
        on(eventName: 'ready', handler: () => void): this
        on(eventName: 'binlog', handler: (event: MysqlReplEvent) => void): this
        on(eventName: 'error', handler: (err: Error) => void): this
        on(eventName: 'stopped', handler: () => void): this
    }

}
