export type Dict<T> = { [key: string]: T };
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = Nullable<T> | Optional<T>;
export type Primitive = string | number | boolean | symbol | bigint;
