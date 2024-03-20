export type Mode = 'production' | 'development';

export interface EnvVars {
    mode: Mode;
    port?: number,
}