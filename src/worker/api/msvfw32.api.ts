/**
 * Video for Windows (msvfw32.dll) API Descriptor
 *
 * Provides DrawDib and Video for Windows IC functions used by games
 * to render and decompress AVI frames.
 */

import { ModuleDescriptor, FunctionDescriptor, ParameterDescriptor } from "./types";

const buildParams = (count: number): ParameterDescriptor[] => {
    const params: ParameterDescriptor[] = [];
    for (let i = 0; i < count; i++) {
        params.push({ name: `arg${i}`, type: "u32" });
    }
    return params;
};

const makeFunc = (name: string, argCount: number, overrides: Partial<FunctionDescriptor> = {}): FunctionDescriptor => ({
    name,
    params: overrides.params ?? buildParams(argCount),
    returnType: overrides.returnType ?? "u32",
    callingConvention: overrides.callingConvention ?? "stdcall",
});

export const msvfw32Module: ModuleDescriptor = {
    name: "msvfw32",
    functions: [
        // DrawDib API
        makeFunc("DrawDibOpen", 0),
        makeFunc("DrawDibClose", 1),
        makeFunc("DrawDibDraw", 13),

        // Video for Windows IC API
        makeFunc("ICLocate", 5, {
            params: [
                { name: "fccType", type: "u32" },
                { name: "fccHandler", type: "u32" },
                { name: "lpbiIn", type: "ptr" },
                { name: "lpbiOut", type: "ptr" },
                { name: "wFlags", type: "u16" },
            ],
            returnType: "handle",
            callingConvention: "stdcall",
        }),
        makeFunc("ICDecompress", 6, {
            params: [
                { name: "hic", type: "handle" },
                { name: "dwFlags", type: "u32" },
                { name: "lpbiFormat", type: "ptr" },
                { name: "lpData", type: "ptr" },
                { name: "lpbi", type: "ptr" },
                { name: "lpBits", type: "ptr" },
            ],
            returnType: "u32",
            callingConvention: "cdecl",
        }),
        makeFunc("ICSendMessage", 4, {
            params: [
                { name: "hic", type: "handle" },
                { name: "msg", type: "u32" },
                { name: "dw1", type: "ptr" },
                { name: "dw2", type: "ptr" },
            ],
            returnType: "u32",
            callingConvention: "stdcall",
        }),
        makeFunc("ICClose", 1, {
            params: [{ name: "hic", type: "handle" }],
            returnType: "u32",
            callingConvention: "stdcall",
        }),
    ],
};
