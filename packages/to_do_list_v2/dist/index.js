import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
        contractId: "CDW4L5KQMJFQXMF7IJ2VJNATPTVMHXJWDCFMQ2Y5FAXZRLVUIYMYS735",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAABFRhc2sAAAACAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAAKVGFza1N0YXR1cwAAAAAAAAAAAAV0aXRsZQAAAAAAABA=",
            "AAAAAQAAAAAAAAAAAAAACFRhc2tJdGVtAAAAAwAAAAAAAAACaWQAAAAAAAYAAAAAAAAABnN0YXR1cwAAAAAH0AAAAApUYXNrU3RhdHVzAAAAAAAAAAAABXRpdGxlAAAAAAAAEA==",
            "AAAAAAAAAAAAAAAIZ2V0X3Rhc2sAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAACaWQAAAAAAAYAAAABAAAH0AAAAAhUYXNrSXRlbQ==",
            "AAAAAgAAAAAAAAAAAAAAClRhc2tTdGF0dXMAAAAAAAMAAAAAAAAAAAAAAARUb2RvAAAAAAAAAAAAAAAKSW5Qcm9ncmVzcwAAAAAAAAAAAAAAAAAERG9uZQ==",
            "AAAAAAAAAAAAAAAKbGlzdF90YXNrcwAAAAAAAwAAAAAAAAAEdXNlcgAAABMAAAAAAAAABm9mZnNldAAAAAAABAAAAAAAAAAFbGltaXQAAAAAAAAEAAAAAQAAA+oAAAfQAAAACFRhc2tJdGVt",
            "AAAAAAAAAAAAAAAKc2V0X3N0YXR1cwAAAAAAAwAAAAAAAAAEdXNlcgAAABMAAAAAAAAAAmlkAAAAAAAGAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAAKVGFza1N0YXR1cwAAAAAAAA==",
            "AAAAAAAAAAAAAAALY3JlYXRlX3Rhc2sAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAEAAAAG",
            "AAAAAAAAAAAAAAALZGVsZXRlX3Rhc2sAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAAmlkAAAAAAAGAAAAAA==",
            "AAAAAAAAAAAAAAALdXBkYXRlX3Rhc2sAAAAABAAAAAAAAAAEdXNlcgAAABMAAAAAAAAAAmlkAAAAAAAGAAAAAAAAAAV0aXRsZQAAAAAAABAAAAAAAAAABnN0YXR1cwAAAAAH0AAAAApUYXNrU3RhdHVzAAAAAAAA"]), options);
        this.options = options;
    }
    fromJSON = {
        get_task: (this.txFromJSON),
        list_tasks: (this.txFromJSON),
        set_status: (this.txFromJSON),
        create_task: (this.txFromJSON),
        delete_task: (this.txFromJSON),
        update_task: (this.txFromJSON)
    };
}
