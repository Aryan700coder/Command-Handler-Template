declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            dburl: string;
            environment: "dev" | "prod" | "debug";
        } 
    }
}

export {};