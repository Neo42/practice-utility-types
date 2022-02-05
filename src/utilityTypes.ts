/* eslint-disable @typescript-eslint/no-unused-vars */
// The Utility Types which ship with TypeScript are built using the same
// features that we've already discussed. In fact, we used these utility
// types as examples as we discussed Mapped Types and Conditional Types.

// Your task is recreate each of these Utility Types from scratch. Try to
// figure out how to represent a particular utility type using what you've
// learned. If you aren't able to figure out how a type works, that's fine.
// Watch the solution video where I'll explain how each Utility Type works.

// Since we'll be replicating types that already exist in TypeScript, we'll
// run this with the `noLib` tsconfig.json option turned on. This disables
// all of the types which ship with TypeScript so we don't have any name
// collisions.

// Partial
// Create a mapped type which marks all of the properties of the passed
// in generic `T` as optional.

type PropertiesOf<Type> = keyof Type;
type ValuesOf<Type> = Type[PropertiesOf<Type>];

type Partial<Type> = {
  [Property in PropertiesOf<Type>]?: Type[Property];
};

type OptionalFruit = Partial<{ name: string; color: string }>;
// type OptionalFruit = {
//   name?: string,
//   color?: string
// }

// Required
// Create a mapped type which marks all of the properties of the passed in
// generic `T` as required.

// (Hint: This is the same as removing the optional modifier from
//  every property)

type Required<Type> = {
  [Property in PropertiesOf<Type>]-?: Type[Property];
};

type RequiredFruit = Required<{ name?: string; color?: string }>;
// type RequiredFruit = {
//   name: string,
//   color: string
// }

// Readonly
// Create a mapped type which marks all of the properties of the passed
// in generic `T` as readonly.

type Readonly<Type> = {
  readonly [Property in PropertiesOf<Type>]: Type[Property];
};

type ReadonlyFruit = Readonly<{ name: string; color: string }>;
// type ReadonlyFruit = {
//   readonly name: string,
//   readonly color: string
// }

// Record
// Create a mapped type which takes in two generics: `K` is a union type
// of property names and `T` is the value of those properties.

type Record<Keys extends string, Value> = {
  [Key in Keys]: Value;
};

type FruitRecord = Record<"name" | "color", string>;
// type FruitRecord = {
//   name: string,
//   color: string
// }

// Exclude
// Create a conditional type which takes in two generics: `T` is a Union,
// and `U` is a Union. Exclude from `T` types that are assignable to `U`.
type Exclude<Values, Goner> = Values extends Goner ? never : Values;

type ExcludedValues = Exclude<"a" | "b" | "c", "c">;
// type ExcludedValues = "a" | "b"

// Extract
// Create a conditional type which takes in two generics: `T` is a Union,
// and `U` is a Union. Extract from `T` types that are assignable to `U`.
// (Hint: This is opposite of Exclude)
type Extract<Values, Remainder> = Values & Remainder;

type ExtractedValues = Extract<"a" | "b" | "c", "c">;
// type ExtractedValues = "c"

// Pick
// Create a mapped type which takes in two generics: `T` is an interface,
// and `K` is a Union of literal types that represent some of the keys
// of `T`. This mapped type constructs a type which only has the properties
// that are in the Union `K`, removing the other properties.
type Pick<Type, Keys extends keyof Type> = {
  [Key in Keys]: Type[Key];
};

type PickedValues = Pick<
  { name: string; color: string; sweetness: number },
  "name" | "color"
>;
// type PickedValues = {
//   name: string,
//   color: string
// }

// Omit
// Create a type which takes in two generics: `T` is an interface and `K`
// is a Union of literal types that represent keys. This type constructs
// a type which has all of the properties of `T` except those listed in `K`.
// (Hint: This can be done by combining `Pick` and `Exclude`)
type Omit<Type, Keys extends keyof Type> = Pick<
  Type,
  Exclude<keyof Type, Keys>
>;

type OmittedValues = Omit<
  { name: string; color: string; sweetness: number },
  "name" | "color"
>;
// type OmittedValues = {
//   sweetness: number,
// }

// NonNullable
// Create a conditional type which excludes null and undefined from the
// passed in generic `T`.
type NonNullable<Type> = Exclude<Type, null | undefined>;

type NonNullValue = NonNullable<string | null | undefined>;
// type NonNullValue = string

// This function is here for the examples, you don't need to do anything with it.
declare function parseFloat(string: string, radix?: number): number;

// Parameters
// Create a conditional type that uses the `infer` keyword to return the
// inferred parameters of the passed in generic `T`. `T` should have a type
// constraint that ensures it is a function.
type Parameters<Type extends (...args: any) => any> = Type extends (
  ...arg: infer P
) => any
  ? P
  : any;

type FunctionParameters = Parameters<typeof parseFloat>;
// type FunctionParameters = [string: string, radix?: number | undefined]

// ReturnType
// Create a conditional type that uses the `infer` keyword to return the
// inferred return type of the passed in generic `T`. `T` should have a type
// constraint that ensures it is a function.
type ReturnType<Type extends (...args: any) => any> = Type extends (
  ...args: any
) => infer R
  ? R
  : any;

type FunctionReturn = ReturnType<typeof parseFloat>;
// type FunctionReturn = number
