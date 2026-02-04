// Polyfill for crypto.randomUUID
if (typeof globalThis.crypto === 'undefined') {
    // @ts-ignore
    globalThis.crypto = {
        getRandomValues: (arr: any) => {
             for (let i = 0; i < arr.length; i++) {
                 arr[i] = Math.floor(Math.random() * 256);
             }
             return arr;
        }
    };
}

if (!globalThis.crypto.randomUUID) {
    // @ts-ignore
    globalThis.crypto.randomUUID = () => {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (parseInt(c) ^ (globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> (parseInt(c) / 4)).toString(16)
        );
    };
}
