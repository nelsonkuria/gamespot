# Gamespot

This is a simple practice project inspired by others

## Running locally

Clone the respository `git clone https://github.com/nkuriam/gamespot.git` and then `npm run dev`

## Next steps

Off the top of my head, the two things I think I could add to this are:

1. Infinite scrolling

2. Refactor `useQuery` out into its own hook that accepts a generic type. That way I don't have to specify `<FetchResponse<Type>, Error>` everytime it's called 🤔

```ts
const useUseQuery = <T>(key, endpoint) => {
  return useQuery<FetchResponse<T>, Error>({ ... })
}
```
