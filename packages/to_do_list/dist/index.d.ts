import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from "@stellar/stellar-sdk/contract";
import type { u32, u64 } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CDQRZGBORVA5S3VLI3T3KYVLJLHBD4IZ5DA7CZ2QEPUSRJPYRUEPBJOQ";
    };
};
export interface Task {
    status: TaskStatus;
    title: string;
}
export interface TaskItem {
    id: u64;
    status: TaskStatus;
    title: string;
}
export type TaskStatus = {
    tag: "Todo";
    values: void;
} | {
    tag: "InProgress";
    values: void;
} | {
    tag: "Done";
    values: void;
};
export interface Client {
    /**
     * Construct and simulate a get_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_task: ({ id }: {
        id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<TaskItem>>;
    /**
     * Construct and simulate a list_tasks transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    list_tasks: ({ offset, limit }: {
        offset: u32;
        limit: u32;
    }, options?: MethodOptions) => Promise<AssembledTransaction<Array<TaskItem>>>;
    /**
     * Construct and simulate a set_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    set_status: ({ id, status }: {
        id: u64;
        status: TaskStatus;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a create_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    create_task: ({ title }: {
        title: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<u64>>;
    /**
     * Construct and simulate a delete_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    delete_task: ({ id }: {
        id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_task: ({ id, title, status }: {
        id: u64;
        title: string;
        status: TaskStatus;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        get_task: (json: string) => AssembledTransaction<TaskItem>;
        list_tasks: (json: string) => AssembledTransaction<TaskItem[]>;
        set_status: (json: string) => AssembledTransaction<null>;
        create_task: (json: string) => AssembledTransaction<bigint>;
        delete_task: (json: string) => AssembledTransaction<null>;
        update_task: (json: string) => AssembledTransaction<null>;
    };
}
