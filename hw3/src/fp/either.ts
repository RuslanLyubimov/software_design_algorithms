export type Left<E> = {
  _tag: "Left";
  left: E;
};

export type Right<A> = {
  _tag: "Right";
  right: A;
};

export type Either<E, A> = Left<E> | Right<A>;

export const right = <E = never, A = never>(val: A): Either<E, A> => ({
  _tag: "Right",
  right: val,
});

export const left = <E = never, A = never>(val: E): Either<E, A> => ({
  _tag: "Left",
  left: val,
});

export const isRight = <E, A>(val: Either<E, A>): val is Right<A> => val._tag === "Right";
export const isLeft = <E, A>(val: Either<E, A>): val is Left<E> => val._tag === "Left";

export const map =
  <E, A, B>(fn: (a: A) => B) =>
  (fa: Either<E, A>): Either<E, B> =>
    isRight(fa) ? right<E, B>(fn(fa.right)) : left<E, B>(fa.left);

export const ap =
  <E, A>(fa: Either<E, A>) =>
  <B>(fab: Either<E, (a: A) => B>): Either<E, B> =>
    isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));

export const flatten = <E, A>(a: Either<E, Either<E, A>>): Either<E, A> => (isRight(a) ? a.right : a);

export const fromPromise = <E, A>(promise: Promise<A>): Promise<Either<E, A>> =>
  promise.then((value: A) => right<E, A>(value)).catch((error: E) => left<E, A>(error));

export const getOrElse =
  <E, A>(onLeft: (e: E) => A) =>
  (ma: Either<E, A>): A =>
    isRight(ma) ? ma.right : onLeft(ma.left);

export const fold =
  <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) =>
  (ma: Either<E, A>): B =>
    isRight(ma) ? onRight(ma.right) : onLeft(ma.left);
