declare module 'mysqlrepl' {

    import { ConnectionConfig } from 'mysql'

    interface MysqlReplOptions {
        serverId?: number
        startAtEnd?: boolean
        filename?: string
        position?: number
        includeEvents?: string[]
        excludeEvents?: string[]
        includeSchema?: Record<string, boolean | string[]>
        excludeSchema?: Record<string, boolean | string[]>
    }
    enum MysqlReplEventType {
        unknown = 'unknown',
        query = 'query',
        intvar = 'intvar',
        rotate = 'rotate',
        format = 'format',
        xid = 'xid',
        tablemap = 'tablemap',
        writerows = 'writerows',
        updaterows = 'updaterows',
        deleterows = 'deleterows',
    }
    interface MysqlReplEvent {
        dump(): void
        getEventName(): string
    }
    class ZongJi {
        constructor(options: ConnectionConfig)
        start(options: MysqlReplOptions): void
        stop(): void
        on(eventName: 'ready', handler: () => void): this
        on(eventName: 'binlog', handler: (event: MysqlReplEvent) => void): this
        on(eventName: 'error', handler: (err: Error) => void): this
        on(eventName: 'stopped', handler: () => void): this
    }

    export = ZongJi
}
