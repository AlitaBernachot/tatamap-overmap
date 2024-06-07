import { ref } from 'vue'

import * as duckdb from '@duckdb/duckdb-wasm'
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url'
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url'
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url'
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url'

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
    },
    eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
    },
}

export function useDuckDBWasm() {
    const isReady = ref(false)
    let db: duckdb.AsyncDuckDB

    async function init() {
        // Select a bundle based on browser checks
        const bundle = await duckdb.selectBundle(MANUAL_BUNDLES)
        
        // Instantiate the asynchronus version of DuckDB-wasm
        const worker = new Worker(bundle.mainWorker!)
        const logger = new duckdb.ConsoleLogger()
        db = new duckdb.AsyncDuckDB(logger, worker)
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker)

        isReady.value = true
    }

    async function doQuery(query?: string) {
        // query = `SELECT v + ? FROM generate_series(0, 10000) as t(v);`
    //     query = `
    // SELECT
    //     id,
    //     level,
    //     height,
    //     JSON(names) AS names
    // FROM read_parquet('s3://overturemaps-us-west-2/release/2024-05-16-beta.0/theme=buildings/type=*/*', filename=true, hive_partitioning=1)
    // WHERE
    //     bbox.xmin > 78.4194
    //     AND bbox.xmax < 78.5129
    //     AND bbox.ymin > 17.3427
    //     AND bbox.ymax < 17.4192
    // ;`

        query = `SELECT id FROM "https://overturemaps-us-west-2/release/2024-05-16-beta.0";`
        query = `SELECT id FROM read_parquet('https://overturemaps-us-west-2/release/2024-05-16-beta.0/theme=buildings/type=*/*', filename=true, hive_partitioning=1);`


        if (!isReady.value) return

        const conn = await db.connect()


        // // Prepare query
        await conn.prepare('INSTALL spatial;')
        await conn.prepare('LOAD spatial;')
        await conn.prepare('LOAD httpfs;')
        await conn.prepare(`SET s3_region='us-west-2';`)

        await db.registerFileURL('remote.parquet', 's3://overturemaps-us-west-2/release/2024-05-16-beta.0', duckdb.DuckDBDataProtocol.S3, false);
        // const res = await fetch('s3://overturemaps-us-west-2/release/2024-05-16-beta.0')
        // await db.registerFileBuffer('buffer.parquet', new Uint8Array(await res.arrayBuffer()))
        const stmt = await conn.prepare(query)

        // ... and run the query with materialized results
        // await stmt.query(234)
        
        // ... or result chunks
        for await (const batch of await stmt.send(234)) {
            console.log(batch)
        }

        // Close the statement to release memory
        await stmt.close()
        // Closing the connection will release statements as well
        await conn.close()
    }

    init()

    return {
        isReady,
        doQuery
    }
}