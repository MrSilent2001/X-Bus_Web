import {jwtDecode} from "jwt-decode";

// Utility function to decode JWT and extract specific value
export const getDecodedTokenValue = <T>(token: string, key: keyof T): T[keyof T] | undefined => {
    try {
        const decoded: T = jwtDecode(token);
        return decoded[key];
    } catch (error) {
        console.error("Invalid token or decoding error:", error);
        return undefined;
    }
};
