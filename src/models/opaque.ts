declare class OpaqueTag<S extends string> {
  private tag: S;
}

export type Opaque<T, S extends string> = T & OpaqueTag<S>;
