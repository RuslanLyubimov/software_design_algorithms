import { Maybe, none, some } from "../../src/fp/maybe";

export const constant =
  <A>(a: A) =>
  (): A =>
    a;

export function flow<A, B>(fa: (a: A) => B): (a: A) => B;
export function flow<A, B, C>(fa: (a: A) => B, fb: (b: B) => C): (a: A) => C;
export function flow<A, B, C, D>(fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D): (a: A) => D;
export function flow<A, B, C, D, E>(fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D, fd: (d: D) => E): (a: A) => E;
export function flow<A>(...fns: Array<(a: A) => A>): (a: A) => A {
  return (a: A) => fns.reduce((acc, fn) => fn(acc), a);
}

export function pipe<A, B>(a: A, fa: (a: A) => B): B;
export function pipe<A, B, C>(a: A, fa: (a: A) => B, fb: (b: B) => C): C;
export function pipe<A, B, C, D>(a: A, fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D): D;
export function pipe<A, B, C, D, E>(a: A, fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D, fd: (d: D) => E): E;
export function pipe<A>(a: A, ...fns: Array<(a: A) => A>): A {
  return fns.reduce((acc, fn) => fn(acc), a);
}

export type Predicate<A> = (a: A) => boolean;

export const matcher =
  <A, R>(...predicates: Array<[Predicate<A>, (a: A) => R]>) =>
  (a: A) => {
    const i = predicates.findIndex(([predicate]) => predicate(a));
    return i > -1 ? predicates[i][1](a) : undefined;
  };

export const prop =
  <V extends Record<string, unknown>, K extends keyof V>(key: K) =>
  (obj: V): Maybe<V[K]> =>
    key in obj ? some(obj[key] as V[K]) : none;
