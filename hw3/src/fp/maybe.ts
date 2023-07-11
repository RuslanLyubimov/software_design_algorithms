export type None = {
  _tag: "None";
};

export type Some<T> = {
  readonly _tag: "Some";
  readonly value: T;
};

/**
 * Maybe represents an optional value, which might or might not be present.
 * It can be either a Some<Value> or None.
 */
export type Maybe<T> = Some<T> | None;

export const isSome = <T>(optional: Maybe<T>): optional is Some<T> => optional._tag === "Some";
export const isNone = <T>(optional: Maybe<T>): optional is None => optional._tag === "None";

export const some = <T>(value: T): Some<T> => ({
  _tag: "Some",
  value,
});

export const none: Readonly<None> = {
  _tag: "None",
};

/**
 * Create a Maybe instance from the value. If the value (T) is nullable (null or undefined), returns None; otherwise, it returns Some<T>.
 */
export const fromNullable = <T>(value: T): Maybe<T> => (value === null || value === undefined ? none : some(value));

/**
 * Get the value from Some, or return the result of onNone.
 */
export const getOrElse =
  <T>(onNone: () => T) =>
  (val: Maybe<T>): T =>
    isSome(val) ? val.value : onNone();

/**
 * Fold (or reduce, accumulate) is a function that builds up some result based on the internal values.
 * Both onNone and onSome functions return the same "B" value.
 */
export const fold =
  <T, R>(onNone: () => R, onSome: (v: T) => R) =>
  (optional: Maybe<T>): R =>
    isSome(optional) ? onSome(optional.value) : onNone();
