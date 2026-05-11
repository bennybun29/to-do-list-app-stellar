import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDQRZGBORVA5S3VLI3T3KYVLJLHBD4IZ5DA7CZ2QEPUSRJPYRUEPBJOQ",
  }
} as const


export interface Task {
  status: TaskStatus;
  title: string;
}


export interface TaskItem {
  id: u64;
  status: TaskStatus;
  title: string;
}

export type TaskStatus = {tag: "Todo", values: void} | {tag: "InProgress", values: void} | {tag: "Done", values: void};

export interface Client {
  /**
   * Construct and simulate a get_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_task: ({id}: {id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<TaskItem>>

  /**
   * Construct and simulate a list_tasks transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  list_tasks: ({offset, limit}: {offset: u32, limit: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Array<TaskItem>>>

  /**
   * Construct and simulate a set_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_status: ({id, status}: {id: u64, status: TaskStatus}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_task: ({title}: {title: string}, options?: MethodOptions) => Promise<AssembledTransaction<u64>>

  /**
   * Construct and simulate a delete_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  delete_task: ({id}: {id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_task: ({id, title, status}: {id: u64, title: string, status: TaskStatus}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAABFRhc2sAAAACAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAAKVGFza1N0YXR1cwAAAAAAAAAAAAV0aXRsZQAAAAAAABA=",
        "AAAAAQAAAAAAAAAAAAAACFRhc2tJdGVtAAAAAwAAAAAAAAACaWQAAAAAAAYAAAAAAAAABnN0YXR1cwAAAAAH0AAAAApUYXNrU3RhdHVzAAAAAAAAAAAABXRpdGxlAAAAAAAAEA==",
        "AAAAAAAAAAAAAAAIZ2V0X3Rhc2sAAAABAAAAAAAAAAJpZAAAAAAABgAAAAEAAAfQAAAACFRhc2tJdGVt",
        "AAAAAgAAAAAAAAAAAAAAClRhc2tTdGF0dXMAAAAAAAMAAAAAAAAAAAAAAARUb2RvAAAAAAAAAAAAAAAKSW5Qcm9ncmVzcwAAAAAAAAAAAAAAAAAERG9uZQ==",
        "AAAAAAAAAAAAAAAKbGlzdF90YXNrcwAAAAAAAgAAAAAAAAAGb2Zmc2V0AAAAAAAEAAAAAAAAAAVsaW1pdAAAAAAAAAQAAAABAAAD6gAAB9AAAAAIVGFza0l0ZW0=",
        "AAAAAAAAAAAAAAAKc2V0X3N0YXR1cwAAAAAAAgAAAAAAAAACaWQAAAAAAAYAAAAAAAAABnN0YXR1cwAAAAAH0AAAAApUYXNrU3RhdHVzAAAAAAAA",
        "AAAAAAAAAAAAAAALY3JlYXRlX3Rhc2sAAAAAAQAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAQAAAAY=",
        "AAAAAAAAAAAAAAALZGVsZXRlX3Rhc2sAAAAAAQAAAAAAAAACaWQAAAAAAAYAAAAA",
        "AAAAAAAAAAAAAAALdXBkYXRlX3Rhc2sAAAAAAwAAAAAAAAACaWQAAAAAAAYAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAAGc3RhdHVzAAAAAAfQAAAAClRhc2tTdGF0dXMAAAAAAAA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    get_task: this.txFromJSON<TaskItem>,
        list_tasks: this.txFromJSON<Array<TaskItem>>,
        set_status: this.txFromJSON<null>,
        create_task: this.txFromJSON<u64>,
        delete_task: this.txFromJSON<null>,
        update_task: this.txFromJSON<null>
  }
}